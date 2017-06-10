
const assert = require('assert')
const { extractInfoFromUrl } = require('../src/utils')
const { URL_GREP } = require('../src/constant')

describe('utils', function() {
  it('username should be mrcodehang', async function() {
      let result = extractInfoFromUrl('https://api/github.com/repos/mrcodehang/tsz/issues')
      
      url = result
      assert.equal('mrcodehang', result.username)
  });
  it('username should be mrcodehang', async function() {
      let result = extractInfoFromUrl('https://github.com/repos/mrcodehang/tsz/issues/')
      
      url = result
      assert.equal('mrcodehang', result.username)
  });

  it('url is passed validation', async function() {
      assert.equal(true, URL_GREP.test('https://github.com/mrcodehang/bl-og/issues/'))
  });
});
