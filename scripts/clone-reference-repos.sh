#!/usr/bin/env bash
# Clone StockSaathi and BolHisaab into _repos/ as read-only reference material.
# _repos/ is gitignored — never imported by the portfolio.

set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p _repos
cd _repos

if [ ! -d "StockSaathi" ]; then
  git clone --depth 50 https://github.com/aliarbab2009/StockSaathi.git
else
  echo "StockSaathi already cloned — skipping."
fi

if [ ! -d "BolHisaab" ]; then
  git clone --depth 50 https://github.com/aliarbab2009/BolHisaab.git
else
  echo "BolHisaab already cloned — skipping."
fi

echo "Done. Reference clones live under _repos/ (gitignored)."
