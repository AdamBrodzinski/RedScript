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

  describe '#insertVars', ->
    it 'should insert `var` when needed', ->
      line = 'foo = true'
      ts.insertVars(line, []).should.eq 'var foo = true'
    it 'should work with multiple declarations', ->
      line = 'foo = true; bar = false'
      ts.insertVars(line, []).should.eq 'var foo = true; var bar = false'
    it 'should work if one var is decalred', ->
      line = 'foo = true; var bar = 20'
      ts.insertVars(line, []).should.eq 'var foo = true; var bar = 20'
    it 'should skip over declarations with var', ->
      line = 'var baz = 10'
      ts.insertVars(line, []).should.eq 'var baz = 10'
    it 'should only assign first in mult assignment', ->
      line = 'foo = baz = 10'
      ts.insertVars(line, []).should.eq 'var foo = baz = 10'
    it 'shouldnt match `==` or `===`', ->
      line = 'baz == 10'
      ts.insertVars(line, []).should.eq 'baz == 10'
      line = 'baz === 10'
      ts.insertVars(line, []).should.eq 'baz === 10'
    it 'shouldnt insert var on propertys or instance vars', ->
      line = '@foo = 20'
      ts.insertVars(line, []).should.eq '@foo = 20'
      line = 'foo.bar = 20'
      ts.insertVars(line, []).should.eq 'foo.bar = 20'
    it 'shouldnt insert a var if its already declared', ->
      vstate = []
      line1 = 'foo = 12'
      line2 = 'foo = 20'
      ts.insertVars(line1, vstate).should.eq 'var foo = 12'
      ts.insertVars(line2, vstate).should.eq 'foo = 20'
      # Regex test cases - http://regexr.com?342j9

  describe '#classes', ->
    it 'should transform a single class', ->
      line = 'class Foo'
      ts.classes(line).should.eq 'var Foo = Class.extend({'
    it 'should transform inheriting classes', ->
      line = 'class Bar < Foo'
      ts.classes(line).should.eq 'var Bar = Foo.extend({'
      # Regex test cases - http://regexr.com?342po

  describe '#_super', ->
    it 'should transform super to this._super', ->
      line = 'super f00_$'
      ts.callSuper(line).should.eq 'this._super(f00_$);'
    it 'should transform without args', ->
      line = 'super'
      ts.callSuper(line).should.eq 'this._super();'
    it 'should transform with multiple args', ->
      line = 'super foo, bar, baz'
      ts.callSuper(line).should.eq 'this._super(foo, bar, baz);'
    it 'should not transform inside a string or comment', ->
      line = ' "this is super cool" '
      ts.callSuper(line).should.eq ' "this is super cool" '
      # Regex test cases - http://regexr.com?342qs

