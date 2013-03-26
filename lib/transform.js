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

Array.prototype.contains = function(str) {
    var i = this.length;
    while (i--) {
        if (this[i] === str) {
            return true;
        }
    }
    return false;
};




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
        var regex = /object ([\$\w]+)(?: < ([\$\w]+))?/;
        return line.replace(regex, function($0, $1, $2) {
            if (insideString("object", line)) return $0;
            if ($1 && $2) {
                return 'var ' + $1 + ' = { __proto__: ' + $2 + ',';
            } else {
                return 'var ' + $1 + ' = {';
            }
        });
    },


    /* Inserts `var` keyword if it's not already there
     *
     * @param  {string} - accepts line as a string
     * @param  {array}  - an array to store declared vars
     * @return {string} - transformed line
     * @api public
     */
    insertVars: function(line, declared) {
        //  $0 - var foo = bar
        //  $1 - `var` or `.` or `@`
        //  $2 - `foo``
        var regexGlobal = /(\bvar\b\s*|\.|@)?([\w\$]+)\s*=(?!=)/g,
            regexSingle = /(\bvar\b\s*|\.|@)?([\w\$]+)\s*=(?!=)/,
            hasMultAssign = /(=\s*[\w\.]+\s*=)/;
        // if line has a mult assignment, only insert the first var
        var regex = (hasMultAssign.test(line)) ? regexSingle : regexGlobal;

        return line.replace(regex, function($0, $1, $2) {
            if ($1 || declared.contains($2)) {
                return $0;
            } else if ($2){
                declared.push($2);
                return 'var ' + $2 + ' =';
            } else {
                throw "can't find assignment";
            }
        });
    },


    /* Creates a class based constructor
     *
     * @param  {string} - accepts line as a string
     * @return {string} - transformed line
     * @api public
     */
    classes: function(line) {
        // $0 - `class Bar < Foo`
        // $1 - `Bar`
        // $2 - `<`
        // $3 - `Foo`
        var regex = /\bclass\b\s+([\w\$\.]+)(?:\s*(<)\s*([\w\$\.]+))?/,
        // $0 - `class App.Model`
        // matches variable & dot
            hasDotNot = /\bclass\b\s+([\w\$]+)\./;

        if (hasDotNot.test(line)) {
            return line.replace(regex, function($0, $1, $2, $3) {
                if ($1 && $2 && $3) {
                    return $1 + ' = ' + $3 + '.extend({';
                } else if ($1) {
                    return $1 + ' = Class.extend({';
                }
            });
        } else {
            return line.replace(regex, function($0, $1, $2, $3) {
                if ($1 && $2 && $3) {
                    return 'var ' + $1 + ' = ' + $3 + '.extend({';
                } else if ($1) {
                    return 'var '+ $1 +' = Class.extend({';
                }
            });
        }
    },


    /* Sets up super for classical methods
     *
     * @param  {string} - accepts line as a string
     * @return {string} - transformed line
     * @api public
     */
    callSuper: function(line) {
        // $0 - `super foo`
        // $1 - `super`
        // $2 - `foo`
        var regex = /(\bsuper\b)(?:\s+([\w\$,\s]+))?$/;
        return line.replace(regex, function($0, $1, $2) {
          if ($2) {
            return 'this._super(' + $2 + ');';
          } else if (!$2) {
            return 'this._super();';
          }
        });
    },


    /* While loop
     *
     * @param  {string} - accepts line as a string
     * @return {string} - transformed line
     * @api public
     */
    whileLoop: function(line) {
        // $0 - `while foo < bar`
        // $1 - `foo < bar`, condition
        // $2 - `{` , a bracket preceding condition
        var regex = /\bwhile\b\s+([^{}]+)(\{)?/;
        return line.replace(regex, function($0, $1, $2) {
            if ($2) return $0;
            else if ($1) {
              return "while (" + $1 + ") {";
            }
        });
    },


    /* Until Loop
     *
     * @param  {string} - accepts line as a string
     * @return {string} - transformed line
     * @api public
     */
    untilLoop: function(line) {
        // $0 - `until foo < bar`
        // $1 - `foo < bar`, condition
        // $2 - `{` , a bracket preceding condition
        var regex = /\buntil\b\s+([^{}]+)(\{)?/;
        return line.replace(regex, function($0, $1, $2) {
            if ($2) return $0;
            else if ($1) {
                return 'while (!( ' + $1 + ' )) { //until';
            }

        });
    },


    /* for in loop using range operator
     *
     * @param  {string} - accepts line as a string
     * @return {string} - transformed line
     * @api public
     */
    forLoopRange: function(line) {
        // $0 - `for i in 0..5`
        // $1 - `i`
        // $2 - `0`
        // $3 - `..` or `...`
        // $4 - `5`
        var regex = /for\s+([\w\$]+)\s+in\s+([\w\$]+)(..|...)([\w\$]+)/;
        return line.replace(regex, function($0, $1, $2, $3, $4) {
            if ($3 === '..') {
              //      for (var    i  =   0  ;    i   <     5   ;    i  ++) {
              return 'for (var '+$1+'='+$2+'; '+$1+' < '+ $4 +'; '+$1+'++) {';
          } else if ($3 === '...') {
              //      for (var    i  =   0  ;    i   <=    5   ;     i  ++) {
              return 'for (var '+$1+'='+$2+'; '+$1+' <= '+ $4 +'; '+$1+'++) {';
          }
        });
    },


    /* Regular for in
     *
     * @param  {string} - accepts line as a string
     * @return {string} - transformed line
     * @api public
     */
    forIn: function(line) {
       // $0 - `for key in obj`
       // $1 - `key`
       // $2 - `obj`
        var regex = /for\s+([\w$]+)\s+in\s+(\{.+\}|[\w\$]+)/;
        return line.replace(regex, function($0, $1, $2) {
            return 'for (var ' + $1 + ' in ' + $2 + ') {';
        });
    },


    /* For in array
     * Itterator value automatically increases for ever use, appends
     * the current itterator index to i to avoid conflicts
     *
     * @param  {string} - accepts line as a string
     * @return {string} - transformed line
     * @api public
     */
    forInArr: function(line) {
      // $0 - `for fruit inArr basket'
      // $1 - `fruit`
      // $2 - `basket`
      var regex = /for\s+([\w\$]+)\s+inArr\s+([\w\$]+)/;
      return line.replace(regex, function($0, $1, $2) {
        var itt;

        // listen once for state status & store itteration count
        process.once('state:send', function(count) { itt = count; });
        // increment itterator index by one
        process.emit('ittIndex:inc');
        // if event fails, fallback to using `_`
        if (!itt) {
          itt = '_';
          console.log("✖ warning, auto itteration failed, using `i_`".red);
        }
        //      for (var iX      =0, len=basket.length; iX
        return 'for (var i'+itt+'=0, len='+$2+'.length; i'+itt+
          //< len; iX      ++) { var fruit  = basket[iX      ];
          ' < len; i'+itt+'++) { var '+$1+' = '+$2+'[i'+itt+'];';
      });
    },


    /** For key,val in object
     * Sets up variable for value
     * @param  {string} - accepts line as a string
     * @return {string} - transformed line
     * @api public
     */
    forKeyVal: function(line) {
      // $0 - `for key,val in obj`
      // $1 - `key`
      // $2 - `val`
      // $3 - `obj`
      var regex = /\bfor\b\s+([\w\$]+)\s*,\s*([\w\$]+)\s+in\s([\w\$]+)/;
      return line.replace(regex, function($0, $1, $2, $3) {
        //      for (var   key  in   obj ) { var   val  =   obj [  key ];
        return 'for (var '+$1+' in '+$3+') { var '+$2+' = '+$3+'['+$1+'];';
      });
    },


    func: function(line){
      // $0 - `func foo(a, b)`
      // $1 - `func`
      // $2 - `foo`
      // $3 - `(a, b)`
      var regex = /(\bfunc\b)\s*([\w\$]+)?\s*(\([\w\$\s,]*\))?/;
      return line.replace(regex, function($0, $1, $2, $3) {
        if ($1 && $2 && $3)
          //      var foo = function(a, b) {
          return 'var '+$2+' = function'+$3+' {';
        else if ($1 && $2 && !$3)
          //      var   foo  = function() {
          return 'var '+$2+' = function() {';
        else if ($1 && !$2 && $3)
          //      function   (a, b)  {
          return 'function' + $3 + ' {';
        else if ($1 && !$2 && !$3)
          return 'function() {';
        else
          throw new Error("Can not compile function");
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

