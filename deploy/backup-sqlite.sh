#!/usr/bin/env bash
set -euo pipefail
DB_PATH="${AUTOCAR_DB:-/var/lib/autocar/autocar.db}"
BACKUP_DIR="${AUTOCAR_BACKUP_DIR:-/var/backups/autocar}"
mkdir -p "$BACKUP_DIR"
chmod 700 "$BACKUP_DIR"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
TARGET="$BACKUP_DIR/autocar-$STAMP.sqlite3"
sqlite3 "$DB_PATH" ".timeout 10000" ".backup '$TARGET'"
chmod 600 "$TARGET"
find "$BACKUP_DIR" -type f -name 'autocar-*.sqlite3' -mtime +14 -delete
printf 'Backup validado: %s\n' "$TARGET"
