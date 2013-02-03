/*!
 * RedScript compiler
 * Copyright(c) 2013 Adam Brodzinski <adambrodzinski@gmail.com>
 * MIT Licensed
 */

module.exports = function(file) {
    var lines = file.split('\n')
      , debug = false;

    // Iterate through each line and transform text
    lines = lines.map(function(line, index) {
        if (debug) console.log(index + "  " + line);

        // Matches an @foo or @. or @
        var atSymbol = /@(?=[\w$])|@\.|@/g
        /**
         * Matches `func` keyword with and without parens
         * @type {RegExp}
         * given `func foo(p)` & `func bar`
         * $1 captures foo
         * $2 captures (p)
         * $3 captures bar     (matches only no parens)
         */
          , funcRgx = /func\s([\w$]+)(\((?:[\w$, ]+)?\))|func\s([\w$]+)/g

        /**
         * Matches `when` OR `when` and `then`.
         * @type {RegExp} See function for more info
         */
          , switchWhenThen = /(when)\s(.+)(then)(.+)|(when)\s(.+)/;

        // normalize comments before processing
        line = line.replace(/#(?!\{)/g, '//');

        // if line begins with a comment, return
        if (/^\/\//.test(line.trimLeft())) return line;

        /**
         * Alias `do` with `{`
         * fakes negative lookbehind for { or word char, this
         * prevents aliasing a properly formated do loop
         * @return {string} returns `}` if lookbehind is false
         */
        line = line.replace(/(\w)?do(?! \{|\{|\w)/g, function($0, $1) {
            return $1 ? $0 : '{';
        });


        /**
         * Alias `end` with `}`
         * fakes a negative lookbehind for a word char
         * @return {string} returns `}` if lookbehind is false
         */
        line = line.replace(/(\w)?end(?!\w)/g, function($0, $1) {
            return $1 ? $0 : '}';
        });


        /**
         * Find any instance of @ and replace it with the
         * appropriate this.
         */
        line = line.replace(atSymbol, function(match) {
            // if line contains @foo, @_foo or @$foo
            if (/@(?=[\w$])/.test(line)) return 'this.';
            // else if matches @.foo, @._foo or @.$foo
            else if (match === '@.') return "this.";
            else return "this";
        });


        /**
         * Alias puts with console.log
         * if it's bracketless, insert bracket and close at EOL
         */
        line = line.replace(/puts\(/, "console.log(");
         // if bracketless puts, replace puts & append );
        if (/puts /.test(line)) {
            line = line.replace(/puts /, "console.log(") + ");";
        }


        /**
         * Alias printf with process.stdout.write
         * if it's bracketless, insert bracket and close EOL
         */
        line = line.replace(/printf\(/, "process.stdout.write(");
         // if bracketless puts, replace puts & append );
        if (/printf /.test(line)) {
            line = line.replace(/printf /, "process.stdout.write(") + ");";
        }


        /**
         * Replace an arrow function to regular function. Function can either
         * be a single arrow `->`, with empty parens `() ->` and an arrow with
         * params, `(foo, bar) ->. One space between arrow is optional.
         *
         * @param  {string} $0  Entire match
         * @param  {string} $1  matches outside of parens
         * @param  {string} $2  matches inside of parens
         * @return {string}     a normal function `function () {`
         */
        line = line.replace(/(\(([\w$, ]*?)\))?\s{0,1}->/, function($0, $1, $2) {
            // if there are no parens in expression
            if (!$1) {
                return "function () {";
            // else if it has parens and params
            } else if ($1 && $2) {
                return "function (" + $2 + ") {" ;
            // else if it parens with no params
            } else if ($1) {
                return "function () {";
            } else {
                throw console.log("Unexpected arrow formatting. Saw: ", $0);
            }
        });


        /**
         * Replaces `func foo` declaration with `var foo = function() {`
         * Parens are optional with no params are use.
         *
         * @param  {regex}  funcRgx - Regex declared top of scope
         * @param  {string} $0     Entire match
         * @param  {string} $1     Function name
         * @param  {string} $2     Function name if no parens are found
         * @param  {string} $3)    Parens including any params
         * @return {string}        Processed function string
         */
        line = line.replace(funcRgx, function($0, $1, $2, $3) {
            var nameP = $1
              , nameNP = $3
              , parens = $2;

            if (nameP && parens) {
                return "var " + nameP +" = function" + parens + " {";
            } else if (nameNP) {
                return "var " + nameNP +" = function" + "() {";
            }
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
        line = line.replace(/default(?!\:)/, 'default:');
        

        if (debug) console.log(index + "  " + line);
        return line;
    });
    return lines.join('\n');
};
