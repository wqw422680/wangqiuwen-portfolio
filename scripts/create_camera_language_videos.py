from __future__ import annotations

from pathlib import Path
import math
import sys

TOOLS = Path(__file__).resolve().parents[1] / ".tools"
sys.path.insert(0, str(TOOLS))

import imageio_ffmpeg
import numpy as np
from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "镜头语言视频素材"
WIDTH, HEIGHT, FPS, SECONDS = 640, 368, 8, 5
FRAMES = FPS * SECONDS

CLIPS = [
    ("01-bullet-time.mp4", "public/guofeng/guofeng-bamboo-swordsman.png", "bullet"),
    ("02-time-lapse.mp4", "public/anime/anime-tokyo-rooftop.png", "timelapse"),
    ("03-hitchcock-zoom.mp4", "public/anime/anime-red-scarf.png", "hitchcock"),
    ("04-fpv.mp4", "public/anime/anime-neon-alley.png", "fpv"),
    ("05-pov.mp4", "public/guofeng/guofeng-jiangnan-rain.png", "pov"),
    ("06-bay-orbit.mp4", "public/anime/anime-robot-market.png", "bay"),
    ("07-spielberg-entrance.mp4", "public/anime/anime-sunset-bike.png", "spielberg"),
    ("08-trunk-shot.mp4", "public/anime/anime-rain-train.png", "trunk"),
]


def ease(t: float) -> float:
    return t * t * (3 - 2 * t)


def cover(image: Image.Image, scale: float = 1, x: float = 0, y: float = 0) -> Image.Image:
    factor = max(WIDTH / image.width, HEIGHT / image.height) * scale
    resized = image.resize((round(image.width * factor), round(image.height * factor)), Image.Resampling.BILINEAR)
    canvas = Image.new("RGBA", (WIDTH, HEIGHT), (5, 4, 7, 255))
    canvas.alpha_composite(resized, (round((WIDTH - resized.width) / 2 + x), round((HEIGHT - resized.height) / 2 + y)))
    return canvas


def vignette(frame: Image.Image, amount: int = 105) -> Image.Image:
    y, x = np.ogrid[:HEIGHT, :WIDTH]
    radius = np.sqrt(((x - WIDTH / 2) / (WIDTH / 2)) ** 2 + ((y - HEIGHT / 2) / (HEIGHT / 2)) ** 2)
    alpha = np.clip((radius - 0.45) * amount * 1.65, 0, amount).astype(np.uint8)
    layer = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    layer.putalpha(Image.fromarray(alpha))
    return Image.alpha_composite(frame, layer)


def color_overlay(frame: Image.Image, color: tuple[int, int, int], alpha: int) -> Image.Image:
    return Image.alpha_composite(frame, Image.new("RGBA", (WIDTH, HEIGHT), (*color, alpha)))


def draw_frame(source: Image.Image, style: str, raw: float) -> Image.Image:
    t = ease(raw)
    if style == "bullet":
        frame = Image.new("RGBA", (WIDTH, HEIGHT), (8, 5, 9, 255))
        arc = math.sin(raw * math.pi)
        for offset in np.linspace(-0.5, 0.5, 7):
            ghost = cover(source, 1.22, offset * 128 * arc, abs(offset) * 18)
            ghost.putalpha(28)
            frame.alpha_composite(ghost)
        frame.alpha_composite(cover(source, 1.22, math.sin(raw * math.pi * 2) * 48, -arc * 14))
        draw = ImageDraw.Draw(frame, "RGBA")
        for i in range(20):
            angle = i / 20 * math.tau + raw * math.tau
            radius = 220 + (i % 3) * 72
            px = WIDTH / 2 + math.cos(angle) * radius
            py = HEIGHT / 2 + math.sin(angle) * radius * 0.38
            draw.ellipse((px - 4, py - 4, px + 4, py + 4), fill=(255, 205, 105, 42))
    elif style == "timelapse":
        frame = cover(source, 1.08 + 0.10 * t, -24 + 58 * t)
        frame = color_overlay(frame, (255, int(90 + 68 * raw), 48), int(35 + 20 * math.sin(raw * math.pi)))
        draw = ImageDraw.Draw(frame, "RGBA")
        for i in range(22):
            y = (i * 71) % HEIGHT
            draw.line((-80, y, WIDTH + 80, y - 32), fill=(255, 245, 220, 30), width=2)
    elif style == "hitchcock":
        frame = cover(source, 1.02 + 0.82 * t, math.sin(raw * math.pi) * 17)
        frame = color_overlay(frame, (42, 20, 63), 30)
    elif style == "fpv":
        jitter_x = math.sin(raw * 31) * 8 + math.sin(raw * 7) * 12
        jitter_y = math.cos(raw * 26) * 5
        frame = cover(source, 1.08 + 0.66 * t, jitter_x - 18, jitter_y + 4)
        frame.putalpha(34)
        sharp = cover(source, 1.08 + 0.66 * t, jitter_x, jitter_y)
        frame.alpha_composite(sharp)
        frame = color_overlay(frame, (18, 130, 215), 18)
    elif style == "pov":
        frame = cover(source, 1.10 + 0.27 * t, math.sin(raw * math.tau) * 14, 12 - 30 * t)
        draw = ImageDraw.Draw(frame, "RGBA")
        for i in range(50):
            x = (i * 89) % WIDTH
            y = (i * 53) % HEIGHT
            draw.line((x, y, x - 24, y + 84), fill=(225, 240, 255, 45), width=2)
        frame = color_overlay(frame, (12, 18, 24), int(28 * abs(math.sin(raw * math.pi * 4))))
    elif style == "bay":
        orbit = raw * math.tau
        frame = cover(source, 1.24 + 0.11 * math.sin(orbit), math.cos(orbit) * 52, math.sin(orbit) * 20)
        flare = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
        draw = ImageDraw.Draw(flare, "RGBA")
        y = int(140 + raw * 300)
        for size, alpha in ((180, 30), (90, 50), (28, 120)):
            draw.ellipse((40 - size, y - size, 40 + size, y + size), fill=(255, 111, 26, alpha))
        frame.alpha_composite(flare)
    elif style == "spielberg":
        frame = cover(source, 1.18 + 0.17 * t, -150 + 180 * t)
        if raw < 0.45:
            frame = color_overlay(frame, (0, 0, 0), int(108 - raw * 240))
        frame = color_overlay(frame, (255, 183, 75), 18)
    elif style == "trunk":
        frame = cover(source, 1.15 + 0.04 * math.sin(raw * math.pi * 3), math.sin(raw * 17) * 4)
        draw = ImageDraw.Draw(frame, "RGBA")
        top = int(130 * max(0, 1 - raw / 0.36))
        draw.rectangle((0, 0, WIDTH, top), fill=(0, 0, 0, 246))
        draw.rectangle((0, HEIGHT - 106, WIDTH, HEIGHT), fill=(0, 0, 0, 246))
        draw.rectangle((0, 0, 98, HEIGHT), fill=(0, 0, 0, 246))
        draw.rectangle((WIDTH - 98, 0, WIDTH, HEIGHT), fill=(0, 0, 0, 246))
    else:
        frame = cover(source)
    return vignette(frame)


def write_clip(name: str, image_path: str, style: str) -> None:
    print(f"rendering {name}", flush=True)
    source = Image.open(ROOT / image_path).convert("RGBA")
    destination = OUTPUT / name
    if destination.exists():
        destination.unlink()
    writer = imageio_ffmpeg.write_frames(
        str(destination),
        (WIDTH, HEIGHT),
        fps=FPS,
        codec="libx264",
        pix_fmt_in="rgba",
        pix_fmt_out="yuv420p",
        output_params=["-movflags", "+faststart", "-crf", "19"],
    )
    writer.send(None)
    for index in range(FRAMES):
        frame = draw_frame(source, style, index / (FRAMES - 1))
        writer.send(np.asarray(frame, dtype=np.uint8))
        if index == 0:
            print(f"encoding {name}", flush=True)
    writer.close()
    print(f"created {name}")


OUTPUT.mkdir(parents=True, exist_ok=True)
requested = set(sys.argv[1:])
for clip in CLIPS:
    if not requested or clip[0] in requested:
        write_clip(*clip)
