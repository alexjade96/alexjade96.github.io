---
title: "Asynchronous API"
description: "Asynchronous API derived from the game League of Legends"
date: "2025-09-014"
categories:
  - Python
  - FastAPI
  - PostGreSQL
  - R Studio
published: true
---

## Contents

## Intro

I've implemented an asynchronous API endpoint system derived using data gathered from Riot's League of Legends API and stored in a PostGreSQL database.  My end goal for this project is to create a fully functional web application to derive various play styles and patterns from groups of people who often play together.  As of this moment, I've all but completed the back-end for data capture & storage, and am currently working on implementing a front-end stack to display my data as well as modeling various patterns for visualization on the side.

## Win Rate Heatmap

Below is a sample output of data modeled that pertains to a group of friends that play League together often. The diagonal is the player's overall average win rate.

![heatmap.png](/images/lolheatmap.png "Heatmap of Player Win rates with different Teammates over a number of games")
