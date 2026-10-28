"""Export generated originals as responsive WebP assets without creative edits."""
import json
import os
from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
codex_home = Path(os.environ.get("CODEX_HOME") or Path.home() / ".codex")
manifest = json.loads((root / "docs/imagery-manifest.json").read_text(encoding="utf-8"))
destination = root / "public/assets/imagery"
destination.mkdir(parents=True, exist_ok=True)
for asset in manifest["assets"]:
    source = Path(asset["source"].replace("${CODEX_HOME}", str(codex_home)))
    with Image.open(source) as original:
        original = ImageOps.exif_transpose(original).convert("RGB")
        for width in (320, 640, 1200):
            output = destination / f'{asset["slug"]}-{width}.webp'
            if output.exists() and output.stat().st_mtime >= source.stat().st_mtime:
                continue
            size = (width, round(original.height * width / original.width))
            image = original.resize(size, Image.Resampling.LANCZOS)
            image.save(output, "WEBP", quality=84, method=6)
    print(f'Prepared {asset["slug"]}')
