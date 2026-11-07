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
ARCHITECTURE="$(uname -m)"
case "$ARCHITECTURE" in
  aarch64|x86_64) ;;
  *) echo "Arquitetura Linux não validada para este build: $ARCHITECTURE" >&2; exit 1 ;;
esac
file backend/bin/autocar-backend | grep -q "$( [[ "$ARCHITECTURE" == aarch64 ]] && echo 'ARM aarch64' || echo 'x86-64' )" || { echo "O binário gerado não corresponde à arquitetura $ARCHITECTURE." >&2; exit 1; }
printf 'Backend compilado em %s\n' "$ROOT_DIR/backend/bin/autocar-backend"
