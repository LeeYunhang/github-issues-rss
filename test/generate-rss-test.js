
const { generateRss } = require('../src/rss')
const fs = require('fs')


generateRss('https://github.com/dylang/node-rss/issues')
.then(rss => fs.writeFileSync('./test/rss.xml', rss))


