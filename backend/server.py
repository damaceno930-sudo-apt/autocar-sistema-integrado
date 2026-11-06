#!/usr/bin/env python3
"""Backend local do AutoCar Sistema Integrado.

Sem dependências externas: apenas biblioteca padrão do Python e SQLite.
O frontend Electron/HTML usa esta API somente em localhost.
"""
from __future__ import annotations

import base64
import hashlib
import json
import mimetypes
import os
import secrets
import shutil
import sqlite3
import tempfile
import threading
import time
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

APP_NAME = "AutoCar Sistema Integrado"
HOST = os.environ.get("AUTOCAR_HOST", "127.0.0.1")
PORT = int(os.environ.get("AUTOCAR_PORT", "8765"))
DATA_HOME = Path(os.environ.get("AUTOCAR_DATA_DIR", Path.home() / ".autocar-sistema"))
DB_PATH = Path(os.environ.get("AUTOCAR_DB", DATA_HOME / "autocar.db"))
BACKUP_DIR = DATA_HOME / "backups"
TOKENS: dict[str, int] = {}
LOCK = threading.RLock()

DEFAULT_UNITS = ["un.", "pc", "jogo", "par", "kit", "cx", "m", "cm", "mm", "ml", "l", "g", "kg", "rolo"]
DEFAULT_COMPANY = {
    "legalName": "Auto Service Prime Serviços Automotivos Ltda.",
    "tradeName": "Auto Service Prime",
    "document": "12.345.678/0001-90",
    "phone": "(11) 3333-9090",
    "email": "contato@autoserviceprime.local",
    "address": "Av. das Oficinas, 500 • Vila Mariana • São Paulo/SP",
    "city": "São Paulo",
    "state": "SP",
    "zip": "04100-000",
    "taxRegime": "Simples Nacional",
}
DEFAULT_STATE = {
    "company": DEFAULT_COMPANY,
    "clients": [
        {"id": 1, "type": "PF", "name": "Marcos Almeida", "cpf": "248.913.760-12", "email": "marcos.almeida@email.com", "phone": "(11) 99842-1200", "birth": "18/04/1987", "address": "Rua das Flores, 120 • São Paulo/SP", "vehicles": [{"id": 101, "plate": "RZD-4H81", "brand": "Toyota", "model": "Corolla XEi", "year": "2020", "color": "Prata", "vin": "9BRBD3HE5L4012345", "mileage": 68420}], "visits": 8, "last": "Hoje"},
        {"id": 2, "type": "PF", "name": "Camila Rocha", "cpf": "327.541.880-05", "email": "camila.rocha@email.com", "phone": "(11) 99102-3771", "birth": "02/09/1991", "address": "Av. Central, 845 • Santo André/SP", "vehicles": [{"id": 102, "plate": "GKA-9B62", "brand": "Honda", "model": "HR-V EXL", "year": "2022", "color": "Cinza", "vin": "93HRV3F58NY501234", "mileage": 39210}], "visits": 4, "last": "Hoje"},
    ],
    "orders": [
        {"id": "OS-0248", "customer": "Marcos Almeida", "plate": "RZD-4H81", "vehicle": "Toyota Corolla 2020", "service": "Revisão preventiva", "technician": "João Mendes", "status": "progress", "statusLabel": "Em serviço", "delivery": "Hoje, 16:30", "total": 1280.5},
        {"id": "OS-0247", "customer": "Camila Rocha", "plate": "GKA-9B62", "vehicle": "Honda HR-V 2022", "service": "Freios e suspensão", "technician": "Lucas Ferreira", "status": "waiting", "statusLabel": "Aguardando peça", "delivery": "Hoje, 18:00", "total": 845.0},
    ],
    "inventory": [
        {"name": "Óleo 5W30 sintético", "code": "LUB-5W30-1L", "category": "Lubrificantes", "brand": "LubriMax", "stock": 4, "min": 10, "max": 40, "unit": "un.", "price": 42.9, "cost": 28.5, "location": "Prateleira A1", "supplier": "LubriMax"},
        {"name": "Pastilha de freio dianteira", "code": "FR-DI-482", "category": "Freios", "brand": "AutoParts", "stock": 2, "min": 6, "max": 20, "unit": "jogo", "price": 189.9, "cost": 125.0, "location": "Gaveta B3", "supplier": "AutoParts Brasil"},
    ],
    "services": [
        {"id": "svc-1", "kind": "service", "name": "Revisão preventiva", "code": "SRV-001", "category": "Serviço", "price": 480, "duration": "2h"},
        {"id": "svc-2", "kind": "service", "name": "Troca de óleo e filtros", "code": "SRV-002", "category": "Serviço", "price": 249, "duration": "1h"},
        {"id": "svc-3", "kind": "service", "name": "Freios e suspensão", "code": "SRV-003", "category": "Serviço", "price": 320, "duration": "3h"},
    ],
    "units": DEFAULT_UNITS,
    "suppliers": [{"id": 1, "name": "AutoParts Brasil", "document": "45.210.908/0001-20", "phone": "(11) 3322-1190", "category": "Peças"}],
    "sales": [],
    "financeEntries": [],
}


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def password_hash(password: str, salt: bytes | None = None) -> tuple[str, str]:
    salt = salt or secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 240_000)
    return base64.b64encode(salt).decode(), base64.b64encode(digest).decode()


def password_ok(password: str, salt_text: str, digest_text: str) -> bool:
    salt = base64.b64decode(salt_text.encode())
    _, digest = password_hash(password, salt)
    return secrets.compare_digest(digest, digest_text)


def json_text(value) -> str:
    return json.dumps(value, ensure_ascii=False, separators=(",", ":"))


class Database:
    def __init__(self, path: Path):
        DATA_HOME.mkdir(parents=True, exist_ok=True)
        BACKUP_DIR.mkdir(parents=True, exist_ok=True)
        self.path = path
        self.conn = sqlite3.connect(path, check_same_thread=False)
        self.conn.row_factory = sqlite3.Row
        self.conn.execute("PRAGMA foreign_keys = ON")
        self.conn.execute("PRAGMA journal_mode = WAL")
        self.initialize()

    def initialize(self):
        with self.conn:
            self.conn.executescript("""
                CREATE TABLE IF NOT EXISTS app_state (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TEXT NOT NULL);
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY, name TEXT NOT NULL, login TEXT NOT NULL UNIQUE,
                    password_salt TEXT NOT NULL, password_hash TEXT NOT NULL, role TEXT NOT NULL,
                    admin INTEGER NOT NULL DEFAULT 0, is_mechanic INTEGER NOT NULL DEFAULT 0,
                    permissions_json TEXT NOT NULL DEFAULT '[]', created_at TEXT NOT NULL, updated_at TEXT NOT NULL
                );
                CREATE TABLE IF NOT EXISTS audit_logs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, action TEXT NOT NULL,
                    entity TEXT, detail TEXT, created_at TEXT NOT NULL,
                    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
                );
                CREATE TABLE IF NOT EXISTS clients (
                    id INTEGER PRIMARY KEY, type TEXT, name TEXT NOT NULL, cpf TEXT, email TEXT,
                    phone TEXT, birth TEXT, address TEXT, visits INTEGER DEFAULT 0, last_visit TEXT
                );
                CREATE TABLE IF NOT EXISTS vehicles (
                    id INTEGER PRIMARY KEY, client_id INTEGER NOT NULL, plate TEXT NOT NULL UNIQUE,
                    brand TEXT, model TEXT, year TEXT, color TEXT, vin TEXT, mileage REAL DEFAULT 0,
                    FOREIGN KEY(client_id) REFERENCES clients(id) ON DELETE CASCADE
                );
                CREATE TABLE IF NOT EXISTS stock_items (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, code TEXT NOT NULL UNIQUE,
                    category TEXT, brand TEXT, stock REAL DEFAULT 0, min_stock REAL DEFAULT 0,
                    max_stock REAL DEFAULT 0, unit TEXT, price REAL DEFAULT 0, cost REAL DEFAULT 0,
                    location TEXT, supplier TEXT, photo TEXT
                );
                CREATE TABLE IF NOT EXISTS service_catalog (
                    id TEXT PRIMARY KEY, kind TEXT, name TEXT NOT NULL, code TEXT UNIQUE,
                    category TEXT, price REAL DEFAULT 0, duration TEXT, description TEXT
                );
                CREATE TABLE IF NOT EXISTS service_orders (
                    id TEXT PRIMARY KEY, customer TEXT, client_id INTEGER, plate TEXT, vehicle TEXT,
                    service TEXT, technician TEXT, mechanic_id INTEGER, status TEXT, status_label TEXT,
                    delivery TEXT, total REAL DEFAULT 0, created_at TEXT
                );
                CREATE TABLE IF NOT EXISTS suppliers (
                    id INTEGER PRIMARY KEY, name TEXT NOT NULL, document TEXT, phone TEXT, category TEXT
                );
                CREATE TABLE IF NOT EXISTS sales (
                    id TEXT PRIMARY KEY, sale_type TEXT, client_id INTEGER, total REAL DEFAULT 0,
                    discount REAL DEFAULT 0, received REAL DEFAULT 0, change_value REAL DEFAULT 0,
                    seller_id INTEGER, mechanic_id INTEGER, created_at TEXT
                );
                CREATE TABLE IF NOT EXISTS finance_transactions (
                    id TEXT PRIMARY KEY, kind TEXT, category TEXT, description TEXT, amount REAL DEFAULT 0,
                    status TEXT, due_date TEXT, paid_date TEXT, sale_id TEXT, created_at TEXT
                );
                CREATE TABLE IF NOT EXISTS migrations (version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL);
            """)
            if not self.conn.execute("SELECT 1 FROM migrations WHERE version=1").fetchone():
                self.conn.execute("INSERT INTO migrations(version, applied_at) VALUES(1, ?)", (now_iso(),))
                self.seed()
            if not self.conn.execute("SELECT 1 FROM migrations WHERE version=2").fetchone():
                current = {row["key"]: json.loads(row["value"]) for row in self.conn.execute("SELECT key,value FROM app_state")}
                self.sync_relational(current)
                self.conn.execute("INSERT INTO migrations(version, applied_at) VALUES(2, ?)", (now_iso(),))

    def seed(self):
        stamp = now_iso()
        users = [
            (1, "Rafael Costa", "admin@autocar.local", "admin123", "Administrador", 1, 0, ["all"]),
            (2, "João Mendes", "joao.mendes", "oficina123", "Técnico", 0, 1, ["dashboard", "orders", "customers", "diagnostics"]),
            (3, "Camila Prado", "camila.prado", "oficina123", "Recepção", 0, 0, ["dashboard", "orders", "customers", "sales", "schedule"]),
        ]
        for user_id, name, login, password, role, admin, mechanic, permissions in users:
            salt, digest = password_hash(password)
            self.conn.execute("INSERT INTO users(id,name,login,password_salt,password_hash,role,admin,is_mechanic,permissions_json,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)", (user_id, name, login, salt, digest, role, admin, mechanic, json_text(permissions), stamp, stamp))
        for key, value in DEFAULT_STATE.items():
            self.conn.execute("INSERT OR REPLACE INTO app_state(key,value,updated_at) VALUES(?,?,?)", (key, json_text(value), stamp))
        self.sync_relational(DEFAULT_STATE, stamp)

    def user(self, row) -> dict:
        return {"id": row["id"], "name": row["name"], "login": row["login"], "role": row["role"], "admin": bool(row["admin"]), "isMechanic": bool(row["is_mechanic"]), "permissions": json.loads(row["permissions_json"] or "[]")}

    def authenticate(self, login: str, password: str):
        row = self.conn.execute("SELECT * FROM users WHERE lower(login)=lower(?)", (login.strip(),)).fetchone()
        if not row or not password_ok(password, row["password_salt"], row["password_hash"]):
            return None
        user = self.user(row)
        self.audit(user["id"], "login", "auth", user["login"])
        return user

    def audit(self, user_id, action: str, entity: str | None = None, detail: str | None = None):
        with self.conn:
            self.conn.execute("INSERT INTO audit_logs(user_id,action,entity,detail,created_at) VALUES(?,?,?,?,?)", (user_id, action, entity, detail, now_iso()))

    def all_users(self):
        return [self.user(row) for row in self.conn.execute("SELECT * FROM users ORDER BY id")]

    def snapshot(self, current_user=None) -> dict:
        result = {row["key"]: json.loads(row["value"]) for row in self.conn.execute("SELECT key,value FROM app_state")}
        result["users"] = self.all_users()
        if current_user:
            result["currentUser"] = current_user
        return result

    def sync_relational(self, snapshot: dict, stamp: str | None = None):
        stamp = stamp or now_iso()
        self.conn.executescript("""
            DELETE FROM vehicles;
            DELETE FROM clients;
            DELETE FROM stock_items;
            DELETE FROM service_catalog;
            DELETE FROM service_orders;
            DELETE FROM suppliers;
            DELETE FROM sales;
            DELETE FROM finance_transactions;
        """)
        for client in snapshot.get("clients", []):
            client_id = client.get("id")
            if client_id is None: continue
            self.conn.execute("INSERT OR REPLACE INTO clients(id,type,name,cpf,email,phone,birth,address,visits,last_visit) VALUES(?,?,?,?,?,?,?,?,?,?)", (client_id, client.get("type"), client.get("name", ""), client.get("cpf"), client.get("email"), client.get("phone"), client.get("birth"), client.get("address"), client.get("visits", 0), client.get("last")))
            for vehicle in client.get("vehicles", []):
                if vehicle.get("id") is None: continue
                self.conn.execute("INSERT OR REPLACE INTO vehicles(id,client_id,plate,brand,model,year,color,vin,mileage) VALUES(?,?,?,?,?,?,?,?,?)", (vehicle["id"], client_id, vehicle.get("plate", ""), vehicle.get("brand"), vehicle.get("model"), vehicle.get("year"), vehicle.get("color"), vehicle.get("vin"), vehicle.get("mileage", 0)))
        for item in snapshot.get("inventory", []):
            self.conn.execute("INSERT OR REPLACE INTO stock_items(name,code,category,brand,stock,min_stock,max_stock,unit,price,cost,location,supplier,photo) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)", (item.get("name", ""), item.get("code", ""), item.get("category"), item.get("brand"), item.get("stock", 0), item.get("min", 0), item.get("max", 0), item.get("unit"), item.get("price", 0), item.get("cost", 0), item.get("location"), item.get("supplier"), item.get("photo")))
        for service in snapshot.get("services", []):
            self.conn.execute("INSERT OR REPLACE INTO service_catalog(id,kind,name,code,category,price,duration,description) VALUES(?,?,?,?,?,?,?,?)", (service.get("id", secrets.token_hex(8)), service.get("kind", "service"), service.get("name", ""), service.get("code"), service.get("category"), service.get("price", 0), service.get("duration"), service.get("description")))
        for order in snapshot.get("orders", []):
            self.conn.execute("INSERT OR REPLACE INTO service_orders(id,customer,client_id,plate,vehicle,service,technician,mechanic_id,status,status_label,delivery,total,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)", (order.get("id"), order.get("customer"), order.get("clientId"), order.get("plate"), order.get("vehicle"), order.get("service"), order.get("technician"), order.get("mechanicId"), order.get("status"), order.get("statusLabel"), order.get("delivery"), order.get("total", 0), order.get("createdAt", stamp)))
        for supplier in snapshot.get("suppliers", []):
            if supplier.get("id") is None: continue
            self.conn.execute("INSERT OR REPLACE INTO suppliers(id,name,document,phone,category) VALUES(?,?,?,?,?)", (supplier["id"], supplier.get("name", ""), supplier.get("document"), supplier.get("phone"), supplier.get("category")))
        for sale in snapshot.get("sales", []):
            self.conn.execute("INSERT OR REPLACE INTO sales(id,sale_type,client_id,total,discount,received,change_value,seller_id,mechanic_id,created_at) VALUES(?,?,?,?,?,?,?,?,?,?)", (sale.get("id", secrets.token_hex(8)), sale.get("saleType"), sale.get("clientId"), sale.get("total", 0), sale.get("discount", 0), sale.get("received", 0), sale.get("change", 0), sale.get("sellerId"), sale.get("mechanicId"), sale.get("createdAt", stamp)))
        for entry in snapshot.get("financeEntries", []):
            self.conn.execute("INSERT OR REPLACE INTO finance_transactions(id,kind,category,description,amount,status,due_date,paid_date,sale_id,created_at) VALUES(?,?,?,?,?,?,?,?,?,?)", (entry.get("id", secrets.token_hex(8)), entry.get("kind"), entry.get("category"), entry.get("description"), entry.get("amount", 0), entry.get("status"), entry.get("dueDate"), entry.get("paidDate"), entry.get("saleId"), entry.get("createdAt", stamp)))

    def save_snapshot(self, snapshot: dict, actor: dict | None):
        allowed = ("company", "clients", "orders", "inventory", "services", "units", "suppliers", "sales", "financeEntries")
        stamp = now_iso()
        with self.conn:
            for key in allowed:
                if key in snapshot:
                    self.conn.execute("INSERT OR REPLACE INTO app_state(key,value,updated_at) VALUES(?,?,?)", (key, json_text(snapshot[key]), stamp))
            self.sync_relational(snapshot, stamp)
            if actor and actor.get("admin") and isinstance(snapshot.get("users"), list):
                for item in snapshot["users"]:
                    existing = self.conn.execute("SELECT * FROM users WHERE id=?", (item.get("id"),)).fetchone()
                    if existing:
                        self.conn.execute("UPDATE users SET name=?, role=?, admin=?, is_mechanic=?, permissions_json=?, updated_at=? WHERE id=?", (item.get("name", existing["name"]), item.get("role", existing["role"]), int(bool(item.get("admin"))), int(bool(item.get("isMechanic"))), json_text(item.get("permissions", [])), stamp, item.get("id")))
                    elif item.get("login"):
                        salt, digest = password_hash(item.get("password") or secrets.token_urlsafe(12))
                        self.conn.execute("INSERT OR IGNORE INTO users(id,name,login,password_salt,password_hash,role,admin,is_mechanic,permissions_json,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)", (item.get("id"), item.get("name", "Usuário"), item["login"], salt, digest, item.get("role", "Usuário"), int(bool(item.get("admin"))), int(bool(item.get("isMechanic"))), json_text(item.get("permissions", [])), stamp, stamp))
            self.audit(actor.get("id") if actor else None, "save_state", "snapshot", "estado operacional atualizado")

    def clear_data(self, admin_id: int):
        stamp = now_iso()
        with self.conn:
            self.conn.execute("DELETE FROM app_state")
            for key, value in DEFAULT_STATE.items():
                empty = [] if key in ("clients", "orders", "inventory", "services", "suppliers", "sales", "financeEntries") else value
                if key == "units": empty = DEFAULT_UNITS
                if key == "company": empty = {field: "" for field in DEFAULT_COMPANY}
                self.conn.execute("INSERT INTO app_state(key,value,updated_at) VALUES(?,?,?)", (key, json_text(empty), stamp))
            self.sync_relational({"clients": [], "orders": [], "inventory": [], "services": [], "suppliers": []}, stamp)
            self.conn.execute("DELETE FROM sales")
            self.conn.execute("DELETE FROM finance_transactions")
            self.conn.execute("DELETE FROM users WHERE id != ?", (admin_id,))
            self.audit(admin_id, "clear_data", "system", "limpeza completa mantendo administrador")

    def export_json(self, user):
        return json_text(self.snapshot(user)).encode("utf-8")

    def backup_sqlite(self) -> bytes:
        with tempfile.NamedTemporaryFile(suffix=".db", delete=False) as tmp:
            temp_path = Path(tmp.name)
        try:
            target = sqlite3.connect(temp_path)
            with target:
                self.conn.backup(target)
            target.close()
            return temp_path.read_bytes()
        finally:
            temp_path.unlink(missing_ok=True)

    def import_sqlite(self, payload: bytes, actor: dict):
        if not payload.startswith(b"SQLite format 3"):
            raise ValueError("arquivo SQLite inválido")
        with tempfile.NamedTemporaryFile(suffix=".db", delete=False) as tmp:
            tmp.write(payload)
            incoming = Path(tmp.name)
        try:
            check = sqlite3.connect(incoming)
            ok = check.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='app_state'").fetchone()
            check.close()
            if not ok:
                raise ValueError("banco incompatível: tabela app_state ausente")
            backup = self.path.with_suffix(".before-import.db")
            self.conn.close()
            shutil.copy2(self.path, backup)
            shutil.copy2(incoming, self.path)
            self.conn = sqlite3.connect(self.path, check_same_thread=False)
            self.conn.row_factory = sqlite3.Row
            self.conn.execute("PRAGMA foreign_keys = ON")
            if self.conn.execute("SELECT 1 FROM users WHERE id=?", (actor["id"],)).fetchone():
                self.audit(actor["id"], "import_sqlite", "database", incoming.name)
        finally:
            incoming.unlink(missing_ok=True)


DB = Database(DB_PATH)


def body_bytes(handler: BaseHTTPRequestHandler) -> bytes:
    length = int(handler.headers.get("Content-Length", "0"))
    return handler.rfile.read(length)


class Handler(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"
    server_version = "AutoCarBackend/1.0"

    def log_message(self, fmt, *args):
        if os.environ.get("AUTOCAR_QUIET") != "1":
            print(f"[{datetime.now().isoformat(timespec='seconds')}] {fmt % args}")

    def send_payload(self, status: int, payload: bytes, content_type: str = "application/json; charset=utf-8", filename: str | None = None):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(payload)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("Access-Control-Allow-Origin", self.headers.get("Origin", "*"))
        self.send_header("Access-Control-Allow-Headers", "Content-Type, X-AutoCar-Token")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS")
        if filename:
            self.send_header("Content-Disposition", f'attachment; filename="{filename}"')
        self.end_headers()
        self.wfile.write(payload)

    def send_json(self, status: int, data):
        self.send_payload(status, json_text(data).encode("utf-8"))

    def do_OPTIONS(self):
        self.send_payload(204, b"")

    def current_user(self):
        token = self.headers.get("X-AutoCar-Token", "")
        user_id = TOKENS.get(token)
        if not user_id:
            return None
        row = DB.conn.execute("SELECT * FROM users WHERE id=?", (user_id,)).fetchone()
        return DB.user(row) if row else None

    def require_user(self):
        user = self.current_user()
        if not user:
            self.send_json(401, {"error": "unauthorized", "message": "Sessão inválida ou expirada."})
        return user

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/health":
            self.send_json(200, {"ok": True, "app": APP_NAME, "database": str(DB_PATH), "schema": 1})
            return
        if parsed.path == "/api/state":
            user = self.require_user()
            if user: self.send_json(200, {"user": user, "state": DB.snapshot(user)})
            return
        if parsed.path == "/api/backup/sqlite":
            user = self.require_user()
            if user and user["admin"]:
                self.send_payload(200, DB.backup_sqlite(), "application/vnd.sqlite3", "autocar-backup.db")
            elif user: self.send_json(403, {"error": "forbidden"})
            return
        if parsed.path == "/api/backup/json":
            user = self.require_user()
            if user and user["admin"]:
                self.send_payload(200, DB.export_json(user), "application/json; charset=utf-8", "autocar-backup.json")
            elif user: self.send_json(403, {"error": "forbidden"})
            return
        self.send_json(404, {"error": "not_found"})

    def do_POST(self):
        parsed = urlparse(self.path)
        try:
            payload = body_bytes(self)
            is_sqlite = self.headers.get("Content-Type", "").startswith("application/vnd.sqlite3") or payload.startswith(b"SQLite format 3")
            data = {} if is_sqlite else (json.loads(payload.decode("utf-8")) if payload else {})
            if parsed.path == "/api/auth/login":
                user = DB.authenticate(str(data.get("login", "")), str(data.get("password", "")))
                if not user:
                    self.send_json(401, {"error": "invalid_credentials", "message": "Login ou senha inválidos."})
                    return
                token = secrets.token_urlsafe(32)
                TOKENS[token] = user["id"]
                self.send_json(200, {"token": token, "user": user, "state": DB.snapshot(user)})
                return
            if parsed.path == "/api/auth/logout":
                token = self.headers.get("X-AutoCar-Token", "")
                TOKENS.pop(token, None)
                self.send_json(200, {"ok": True})
                return
            user = self.require_user()
            if not user: return
            if parsed.path == "/api/admin/clear":
                if not user["admin"]: self.send_json(403, {"error": "forbidden"}); return
                DB.clear_data(user["id"])
                self.send_json(200, {"ok": True, "user": DB.snapshot(user).get("users", [user])[0], "state": DB.snapshot(user)})
                return
            if parsed.path == "/api/backup/import":
                if not user["admin"]: self.send_json(403, {"error": "forbidden"}); return
                if self.headers.get("Content-Type", "").startswith("application/vnd.sqlite3") or payload.startswith(b"SQLite format 3"):
                    DB.import_sqlite(payload, user)
                else:
                    DB.save_snapshot(data, user)
                self.send_json(200, {"ok": True, "state": DB.snapshot(user)})
                return
            self.send_json(404, {"error": "not_found"})
        except Exception as exc:
            self.send_json(400, {"error": "bad_request", "message": str(exc)})

    def do_PUT(self):
        parsed = urlparse(self.path)
        if parsed.path != "/api/state":
            self.send_json(404, {"error": "not_found"})
            return
        user = self.require_user()
        if not user: return
        try:
            data = json.loads(body_bytes(self).decode("utf-8"))
            DB.save_snapshot(data, user)
            self.send_json(200, {"ok": True, "state": DB.snapshot(user)})
        except Exception as exc:
            self.send_json(400, {"error": "bad_request", "message": str(exc)})


def run():
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"{APP_NAME} backend ativo em http://{HOST}:{PORT}")
    print(f"SQLite: {DB_PATH}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
        DB.conn.close()


if __name__ == "__main__":
    run()
