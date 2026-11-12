#!/usr/bin/env bash
set -euo pipefail

project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
port="${A11Y_PORT:-4180}"
base_url="http://127.0.0.1:${port}"

cd "$project_dir"
setsid env PORT="$port" NODE_ENV=development pnpm dev >"/tmp/docpropel-a11y-${port}.log" 2>&1 &
server_pid=$!
cleanup() {
  kill -- -"$server_pid" >/dev/null 2>&1 || true
  wait "$server_pid" >/dev/null 2>&1 || true
}
trap cleanup EXIT

for _ in $(seq 1 30); do
  if curl -fsS "${base_url}/api/health" >/dev/null 2>&1; then
    break
  fi
  sleep 1
done
curl -fsS "${base_url}/api/health" >/dev/null
node scripts/a11y-regression.mjs "$base_url"
