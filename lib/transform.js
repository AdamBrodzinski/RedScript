/**
 * RedScript compiler
 * Copyright(c) 2013 Adam Brodzinski <adambrodzinski@gmail.com>
 * MIT Licensed
 */

module.exports = {
    /* Method_Description
     *
     * @param  {string} - accepts line as a string
     * @return {string  - transformed line
     * @api public
     */
    boilerplate: function(line) {
        var regex = /foobar/;
        return line.replace(regex, function($0, $1) {

        });
     }
};

