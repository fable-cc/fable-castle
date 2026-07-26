#!/usr/bin/env python3
"""Verify live robots.txt AI crawler policy for fable-castle.com."""
from __future__ import annotations

import re
import sys
import urllib.request

URL = "https://fable-castle.com/robots.txt"
REQUIRED_NOT_BLOCKED = ["GPTBot", "ClaudeBot", "Bytespider", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot"]
OPTIONAL = ["CCBot", "Google-Extended"]


def section_for(body: str, bot: str) -> str:
    pattern = re.compile(rf"(?im)^User-agent:\s*{re.escape(bot)}\s*$")
    match = pattern.search(body)
    if not match:
        return ""
    next_match = re.search(r"(?im)^User-agent:\s*", body[match.end() :])
    end = match.end() + next_match.start() if next_match else len(body)
    return body[match.start() : end]


def is_blocked(section: str) -> bool:
    return bool(re.search(r"(?im)^Disallow:\s*/\s*$", section))


def is_allowed(section: str) -> bool:
    return bool(re.search(r"(?im)^Allow:\s*/\s*$", section))


def main() -> int:
    req = urllib.request.Request(URL, headers={"User-Agent": "Codex live robots validation"})
    with urllib.request.urlopen(req, timeout=20) as response:
        body = response.read().decode("utf-8", "replace")
        print(f"{response.status} {URL}")

    managed = "# BEGIN Cloudflare Managed content" in body
    print(f"cloudflare_managed_content={managed}")

    failed = False
    for bot in REQUIRED_NOT_BLOCKED:
        section = section_for(body, bot)
        blocked = is_blocked(section)
        allowed = is_allowed(section)
        print(f"{bot}: blocked={blocked} allowed={allowed}")
        if blocked:
            failed = True

    for bot in OPTIONAL:
        section = section_for(body, bot)
        print(f"{bot}: blocked={is_blocked(section)} allowed={is_allowed(section)} optional=true")

    if failed:
        print("FAIL: one or more required AI/search crawlers are blocked in live robots.txt")
        return 1
    print("PASS: required AI/search crawlers are not blocked")
    return 0


if __name__ == "__main__":
    sys.exit(main())
