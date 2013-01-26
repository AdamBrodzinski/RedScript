chai = require 'chai'; chai.should(); expect = chai.expect;

has = require '../lib/hasCondition'
#sample = require './examples/sample.rs'

describe 'has#doEndBlock', ->
  it 'should pass with no spaces surrounding it', ->
    line = 'do'
    has.doEndBlock(line).should.eq true

  it 'should pass with a leading space', ->
    line = ' foo bar baz'
    has.doEndBlock(line).should.eq true

  it 'should pass with trailing space', ->
    line = 'foo bar baz'
    has.doEndBlock(line).should.eq true

# create tests for an actual match