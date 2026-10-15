"""Build wireframes/colors.html from the template, embedding prototype.html so the page is self-contained.

Run from the repo root after any change to prototype.html:
    python3 wireframes/tools/build_colors.py
"""
import base64, pathlib

root = pathlib.Path(__file__).resolve().parent.parent
proto = (root / "prototype.html").read_bytes()
template = (root / "tools" / "colors.template.html").read_text()
if template.count("__PROTO_B64__") != 1:
    raise SystemExit("template must contain exactly one __PROTO_B64__ placeholder")
out = template.replace("__PROTO_B64__", base64.b64encode(proto).decode("ascii"))
(root / "colors.html").write_text(out)
print(f"wrote {root / 'colors.html'} ({len(out) // 1024} KB)")
