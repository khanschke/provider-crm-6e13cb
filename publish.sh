#!/usr/bin/env bash
#
# Publishes the Provider CRM microsite to GitHub Pages as an UNLISTED site
# (public repo with an obscure random name + noindex/robots so search engines skip it).
#
# Requirements: git, and the GitHub CLI (https://cli.github.com  ->  brew install gh)
#
# Usage:
#   ./publish.sh
#
set -euo pipefail
cd "$(dirname "$0")"

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI not found. Install it first:  brew install gh"
  echo "Then re-run:  ./publish.sh"
  exit 1
fi

# 1) Authenticate (opens a browser; enter the one-time code it shows)
if ! gh auth status >/dev/null 2>&1; then
  echo "Signing in to GitHub..."
  gh auth login --hostname github.com --git-protocol https --web --scopes repo
fi

USER="$(gh api user -q .login)"
NAME="provider-crm-$(head -c 3 /dev/urandom | xxd -p)"
echo "Creating unlisted repo: $USER/$NAME"

# 2) Initialize git (if needed) and commit
if [ ! -d .git ]; then
  git init -q
  git checkout -q -b main 2>/dev/null || git branch -M main
fi
git add -A
git commit -q -m "Provider CRM microsite" || true

# 3) Create the repo and push
gh repo create "$NAME" --public --source=. --remote=origin --push

# 4) Enable GitHub Pages from main / root
gh api -X POST "repos/$USER/$NAME/pages" \
  -f "source[branch]=main" -f "source[path]=/" >/dev/null 2>&1 \
  || echo "(Pages may already be enabled, or enable it in Settings > Pages.)"

echo ""
echo "=================================================================="
echo " Repo:  https://github.com/$USER/$NAME"
echo " Site:  https://$USER.github.io/$NAME/   (live in ~1-2 minutes)"
echo "=================================================================="
