#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if ! command -v pyinstaller >/dev/null 2>&1; then
  echo "PyInstaller não encontrado. Instale-o somente na máquina de empacotamento: python3 -m pip install pyinstaller" >&2
  exit 1
fi

rm -rf build/backend dist/backend
pyinstaller --noconfirm --clean --onefile \
  --name autocar-backend \
  --distpath dist/backend \
  --workpath build/backend \
  backend/server.py

mkdir -p backend/bin
cp "dist/backend/autocar-backend" backend/bin/autocar-backend
printf 'Backend compilado em %s\n' "$ROOT_DIR/backend/bin/autocar-backend"
