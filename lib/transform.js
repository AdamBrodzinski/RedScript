/**
 * RedScript compiler
 * Copyright(c) 2013 Adam Brodzinski <adambrodzinski@gmail.com>
 * MIT Licensed
 *
 * Transforms input line when regex matches otherwise returns
 * the same line untouched
 */


// Checks to see if keyword is used inside a string
// match: String  - keyword to match
// ln: String     - line to match against
// -> Bool - true if found
//
function insideString(match, ln) {
    var regex = "['\"][\\w\\s]*" + match + "[\\w\\s]*['\"]";
    var insideStr = new RegExp(regex, "g");
    return insideStr.test(ln);
}

// check if array contains element
// ex [1, 2].contains(2)  -> true
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
    // defines public and private module functions
    // returns String a -> String b
    define_function: function(line) {
        // example: def bar(a, b) do
        //
        // (^\s*)         begining of line
        // (def|defp)   $1 public or private def
        // (.*?)        $2 in betweend def ... do
        // \s*          optional space
        // do           opening keyword (bracket in JS)
        // \s*$         end of line
        var parts = line.match(/^(\s*)(defp\s|def\s)(.*?)\s*do\s*$/);
        if (!parts) return line;

        // ^(                $1
        // \s*[\w$]+         function name
        // )
        // (                 $2 optional params including parens
        //   \(              literal parens
        //     (.*?)         $3 just params
        //   \)              literal parens
        // )?
        // \s*$              trailing space
        var middle = /^(\s*[\w$]+)(\((.*?)\))?\s*$/;

        var leading = parts[1];
        var funcName = parts[3].trim().match(middle)[1];
        var params = parts[3].trim().match(middle)[3] || '';
        var _export = (parts[2].trim() === 'def') ? 'export ' : '';

        return leading + _export + 'function ' + funcName + '('+ params +') {';
    },


    // merges immutable objects or arrays together
    // returns String a -> String b
    merge_immutable: function(line) {
        var newLine;

        // ex: [foo <- 1,2,3]
        // [        opening array
        //   (.*)   $1 array to concat into
        //   (<-)   $2
        //   (.*)   $3 content to be merged
        // ]        closing array
        var regexArr = /\[(.*)(\<\-)(.*)\]/;

        // ex: {foo <- foo: true, bar: 2}
        // {        opening object
        //   (.*)   $1 obj to merge into
        //   (<-)   $2
        //   (.*)   $3 content to be merged
        // }        closing object
        var regexObj = /\{(.*)(\<\-)(.*)\}/;

        newLine = line.replace(regexArr, function($0, $1, $2, $3) {
            return $1.trim() + '.concat([' + $3 + ']);';
        });

        return newLine.replace(regexObj, function($0, $1, $2, $3) {
            return $1.trim() + '.merge({' + $3 + '});';
        });
    },


    // wraps value to be piped with lodash #chain method
    // returns String a -> String b
    wrap_with_immutable: function(line) {
        // (return|=)\s*    group $1 return OR = plus spaces
        // (                group $2
        //   [.*]           outermost array inc contents
        //   |              OR
        //   {.*}           outermost object inc. contents
        // )
        var regex = /(return|=)\s*(\[.*\]|\{.*\})/

        return line.replace(regex, function($0, $1, $2) {
            return $1 + ' Immutable(' + $2 + ')';
        });
    },


    // One liner piping
    // returns String a -> String b
    pipe_operator_single_line: function(line, index, lines) {
        var newLine;
        if (insideString('|>', line)) return line;
        // line does not have a one liner pipeline
        if (!line.match(/(\=|return)(.*?)(\|\>)/)) return line;
        // if next line has a pipe operator
        if (lines[index] && lines[index + 1].match(/^\s*\|\>/)) return line;

        // http://rubular.com/r/wiBJtf12Vn
        // (^.+?)     $1 value to pipe
        // \s*        optional spaces
        // (\|\>)     $2 |> pipe operator
        // (.*?)$     $3 tail minus first pipe ($2)
        //
        var parts = line.match(/(^.+?)\s*(\|\>)(.*?)$/);
        var head = parts[1]
        var tail = parts[2].concat(parts[3]);

        // process head depending on if it's immuttable or not
        if (head.match('Immutable')) {
            head = head.replace('Immutable', '_.chain(Immutable');
        }
        else if (head.match(/^\s*return/)) {
            head = head.replace('return ', 'return _.chain(');
        }
        else if (head.match(/\s=\s/)) {
            head = head.replace('= ', '= _.chain(');
        }

        tail = tail.replace(/(\s*\|\>\s*)/g, function($0, $1) {
            return ').pipesCall(';
        })

        return head + tail + ').value();'
    },


    // wraps value to be piped with lodash #chain method
    // returns String a -> String b
    wrap_with_chain: function(line, index, lines) {
        var hasPipe = /^\s*\|\>/;
        var nextLine = lines[index + 1] || '';

        if (line.match(hasPipe)|| !nextLine.match(hasPipe)) {
          return line;
        }
        // handle wrapping returned values
        else if (line.match(/^\s*return/)) { // starts with return
          return line.replace(/^return (.+)/, function($0, $1) {
              return 'return _.chain(' + $1 +')';
          });
        }
        // handle wrapping assignments eg, foo = [1, 2, 3]
        else if (line.match(/^\s*[\w$]+\s+\=\s+/)) { // starts with `foo =`
          return line.replace(/(^\s*[\w$]+\s+\=\s+)(.+)/, function($0, $1, $2) {
              return $1 + '_.chain(' + $2 +')';
          });
        }
        else if (!!line.trim()) {
          return '_.chain(' + line + ')';
        }
        else {
          return line;
        }
    },


    // Transforms pipe |> operator into a lo-dash call (mixed-in)
    // returns String a -> String b
    pipe_operator_multi_line: function(line, index, lines) {
        if (insideString('|>', line)) return line;

        // ^\s?             // leading spaces
        // (\|\>\s*)        // |> pipe operator inc trailing spaces
        // ([\.\w_]+\s*)    // function/method name inc trailing spaces
        // (.*)             // additional (optional) params
        //
        // $0 `|> my_func take 99`
        // $1 `|>`
        // $2 `my_func`
        // $3 `99`
        //
        var regex = /^(\|\>\s*)([\.\w_]+\s*)(.*)$/;

        return line.replace(regex, function($0, $1, $2, $3) {
            var comma;
            var newLine;
            var hasLambda = $3.match(/=>/);

            // strip parens
            if (!hasLambda) {
              $3 = $3.replace(/^\(|\)$/g, '');
            }

            comma = $3 ? ', ' : '';

            newLine = '.pipesCall(' + $2.trim() + comma + $3 + ')';

            // if next line doesnt have a pipe operator
            if (!lines[index + 1].match(/^\s*\|\>/)) {
                newLine = newLine.trimRight() + '.value();';
            }
            return newLine;
        });
    },


    // adds `const` to any declaration, works with shorthand operators
    // String a -> String b
    declare_const: function(line) {
        //^
        // (\s*)        $1 opts leading spaces
        // ([\w$]+\s*)  $2 variable name & trailing spaces
        // (\=)         $3 division equals OR
        // \s*          opt spaces
        // (.*?)        rest of expression to assign
        // $
        var parts = line.match(/^(\s*)([\w$]+)\s*(\=)\s*(.*?)$/);
        if (!parts) return line;

        var leadingSpace = parts[1];
        var name = parts[2].trim();
        var operator = parts[3].trim();
        var rest = parts[4];

        return leadingSpace + 'const ' + name + ' ' + operator + ' ' + rest;
    },


    // transform ? to a JS safe char foo? -> foo__q
    // String a -> String b
    question_operator: function(line) {
        // ([\w$]+)  $1 root name
        // (\?)      $2 ? suffix
        return line.replace(/([\w$]+)(\?)/, '$1__q');
    },


    // removes defmodule keyword since ES6 modules don't have
    // to be wrapped inside an object literal. Removes the last
    // line of the module to remove dangling module `end`
    //
    // state - Object used to keep state of file
    //   hasModule: Bool - flag used to prepend import 
    //
    // String a -> String b
    define_module: function(line, lines, state) {
        if (!line.match(/^\s*defmodule/)) return line;

        state.hasModule = true;
        var lline;
        var newLine = line.replace(/^\s*defmodule\s+([\w$]+)\s+do\s*$/, 'RS_REMOVE_LINE');

        // ** side effect, removes last 'end'
        for (var i=1, n=lines.length; i < n; i++) {
          lline = lines[lines.length - i];
          if (lline.match('end')) {
            lines[lines.length - i] = '';
            return newLine;
          }
        }
    },


    // XXX cleanup impl
    /** Convert Comments from # to //
     * @param  {string} - accepts line as a string
     * @return {string} - transformed line
     * @api public
     */
    comments: function(line) {
      if (line.match(/^\s*\#+/g)) { // line starts with comment
        return line.replace(/\#/, '//');
      } else {
        return line;
      }
    },
};
