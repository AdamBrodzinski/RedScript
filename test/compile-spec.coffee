chai = require 'chai'; chai.should(); expect = chai.expect;

compile = require '../lib/compile'
#sample = require './examples/sample.rs'

describe '#compile', ->
  it 'should return hello world', ->
    compile('Wooo').should.eq 'Wooo Testing output'
