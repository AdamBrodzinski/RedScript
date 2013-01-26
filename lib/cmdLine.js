/*!
 * RedScript compiler
 * v 0.0.1
 * Copyright(c) 2013 Adam Brodzinski <adambrodzinski@gmail.com>
 * MIT Licensed
 */


/**
 * Find options flags in argv
 * @param  {array} argList -- Pass in process.argV
 * @return {object} -- return options with boolean state
 * @api public
 */
exports.getOptions = function(argList){
    // default options
    var options = {
        watchFiles: false,
        //moduleType: 'requirejs',
        //ES5: true,
        aliases: true,
        //defMethods: true,
        insertSemiColons: true,
        //varTypes: true
    };

    argList.forEach(function(arg){
        // flip da switches
        switch (arg) {
            case 'watch':   // watch or -w or --watch, turn on watchFiles
            case '-w':
            case '--watch':
                options.watchFiles = true;
                break;
            case '--no-semicolon-comp': // turn off janky semicolon insertion
                options.insertSemiColons = false;
                break;
            default: // it's a file (hopefully)
        }
    });
    return options;
};


/**
 * Filter through arguments and return only files. If the file
 * name does not have a .rs extension, a warning is thrown.
 *
 * @param  {array} argList -- expecting from process.argv
 * @return {array}         -- list of files
 * @api public
 */
exports.getFiles = function(argList){
    var files = [];
    // filter through args and return only files
    argList.forEach(function(arg){
            // if it's a flag, fall through and do nothing
        if (arg === 'watch'
            || arg === '-w'
            || arg === '--watch'
            || arg === '--no-semicolon-comp') {
        } else {
            // it's a file, push to files array
            if (!/.+\.rs/i.test(arg)) throw "error, expected file ending in .rs";
            files.push(arg);
        }
    });
    return files;
};
