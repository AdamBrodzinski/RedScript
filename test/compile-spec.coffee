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
      line = "something # commented line"
      compile(line).should.eq 'something // commented line'
    it 'should not process line that starts with a comment', ->
      line = "  # commented do"
      compile(line).should.eq '  // commented do'

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
      #it 'should alias correctly', ->
        #line = '''
        #function foo() do
        #end
        #'''
        #compile(line).should.eq '''
        #function foo() {
        #}
        #'''
      it 'should not alias a do loop', ->
        line = 'do { '
        compile(line).should.eq 'do { '
      #it 'should pass when used on a single line', ->
        #line = 'function foo() do return 1*2 end'
        #compile(line).should.eq 'function foo() { return 1*2 }'
        #compile(' do end ').should.eq ' { } '
      it 'should pass lookbehind tests', ->
        compile('doing').should.eq 'doing'
        compile('ending').should.eq 'ending'
      it 'should not transform strings'
        #compile(' "my string do and end "').should.eq ' "my string do and end "'

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
          alert("something")
        end
      '''
      compile(redSwitch).should.eq '''
        switch (fruit()) {
        case "Oranges":
          alert("oranges");
          break;
        case "Apples" : alert() ; break;
        default:
          alert("something")
        }
      '''
  
  describe 'if statement', ->
    it 'should alias to if with parens', ->
      line = 'if foo === 10'
      compile(line).should.eq 'if (foo === 10) {'
    it 'should not transform if with parens', ->
      compile('if (err) throw err;').should.eq 'if (err) throw err;'
      compile('if (foo === 10) {').should.eq 'if (foo === 10) {'
    it 'should not convert strings', ->
      compile(' "foo b if  bar" ').should.eq ' "foo b if  bar" '

  describe 'else statement', ->
    it 'should transform to else with brackets', ->
      compile('else').should.eq '} else {'
      compile('  else  ').should.eq '  } else {  '
    it 'should not transform if it already has brackets', ->
      compile('else {').should.eq 'else {'
      compile('} else {').should.eq '} else {'
      compile('}else{').should.eq '}else{'
      compile('}  else   {').should.eq '}  else   {'
    it 'should not transform an else if statement', ->
      compile('else if ').should.eq 'else if '
    it 'should not convert strings', ->
      compile(' "foo else b else  bar" ').should.eq ' "foo else b else  bar" '

  describe 'else if statement', ->
    it 'should transform to else with brackets', ->
      compile('else if foo').should.eq '} else if (foo) {'
      compile('  else if foo').should.eq '  } else if (foo) {'
      compile('else if foo === 20').should.eq '} else if (foo === 20) {'
    it 'should not transform if it already has parens', ->
      compile('} else if (foo === 20) {').should.eq '} else if (foo === 20) {'
      compile('} else if (foo){').should.eq '} else if (foo){'
    it 'should not convert strings', ->
      compile(' "foo else if baz bar" ').should.eq ' "foo else if baz bar" '

  describe 'string interpolation', ->
    it 'should convert to string concatination', ->
      line = '"Hello #{name}, how are you?"'
      compile(line).should.eq '"Hello " + name + ", how are you?"'

    it 'should not concat right side if interp is on right edge of quotes', ->
      line = '''
      "Hello #{name}"
      '''
      compile(line).should.eq '''
      "Hello " + name
      '''
    it 'should not concat left side if interp is on left edge of quotes', ->
      line = '''
      "#{name} Hello"
      '''
      compile(line).should.eq '''
      name + " Hello"
      '''
    it 'should wrap scary interpolated chars inside parens', ->
      line = '''
      "#{foo + bar} Hello"
      '''
      compile(line).should.eq '''
      (foo + bar) + " Hello"
      '''
    it 'should wrap scary interpolated chars inside parens', ->
      line = '''
      "foo #{2 * 3 - 3 / 7 % 2} Hello"
      '''
      compile(line).should.eq '''
      "foo " + (2 * 3 - 3 / 7 % 2) + " Hello"
      '''
  describe 'anonymous function block', ->
    it 'should work without params', ->
      compile('on("change", do').should.eq 'on("change", function() {'
      compile('method( do').should.eq 'method( function() {'
    it 'should work with params', ->
      compile('method( do |x|').should.eq 'method( function(x) {'
      compile('method( do |x,y|').should.eq 'method( function(x,y) {'
      line ='readFile("passwd", do |err, data|'
      compile(line).should.eq 'readFile("passwd", function(err, data) {'


