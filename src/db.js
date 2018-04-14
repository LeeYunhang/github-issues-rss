
const mysql = require('mysql')
const { env } = require('process')

const { DB_NAME, TABLE_NAME } = require('./constant')
const {
    MYSQL_HOST, MYSQL_PORT,
    MYSQL_SCHEMA, MYSQL_USERNAME, 
    MYSQL_PASSWORD
} = env

const logger = require('./logger')

const pool = mysql.createPool({
  connectionLimit: 20,
  host: MYSQL_HOST, 
  user: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_SCHEMA  
})

/* ---------- proxy handler ------------ */
pool.getConnection = new Proxy(pool.getConnection, {
  apply(target, ctx, args) {
    return new Promise((resolve, reject) => target.call(ctx, (err, connection) => {
      connection.query = new Proxy(connection.query, {
        apply(target, ctx, _args) {
          return new Promise((resolve, reject) => target.call(ctx, ..._args, (err, results, fields) => {
            logger.debug('the 1st arg of connection.query received', _args[0])
            if (err) { reject(err) }
            else { resolve({ results, fields }) }
          }))
        }
      })
      if (err) { reject(err) } 
      else { resolve(connection) }
    }))
  }
})

/**
 * if has rss's backup, return it.
 * @param {string} url - url
 * @returns {(string|undefined)}
 */
 async function getRssByUrl(url) {
  try {
    var connection = await pool.getConnection()
    let { results } = await connection.query(`SELECT url, content, date FROM ${TABLE_NAME} WHERE url=${mysql.escape(url)}`)

    if (results.length) {
      return results[0].content
    }

    logger.debug('query rss from DB: ', {
      '"the length of results"': results.length,
      '"results[0].url value is (when results.length > 0)"': results.length && results[0].url 
    })
  } catch (e) {
    logger.error(e)
  } finally {
    logger.debug('release connection, the type of connection is ' + typeof connection)
    typeof connection !== 'undefined' && connection.release()
  }
}

/**
 * save rss to db.
 * @param {string} url - string
 * @param {string} content - rss's content
 */
async function setRss(url, content) {
  try {
    var connection = await pool.getConnection()
    
    if (await getRssByUrl(url)) { 
      await connection.query(`UPDATE ${TABLE_NAME} SET content=?, date=? WHERE url=?`, [
        content, Date.now(), url
      ])
    } else {
      await connection.query(`INSERT INTO ${TABLE_NAME} SET ?`, { 
        url, content, date: Date.now() 
      })
    }

    logger.debug(`the url value in function "setRss" is ${url}`)
    logger.debug(`the content type of rss in function "setRss" is ${typeof content}`)
  } catch (e) {
    logger.error(e)
  } finally {
    typeof connection !== 'undefined' && connection.release()
  }
}

async function clearExpiredRss() {
  try {
    var connection = await pool.getConnection()
    connection.query(`DELETE FROM ${TABLE_NAME} WHERE date+3600*1000 < ${Date.now()}`)
  } catch (e) {
    logger.error(e)
  }  finally {
    typeof connection !== 'undefined' && connection.release()
  }
}
 
setInterval(clearExpiredRss, 3600 * 1000)

exports.getRssByUrl = getRssByUrl
exports.setRss = setRss
