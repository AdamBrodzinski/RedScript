chai = require 'chai'; chai.should(); expect = chai.expect;

compile = require '../lib/compile'

describe '#compile', ->
  describe 'Comments', ->
    it 'should convert # comments to //', ->
      line = "# commented line"
      compile(line).should.eq '// commented line'
    it 'should allow JS comments', ->
      line = "// commented line"
      compile(line).should.eq '// commented line'
    it 'should not skip comments that are in the middle', ->
      line = "do # commented line"
      compile(line).should.eq '{ // commented line'
    it 'should not process line that starts with a comment', ->
      line = "  # commented do"
      compile(line).should.eq '  // commented do'
    it 'should not comment out string interpolation', ->
      line = ' "this is str #{foo}" '
      compile(line).should.eq ' "this is str #{foo}" '

  describe '@ symbol', ->
    it 'should alias this', ->
      compile('@prop').should.eq  'this.prop'
      compile('@_prop').should.eq 'this._prop'
      compile('@$prop').should.eq 'this.$prop'
    it 'should work when @ is floating?', ->
      line = 'function (callBack, @)'
      compile(line).should.eq 'function (callBack, this)'
      line = 'function (callBack, @ )'
      compile(line).should.eq 'function (callBack, this )'
    it 'should work with a trailling dot', ->
      compile('@.foo').should.eq 'this.foo'
      compile('@.foo @bar').should.eq 'this.foo this.bar'
      compile('@_foo').should.eq 'this._foo'
      compile('@$foo').should.eq 'this.$foo'
    it 'should work when two @ are used', ->
      compile('@prop1 = @prop2').should.eq 'this.prop1 = this.prop2'
  
  describe 'do end aliases', ->
      it 'should alias correctly', ->
        line = '''
        function foo() do
        end
        '''
        compile(line).should.eq '''
        function foo() {
        }
        '''
      it 'should not alias a do loop', ->
        line = 'do { '
        compile(line).should.eq 'do { '
      it 'should pass when used on a single line', ->
        line = 'function foo() do return 1*2 end'
        compile(line).should.eq 'function foo() { return 1*2 }'
        compile(' do end ').should.eq ' { } '
      it 'should pass lookbehind tests', ->
        compile('doing').should.eq 'doing'
        compile('ending').should.eq 'ending'        

  describe '#puts', ->
    it 'should pass with parens', ->
      compile('puts(foo)').should.eq 'console.log(foo)'
      compile('puts(method(param))').should.eq 'console.log(method(param))'
    it 'should pass without parens', ->
      compile('puts foo').should.eq 'console.log(foo);'
      compile('puts "bar"').should.eq 'console.log("bar");'
      compile('puts(foo); puts "bar"').should.eq 'console.log(foo); console.log("bar");'
      compile('puts method(param)').should.eq 'console.log(method(param));'

  describe '#printf', ->
    it 'should pass with parens', ->
      compile('printf(foo)').should.eq 'process.stdout.write(foo)'
      compile('printf(method(param))').should.eq 'process.stdout.write(method(param))'
    it 'should pass without parens', ->
      compile('printf foo').should.eq 'process.stdout.write(foo);'
      compile('printf "bar"').should.eq 'process.stdout.write("bar");'
      compile('printf(foo); printf "bar"').should.eq 'process.stdout.write(foo); process.stdout.write("bar");'
      compile('printf method(param)').should.eq 'process.stdout.write(method(param));'

  describe 'arrow function', ->
    it 'should alias function when it doesnt have parens', ->
      compile('->').should.eq 'function () {'
      compile('method(->').should.eq 'method(function () {'
      compile('method(param1, ->').should.eq 'method(param1,function () {'
      compile('method(param1,->').should.eq 'method(param1,function () {'
    it 'should alias function when it has empty parens', ->
      compile('() ->').should.eq 'function () {'
      compile('()->').should.eq 'function () {'
      compile('method(()->').should.eq 'method(function () {'
      compile('method(()->').should.eq 'method(function () {'
    it 'should alias function with when it has params', ->
      compile('(foo) ->').should.eq 'function (foo) {'
      line = 'method(param1, (foo, bar) ->'
      compile(line).should.eq 'method(param1, function (foo, bar) {'
      line = 'method((foo, bar)->'
      compile(line).should.eq 'method(function (foo, bar) {'

  describe 'func', ->
    it 'should alias to function using parens', ->
      compile('func foo()').should.eq 'var foo = function() {'
      compile('func $bar(foo)').should.eq 'var $bar = function(foo) {'
      compile('func $bar(foo, bar)').should.eq 'var $bar = function(foo, bar) {'
    it 'should alias to function with bang and question chars'
      #compile('func hasUser?()').should.eq 'var hasUser_Q = function() {'
      #compile('func replace!()').should.eq 'var replace_B = function() {'
    it 'should have optional parens', ->
      compile('func bar').should.eq 'var bar = function() {'
      compile('func $_bar').should.eq 'var $_bar = function() {'
  
  describe 'switch statement', ->
    it 'should compile properly', ->
      redSwitch = '''
        switch fruit()
        when "Oranges"
          alert("oranges");
          break;
        when "Apples" then alert()
        default
          alert("something else")
        end
      '''
      compile(redSwitch).should.eq '''
        switch (fruit()) {
        case "Oranges":
          alert("oranges");
          break;
        case "Apples" : alert() ; break;
        default:
          alert("something else")
        }
      '''



