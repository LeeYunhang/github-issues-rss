
const RSS = require('rss')
const marked = require('marked')

const { getRepoIssues } = require('./github.api')
const { extractInfoFromUrl, getApiUrl } = require('./utils')
const { SELF_DOMAIN } = require('./constant')
const { getRssByUrl, setRss } = require('./db')
const logger = require('./logger')

/**
 * @param {string} url - issues url
 * @returns {string} rss
 */
exports.generateRss = async function generateRss(url) {
  let rss = await getRssByUrl(url)
  logger.debug(`let rss = getRssByUrl(url); the type of rss is ${typeof rss}`)
  if (rss) { return rss }

  let apiUrl = getApiUrl(url)
  logger.debug('generated api url', { apiUrl })
  let issues = (await getRepoIssues(apiUrl) || [])
      .map(issue => {
        issue.description = marked(issue.description)
        return issue
      })
  
  let { reposName, username } = extractInfoFromUrl(apiUrl)
  let feed = new RSS({
    title: username,
    description: `${username}/${reposName}'s issue`,
    feed_url: `https://${SELF_DOMAIN}/${encodeURIComponent(url)}/feed`,
    site_url: url
  })

  issues.forEach((issue, index) => feed.item({
      title: issue.title,
      description: issue.description, 
      url: url,
      author: issue.author,
      date: issue.date,
      guid: issue.guid
    })
  )
  
  rss = feed.xml()
  logger.debug(`rss has generated is ${typeof rss === 'string'}`)
  setRss(url, rss)
  return rss
}

