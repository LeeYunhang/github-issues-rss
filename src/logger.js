const winston = require('winston')
const exec = require('child_process').execSync
const path = require('path')

const { LOG_DIR } = require('./constant')
const env = process.env['NODE_ENV']
const LOG_FILE = process.env['LOG_FILE']
console.log('LOG_FILE', LOG_FILE)

exec(`mkdir -p ${LOG_DIR}`, {})

let transports = []
if (env === 'production') {
  transports.push(new (winston.transports.File)({
    name: 'info',
    filename: path.resolve(LOG_FILE, 'access.log'),
    timestamp: Date.now(),
    level: 'info'
  }), new (winston.transports.File)({
    name: 'error',
    filename: path.resolve(LOG_FILE, 'error.log'),
    timestamp: Date.now(),
    level: 'error'
  }))
} else {
  transports.push(new (winston.transports.Console)({
    timestamp: Date.now(),
    colorize: true,
    level: 'debug'
  }))
}

const logger = new (winston.Logger)({ transports });

module.exports = logger
