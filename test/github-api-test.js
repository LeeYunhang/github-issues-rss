
var assert = require('assert')

const { getRepoIssues, generateIssuesApi } = require('../src/github.api')

describe('Github api', function() {

  it('the type of auther property should be string', async function() {
    let url = generateIssuesApi('mrcodehang', 'blog-comment')
    let result = await getRepoIssues(url)
    this.timeout(10000)
    assert.equal('string', typeof result[0].author)
  })
});