/*!
 * RedScript compiler
 * v 0.0.1
 * Copyright(c) 2013 Adam Brodzinski <adambrodzinski@gmail.com>
 * MIT Licensed
 */


/**
 * hasCondition module tests a string against a regex and returns a boolean
 * see hasCondition tests for more info on what exacty it does/doesn't match
 */


/**
 * DESCRIPTION
 * @param  {string} str -- a line of code
 * @return {boolean} --  return true if test passes
 * @api public
 */
exports.doEndBlock = function(str) {
    return (/foo[ ]*/).test(str);
};

// usefull?
String.prototype.has = function(thing) {
    //return thing.test(this);
    return thing.test(this);
};
