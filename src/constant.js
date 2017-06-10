const process = require('process')
/**
 * authoticate that url is valid.
 * @constant
 * @readonly
 */
exports.URL_GREP = /^https:\/\/github\.com\/([\w\-]+)\/([\w\-]+)\/issues\/?$/

exports.CLIENT_ID = process.env.CLIENT_ID
exports.CLIENT_SECRET = process.env.CLIENT_SECRET

exports.GITHUB_API = 'https://api.github.com'
exports.SELF_DOMAIN = 'rss.mrcodex.com'

exports.DB_NAME = 'github_rss'
exports.TABLE_NAME = 'rss_backup'


exports.LOG_DIR = './logs'