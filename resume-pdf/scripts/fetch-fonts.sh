#!/usr/bin/env bash
#
# Vendor the fonts modern-cv expects into resume-pdf/fonts/ so the Typst build is
# self-contained and reproducible (no system font install required). The build
# scripts point Typst at this dir via --font-path.
#
# Safe to re-run. Requires: curl, unzip (both ship with macOS).
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FONTS_DIR="$(cd "$SCRIPT_DIR/.." && pwd)/fonts"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

mkdir -p "$FONTS_DIR"

# $1 = url, $2 = label, $3 = output subdir under TMP
download_and_extract() {
  echo ">> $2"
  curl -fsSL "$1" -o "$TMP/pkg.zip"
  mkdir -p "$TMP/$3"
  unzip -q -o "$TMP/pkg.zip" -d "$TMP/$3"
}

# Font Awesome 7 — required for the contact/icon glyphs in the header.
download_and_extract \
  "https://github.com/FortAwesome/Font-Awesome/releases/download/7.2.0/fontawesome-free-7.2.0-desktop.zip" \
  "Font Awesome 7.2.0 (icons)" fa
find "$TMP/fa" -name '*.otf' -exec cp {} "$FONTS_DIR/" \;

# Source Sans 3 — body font.
download_and_extract \
  "https://github.com/adobe-fonts/source-sans/releases/download/3.052R/OTF-source-sans-3.052R.zip" \
  "Source Sans 3.052R (body)" ss
find "$TMP/ss" -name '*.otf' -exec cp {} "$FONTS_DIR/" \;

# Roboto — header font. Static weights only; skip variable fonts to keep weight
# selection unambiguous.
download_and_extract \
  "https://github.com/googlefonts/roboto-3-classic/releases/download/v3.015/Roboto_v3.015.zip" \
  "Roboto v3.015 (headers)" rb
find "$TMP/rb" -name 'Roboto-*.ttf' ! -name '*VariableFont*' ! -name '*[*]*' -exec cp {} "$FONTS_DIR/" \;

echo
echo "Fonts vendored into $FONTS_DIR:"
ls -1 "$FONTS_DIR" | sed 's/^/  /'
