/**
 * RedScript compiler
 * Copyright(c) 2013 Adam Brodzinski <adambrodzinski@gmail.com>
 * MIT Licensed
 */

module.exports = {
     _boilerplate_: function(line) {
         var regex = /foobar/;
         return line.replace(regex, function($0, $1) {
         });
     }
};

