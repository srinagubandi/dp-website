#!/usr/bin/env bash
set -euo pipefail

base_url="${1:-http://127.0.0.1:4177}"
out_dir="${2:-/home/ubuntu/dp-rebuild/dp-website-v6/artifacts/v6-visual-qa-final}"
mkdir -p "$out_dir"

capture() {
  local route="$1"
  local name="$2"
  local width="$3"
  local height="$4"
  chromium \
    --headless \
    --no-sandbox \
    --disable-gpu \
    --hide-scrollbars \
    --run-all-compositor-stages-before-draw \
    --virtual-time-budget=2500 \
    --window-size="${width},${height}" \
    --screenshot="${out_dir}/${name}.png" \
    "${base_url}${route}" >/dev/null 2>&1
}

capture "/" "home-desktop-1440x900" 1440 900
capture "/" "home-mobile-390x844" 390 844
capture "/contact" "contact-desktop-1440x900" 1440 900
capture "/contact" "contact-mobile-390x844" 390 844
capture "/admin/login" "admin-login-desktop-1440x900" 1440 900
capture "/admin/login" "admin-login-mobile-390x844" 390 844
capture "/admin" "admin-unauth-desktop-1440x900" 1440 900
capture "/admin" "admin-unauth-mobile-390x844" 390 844

for path in / /services /specialties /how-it-works /results /about /team /contact /privacy /terms /admin/login /admin /api/health /robots.txt /sitemap.xml; do
  status="$(curl -sS -o /dev/null -w '%{http_code}' --max-time 15 "${base_url}${path}")"
  printf '%s %s\n' "$status" "$path"
done > "${out_dir}/route-statuses.txt"

curl -sS --max-time 15 "${base_url}/" > "${out_dir}/root-raw.html"
curl -sS --max-time 15 "${base_url}/contact" > "${out_dir}/contact-raw.html"
curl -sS --max-time 15 "${base_url}/robots.txt" > "${out_dir}/robots.txt"
curl -sS --max-time 15 "${base_url}/sitemap.xml" > "${out_dir}/sitemap.xml"
