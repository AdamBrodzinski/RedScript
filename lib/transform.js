/**
 * RedScript compiler
 * Copyright(c) 2013 Adam Brodzinski <adambrodzinski@gmail.com>
 * MIT Licensed
 */

/* Checks to see if keyword is used inside a string
 * @param  {string} match - keyword to match
 * @param  {string} ln    - line to match against
 * @return {bool}         - true if match is found
 */
function insideString(match, ln) {
    var regex = "['\"][\\w\\s]*[^\\w]" + match + "[^\\w][\\w\\s]*['\"]";
    var insideStr = new RegExp(regex, "g");
    return insideStr.test(ln);
}

module.exports = {

    /* Transforms a `parent*` property to `__proto__`
     *
     * @param  {string} - accepts line as a string
     * @return {string} - transformed line
     * @api public
     */
    parentProperty: function(line) {
        var regex = /\bparent\b\*/;
        return line.replace(regex, function() {
            return '__proto__';
        });
    },


    /* Transforms a RedScript object liters to a JS one.
     * Optionally an inherits keyword can be used to inherit from
     * another object.
     *
     * @param  {string} - accepts line as a string
     * @return {string} - transformed line
     * @api public
     */
    objLiteral: function(line) {
        // $0 `object foo inherits bar`
        // $1 `foo`
        // $2 `bar`
        var regex = /object ([\$\w]+)(?: inherits ([\$\w]+))?/;
        return line.replace(regex, function($0, $1, $2) {
            if (insideString("object", line)) return $0;
            if ($1 && $2) {
                return 'var ' + $1 + ' = { __proto__: ' + $2 + ',';
            } else {
                return 'var ' + $1 + ' = {';
            }
        });
    },


    /* Method_Description
     *
     * @param  {string} - accepts line as a string
     * @return {string} - transformed line
     * @api public
     */
    boilerplate: function(line) {
        var regex = /foobar/;
        return line.replace(regex, function($0, $1) {

        });
    }
};

