#!/usr/bin/env bash
set -euo pipefail
ENGINE="$HOME/.claude/skills/demo-walkthrough-video/engine"
if [ ! -f "$ENGINE/build.mjs" ]; then
  echo "Demo engine not found at $ENGINE — install the demo-walkthrough-video skill." >&2
  exit 1
fi
NAME="${1:-}"
if [ -z "$NAME" ]; then
  echo "usage: ./demo/run.sh <walkthrough-name> [--voice <name>] [--dry-run] [--keep]" >&2
  exit 2
fi
shift
DEMO_DIR="$(cd "$(dirname "$0")" && pwd)"
node "$ENGINE/build.mjs" \
  --walkthrough "$DEMO_DIR/walkthroughs/$NAME.mjs" \
  --out "$DEMO_DIR/output" \
  --work "$DEMO_DIR/build" \
  "$@"
