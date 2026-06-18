---
title: "Your Music Library"
description: "A SvelteKit app for searching and downloading music from streaming platforms to your local PC"
date: "2025-09-20"
categories:
  - Svelte
  - SvelteKit
  - TypeScript
  - Drizzle
  - SQLite
published: true
---

## Intro

Your Music Library (YML) is a SvelteKit SPA for downloading music from major streaming platforms to your local machine — useful for offline listening, transitioning between music managers, or managing a portable music collection.

## Stack

Built with SvelteKit, Drizzle ORM on SQLite, and Spotify's Web API. The database schema defines two tables:

- **song** — stores retrieved track metadata: title, artist, album, cover URL, release date, duration (ms), metadata source, and a preferred download recommendation URL. A unique constraint prevents duplicate entries across title, artist, album, release date, and duration.
- **search** — caches search queries alongside their results, the chosen recommendation, and any excluded sources.

## Spotify Integration

The Spotify API module (`src/routes/search/api/spotify.ts`) handles OAuth client credentials authentication and exposes three query functions:

- `searchSpotify(query, type, offset, limit)` — searches by track title (or artist, album, playlist)
- `searchPlaylist(playlistId)` — fetches a full playlist by Spotify ID
- `searchSpotifyPage(pageLink)` — follows a paginated Spotify API link

## UI Components

- **MetadataCard** — displays song metadata retrieved from Spotify
- **SongCard** — compact listing for search results
- **TrackDetails** — expanded view of a selected track
- **collapser** — collapsible section wrapper
