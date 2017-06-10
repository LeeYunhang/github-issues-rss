const winston = require('winston')
const exec = require('child_process').execSync

const { LOG_DIR } = require('./constant')
const env = process.env['NODE_ENV']

exec(`mkdir -p ${LOG_DIR}`, {})

let transports = []
if (env === 'production') {
  transports.push(new (winston.transports.File)({
    name: 'info',
    filename: `${LOG_DIR}/access.log`,
    timestamp: Date.now(),
    level: 'info'
  }), new (winston.transports.File)({
    name: 'error',
    filename: `${LOG_DIR}/error.log`,
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