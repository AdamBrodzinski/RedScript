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
    it 'should transform `<` to `__proto__', ->
      line = 'object bar < foo'
      ts.objLiteral(line).should.eq 'var bar = { __proto__: foo,'
      line = 'object _$bar < _f$oo'
      ts.objLiteral(line).should.eq 'var _$bar = { __proto__: _f$oo,'
      # Regex test cases - bit.ly/ZHcSKt

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
    it 'should transform a class using dot notation', ->
      line = 'class App.Model < Backbone.Model'
      ts.classes(line).should.eq 'App.Model = Backbone.Model.extend({'
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

  describe 'while loop', ->
    it 'should transform correctly', ->
      line = 'while foo < 200'
      ts.whileLoop(line).should.eq 'while (foo < 200) {'
      line = 'while (foo < 2) {moo}'
      ts.whileLoop(line).should.eq 'while (foo < 2) {moo}'
      line = 'while (x - 2) / 2'
      ts.whileLoop(line).should.eq 'while ((x - 2) / 2) {'
      # Regex test cases - http://bit.ly/X0vXdg

  describe 'until loop', ->
    it 'should transform correctly', ->
      line = 'until foo === 5'
      ts.untilLoop(line).should.eq 'while (!( foo === 5 )) { //until'
      line = 'until (x - 2) / 2'
      ts.untilLoop(line).should.eq 'while (!( (x - 2) / 2 )) { //until'
      # Regex test cases - http://bit.ly/106gt3K

  describe 'for in loop using range operator', ->
    it 'should transform with two dots', ->
      line = 'for i in 0..5'
      ts.forLoopRange(line).should.eq 'for (var i=0; i < 5; i++) {'
    it 'should transform with three dots', ->
      line = 'for i in 0...5'
      ts.forLoopRange(line).should.eq 'for (var i=0; i <= 5; i++) {'
    it 'should handle variables', ->
      line = 'for ct in b..e'
      ts.forLoopRange(line).should.eq 'for (var ct=b; ct < e; ct++) {'
      # Regex test cases - bit.ly/16Ofgn2
