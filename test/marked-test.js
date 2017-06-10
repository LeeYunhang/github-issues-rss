var marked = require('marked')

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

var markdownString = `
  ** 前端的艺术之旅 **

  [美妙的一段旅程](sss)
` 

console.log(marked(markdownString))
