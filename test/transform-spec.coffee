chai = require 'chai'; chai.should(); expect = chai.expect

ts = require '../lib/transform'

describe 'Transform', ->
  describe 'object parent property', ->
    it 'should alias `parent*` to `__proto__`', ->
      ts.parentProperty('parent*').should.eq '__proto__'
      ts.parentProperty('parent*: foo,').should.eq '__proto__: foo,'
      ts.parentProperty('bar.parent* = foo').should.eq 'bar.__proto__ = foo'
      # Regex test cases - http://regexr.com?342i2

  describe '#objLiteral', ->
    it 'should transform `inherits` to `__proto__', ->
      line = 'object bar inherits foo'
      ts.objLiteral(line).should.eq 'var bar = { __proto__: foo,'
      line = 'object _$bar inherits _f$oo'
      ts.objLiteral(line).should.eq 'var _$bar = { __proto__: _f$oo,'
      # Regex test cases - http://regexr.com?342j3
