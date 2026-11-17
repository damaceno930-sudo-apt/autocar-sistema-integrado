#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

command -v npx >/dev/null 2>&1 || { echo "Erro: npx não encontrado." >&2; exit 1; }
command -v dpkg-deb >/dev/null 2>&1 || { echo "Erro: dpkg-deb não encontrado para gerar o .deb." >&2; exit 1; }

# Empacota diretamente com o runtime Electron. O .deb é montado abaixo com
# dpkg-deb, evitando fpm e o gerador de atualização do electron-builder.
VERSION="$(node -p "require('./package.json').version")"
PRODUCT_NAME="AutoCar Sistema Integrado"
ARCH="$(dpkg --print-architecture)"
case "$ARCH" in
  amd64) ELECTRON_ARCH="x64" ;;
  arm64) ELECTRON_ARCH="arm64" ;;
  i386) ELECTRON_ARCH="ia32" ;;
  armhf) ELECTRON_ARCH="armv7l" ;;
  *) echo "Arquitetura Debian não suportada: $ARCH" >&2; exit 1 ;;
esac
npx electron-packager . "$PRODUCT_NAME" --platform=linux --arch="$ELECTRON_ARCH" --out=release --overwrite --asar.unpackDir=backend --electron-version=22.3.27 --app-version="$VERSION" --prune=true --ignore='^/(release|node_modules|scripts)(/|$)'

APP_DIR="$ROOT_DIR/release/AutoCar Sistema Integrado-linux-$ELECTRON_ARCH"
if [[ -z "$APP_DIR" || ! -d "$APP_DIR" ]]; then
  echo "Erro: diretório Linux empacotado não foi encontrado." >&2
  exit 1
fi

PACKAGE_NAME="autocar-sistema-integrado"
STAGE_DIR="$(mktemp -d)"
trap 'rm -rf "$STAGE_DIR"' EXIT

mkdir -p "$STAGE_DIR/DEBIAN"
mkdir -p "$STAGE_DIR/opt/$PRODUCT_NAME"
mkdir -p "$STAGE_DIR/usr/share/applications"
mkdir -p "$STAGE_DIR/usr/share/icons/hicolor/256x256/apps"
cp -a "$APP_DIR"/. "$STAGE_DIR/opt/$PRODUCT_NAME/"

cat > "$STAGE_DIR/DEBIAN/control" <<EOF
Package: $PACKAGE_NAME
Version: $VERSION
Section: office
Priority: optional
Architecture: $ARCH
Maintainer: AutoCar
Depends: libgtk-3-0, libnss3
Description: AutoCar Sistema Integrado
 Gestão offline para oficina mecânica, com clientes, veículos, OS, estoque,
 vendas, financeiro, relatórios e impressão.
EOF

cat > "$STAGE_DIR/usr/share/applications/$PACKAGE_NAME.desktop" <<EOF
[Desktop Entry]
Name=AutoCar Sistema Integrado
Comment=Gestão offline para oficina mecânica
Exec=/opt/$PRODUCT_NAME/autocar-sistema-integrado %U
Terminal=false
Type=Application
Categories=Office;
EOF

ICON="$ROOT_DIR/node_modules/app-builder-lib/templates/icons/electron-linux/256x256.png"
if [[ -f "$ICON" ]]; then cp "$ICON" "$STAGE_DIR/usr/share/icons/hicolor/256x256/apps/$PACKAGE_NAME.png"; fi

OUTPUT="$ROOT_DIR/release/${PACKAGE_NAME}-${VERSION}-${ARCH}.deb"
rm -f "$OUTPUT"
dpkg-deb --build --root-owner-group "$STAGE_DIR" "$OUTPUT" >/dev/null

echo
echo "Pacotes Linux gerados em: $ROOT_DIR/release"
find "$ROOT_DIR/release" -maxdepth 1 -type f \( -name '*.deb' -o -name '*.AppImage' \) -print
