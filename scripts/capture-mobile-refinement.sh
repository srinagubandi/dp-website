#!/usr/bin/env bash
set -euo pipefail

base_url="${1:-http://127.0.0.1:4177}"
out_dir="${2:-/home/ubuntu/dp-rebuild/dp-website-v6/artifacts/mobile-refinement}"
mkdir -p "$out_dir"

capture() {
  local filename="$1"
  local viewport="$2"
  local route="$3"
  chromium --headless --no-sandbox --disable-gpu --hide-scrollbars \
    --window-size="$viewport" \
    --screenshot="$out_dir/$filename" \
    "$base_url$route" >/dev/null 2>&1
}

capture home-mobile.png 390,844 /
capture services-mobile.png 390,844 /services
capture team-mobile.png 390,844 /team
capture faq-mobile.png 390,844 /faq
capture home-desktop.png 1440,900 /
capture services-desktop.png 1440,900 /services
printf 'Captured responsive v6 review screenshots in %s\n' "$out_dir"
