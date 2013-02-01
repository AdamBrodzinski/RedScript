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

  describe '#puts', ->
    it 'should pass with parens', ->
      compile('puts(foo)').should.eq 'console.log(foo)'
      compile('puts(method(param))').should.eq 'console.log(method(param))'
    it 'should pass without parens', ->
      compile('puts foo').should.eq 'console.log(foo);'
      compile('puts "bar"').should.eq 'console.log("bar");'
      compile('puts(foo); puts "bar"').should.eq 'console.log(foo); console.log("bar");'
      compile('puts method(param)').should.eq 'console.log(method(param));'
  
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
