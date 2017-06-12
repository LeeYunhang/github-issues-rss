const Koa = require('koa')
const favicon = require('koa-favicon')
const path = require('path')

const CONST = require('./constant')
const { generateRss } = require('./rss')
const { readFile } = require('./utils')
const logger = require('./logger')

const { URL_GREP } = CONST
const app = new Koa()

app.use(favicon(path.resolve(__dirname, '../favicon.ico')))

// acesss log
app.use(async(ctx, next) => {
  logger.info(ctx.request.path)
  await next()
})

app.use(async(ctx, next) => {
  const path = ctx.request.path
  const args = path.split('/').filter(i => i)

  ctx.state.args = args
  if (!args.length || (args.length === 1 && /^index(\.html?)?$/i.test(args[0]))) {
    ctx.body = await readFile('./index.html')
    ctx.status = 200
  } else {
    await next()
  }
})

app.use(async(ctx, next) => {
  const args = ctx.state.args

  if (args.length) {
    const decodedUrl = decodeURIComponent(args[0])
    const isValid = URL_GREP.test(decodedUrl)

    if (args.length === 1 && isValid) {
      ctx.redirect(decodedUrl)
    } else if (args.length === 2 && isValid && args[1] === 'feed') {
      ctx.type = 'application/xml'
      ctx.body = await generateRss(decodedUrl)
    }
  }

  await next()
})

app.use(async(ctx, next) => {
  ctx.body = await readFile('./404.html')
  ctx.status = 404
})

app.listen(3000)