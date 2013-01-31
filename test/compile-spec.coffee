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
      compile('@_foo').should.eq 'this._foo'
      compile('@$foo').should.eq 'this.$foo'
    it 'should work when two @ are used', ->
      compile('@prop1 = @prop2').should.eq 'this.prop1 = this.prop2'
      
