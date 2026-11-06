#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

command -v node >/dev/null 2>&1 || { echo "Erro: Node.js não encontrado." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "Erro: npm não encontrado." >&2; exit 1; }

if [[ ! -d node_modules ]]; then
  echo "Instalando dependências de empacotamento..."
  npm install
else
  echo "Dependências já instaladas; reutilizando node_modules."
fi

rm -rf release
npm run package:linux

echo
echo "Pacotes Linux gerados em: $ROOT_DIR/release"
find "$ROOT_DIR/release" -maxdepth 1 -type f \( -name '*.deb' -o -name '*.AppImage' \) -print
