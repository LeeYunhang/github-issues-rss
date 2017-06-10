  const Koa = require('koa')

const CONST = require('./constant')
const { generateRss } = require('./rss')
const { readFile } = require('./utils')
const logger = require('./logger')

const { URL_GREP } = CONST
const app = new Koa()

app.use(async (ctx) => {
  const path = ctx.request.path
  const args = path.split('/').filter(a => a)
        .map((a, i) => i? a : decodeURIComponent(a))

  if (args.length && !URL_GREP.test(args[0])) {
    logger.error(path)
    ctx.body = await readFile('./404.html')
    ctx.status = 404
    ctx.type = 'text/html'
  } else {
    logger.debug(`url args count is ${args.length}`)
    switch(args.length) {
      case 2:
        ctx.type = 'application/xml'
        ctx.body = await generateRss(args[0])
        logger.info(path)          
        break
      case 1:
        if (args[0] === 'index' || args[0] === 'index.htm' || args[0] === 'index.html') {
          ctx.body = await readFile('./index.html')
          ctx.type = 'text/html'
          ctx.status = 200
          logger.info(path)          
        } else {
          ctx.redirect(args[0])
        }
        break
      default:
        if (!args.length) {
          ctx.body = await readFile('./index.html')
          ctx.status = 200
          ctx.type = 'text/html'
          logger.info(path)
        } else {
          ctx.body = await readFile('./404.html')
          ctx.type = 'text/html'
          ctx.status = 404
        }
    }
  }
})

app.listen(3000)