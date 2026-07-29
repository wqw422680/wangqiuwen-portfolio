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
        image.save(path, optimize=True, compress_level=9)
