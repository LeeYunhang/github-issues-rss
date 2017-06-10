## github-issues-rss

This tool can convert issues on github to RSS. [demo](https://rss.mrcodex.com)


## Motivation

There are a lot of programmers who like to write articles in issues, so I want to collect these articles by RSS.

## Feature

Converting issues on github to rss, but due to the number of requests for the github API, the converted RSS will be saved in the database for an hour, and the RSS requested within an hour will be taken directly from the database

## Usage

**Clone** 

`git clone https://github.com/mrcodehang/github-issues-rss.git`

**Install**

`yarn install`

**Set the environment variable**

You can find the corresponding environment variable in src / constant.js

**Run**

development: `npm run dev`

production: `npm start`

## Contribution

Welcome PR and issues

## LICENSE

GNU
