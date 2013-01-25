/**
 * cmdLine - A small utility to extract args from process.argv
 */


/**
 * Find options flags in argv
 * @param  {array} argList -- Pass in process.argV
 * @return {object} -- return options with boolean state
 * @api public
 */
exports.getOptions = function(argList){
    var options;

    // default options
    options = {
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
                console.log("watching not built in yet... bummer!!");
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
 * Filter through arguments and return only files
 * @param  {array} argList -- expecting from process.argv
 * @return {array}         -- list of files
 */
exports.getFiles = function(argList){
    var files = [];
    
    // filter through args and return only files
    argList.forEach(function(arg){
        if (arg === 'watch'
            || arg === '-w'
            || arg === '--watch'
            || arg === '--no-semicolon-comp') {
            // if it's a flag, do nothing
        } else {
            // it's a file, push to files array
            if (!/.+\.rs/i.test(arg)) throw "error, expected file ending in .rs";
            files.push(arg);
        }
    });
    return files;
};
