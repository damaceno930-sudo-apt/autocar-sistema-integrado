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
                    seller_id INTEGER, mechanic_id INTEGER, status TEXT NOT NULL DEFAULT 'completed', cancelled_at TEXT, cancel_reason TEXT, created_at TEXT
                );
                CREATE TABLE IF NOT EXISTS sale_items (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, sale_id TEXT NOT NULL, item_kind TEXT NOT NULL,
                    item_code TEXT, description TEXT NOT NULL, quantity REAL NOT NULL, unit_price REAL NOT NULL,
                    unit_cost REAL DEFAULT 0, total REAL NOT NULL, reversed_at TEXT,
                    FOREIGN KEY(sale_id) REFERENCES sales(id) ON DELETE CASCADE
                );
                CREATE TABLE IF NOT EXISTS finance_transactions (
                    id TEXT PRIMARY KEY, kind TEXT, category TEXT, description TEXT, amount REAL DEFAULT 0,
                    status TEXT, due_date TEXT, paid_date TEXT, sale_id TEXT, created_at TEXT
                );
                CREATE TABLE IF NOT EXISTS cash_registers (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, opened_by INTEGER NOT NULL, opened_at TEXT NOT NULL,
                    opening_balance REAL NOT NULL DEFAULT 0, closed_by INTEGER, closed_at TEXT,
                    closing_balance REAL, status TEXT NOT NULL DEFAULT 'open', notes TEXT
                );
                CREATE TABLE IF NOT EXISTS cash_movements (
                    id TEXT PRIMARY KEY, register_id INTEGER NOT NULL, kind TEXT NOT NULL,
                    description TEXT NOT NULL, amount REAL NOT NULL, payment_method TEXT,
                    reference_type TEXT, reference_id TEXT, created_by INTEGER NOT NULL, created_at TEXT NOT NULL,
                    FOREIGN KEY(register_id) REFERENCES cash_registers(id),
                    FOREIGN KEY(created_by) REFERENCES users(id)
                );
                CREATE TABLE IF NOT EXISTS accounts_receivable (
                    id TEXT PRIMARY KEY, origin TEXT, customer TEXT, client_id INTEGER, description TEXT NOT NULL,
                    amount REAL NOT NULL, due_date TEXT NOT NULL, payment_method TEXT, status TEXT NOT NULL DEFAULT 'pending',
                    paid_amount REAL DEFAULT 0, paid_at TEXT, sale_id TEXT, order_id TEXT, created_by INTEGER, created_at TEXT NOT NULL,
                    installment_number INTEGER DEFAULT 1, total_installments INTEGER DEFAULT 1
                );
                CREATE TABLE IF NOT EXISTS accounts_payable (
                    id TEXT PRIMARY KEY, supplier TEXT, supplier_id INTEGER, description TEXT NOT NULL,
                    amount REAL NOT NULL, due_date TEXT NOT NULL, payment_method TEXT, status TEXT NOT NULL DEFAULT 'pending',
                    paid_amount REAL DEFAULT 0, paid_at TEXT, created_by INTEGER, created_at TEXT NOT NULL, purchase_id TEXT
                );
                CREATE TABLE IF NOT EXISTS commissions (
                    id TEXT PRIMARY KEY, sale_id TEXT, seller_id INTEGER NOT NULL, base_amount REAL NOT NULL,
                    rate REAL NOT NULL DEFAULT 3, amount REAL NOT NULL, status TEXT NOT NULL DEFAULT 'pending',
                    paid_at TEXT, created_at TEXT NOT NULL
                );
                CREATE TABLE IF NOT EXISTS finance_categories (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE, kind TEXT NOT NULL,
                    active INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL
                );
                CREATE TABLE IF NOT EXISTS stock_purchases (
                    id TEXT PRIMARY KEY, document_number TEXT UNIQUE, supplier TEXT, total REAL NOT NULL,
                    due_date TEXT, payment_method TEXT, payable_id TEXT, created_by INTEGER NOT NULL, created_at TEXT NOT NULL
                );
                CREATE TABLE IF NOT EXISTS stock_movements (
                    id TEXT PRIMARY KEY, item_code TEXT NOT NULL, kind TEXT NOT NULL, quantity REAL NOT NULL,
                    previous_stock REAL NOT NULL, resulting_stock REAL NOT NULL, unit_cost REAL DEFAULT 0,
                    reason TEXT, reference_type TEXT, reference_id TEXT, created_by INTEGER NOT NULL, created_at TEXT NOT NULL,
                    FOREIGN KEY(created_by) REFERENCES users(id)
                );
                CREATE TABLE IF NOT EXISTS migrations (version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL);
            """)
            for column, definition in (("installment_number", "INTEGER DEFAULT 1"), ("total_installments", "INTEGER DEFAULT 1")):
                try:
                    self.conn.execute(f"ALTER TABLE accounts_receivable ADD COLUMN {column} {definition}")
                except sqlite3.OperationalError:
                    pass
            try:
                self.conn.execute("ALTER TABLE accounts_payable ADD COLUMN purchase_id TEXT")
            except sqlite3.OperationalError:
                pass
            for column, definition in (("status", "TEXT NOT NULL DEFAULT 'completed'"), ("cancelled_at", "TEXT"), ("cancel_reason", "TEXT")):
                try:
                    self.conn.execute(f"ALTER TABLE sales ADD COLUMN {column} {definition}")
                except sqlite3.OperationalError:
                    pass
            if not self.conn.execute("SELECT 1 FROM migrations WHERE version=1").fetchone():
                self.conn.execute("INSERT INTO migrations(version, applied_at) VALUES(1, ?)", (now_iso(),))
                self.seed()
            if not self.conn.execute("SELECT 1 FROM migrations WHERE version=2").fetchone():
                current = {row["key"]: json.loads(row["value"]) for row in self.conn.execute("SELECT key,value FROM app_state")}
                self.sync_relational(current)
                self.conn.execute("INSERT INTO migrations(version, applied_at) VALUES(2, ?)", (now_iso(),))
            if not self.conn.execute("SELECT 1 FROM migrations WHERE version=3").fetchone():
                self.conn.execute("INSERT INTO migrations(version, applied_at) VALUES(3, ?)", (now_iso(),))
            if not self.conn.execute("SELECT 1 FROM migrations WHERE version=4").fetchone():
                for name, kind in (("Venda", "income"), ("Serviços", "income"), ("Peças", "income"), ("Compras", "expense"), ("Despesas fixas", "expense"), ("Impostos", "expense"), ("Folha", "expense")):
                    self.conn.execute("INSERT OR IGNORE INTO finance_categories(name,kind,created_at) VALUES(?,?,?)", (name, kind, now_iso()))
                self.conn.execute("INSERT INTO migrations(version, applied_at) VALUES(4, ?)", (now_iso(),))
            if not self.conn.execute("SELECT 1 FROM migrations WHERE version=5").fetchone():
                self.conn.execute("INSERT INTO migrations(version, applied_at) VALUES(5, ?)", (now_iso(),))
            if not self.conn.execute("SELECT 1 FROM migrations WHERE version=6").fetchone():
                self.conn.execute("INSERT INTO migrations(version, applied_at) VALUES(6, ?)", (now_iso(),))
            if not self.conn.execute("SELECT 1 FROM migrations WHERE version=7").fetchone():
                self.conn.execute("INSERT INTO migrations(version, applied_at) VALUES(7, ?)", (now_iso(),))

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

    @staticmethod
    def row_dict(row):
        return dict(row) if row else None

    def finance_summary(self):
        register = self.conn.execute("SELECT * FROM cash_registers WHERE status='open' ORDER BY id DESC LIMIT 1").fetchone()
        register_data = self.row_dict(register)
        if register_data:
            movements = self.conn.execute("SELECT COALESCE(SUM(CASE WHEN kind IN ('entry','supply') THEN amount ELSE 0 END),0) AS entries, COALESCE(SUM(CASE WHEN kind IN ('withdrawal','bleed','expense') THEN amount ELSE 0 END),0) AS exits FROM cash_movements WHERE register_id=?", (register["id"],)).fetchone()
            register_data["current_balance"] = round(register["opening_balance"] + movements["entries"] - movements["exits"], 2)
        receivable = self.conn.execute("SELECT COALESCE(SUM(amount-paid_amount),0) AS total, COUNT(*) AS count FROM accounts_receivable WHERE status IN ('pending','partial','late')").fetchone()
        payable = self.conn.execute("SELECT COALESCE(SUM(amount-paid_amount),0) AS total, COUNT(*) AS count FROM accounts_payable WHERE status IN ('pending','partial','late')").fetchone()
        entries = self.conn.execute("SELECT COALESCE(SUM(amount),0) FROM cash_movements WHERE kind IN ('entry','supply') AND date(created_at)=date('now')").fetchone()[0]
        exits = self.conn.execute("SELECT COALESCE(SUM(amount),0) FROM cash_movements WHERE kind IN ('withdrawal','bleed','expense') AND date(created_at)=date('now')").fetchone()[0]
        return {"register": register_data, "receivable_total": round(receivable["total"], 2), "receivable_count": receivable["count"], "payable_total": round(payable["total"], 2), "payable_count": payable["count"], "today_entries": round(entries, 2), "today_exits": round(exits, 2), "today_result": round(entries - exits, 2)}

    def finance_report(self, start_date=None, end_date=None):
        today = datetime.now().date()
        start = start_date or today.replace(day=1).isoformat()
        end = end_date or today.isoformat()
        try:
            datetime.strptime(start, "%Y-%m-%d"); datetime.strptime(end, "%Y-%m-%d")
        except ValueError: raise ValueError("período inválido; use AAAA-MM-DD")
        if start > end: raise ValueError("a data inicial não pode ser posterior à data final")
        movements = [self.row_dict(row) for row in self.conn.execute("SELECT m.*, r.opened_at FROM cash_movements m JOIN cash_registers r ON r.id=m.register_id WHERE date(m.created_at) BETWEEN date(?) AND date(?) ORDER BY m.created_at", (start, end))]
        transactions = [self.row_dict(row) for row in self.conn.execute("SELECT * FROM finance_transactions WHERE status != 'cancelled' AND date(COALESCE(paid_date,created_at)) BETWEEN date(?) AND date(?) ORDER BY created_at", (start, end))]
        entries = round(sum(float(row["amount"]) for row in movements if row["kind"] in ("entry", "supply")), 2)
        exits = round(sum(float(row["amount"]) for row in movements if row["kind"] in ("withdrawal", "bleed", "expense")), 2)
        revenue = round(sum(float(row["amount"]) for row in transactions if row["kind"] == "income"), 2)
        expense = round(sum(float(row["amount"]) for row in transactions if row["kind"] == "expense"), 2)
        by_category = {}
        for row in transactions:
            key = (row["kind"], row["category"] or "Geral")
            by_category[key] = by_category.get(key, 0) + float(row["amount"])
        daily = {}
        for row in movements:
            day = str(row["created_at"])[:10]; bucket = daily.setdefault(day, {"date": day, "entries": 0, "exits": 0, "result": 0})
            if row["kind"] in ("entry", "supply"): bucket["entries"] += float(row["amount"])
            else: bucket["exits"] += float(row["amount"])
        for row in transactions:
            day = str(row["paid_date"] or row["created_at"])[:10]; bucket = daily.setdefault(day, {"date": day, "entries": 0, "exits": 0, "result": 0})
            bucket["revenue"] = bucket.get("revenue", 0) + (float(row["amount"]) if row["kind"] == "income" else 0)
            bucket["expense"] = bucket.get("expense", 0) + (float(row["amount"]) if row["kind"] == "expense" else 0)
        for bucket in daily.values():
            bucket.setdefault("revenue", 0); bucket.setdefault("expense", 0)
            for key in ("entries", "exits", "revenue", "expense"): bucket[key] = round(bucket[key], 2)
            bucket["result"] = round(bucket["entries"] - bucket["exits"], 2)
        pending = self.conn.execute("SELECT COALESCE(SUM(amount-paid_amount),0) AS total, COUNT(*) AS count FROM accounts_receivable WHERE status IN ('pending','partial','late') AND due_date BETWEEN ? AND ?", (start, end)).fetchone()
        pending_payable = self.conn.execute("SELECT COALESCE(SUM(amount-paid_amount),0) AS total, COUNT(*) AS count FROM accounts_payable WHERE status IN ('pending','partial','late') AND due_date BETWEEN ? AND ?", (start, end)).fetchone()
        return {"period": {"start": start, "end": end}, "cash": {"entries": entries, "exits": exits, "result": round(entries - exits, 2)}, "accrual": {"revenue": revenue, "expense": expense, "result": round(revenue - expense, 2)}, "categories": [{"kind": kind, "category": category, "amount": round(amount, 2)} for (kind, category), amount in sorted(by_category.items())], "daily": [daily[key] for key in sorted(daily)], "pending": {"receivable": {"total": round(pending["total"], 2), "count": pending["count"]}, "payable": {"total": round(pending_payable["total"], 2), "count": pending_payable["count"]}}, "transactions": transactions, "movements": movements}

    def finance_lists(self, limit=100):
        return {
            "transactions": [self.row_dict(row) for row in self.conn.execute("SELECT * FROM finance_transactions ORDER BY created_at DESC LIMIT ?", (limit,))],
            "receivables": [self.row_dict(row) for row in self.conn.execute("SELECT * FROM accounts_receivable ORDER BY due_date, created_at DESC LIMIT ?", (limit,))],
            "payables": [self.row_dict(row) for row in self.conn.execute("SELECT * FROM accounts_payable ORDER BY due_date, created_at DESC LIMIT ?", (limit,))],
            "movements": [self.row_dict(row) for row in self.conn.execute("SELECT m.*, r.opened_at FROM cash_movements m JOIN cash_registers r ON r.id=m.register_id ORDER BY m.created_at DESC LIMIT ?", (limit,))],
            "commissions": [self.row_dict(row) for row in self.conn.execute("SELECT c.*, u.name AS seller_name FROM commissions c LEFT JOIN users u ON u.id=c.seller_id ORDER BY c.created_at DESC LIMIT ?", (limit,))],
            "categories": [self.row_dict(row) for row in self.conn.execute("SELECT * FROM finance_categories WHERE active=1 ORDER BY kind,name")]
        }

    def stock_movements(self, limit=100):
        return [self.row_dict(row) for row in self.conn.execute("SELECT m.*, s.name AS item_name, s.unit FROM stock_movements m LEFT JOIN stock_items s ON s.code=m.item_code ORDER BY m.created_at DESC LIMIT ?", (limit,))]

    def record_stock_movement(self, code, kind, quantity, previous, resulting, cost, reason, reference_type, reference_id, actor_id, stamp):
        movement_id = f"mov-{secrets.token_hex(8)}"
        self.conn.execute("INSERT INTO stock_movements(id,item_code,kind,quantity,previous_stock,resulting_stock,unit_cost,reason,reference_type,reference_id,created_by,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)", (movement_id, code, kind, quantity, previous, resulting, cost or 0, reason, reference_type, reference_id, actor_id, stamp))
        return movement_id

    def stock_adjust(self, data, actor):
        code = str(data.get("code", "")).strip().upper()
        item = self.conn.execute("SELECT * FROM stock_items WHERE code=?", (code,)).fetchone()
        if not item: raise ValueError("item não encontrado")
        new_stock = float(data.get("newStock", -1))
        if new_stock < 0: raise ValueError("saldo inválido")
        previous = float(item["stock"] or 0); delta = round(new_stock - previous, 4)
        if abs(delta) < 0.0001: raise ValueError("o novo saldo é igual ao saldo atual")
        stamp = now_iso()
        with self.conn:
            self.conn.execute("UPDATE stock_items SET stock=? WHERE code=?", (new_stock, code))
            movement_id = self.record_stock_movement(code, "adjustment", delta, previous, new_stock, item["cost"], data.get("reason") or "Ajuste de inventário", "manual_adjustment", None, actor["id"], stamp)
            self.audit(actor["id"], "adjust", "stock_item", f"{code} • {previous} → {new_stock}")
        return self.row_dict(self.conn.execute("SELECT * FROM stock_movements WHERE id=?", (movement_id,)).fetchone())

    def finance_create_category(self, data, actor):
        name = str(data.get("name", "")).strip()
        kind = str(data.get("kind", "expense"))
        if not name or kind not in ("income", "expense"): raise ValueError("categoria inválida")
        with self.conn:
            cur = self.conn.execute("INSERT INTO finance_categories(name,kind,created_at) VALUES(?,?,?)", (name, kind, now_iso()))
            self.audit(actor["id"], "create", "finance_category", str(cur.lastrowid))
        return self.row_dict(self.conn.execute("SELECT * FROM finance_categories WHERE id=?", (cur.lastrowid,)).fetchone())

    def finance_create_transaction(self, data, actor):
        kind = str(data.get("kind", "expense"))
        amount = float(data.get("amount", 0) or 0)
        if kind not in ("income", "expense"): raise ValueError("tipo de lançamento inválido")
        if amount <= 0: raise ValueError("o valor deve ser maior que zero")
        transaction_id = data.get("id") or f"fin-{secrets.token_hex(8)}"
        stamp = now_iso()
        status = str(data.get("status", "pending"))
        with self.conn:
            self.conn.execute("INSERT INTO finance_transactions(id,kind,category,description,amount,status,due_date,paid_date,sale_id,created_at) VALUES(?,?,?,?,?,?,?,?,?,?)", (transaction_id, kind, data.get("category", "Geral"), data.get("description", "Lançamento manual"), amount, status, data.get("dueDate"), data.get("paidDate"), data.get("saleId"), stamp))
            self.audit(actor["id"], "create", "finance_transaction", transaction_id)
        return self.row_dict(self.conn.execute("SELECT * FROM finance_transactions WHERE id=?", (transaction_id,)).fetchone())

    def finance_create_account(self, table, data, actor):
        amount = float(data.get("amount", 0) or 0)
        if amount <= 0: raise ValueError("o valor deve ser maior que zero")
        if not data.get("description") or not data.get("dueDate"): raise ValueError("descrição e vencimento são obrigatórios")
        account_id = data.get("id") or f"{table[:3]}-{secrets.token_hex(8)}"
        stamp = now_iso()
        if table == "accounts_receivable":
            values = (account_id, data.get("origin", "Manual"), data.get("customer"), data.get("clientId"), data["description"], amount, data["dueDate"], data.get("paymentMethod"), data.get("status", "pending"), 0, None, data.get("saleId"), data.get("orderId"), actor["id"], stamp)
            sql = "INSERT INTO accounts_receivable(id,origin,customer,client_id,description,amount,due_date,payment_method,status,paid_amount,paid_at,sale_id,order_id,created_by,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
        else:
            values = (account_id, data.get("supplier", "Fornecedor não informado"), data.get("supplierId"), data["description"], amount, data["dueDate"], data.get("paymentMethod"), data.get("status", "pending"), 0, None, actor["id"], stamp)
            sql = "INSERT INTO accounts_payable(id,supplier,supplier_id,description,amount,due_date,payment_method,status,paid_amount,paid_at,created_by,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)"
        with self.conn:
            self.conn.execute(sql, values)
            self.audit(actor["id"], "create", table, account_id)
        return self.row_dict(self.conn.execute(f"SELECT * FROM {table} WHERE id=?", (account_id,)).fetchone())

    def stock_purchase(self, data, actor):
        items = data.get("items") or []
        supplier = str(data.get("supplier", "Fornecedor não informado")).strip()
        document = str(data.get("documentNumber", "")).strip() or None
        if not items: raise ValueError("a compra precisa conter pelo menos um item")
        if document and self.conn.execute("SELECT 1 FROM stock_purchases WHERE document_number=?", (document,)).fetchone(): raise ValueError(f"o documento {document} já foi importado")
        calculated_total = round(sum(float(item.get("quantity", 0) or 0) * float(item.get("unitCost", 0) or 0) for item in items), 2)
        invoice_total = float(data.get("invoiceTotal", 0) or 0)
        total = round(invoice_total if invoice_total > 0 else calculated_total, 2)
        if total <= 0: raise ValueError("o total da compra deve ser maior que zero")
        purchase_id = f"purchase-{secrets.token_hex(8)}"
        payable_id = f"pay-{purchase_id}"
        stamp = now_iso()
        due_date = data.get("dueDate") or stamp[:10]
        payment_method = data.get("paymentMethod") or "Boleto"
        with self.conn:
            for item in items:
                code = str(item.get("code", "")).strip().upper()
                name = str(item.get("name", "")).strip()
                quantity = float(item.get("quantity", 0) or 0)
                unit_cost = float(item.get("unitCost", 0) or 0)
                if not code or not name or quantity <= 0 or unit_cost < 0: raise ValueError("item de compra inválido")
                existing = self.conn.execute("SELECT id FROM stock_items WHERE code=?", (code,)).fetchone()
                if existing:
                    previous_stock = float(self.conn.execute("SELECT stock FROM stock_items WHERE code=?", (code,)).fetchone()[0] or 0)
                    self.conn.execute("UPDATE stock_items SET stock=stock+?,cost=?,supplier=COALESCE(?,supplier),name=?,category=COALESCE(?,category),brand=COALESCE(?,brand),unit=COALESCE(?,unit),price=COALESCE(?,price) WHERE code=?", (quantity, unit_cost, supplier, name, item.get("category"), item.get("brand"), item.get("unit"), item.get("price"), code))
                else:
                    previous_stock = 0
                    self.conn.execute("INSERT INTO stock_items(name,code,category,brand,stock,min_stock,max_stock,unit,price,cost,location,supplier,photo) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)", (name, code, item.get("category", "Importados"), item.get("brand", "Não informada"), quantity, item.get("min", 0), item.get("max", quantity), item.get("unit", "un."), item.get("price", unit_cost), unit_cost, item.get("location", "Entrada de compra"), supplier, item.get("photo")))
                self.record_stock_movement(code, "entry", quantity, previous_stock, previous_stock + quantity, unit_cost, f"Entrada de compra • {supplier}", "purchase", purchase_id, actor["id"], stamp)
            self.conn.execute("INSERT INTO stock_purchases(id,document_number,supplier,total,due_date,payment_method,payable_id,created_by,created_at) VALUES(?,?,?,?,?,?,?,?,?)", (purchase_id, document, supplier, total, due_date, payment_method, payable_id, actor["id"], stamp))
            self.conn.execute("INSERT INTO accounts_payable(id,supplier,description,amount,due_date,payment_method,status,paid_amount,created_by,created_at,purchase_id) VALUES(?,?,?,?,?,?,?,?,?,?,?)", (payable_id, supplier, f"Compra de estoque{f' • NF {document}' if document else ''}", total, due_date, payment_method, "pending", 0, actor["id"], stamp, purchase_id))
            self.conn.execute("INSERT INTO finance_transactions(id,kind,category,description,amount,status,due_date,created_at) VALUES(?,?,?,?,?,?,?,?)", (f"fin-{purchase_id}", "expense", "Compras", f"Compra de estoque • {supplier}", total, "pending", due_date, stamp))
            self.audit(actor["id"], "create", "stock_purchase", purchase_id)
        return {"purchase": self.row_dict(self.conn.execute("SELECT * FROM stock_purchases WHERE id=?", (purchase_id,)).fetchone()), "payable": self.row_dict(self.conn.execute("SELECT * FROM accounts_payable WHERE id=?", (payable_id,)).fetchone())}

    def finance_record_sale(self, data, actor):
        total = float(data.get("total", 0) or 0)
        received = float(data.get("received", 0) or 0)
        if total <= 0: raise ValueError("total da venda inválido")
        sale_id = data.get("id") or f"sale-{secrets.token_hex(8)}"
        stamp = now_iso()
        commission_rate = float(data.get("commissionRate", 3) or 0)
        commission_amount = round(total * commission_rate / 100, 2)
        with self.conn:
            self.conn.execute("INSERT INTO sales(id,sale_type,client_id,total,discount,received,change_value,seller_id,mechanic_id,created_at) VALUES(?,?,?,?,?,?,?,?,?,?)", (sale_id, data.get("saleType", "direct"), data.get("clientId"), total, data.get("discount", 0), received, max(0, received - total), data.get("sellerId", actor["id"]), data.get("mechanicId"), stamp))
            for item in data.get("items", []):
                quantity = float(item.get("quantity", 0) or 0)
                unit_price = float(item.get("price", 0) or 0)
                discount = float(item.get("discount", 0) or 0)
                item_total = round(max(0, unit_price - discount) * quantity, 2)
                item_kind = str(item.get("kind", "service"))
                code = str(item.get("code", "")).strip().upper() or None
                unit_cost = 0
                if item_kind == "product":
                    stock = self.conn.execute("SELECT stock,cost FROM stock_items WHERE code=?", (code,)).fetchone()
                    if not stock: raise ValueError(f"produto {code} não encontrado no estoque")
                    if stock["stock"] < quantity: raise ValueError(f"estoque insuficiente para {code}")
                    unit_cost = stock["cost"] or 0
                    previous_stock = float(stock["stock"])
                    self.conn.execute("UPDATE stock_items SET stock=stock-? WHERE code=?", (quantity, code))
                    self.record_stock_movement(code, "exit", -quantity, previous_stock, previous_stock - quantity, unit_cost, "Saída por venda", "sale", sale_id, actor["id"], stamp)
                self.conn.execute("INSERT INTO sale_items(sale_id,item_kind,item_code,description,quantity,unit_price,unit_cost,total) VALUES(?,?,?,?,?,?,?,?)", (sale_id, item_kind, code, item.get("name", "Item da venda"), quantity, unit_price, unit_cost, item_total))
            status = "paid" if received >= total else "pending"
            self.conn.execute("INSERT INTO finance_transactions(id,kind,category,description,amount,status,paid_date,sale_id,created_at) VALUES(?,?,?,?,?,?,?,?,?)", (f"fin-{sale_id}", "income", "Venda", data.get("description", "Venda de produtos e serviços"), total, status, stamp if status == "paid" else None, sale_id, stamp))
            if received < total:
                installments = max(1, int(data.get("installments", 1) or 1))
                balance = round(total - received, 2)
                installment_amount = round(balance / installments, 2)
                for installment in range(1, installments + 1):
                    amount = installment_amount if installment < installments else round(balance - installment_amount * (installments - 1), 2)
                    due_date = data.get("dueDate", stamp[:10])
                    self.conn.execute("INSERT INTO accounts_receivable(id,origin,customer,client_id,description,amount,due_date,payment_method,status,sale_id,created_by,created_at,installment_number,total_installments) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)", (f"rec-{sale_id}-{installment}", "Venda", data.get("customer"), data.get("clientId"), f"{data.get('description', 'Venda parcelada')} • parcela {installment}/{installments}", amount, due_date, data.get("paymentMethod"), "pending", sale_id, actor["id"], stamp, installment, installments))
            if data.get("sellerId") and commission_amount > 0:
                self.conn.execute("INSERT INTO commissions(id,sale_id,seller_id,base_amount,rate,amount,status,created_at) VALUES(?,?,?,?,?,?,?,?)", (f"com-{sale_id}", sale_id, data["sellerId"], total, commission_rate, commission_amount, "pending", stamp))
            self.audit(actor["id"], "create", "sale", sale_id)
        return self.row_dict(self.conn.execute("SELECT * FROM sales WHERE id=?", (sale_id,)).fetchone())

    def finance_open_cash(self, data, actor):
        if self.conn.execute("SELECT 1 FROM cash_registers WHERE status='open'").fetchone(): raise ValueError("já existe um caixa aberto")
        balance = float(data.get("openingBalance", 0) or 0)
        if balance < 0: raise ValueError("saldo inicial inválido")
        with self.conn:
            cur = self.conn.execute("INSERT INTO cash_registers(opened_by,opened_at,opening_balance,status,notes) VALUES(?,?,?,?,?)", (actor["id"], now_iso(), balance, "open", data.get("notes")))
            register_id = cur.lastrowid
            self.audit(actor["id"], "open", "cash_register", str(register_id))
        return self.row_dict(self.conn.execute("SELECT * FROM cash_registers WHERE id=?", (register_id,)).fetchone())

    def finance_cash_movement(self, data, actor):
        register = self.conn.execute("SELECT * FROM cash_registers WHERE status='open' ORDER BY id DESC LIMIT 1").fetchone()
        if not register: raise ValueError("abra o caixa antes de registrar movimentações")
        amount = float(data.get("amount", 0) or 0)
        kind = str(data.get("kind", "entry"))
        if amount <= 0 or kind not in ("entry", "withdrawal", "bleed", "supply", "expense"): raise ValueError("movimentação inválida")
        movement_id = data.get("id") or f"mov-{secrets.token_hex(8)}"
        with self.conn:
            self.conn.execute("INSERT INTO cash_movements(id,register_id,kind,description,amount,payment_method,reference_type,reference_id,created_by,created_at) VALUES(?,?,?,?,?,?,?,?,?,?)", (movement_id, register["id"], kind, data.get("description", "Movimentação manual"), amount, data.get("paymentMethod"), data.get("referenceType"), data.get("referenceId"), actor["id"], now_iso()))
            self.audit(actor["id"], "create", "cash_movement", movement_id)
        return self.row_dict(self.conn.execute("SELECT * FROM cash_movements WHERE id=?", (movement_id,)).fetchone())

    def finance_close_cash(self, data, actor):
        register = self.conn.execute("SELECT * FROM cash_registers WHERE status='open' ORDER BY id DESC LIMIT 1").fetchone()
        if not register: raise ValueError("não existe caixa aberto")
        summary = self.finance_summary()
        closing = float(data.get("closingBalance", summary["register"]["current_balance"]) or 0)
        with self.conn:
            self.conn.execute("UPDATE cash_registers SET closed_by=?,closed_at=?,closing_balance=?,status='closed',notes=COALESCE(?,notes) WHERE id=?", (actor["id"], now_iso(), closing, data.get("notes"), register["id"]))
            self.audit(actor["id"], "close", "cash_register", str(register["id"]))
        return self.row_dict(self.conn.execute("SELECT * FROM cash_registers WHERE id=?", (register["id"],)).fetchone())

    def finance_settle(self, table, account_id, data, actor):
        row = self.conn.execute(f"SELECT * FROM {table} WHERE id=?", (account_id,)).fetchone()
        if not row: raise ValueError("conta não encontrada")
        amount = float(data.get("paidAmount", row["amount"]) or 0)
        if amount <= 0 or amount > row["amount"]: raise ValueError("valor de baixa inválido")
        register = self.conn.execute("SELECT * FROM cash_registers WHERE status='open' ORDER BY id DESC LIMIT 1").fetchone()
        if not register: raise ValueError("abra o caixa antes de baixar uma conta")
        status = "paid" if amount >= row["amount"] else "partial"
        with self.conn:
            self.conn.execute(f"UPDATE {table} SET paid_amount=?,paid_at=?,status=? WHERE id=?", (amount, now_iso(), status, account_id))
            movement_kind = "entry" if table == "accounts_receivable" else "expense"
            self.conn.execute("INSERT INTO cash_movements(id,register_id,kind,description,amount,payment_method,reference_type,reference_id,created_by,created_at) VALUES(?,?,?,?,?,?,?,?,?,?)", (f"mov-{secrets.token_hex(8)}", register["id"], movement_kind, f"Baixa {account_id} • {row['description']}", amount, data.get("paymentMethod") or row["payment_method"], table, account_id, actor["id"], now_iso()))
            self.audit(actor["id"], "settle", table, account_id)
        return self.row_dict(self.conn.execute(f"SELECT * FROM {table} WHERE id=?", (account_id,)).fetchone())

    def finance_cancel_transaction(self, transaction_id, actor):
        row = self.conn.execute("SELECT * FROM finance_transactions WHERE id=?", (transaction_id,)).fetchone()
        if not row: raise ValueError("lançamento não encontrado")
        if row["status"] == "cancelled": return self.row_dict(row)
        with self.conn:
            self.conn.execute("UPDATE finance_transactions SET status='cancelled' WHERE id=?", (transaction_id,))
            self.audit(actor["id"], "cancel", "finance_transaction", transaction_id)
        return self.row_dict(self.conn.execute("SELECT * FROM finance_transactions WHERE id=?", (transaction_id,)).fetchone())

    def cancel_sale(self, sale_id, data, actor):
        sale = self.conn.execute("SELECT * FROM sales WHERE id=?", (sale_id,)).fetchone()
        if not sale: raise ValueError("venda não encontrada")
        if sale["status"] == "cancelled": return {"sale": self.row_dict(sale), "refund": 0, "alreadyCancelled": True}
        receivables = self.conn.execute("SELECT * FROM accounts_receivable WHERE sale_id=? AND status != 'cancelled'", (sale_id,)).fetchall()
        receivable_paid = sum(float(row["paid_amount"] or 0) for row in receivables)
        refund = round(float(sale["received"] or 0) + receivable_paid, 2)
        register = self.conn.execute("SELECT * FROM cash_registers WHERE status='open' ORDER BY id DESC LIMIT 1").fetchone()
        if refund > 0 and not register: raise ValueError("abra o caixa para registrar o estorno financeiro")
        reason = str(data.get("reason", "Cancelamento solicitado"))[:500]
        stamp = now_iso()
        items = self.conn.execute("SELECT * FROM sale_items WHERE sale_id=? AND reversed_at IS NULL", (sale_id,)).fetchall()
        with self.conn:
            for item in items:
                if item["item_kind"] == "product" and item["item_code"]:
                    current_stock = float(self.conn.execute("SELECT stock FROM stock_items WHERE code=?", (item["item_code"],)).fetchone()[0] or 0)
                    self.conn.execute("UPDATE stock_items SET stock=stock+? WHERE code=?", (item["quantity"], item["item_code"]))
                    self.record_stock_movement(item["item_code"], "entry", item["quantity"], current_stock, current_stock + item["quantity"], item["unit_cost"], f"Estorno da venda {sale_id}", "sale_reversal", sale_id, actor["id"], stamp)
                self.conn.execute("UPDATE sale_items SET reversed_at=? WHERE id=?", (stamp, item["id"]))
            self.conn.execute("UPDATE sales SET status='cancelled',cancelled_at=?,cancel_reason=? WHERE id=?", (stamp, reason, sale_id))
            self.conn.execute("UPDATE finance_transactions SET status='cancelled' WHERE sale_id=?", (sale_id,))
            self.conn.execute("UPDATE accounts_receivable SET status='cancelled',paid_at=COALESCE(paid_at,?) WHERE sale_id=? AND status != 'cancelled'", (stamp, sale_id))
            self.conn.execute("UPDATE commissions SET status='cancelled' WHERE sale_id=? AND status != 'paid'", (sale_id,))
            if refund > 0:
                self.conn.execute("INSERT INTO cash_movements(id,register_id,kind,description,amount,payment_method,reference_type,reference_id,created_by,created_at) VALUES(?,?,?,?,?,?,?,?,?,?)", (f"mov-{secrets.token_hex(8)}", register["id"], "expense", f"Estorno da venda {sale_id}", refund, data.get("paymentMethod") or "Estorno", "sale_reversal", sale_id, actor["id"], stamp))
            self.audit(actor["id"], "cancel", "sale", f"{sale_id} • {reason} • estorno {refund:.2f}")
        return {"sale": self.row_dict(self.conn.execute("SELECT * FROM sales WHERE id=?", (sale_id,)).fetchone()), "refund": refund, "restoredItems": len(items)}

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
            self.conn.execute("DELETE FROM cash_movements")
            self.conn.execute("DELETE FROM cash_registers")
            self.conn.execute("DELETE FROM accounts_receivable")
            self.conn.execute("DELETE FROM accounts_payable")
            self.conn.execute("DELETE FROM commissions")
            self.conn.execute("DELETE FROM stock_purchases")
            self.conn.execute("DELETE FROM stock_movements")
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
            self.conn.execute("PRAGMA journal_mode = WAL")
            self.initialize()
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

    def require_finance(self):
        user = self.require_user()
        if user and not (user["admin"] or "finance" in user.get("permissions", [])):
            self.send_json(403, {"error": "forbidden", "message": "Seu usuário não possui acesso ao módulo financeiro."})
            return None
        return user

    def require_finance_or_sales(self):
        user = self.require_user()
        if user and not (user["admin"] or "finance" in user.get("permissions", []) or "sales" in user.get("permissions", [])):
            self.send_json(403, {"error": "forbidden", "message": "Seu usuário não possui permissão para registrar vendas."})
            return None
        return user

    def require_inventory(self):
        user = self.require_user()
        if user and not (user["admin"] or "inventory" in user.get("permissions", [])):
            self.send_json(403, {"error": "forbidden", "message": "Seu usuário não possui permissão para lançar entradas no estoque."})
            return None
        return user

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/health":
            self.send_json(200, {"ok": True, "app": APP_NAME, "database": str(DB_PATH), "schema": 7})
            return
        if parsed.path == "/api/state":
            user = self.require_user()
            if user: self.send_json(200, {"user": user, "state": DB.snapshot(user)})
            return
        if parsed.path == "/api/finance/summary":
            user = self.require_finance()
            if user: self.send_json(200, {"summary": DB.finance_summary(), **DB.finance_lists()})
            return
        if parsed.path == "/api/finance/report":
            user = self.require_finance()
            if user:
                try:
                    query = parse_qs(parsed.query)
                    self.send_json(200, DB.finance_report((query.get("startDate") or [None])[0], (query.get("endDate") or [None])[0]))
                except Exception as exc:
                    self.send_json(400, {"error": "bad_request", "message": str(exc)})
            return
        if parsed.path == "/api/inventory/movements":
            user = self.require_inventory()
            if user:
                query = parse_qs(parsed.query); limit = min(500, max(1, int((query.get("limit") or [100])[0])))
                self.send_json(200, {"items": DB.stock_movements(limit)})
            return
        if parsed.path == "/api/finance/transactions":
            user = self.require_finance()
            if user: self.send_json(200, {"items": DB.finance_lists()["transactions"]})
            return
        if parsed.path == "/api/finance/receivables":
            user = self.require_finance()
            if user: self.send_json(200, {"items": DB.finance_lists()["receivables"]})
            return
        if parsed.path == "/api/finance/payables":
            user = self.require_finance()
            if user: self.send_json(200, {"items": DB.finance_lists()["payables"]})
            return
        if parsed.path == "/api/finance/cash":
            user = self.require_finance()
            if user: self.send_json(200, {"summary": DB.finance_summary(), "items": DB.finance_lists()["movements"]})
            return
        if parsed.path == "/api/finance/commissions":
            user = self.require_finance()
            if user: self.send_json(200, {"items": DB.finance_lists()["commissions"]})
            return
        if parsed.path == "/api/finance/categories":
            user = self.require_finance()
            if user: self.send_json(200, {"items": DB.finance_lists()["categories"]})
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
            if parsed.path == "/api/finance/transactions":
                user = self.require_finance()
                if user: self.send_json(201, {"item": DB.finance_create_transaction(data, user), "summary": DB.finance_summary()})
                return
            if parsed.path.startswith("/api/finance/sales/") and parsed.path.endswith("/cancel"):
                user = self.require_finance()
                if user:
                    sale_id = parsed.path.rstrip("/").split("/")[-2]
                    self.send_json(200, {**DB.cancel_sale(sale_id, data, user), "summary": DB.finance_summary()})
                return
            if parsed.path == "/api/finance/sales":
                user = self.require_finance_or_sales()
                if user: self.send_json(201, {"item": DB.finance_record_sale(data, user), "summary": DB.finance_summary()})
                return
            if parsed.path == "/api/finance/categories":
                user = self.require_finance()
                if user: self.send_json(201, {"item": DB.finance_create_category(data, user), "categories": DB.finance_lists()["categories"]})
                return
            if parsed.path == "/api/inventory/purchase":
                user = self.require_inventory()
                if user: self.send_json(201, DB.stock_purchase(data, user))
                return
            if parsed.path == "/api/inventory/adjust":
                user = self.require_inventory()
                if user: self.send_json(200, {"item": DB.stock_adjust(data, user), "movements": DB.stock_movements()})
                return
            if parsed.path == "/api/finance/receivables":
                user = self.require_finance()
                if user: self.send_json(201, {"item": DB.finance_create_account("accounts_receivable", data, user), "summary": DB.finance_summary()})
                return
            if parsed.path == "/api/finance/payables":
                user = self.require_finance()
                if user: self.send_json(201, {"item": DB.finance_create_account("accounts_payable", data, user), "summary": DB.finance_summary()})
                return
            if parsed.path == "/api/finance/cash/open":
                user = self.require_finance()
                if user: self.send_json(201, {"item": DB.finance_open_cash(data, user), "summary": DB.finance_summary()})
                return
            if parsed.path == "/api/finance/cash/movement":
                user = self.require_finance()
                if user: self.send_json(201, {"item": DB.finance_cash_movement(data, user), "summary": DB.finance_summary()})
                return
            if parsed.path == "/api/finance/cash/close":
                user = self.require_finance()
                if user: self.send_json(200, {"item": DB.finance_close_cash(data, user), "summary": DB.finance_summary()})
                return
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
        if parsed.path.startswith("/api/finance/receivables/") or parsed.path.startswith("/api/finance/payables/"):
            user = self.require_finance()
            if not user: return
            try:
                data = json.loads(body_bytes(self).decode("utf-8"))
                parts = parsed.path.rstrip("/").split("/")
                table = "accounts_receivable" if parts[-2] == "receivables" else "accounts_payable"
                item = DB.finance_settle(table, parts[-1], data, user)
                self.send_json(200, {"item": item, "summary": DB.finance_summary()})
            except Exception as exc:
                self.send_json(400, {"error": "bad_request", "message": str(exc)})
            return
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


    def do_DELETE(self):
        parsed = urlparse(self.path)
        if parsed.path.startswith("/api/finance/transactions/"):
            user = self.require_finance()
            if not user: return
            try:
                transaction_id = parsed.path.rstrip("/").split("/")[-1]
                item = DB.finance_cancel_transaction(transaction_id, user)
                self.send_json(200, {"item": item, "summary": DB.finance_summary()})
            except Exception as exc:
                self.send_json(400, {"error": "bad_request", "message": str(exc)})
            return
        self.send_json(404, {"error": "not_found"})


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
