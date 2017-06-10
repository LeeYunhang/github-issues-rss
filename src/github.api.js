/**
 * @typedef Issue {Object}
 * @property {string} url
 * @property {string} title 
 * @property {string} author
 * @property {string} description 
 * @property {string} date 
 * @property {string} guid
 */

const got = require('got');

const logger = require('./logger')
const { GITHUB_API, CLIENT_ID, CLIENT_SECRET } = require('./constant')


exports.generateIssuesApi = 
function generateIssuesApi(username, reposName) {
  return `${GITHUB_API}/repos/${username}/${reposName}/issues?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&per_page=100`
}

/**
 * @param {string} url - api url
 * @return {Issue[]}
 */
exports.getRepoIssues = async function getRepoIssues(url) {
  try {
    let res = await got(url)
    logger.debug('api request count remaining: ' + res.headers['x-ratelimit-remaining'])
    let body = res.body
    let data = JSON.parse(body)
    // console.dir(res)
    return data.map(issue => ({
      url: issue.url,
      title: issue.title,
      author: issue.user.login,
      description: issue.body,
      date: issue.created_at,
      guid: issue.updated_at
    }))
  } catch(e) {
    logger.error(e)
  }
}