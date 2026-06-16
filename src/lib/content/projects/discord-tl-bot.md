---
title: "Discord TL Bot"
description: "A Discord bot that translates text, images, and audio into English using HuggingFace models"
date: "2026-06-16"
categories:
  - Python
  - Discord
  - HuggingFace
  - NLP
published: true
---

## Intro

TL-Bot is a Discord bot invoked by @mention that accepts inline text, image attachments, audio files, and plain text files, and returns translated English output. All three translation pipelines are implemented as separate importable Python modules under a `Translation/` package.

## Pipelines

### Text (`Translation/2-Text/`)
Language is auto-detected using `langdetect` (with `lingua` as a fallback for short or ambiguous inputs). Translation runs through `facebook/mbart-large-50-many-to-many-mmt` via the HuggingFace Inference API, with a `Qwen2.5-1.5B-Instruct` prompt as fallback for languages mBART doesn't support. Users can pass `--from` and `--to` flags to hint the source language or change the target, and `--analyze` to see a per-segment language breakdown of the input.

### Image (`Translation/1-Image/`)
Images are preprocessed with OpenCV (2× scale, grayscale), then passed to EasyOCR for CJK-capable text extraction. The extracted text feeds into the text pipeline. OCR confidence and translation confidence are both surfaced in the response.

### Audio (`Translation/3-Audio/`)
Audio and video attachments are transcribed using `openai/whisper-large-v3` via the HuggingFace Inference API. The transcript is then translated. The module also documents a local Whisper setup path (`WHISPER_LOCAL.md`) for offline use.

## Safety & Reliability

The bot validates every attachment before processing: file size is checked against per-type limits (8 MB for images/audio, 50 KB for text files), and magic byte signatures are verified against the declared content type to catch misrepresented files (e.g. an executable uploaded as a PNG). All pipelines run via `asyncio.to_thread` to keep the Discord event loop unblocked.

## Training Data Collection

Every translation is optionally saved to a local dataset (`Translation/0-Data/`) — one directory each for text, image, and audio submissions. This is a passive data collection pipeline for potentially fine-tuning models in future iterations.

## Logging

Rotating log files are written daily to `logs/TL_Bot_<date>.log` (32 MB cap, 5 backups), capturing all translation events, collection outcomes, and errors.
