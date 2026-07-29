from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / ".tools"))

from PIL import Image

for path in (ROOT / "dist").rglob("*.png"):
    with Image.open(path) as image:
        image.thumbnail((640, 800), Image.Resampling.LANCZOS)
        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGBA")
        image.save(path.with_suffix(".webp"), "WEBP", quality=78, method=4)
    path.unlink()

for path in (ROOT / "dist").rglob("*"):
    if path.suffix in {".js", ".css", ".html"}:
        path.write_text(path.read_text().replace(".png", ".webp"))
