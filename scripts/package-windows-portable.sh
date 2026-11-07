#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

command -v npx >/dev/null 2>&1 || { echo "Erro: npx não encontrado." >&2; exit 1; }
VERSION="$(node -p "require('./package.json').version")"
PRODUCT_NAME="AutoCar Sistema Integrado"

if [[ ! -f backend/bin/autocar-backend.exe ]]; then
  echo "Backend Windows nativo ausente. Execute scripts/build-backend.ps1 em uma máquina Windows x64 antes do empacotamento." >&2
  exit 1
fi

npx electron-packager . "$PRODUCT_NAME" \
  --platform=win32 \
  --arch=x64 \
  --out=release \
  --overwrite \
  --asar.unpackDir=backend \
  --electron-version=22.3.27 \
  --app-version="$VERSION" \
  --prune=true \
  --ignore='^/(release|node_modules|scripts)(/|$)'

APP_DIR="$ROOT_DIR/release/AutoCar Sistema Integrado-win32-x64"
EXE="$APP_DIR/AutoCar Sistema Integrado.exe"
if [[ ! -f "$EXE" ]]; then
  echo "Erro: executável Windows não foi encontrado em $EXE" >&2
  exit 1
fi

echo
echo "Executável portátil Windows gerado:"
echo "$EXE"
echo
echo "Copie a pasta inteira para o Windows; não remova os arquivos ao lado do .exe."
