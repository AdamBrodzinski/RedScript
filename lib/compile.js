/**
 * RedScript compiler
 * Copyright(c) 2013 Adam Brodzinski <adambrodzinski@gmail.com>
 * MIT Licensed
 */

var transform = require('./transform');
var colors = require('colors');

/**
 * #lastChar - Finds the last character in a string.
 * @return {string} - char
 */
String.prototype.lastChar = function(){
 return this[this.length - 1];
};

/**
 * Checks to see if keyword is used inside a string
 * @param  {string} match keyword to match
 * @param  {string} ln    line to match against
 * @return {bool}         true if match is found
 */
function insideString(match, ln) {
    var regex = "['\"][\\w\\s]*" + match + "[\\w\\s]*['\"]";
    var insideStr = new RegExp(regex, "g");
    return insideStr.test(ln);
}


/** Export compile function
 * Takes a multi line string and splits each line into array lines.
 * Each line is processed and transformed if it matches the criteria.
 * Final array of strings are joined and returned.
 * @param  {string} file
 * @return {string}
 * @api    public
 */
module.exports = function(file, fileName) {
    var lines = file.split('\n')
      , debug = false
      , declaredVars = [];

    // reset state object for each file
    process.emit('state:reset');

    // Iterate through each line and transform text
    lines = lines.map(function(line, index, array) {
      try {
        // normalize # comments to //
        line = transform.comments(line);

        // if line begins with a comment, return
        if (/^\/\//.test(line.trimLeft())) return line;

        line = transform.merge_immutable(line);

        line = transform.wrap_with_immutable(line);

        // wrap with _.chain(foo) if used with |> pipes
        line = transform.wrap_with_chain(line, index, array);

        // pipe operator
        line = transform.pipe_operator_single_line(line, index, array);
        line = transform.pipe_operator_multi_line(line, index, array);

        // public & priv module functions
        line = transform.define_function(line);

        // insert const keyword where declared
        line = transform.declare_const(line);

        // XXX TODO warn if using shorthand assignment for leaks
        // /^(\s*)([\w$]+\s+)(\/=|\*=|\-=|\+=|=|\|\|=)\s+(.*?)$/

// ------------------ XXX refactor below into transform.js ---------------

        /**
         * Matches `when` OR `when` and `then`.
         * @type {RegExp} See function for more info
         */
          var switchWhenThen = /(when)\s(.+)(then)(.+)|(when)\s(.+)/


        /**
         * Alias `end` with `}`
         * fakes a negative lookbehind for a word char
         * @return {string} returns `}` if lookbehind is false
         */
        line = line.replace(/(\w)?end(?!\w)/g, function($0, $1) {
            return $1 ? $0 : '}';
        });


        /**
         * Inserts brackets into switch statement
         * @param  {string} $0  Entire match
         * @param  {string} $1  Matches switch
         * @param  {string} $2  Matches expression
         * @return {string}     Processed switch line
         */
        line = line.replace(/(switch) (.+)/, function($0, $1, $2) {
            return $1 + " (" + $2 + ") {";
        });


        /**
         * Replaces when with case. If then is found a one line
         * statement is assumed. This currently inserts a semicolon to prevent
         * errors with appended break.
         * @param  {string} $0  Entire match
         * @param  {string} $1  Matches `when`
         * @param  {string} $2  Label
         * @param  {string} $3  Matches `then`
         * @param  {string} $4  clause (after then)
         *                  OR
         * @param  {string} $5  Matches `when`
         * @param  {string} $6  Label
         * @return {string}     Processed when line
         */
        line = line.replace(switchWhenThen, function($0, $1 ,$2 ,$3 ,$4 ,$5 ,$6) {
            // has `when` and `then` one liner
            if ($1 && $3) {
                return "case " + $2 + ":" + $4 + ' ; break;';
            // line just has `when`
            } else if ($5) {
                return "case " + $6 + ":";
            }
        });


        /**
         * Replaces default with default: in a switch statement
         */
        line = line.replace(/\bdefault\b(?!\:)/, function($0, $1) {
          // if entire line is just default
          if (line.trim() === 'default') return 'default:';
          // else it's prob something else like `def default`
          else return $0;
        });


        /**
         * Replaces an `else if` with `} else if () {`
         * @param  {string} $0  Entire match
         * @param  {string} $1  Matches `condition`
         */
        line = line.replace(/else if (?!\s*\()(.+)/, function($0, $1) {
            // if `else if` is inside a string, bail out
            if (insideString("else if", line)) return $0;
            return '} else if (' + $1 + ') {';
        });


        /**
         * Replaces an `else` with `} else {`
         * @param  {string} $0  Entire match
         */
        line = line.replace(/else(?!(?:\s*\{)| if)/, function($0) {
            // if `else` is inside a string, bail out
            if (insideString("else", line)) return $0;
            return '} else {';
        });


        /**
         * Replaces an `if condition` with `if (condition) {`
         * @param  {string} $0  Entire match
         * @param  {string} $1  Matches `condition`
         */
        line = line.replace(/if (?!\s*\()(.+)/, function($0, $1) {
            // if `if` is inside a string, bail out
            if (insideString("if", line)) return $0;
            return 'if (' + $1 + ') {';
        });


        /**
         * Conditional assignment operator
         * $0 matches `foo =|| bar`
         * $1 matches `foo`
         * $2 matches `bar`
         * @return {String} transformed line
         */
        //var condAssignment = /([\w\$]+)\s*\|\|=\s*(.+)/;
        //line = line.replace(condAssignment, function($0, $1, $2) {
            ////if (insideString("||=", line)) return $0;
            //return $1 + ' = ' + $1 + ' || ' + $2;
        //});

        if (debug) console.log(index + "  " + line);

        // all done, this is not the return that returns final joined array (see below)
        return line;

      } catch (error) {
        var stacktrace = error.stack
        .split('\n')
        .splice(1)      // remove redundant message
        .slice(0, 6)    // only the first few lines are relevant
        .join('\n')
        .gray;          // output a gray color

        var apology = "\n\nSorry, there was an error compiling " + fileName +
          " line " + (index + 1) + " :\n\n    " + line.trim();

        console.log(apology.red);
        console.log('\n    Error:'.red, error.message.red, '\n');
        console.log(stacktrace, '\n\n');

        process.exit();
      }
    });

    // return transformed lines

    return lines.join('\n');
};
