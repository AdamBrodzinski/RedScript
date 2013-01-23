#!/usr/bin/env node
/*!
 * RedScript compiler
 * v 0.0.1
 * Copyright(c) 2013 Adam Brodzinski <adambrodzinski@gmail.com>
 * MIT Licensed
 */


/**
 * Dependencies
 */

var cmd = require('./cmdLine')
  , fs  = require('fs');

console.log("argc is " + process.argc);

// extract third param [filename.rs] and store in source
//var source = process.argv.splice(2)[0];
// extract last param and replace it's extension with .js (filename.js)
//var target = source.substring(0, source.lastIndexOf('.')) + '.js';

// extract arguments
var argList = process.argv.slice(2)
  , options = {};


argList.forEach(function(arg, index){
    console.log("list is now: " + argList);
    console.log("current arg is " + argList[index]);
    // flip the switches
    if (arg === "--semicolon-comp") {
        options.insertSemiColons = true
        console.log("removing: " + argList.splice(index,index))
    }
});

console.log("final");
console.log(argList);




//   https://github.com/LearnBoost/stylus/blob/master/bin/stylus
// if --watch is used, assume we are
// not working with stdio
/*
if (watchers && !files.length) {
  files = fs.readdirSync(process.cwd())
    .filter(function(file){
    return file.match(/\.styl$/);
  });
}




// compile files
//http://stackoverflow.com/questions/3806488/detect-file-changes-in-node-js-via-watchfile
if (files.length) {
  console.log();
  files.forEach(renderFile);
  if (options.watch) {
    files.forEach(function (file) {
      fs.watchFile(file, {interval: 100}, function (curr, prev) {
        if (curr.mtime > prev.mtime) renderFile(file);
      });
    });
  }
  process.on('exit', function () {
    console.log();
  });
// stdio
} else {
  stdin();
}


// possible flow

collect args 2-...
  for each arg
    if args == -w
        this.pop
        watch = true
    if args == -s
  // the remaining are files
  files = args


*/