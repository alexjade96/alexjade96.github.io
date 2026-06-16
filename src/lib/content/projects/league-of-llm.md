---
title: "League of LLM"
description: "A Riot API data pipeline and ML toolkit for League of Legends analytics and model training"
date: "2026-05-30"
categories:
  - Python
  - PyTorch
  - SQLite
  - SQLAlchemy
  - Riot API
  - Machine Learning
  - Jupyter
published: true
---

## Intro

This repo has two related components: a full ETL and analytics backend for pulling League of Legends match data via the Riot API, and an ML pipeline notebook for training image classifiers on champion splash art — both aimed at building toward a promptable LoL-focused model.

## Data Harvester (`lol_data_harvester/`)

A structured Python package that wraps the Riot API and stores match data in a local SQLite database via SQLAlchemy.

### API Layer (`api/`)
Covers all major Riot endpoints: account lookup, summoner data, match history, match timeline, league standings, and champion mastery.

### Database Schema (`db/`)
Six SQLAlchemy models capturing the full match lifecycle:

- **Account** — PUUID, game name, tag line, region, summoner level
- **Match** — game mode, queue, version, timestamps, platform
- **MatchParticipant** — per-player stats: KDA, damage breakdown (physical/magic/true), gold, CS, vision, items, summoner spells, spell casts, objectives, runes, and win result
- **MatchTimeline** — raw frame-by-frame timeline keyed to match ID
- **TimelineEvent** — kills, item purchases, level-ups, building/monster kills, ward placements, positions
- **ParticipantFrame** — per-player snapshots at each timeline frame: gold, XP, CS, position, damage stats

### ETL Pipeline (`etl/`)
Three pipelines run extract → transform → load for account data, individual matches, and match timelines. `pipeline.py` exposes `etl_account_data`, `etl_match_data`, `etl_match_list`, and `etl_match_timeline` as the top-level entry points.

### Analytics (`analytics/`)
Queries over the stored data to produce per-player summaries:

- Overall winrate and KDA
- Role distribution
- Best and worst champions by winrate (min. 3 games)
- Early game performance score
- Best and worst matchups by champion

`summary.py` aggregates all of these into a single `get_player_summary(puuid)` call.

## ML Notebook (`League-Of-LLM-Script.ipynb`)

A Jupyter notebook that scaffolds a modular PyTorch package targeting champion splash art classification. Generates `data.py`, `model_builder.py`, `engine.py`, `train.py`, `stats.py`, and `app.py` as script files. Downloads champion loading screen images directly from Riot's Data Dragon API as the training dataset.
