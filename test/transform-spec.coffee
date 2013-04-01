chai = require 'chai'; chai.should(); expect = chai.expect

ts = require '../lib/transform'

# ---------------- Mock `/bin/redscript` events ----------------
state = {}
# Reset entire state object
process.on 'state:reset', ->
  state =
    debug: false,
    declaredVars: [],
    ittIndex: 0

# remove any listeners from previous mocha run
process.removeAllListeners 'ittIndex:inc'

process.on 'ittIndex:inc', (key) ->
  state.ittIndex += 1
  # send an updated count
  process.emit('state:send', state.ittIndex)
# --------------------------------------------------------------

describe 'method parentProperty', ->
  it 'should transform `parent*` to `__proto__`', ->
    ts.parentProperty('parent*').should.eq '__proto__'
  it 'should work next to an object literal', ->
    ts.parentProperty('parent*: foo,').should.eq '__proto__: foo,'
  it 'should work when assigning to a method with dot opperator', ->
    ts.parentProperty('bar.parent* = foo').should.eq 'bar.__proto__ = foo'
    # Regex test cases - http://regexr.com?342i2

describe 'method objLiteral', ->
  it 'should transform `<` to `__proto__', ->
    line = 'object bar < foo'
    ts.objLiteral(line).should.eq 'var bar = { __proto__: foo,'
    line = 'object _$bar < _f$oo'
    ts.objLiteral(line).should.eq 'var _$bar = { __proto__: _f$oo,'
    # Regex test cases - bit.ly/ZHcSKt

describe 'method insertVars', ->
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
  it 'should only declare var once on a one liner', ->
    line = 'baz = 10; baz = 10'
    ts.insertVars(line, []).should.eq 'var baz = 10; baz = 10'
  it 'should only assign first in mult assignment', ->
    line = 'foo = baz = 10'
    ts.insertVars(line, []).should.eq 'var foo = baz = 10'
  it 'shouldnt match `==` or `===`', ->
    line = 'baz == 10'
    ts.insertVars(line, []).should.eq 'baz == 10'
    line = 'baz === 10'
    ts.insertVars(line, []).should.eq 'baz === 10'
  it 'shouldnt insert var on properties or instance vars', ->
    line = '@foo = 20'
    ts.insertVars(line, []).should.eq '@foo = 20'
    line = 'foo.bar = 20'
    ts.insertVars(line, []).should.eq 'foo.bar = 20'
  it 'should recognize manually declared vars as declared', ->
    line = 'var foo = 40; foo = 20'
    ts.insertVars(line, []).should.eq 'var foo = 40; foo = 20'
  it 'shouldnt insert a var if its already declared', ->
    vstate = []
    line1 = 'foo = 12'
    line2 = 'foo = 20'
    ts.insertVars(line1, vstate).should.eq 'var foo = 12'
    ts.insertVars(line2, vstate).should.eq 'foo = 20'
    # Regex test cases - http://bit.ly/X5ls6a

describe 'method classes', ->
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

describe 'method _super', ->
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

describe 'method whileLoop', ->
  it 'should transform correctly', ->
    line = 'while foo < 200'
    ts.whileLoop(line).should.eq 'while (foo < 200) {'
  it 'should not compile a while loop with brackets', ->
    line = 'while (foo < 2) {moo}'
    ts.whileLoop(line).should.eq 'while (foo < 2) {moo}'
  it 'should accept parens as its parameter', ->
    line = 'while (x - 2) / 2'
    ts.whileLoop(line).should.eq 'while ((x - 2) / 2) {'
    # Regex test cases - http://bit.ly/X0vXdg

describe 'method untilLoop', ->
  it 'should transform into a while loop with comment', ->
    line = 'until foo === 5'
    ts.untilLoop(line).should.eq 'while (!( foo === 5 )) { //until'
  it 'should accept parens as a parameter', ->
    line = 'until (x - 2) / 2'
    ts.untilLoop(line).should.eq 'while (!( (x - 2) / 2 )) { //until'
    # Regex test cases - http://bit.ly/106gt3K

describe 'method forLoopRang', ->
  it 'should transform for in with range to for loop', ->
    line = 'for i in 0..5'
    ts.forLoopRange(line).should.eq 'for (var i=0; i < 5; i++) {'
  it 'should transform with three dots', ->
    line = 'for i in 0...5'
    ts.forLoopRange(line).should.eq 'for (var i=0; i <= 5; i++) {'
  it 'should handle variables', ->
    line = 'for ct in b..e'
    ts.forLoopRange(line).should.eq 'for (var ct=b; ct < e; ct++) {'
    # Regex test cases - bit.ly/16Ofgn2

describe 'method forIn', ->
  it 'should transform correctly', ->
    line = 'for key in obj'
    ts.forIn(line).should.eq 'for (var key in obj) {'
  it 'should transform with an obj literal', ->
    line = 'for key in {one: 1}'
    ts.forIn(line).should.eq 'for (var key in {one: 1}) {'
    # Regex test cases - bit.ly/ZkxXHv

describe 'method forInArr', ->
  beforeEach ->
    process.emit 'state:reset' #console.log "resetting state"
  it 'should transform into a for loop', ->
    line = 'for fruit inArr basket'
    ts.forInArr(line).should.eq 'for (var i1=0, len1=basket.length; i1 ' +
      '< len1; i1++) { var fruit = basket[i1];'
  it 'should alias `inStr` to `inArr` for iterating strings', ->
    line = 'for char inStr myString'
    ts.forInArr(line).should.eq 'for (var i1=0, len1=myString.length; i1 < ' +
      'len1; i1++) { var char = myString[i1];'
# Regex test cases - bit.ly/WPApt4

describe 'method forKeyVal', ->
  it 'should transform key and value correctly', ->
    line = 'for key,val in obj'
    ts.forKeyVal(line).should.eq 'for (var key in obj) { var val = obj[key];'
    line = 'for   $k ,   _v in users'
    ts.forKeyVal(line).should.eq 'for (var $k in users) { var _v = users[$k];'
    # Regex test cases - bit.ly/13r7y3b

describe 'method func', ->
  it 'should transform with name and params', ->
    line = 'func foo (a, b)'
    ts.func(line).should.eq 'var foo = function(a, b) {'
  it 'should pass with name & empty parens', ->
    line = 'func foo()'
    ts.func(line).should.eq 'var foo = function() {'
  it 'should transfrom with name & without params', ->
    line = 'func bar'
    ts.func(line).should.eq 'var bar = function() {'
  it 'should transfrom without name & with params', ->
    line = 'func(a, b)'
    ts.func(line).should.eq 'function(a, b) {'
  it 'it should pass without name and empty parens', ->
    line = 'func()'
    ts.func(line).should.eq 'function() {'
  it 'should transfrom without name & without params', ->
    line = 'func bar'
    ts.func(line).should.eq 'var bar = function() {'
  it 'should transform with just func keyword', ->
    line = 'func'
    ts.func(line).should.eq 'function() {'
  it 'should pass using parens', ->
    ts.func('func foo()').should.eq 'var foo = function() {'
    ts.func('func $bar(foo)').should.eq 'var $bar = function(foo) {'
    ts.func('func $bar(foo, bar)').should.eq 'var $bar = function(foo, bar) {'
  it 'should have optional parens', ->
    ts.func('func bar').should.eq 'var bar = function() {'
    ts.func('func $_bar').should.eq 'var $_bar = function() {'
    # Regex test cases - bit.ly/YBld3l

describe 'method comments', ->
  it 'should transform # comments into // comments', ->
    line = '# this is a commented line'
    ts.comments(line).should.eq '// this is a commented line'
  it 'should not comment out a # inside of strings', ->
    line = '  "foo === 2 # comment about foo" '
    ts.comments(line).should.eq '  "foo === 2 # comment about foo" '
  it 'should convert # comments to //', ->
    line = "# commented line"
    ts.comments(line).should.eq '// commented line'
  it 'should allow JS comments', ->
    line = "// commented line"
    ts.comments(line).should.eq '// commented line'
  it 'should not skip comments that are in the middle', ->
    line = "something # commented line"
    ts.comments(line).should.eq 'something // commented line'
  it 'should not process line that starts with a comment', ->
    line = "  # commented do"
    ts.comments(line).should.eq '  // commented do'
  it 'should not comment out # inside a string', ->
    line = " $('#someClass') "
    ts.comments(line).should.eq " $('#someClass') "
    #http://bit.ly/YH5rke

describe 'method privateBlock', ->
  it 'should transform private an iife beginning', ->
    line = 'private'
    ts.privateBlock(line).should.eq ';(function() {'
  it 'should transform with surrounding spaces', ->
    line = '   private '
    ts.privateBlock(line).should.eq '   ;(function() { '
    # Regex test cases - bit.ly/ZtC2wB
  it 'should transform endPriv into ending iifee', ->
    line = 'endPriv'
    ts.privateBlock(line).should.eq '})();'
  it 'should transform endPriv with surrounding spaces', ->
    line = ' endPriv   '
    ts.privateBlock(line).should.eq ' })();   '
    # Regex test cases - bit.ly/Ye61cO
 
