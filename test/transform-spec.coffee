chai = require 'chai'; chai.should(); expect = chai.expect;

compile = require '../lib/compile'
transform = require '../lib/transform'

describe 'Transform', ->
  describe 'object parent property', ->
    it 'should alias `parent*` to `__proto__`', ->
      compile('parent*').should.eq '__proto__'
      compile('parent*: foo,').should.eq '__proto__: foo,'
      compile('bar.parent* = foo').should.eq 'bar.__proto__ = foo'
      # Regex test cases - http://regexr.com?342i2

