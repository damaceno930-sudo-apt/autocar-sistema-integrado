import json
import os
import sys
import tempfile
import threading
import unittest
import urllib.error
import urllib.request
from http.server import ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEST_HOME = tempfile.TemporaryDirectory(prefix="autocar-tests-")
os.environ["AUTOCAR_DATA_DIR"] = TEST_HOME.name
os.environ["AUTOCAR_ENV"] = "test"
os.environ["AUTOCAR_QUIET"] = "1"
sys.path.insert(0, str(ROOT))
from backend import server as backend  # noqa: E402


class BackendApiTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.httpd = ThreadingHTTPServer(("127.0.0.1", 0), backend.Handler)
        cls.thread = threading.Thread(target=cls.httpd.serve_forever, daemon=True)
        cls.thread.start()
        cls.base = f"http://127.0.0.1:{cls.httpd.server_address[1]}"

    @classmethod
    def tearDownClass(cls):
        cls.httpd.shutdown()
        cls.httpd.server_close()
        cls.thread.join(timeout=3)
        TEST_HOME.cleanup()

    def setUp(self):
        path = Path(TEST_HOME.name) / f"{self._testMethodName}.db"
        path.unlink(missing_ok=True)
        Path(str(path) + "-wal").unlink(missing_ok=True)
        Path(str(path) + "-shm").unlink(missing_ok=True)
        backend.DB = backend.Database(path)
        with backend.DB.conn:
            backend.DB.conn.execute("INSERT INTO stock_items(name,code,category,stock,unit,price,cost) VALUES(?,?,?,?,?,?,?)", ("Filtro de óleo Tecfil", "FO-153", "Filtros", 18, "pc", 28.50, 16.90))
        backend.TOKENS.clear()
        backend.LOGIN_FAILURES.clear()
        self.token = self.login()

    def request(self, path, method="GET", data=None, token=None, origin="null", extra_headers=None):
        payload = None if data is None else json.dumps(data).encode("utf-8")
        headers = {"Origin": origin}
        headers.update(extra_headers or {})
        if payload is not None:
            headers["Content-Type"] = "application/json"
        if token:
            headers["X-AutoCar-Token"] = token
        request = urllib.request.Request(self.base + path, data=payload, headers=headers, method=method)
        try:
            with urllib.request.urlopen(request, timeout=5) as response:
                body = response.read()
                return response.status, json.loads(body) if body else None, response.headers
        except urllib.error.HTTPError as error:
            body = error.read()
            return error.code, json.loads(body) if body else None, error.headers

    def login(self):
        status, data, _ = self.request("/api/auth/login", "POST", {"login": "admin@autocar.local", "password": "admin123"})
        self.assertEqual(status, 200, data)
        return data["token"]

    def test_inventory_session_is_printable_and_retrievable(self):
        payload = {
            "reason": "Conferência trimestral",
            "items": [
                {"code": "LUB-5W30-1L", "count": 5},
                {"code": "FR-DI-482", "count": 1},
                {"code": "FO-153", "count": 18},
            ],
        }
        status, data, _ = self.request("/api/inventory/physical-count", "POST", payload, self.token)
        self.assertEqual(status, 200, data)
        session = data["result"]
        self.assertEqual(session["checked"], 3)
        self.assertEqual(session["adjusted"], 2)
        self.assertEqual(session["totalVariance"], 0.0)
        self.assertEqual(session["totalValueVariance"], -96.5)
        self.assertEqual(session["positiveVariance"], 1.0)
        self.assertEqual(session["negativeVariance"], 1.0)
        self.assertEqual(len(session["items"]), 3)
        self.assertEqual(session["items"][2]["variance"], 0.0)
        self.assertEqual(session["actorName"], "Administrador")

        status, retrieved, _ = self.request(f"/api/inventory/physical-count/{session['sessionId']}", token=self.token)
        self.assertEqual(status, 200, data)
        self.assertEqual(retrieved["session"]["sessionId"], session["sessionId"])
        self.assertEqual(retrieved["session"]["items"], session["items"])

    def test_invalid_inventory_count_rolls_back_prior_updates(self):
        before = backend.DB.conn.execute("SELECT stock FROM stock_items WHERE code='LUB-5W30-1L'").fetchone()[0]
        status, _, _ = self.request("/api/inventory/physical-count", "POST", {"items": [{"code": "LUB-5W30-1L", "count": 9}, {"code": "NOT-REAL", "count": 1}]}, self.token)
        self.assertEqual(status, 400)
        after = backend.DB.conn.execute("SELECT stock FROM stock_items WHERE code='LUB-5W30-1L'").fetchone()[0]
        self.assertEqual(after, before)
        self.assertEqual(backend.DB.conn.execute("SELECT COUNT(*) FROM inventory_count_sessions").fetchone()[0], 0)

    def test_sale_receipt_uses_persisted_sale_id_and_survives_snapshot(self):
        payload = {
            "saleType": "direct", "clientId": 1, "customer": "Marcos Almeida",
            "total": 153.00, "received": 160.00, "sellerId": 1, "paymentMethod": "PIX",
            "items": [
                {"kind": "product", "code": "FO-153", "name": "Filtro de óleo Tecfil", "quantity": 2, "price": 28.50, "discount": 2.00, "unit": "pc"},
                {"kind": "service", "code": "SRV-TEST", "name": "Mão de obra", "quantity": 1, "price": 100.00, "discount": 0, "unit": "serviço"},
            ],
        }
        status, created, _ = self.request("/api/finance/sales", "POST", payload, self.token)
        self.assertEqual(status, 201, created)
        sale_id = created["item"]["id"]
        self.assertTrue(sale_id.startswith("sale-"))
        receipt = created["receipt"]
        self.assertEqual(receipt["sale"]["id"], sale_id)
        self.assertEqual(receipt["sale"]["status"], "paid")
        self.assertEqual(receipt["sale"]["payment_method"], "PIX")
        self.assertEqual(receipt["sale"]["customer_name"], "Marcos Almeida")
        self.assertEqual(receipt["subtotal"], 157.0)
        self.assertEqual(receipt["discount"], 4.0)
        self.assertEqual(receipt["total"], 153.0)
        self.assertEqual(receipt["received"], 160.0)
        self.assertEqual(receipt["change"], 7.0)
        self.assertEqual(len(receipt["items"]), 2)

        status, retrieved, _ = self.request(f"/api/finance/sales/{sale_id}", token=self.token)
        self.assertEqual(status, 200, retrieved)
        self.assertEqual(retrieved["receipt"]["sale"]["id"], sale_id)
        actor_row = backend.DB.conn.execute("SELECT * FROM users WHERE id=1").fetchone()
        actor = backend.DB.user(actor_row)
        backend.DB.save_snapshot({"sales": [], "financeEntries": []}, actor)
        self.assertIsNotNone(backend.DB.conn.execute("SELECT id FROM sales WHERE id=?", (sale_id,)).fetchone())

    def test_production_seed_has_no_demo_data_and_requires_a_secret(self):
        old_env = {key: os.environ.get(key) for key in ("AUTOCAR_ENV", "AUTOCAR_ADMIN_LOGIN", "AUTOCAR_ADMIN_PASSWORD")}
        try:
            os.environ["AUTOCAR_ENV"] = "production"
            os.environ["AUTOCAR_ADMIN_LOGIN"] = "owner@example.test"
            os.environ["AUTOCAR_ADMIN_PASSWORD"] = "A-unique-test-secret-2026"
            prod_db = backend.Database(Path(TEST_HOME.name) / "fresh-production.db")
            user = prod_db.authenticate("owner@example.test", "A-unique-test-secret-2026")
            self.assertTrue(user["admin"])
            snapshot = prod_db.snapshot(user)
            for key in ("clients", "orders", "inventory", "services", "suppliers"):
                self.assertEqual(snapshot[key], [])
            self.assertEqual(prod_db.conn.execute("SELECT COUNT(*) FROM users").fetchone()[0], 1)
            prod_db.conn.close()

            for unsafe in ("short", "REPLACE_WITH_A_UNIQUE_RANDOM_SECRET_OF_AT_LEAST_12_CHARACTERS", "admin123"):
                os.environ["AUTOCAR_ADMIN_PASSWORD"] = unsafe
                with self.assertRaisesRegex(RuntimeError, "exclusivo"):
                    backend.Database(Path(TEST_HOME.name) / f"unsafe-{len(unsafe)}.db")
        finally:
            for key, value in old_env.items():
                if value is None: os.environ.pop(key, None)
                else: os.environ[key] = value

    def test_unknown_origin_is_rejected_for_preflight(self):
        status, body, headers = self.request("/api/health", "OPTIONS", origin="https://evil.example")
        self.assertEqual(status, 403)
        self.assertEqual(body["error"], "origin_not_allowed")
        self.assertIsNone(headers.get("Access-Control-Allow-Origin"))

    def test_login_limit_uses_last_ip_from_trusted_proxy_chain(self):
        backend.LOGIN_FAILURES.clear()
        bad_credentials = {"login": "admin@autocar.local", "password": "wrong"}
        for spoofed in range(5):
            status, _, _ = self.request(
                "/api/auth/login", "POST", bad_credentials,
                extra_headers={"X-Forwarded-For": f"203.0.113.{spoofed + 1}, 198.51.100.42"},
            )
            self.assertEqual(status, 401)
        status, body, _ = self.request(
            "/api/auth/login", "POST", bad_credentials,
            extra_headers={"X-Forwarded-For": "192.0.2.123, 198.51.100.42"},
        )
        self.assertEqual(status, 429)
        self.assertEqual(body["error"], "rate_limited")

    def test_inventory_session_requires_authentication(self):
        status, body, _ = self.request("/api/inventory/physical-count/inv-not-real")
        self.assertEqual(status, 401)
        self.assertEqual(body["error"], "unauthorized")


if __name__ == "__main__":
    unittest.main()
