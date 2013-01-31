/*!
 * RedScript compiler
 * v 0.0.1
 * Copyright(c) 2013 Adam Brodzinski <adambrodzinski@gmail.com>
 * MIT Licensed
 */


/**
 * Dependencies
 */
//var aliasTokens = require('./aliases');

module.exports = function(file) {
    var lines = file.split('\n')
      , debug = false;

    // Itterate through each line and transform text
    lines = lines.map(function(line, index) {
        if (debug) console.log(index + "  " + line);

        // Matches an @foo or @. or @
        var atSymbol = /@(?=[\w$])|@\.|@/g;

        // normalize comments before processing
        line = line.replace(/#/g, '//'); //*************** repl with #[^\{]

        // if line begins with a comment, return
        if (/^\/\//.test(line.trimLeft())) return line;
        
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

        // alias do and end with { and }
//      line = line.replace(/do/g, '{');
//      line = line.replace(/end/g, '}');



        if (debug) console.log(index + "  " + line);
        return line;
    });
    return lines.join('\n');
};
