#!/usr/bin/env bash
set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "==> Building and starting application services..."
docker compose -f "$SCRIPT_DIR/docker-compose.apps.yml" up --build "$@"
