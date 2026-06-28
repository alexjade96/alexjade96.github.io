---
title: "Simple LoL Best Teammates"
description: "A League of Legends API pipeline that identifies best teammates from shared match history"
date: "2025-09-01"
categories:
  - Python
  - FastAPI
  - PostGreSQL
  - R Studio
published: true
---

## Intro

This project pulls match history data from Riot's League of Legends API and stores it in a PostgreSQL database via an asynchronous FastAPI backend. Given a group of players who frequently queue together, it analyzes their shared match history to surface who each player performs best alongside.

## Outputs

### Best Teammate Recommendations

For a given player, the system ranks teammates by win rate in games where they appeared together, with a minimum game threshold to filter out small sample sizes.

### Win Rate Heatmap

A matrix visualization of pairwise win rates across a friend group — each cell shows how often two players win when queued together. The diagonal is each player's overall average win rate.

![heatmap.png](/images/lolheatmap.png "Heatmap of Player Win rates with different Teammates over a number of games")
