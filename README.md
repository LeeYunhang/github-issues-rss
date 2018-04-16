## github-issues-rss

This tool can convert issues on github to RSS. [demo](https://rss.mrcodex.com)


## Motivation

There are a lot of programmers who like to write articles in issues, so I want to collect these articles by RSS.

## Feature

Converting issues on github to rss, but due to the number of requests for the github API, the converted RSS will be saved in the database for an hour, and the RSS requested within an hour will be taken directly from the database

## Usage

**Clone** 

`git clone https://github.com/mrcodehang/github-issues-rss.git`

**Start with docker-compose**

Use `docker-compose up` in project directory after download docker and docker-compose.

## Contribution

Welcome PR and issues

## LICENSE

GNU
