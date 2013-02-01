/*!
 * RedScript compiler
 * v 0.0.1
 * Copyright(c) 2013 Adam Brodzinski <adambrodzinski@gmail.com>
 * MIT Licensed
 */

module.exports = function(file) {
    var lines = file.split('\n')
      , debug = false;

    // Itterate through each line and transform text
    lines = lines.map(function(line, index) {
        if (debug) console.log(index + "  " + line);

        // Matches an @foo or @. or @
        var atSymbol = /@(?=[\w$])|@\.|@/g;

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
         * if it's bracketless, insert bracket and close EOL
         */
        line = line.replace(/puts\(/, "console.log(");
         // if bracketless puts, replace puts & append );
        if (/puts /.test(line)) {
            line = line.replace(/puts /, "console.log(") + ");";
        }


        if (debug) console.log(index + "  " + line);
        return line;
    });
    return lines.join('\n');
};
