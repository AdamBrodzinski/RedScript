### 1-31-13 0.0.4

* Added error message when no files are passed into compiler
* Added alias for printf (node only, aliases `#process.stdout.write`)
* Added aliases `do` and `end`, works with properly formatted do while loops
* Added alias `puts` (aliased to console.log)
* Fixed commenting out string interpolation " #{foo} "
* Fixed issue with @ not working in 0.0.3, `@` now aliases `this` properly

### 1-26-13 0.0.3

* Tests made for cmdLine.js and compile.js
* File watch now works with individual files (dir watch coming soon)
* Single line hash comments working
* @ alias partially working, a floating @ for a context param will compile to @.

### 1-25-13 0.0.2
* Lots of housecleaning

### 1-24-13 0.0.1

* Setup app structure and basic file IO