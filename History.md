### 2-6-13 0.0.7

* added bracketless if/else if/else statements.
* found bug were some keywords in string are getting transformed, working on a fix for this.
added string interpolation. You can add anything inside of #{....} except for curly brackets.... that won't compile.

### 2-1-13 0.0.6

* Added `func` keyword. This now defines a function using a variable name.

```
    func foo                     var foo = function() {
      puts "hello world"           console.log("hello world");
    end                          }

    func bar(p1, p2)             var bar = function(p1, p2) {
      puts p1 + p2                 console.log(p1 + p2);
    end                          }
```
* Added Ruby/CoffeeScript style case/switch statement. Switch is kept the same, as using Ruby's case would be confusing/awkward to most JS devs. A few caveats, currently you still must use break to prevent falling through, unless it's a one liner while/then. In that case the break gets appended automatically. Also the default keyword is still default. I can't use else without lexing the case statement first... perhaps this will change to else in the future. Vanilla Switch/Case still works as normal

### 2-1-13 0.0.5

* Added arrow functions. These work like CoffeeScript with one caveat. They need to be closed with a `}` or end. This means using them as a callback will require `});` or `end);` for the time being.
* 

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