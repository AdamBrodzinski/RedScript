
/*!
 * RedScript compiler
 * v 0.0.1
 * Copyright(c) 2013 Adam Brodzinski <adambrodzinski@gmail.com>
 * MIT Licensed
 */


/**
 * Dependencies
 */
var fs  = require('fs');


module.exports = function(target, source){

    return source;
};


/*
fs.readFile(source, 'utf-8', function(err, data) {
    if (err) console.log("**** File Read Error, can't find: " + source + " ****");
    console.log(data);
    console.log("finished reading...");
});

fs.writeFile(target, output, function(err) {
    if (err) throw err;
    console.log(target + ' compiled successfully....');
});
*/
