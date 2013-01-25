chai = require 'chai'; chai.should(); expect = chai.expect;
cmd = require '../lib/cmdLine'

describe 'cmd#getOptions', ->
  it 'should have defaults with no flags', ->
    termArgs = ["source1.rs"]
    opts = cmd.getOptions(termArgs)
    opts.watchFiles.should.eq false
    #opts.moduleType.should.eq 'requirejs'
    #opts.ES5.should.eq true
    opts.aliases.should.eq true
    #opts.defMethods.should.eq true
    opts.insertSemiColons.should.eq true
    #opts.varTypes.should.eq true
  
  it 'should change value when watch flag is passed', ->
    opts = cmd.getOptions ["-w", "file.rs"]
    expect( opts.watchFiles ).to.eq true
    opts = cmd.getOptions ["file.rs","--watch"]
    expect( opts.watchFiles ).to.eq true
    opts = cmd.getOptions ["file.rs","watch"]
    expect( opts.watchFiles ).to.eq true

  it 'should change value when no-semi flag is passed', ->
    opts = cmd.getOptions ["source1.rs", "--no-semicolon-comp"]
    expect( opts.insertSemiColons ).to.eq false


describe 'cmd#getFiles', ->
  it 'should return files', ->
    termArgs = ["source1.rs", "-w"]
    cmd.getFiles(termArgs).should.include "source1.rs"
