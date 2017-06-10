
/**
 * @typedef User
 * @property {string} username
 * @property {string} reposName
 */

const fs = require('fs')

/**
 * @param {string} url
 * @return {User} - user name, repo's name
 * @todo Implement this function
 */
exports.extractInfoFromUrl = extractInfoFromUrl
function extractInfoFromUrl(url) {
  let tmp = url.split('/')
  let result = {}

  if (url[url.length - 1] === '/') {
    result.username = tmp[tmp.length - 4]
    result.reposName = tmp[tmp.length - 3]
  } else {
    result.username = tmp[tmp.length - 3]
    result.reposName = tmp[tmp.length - 2]
  }

  return result
}

/**
 * get api url 
 * @param {string} url - issues url
 */
exports.getApiUrl = function getApiUrl(url) {
  const { username, reposName } = extractInfoFromUrl(url)
  
  return `https://api.github.com/repos/${username}/${reposName}/issues`
}

/**
 * read file async
 * @param {string} filename
 */
exports.readFile = function readFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', function(err, data) {
      if (err) { reject(err) }
      else { resolve(data) }
    })
  })
}