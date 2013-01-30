# RedScript  
### A Ruby flavored superset of JavaScript

* Paste in compatibility with JS (except a few keywords)
* Cleaner syntax for AMD modules (or opt out)
* Easier prototypal inheritance
* Cleaner ES5 object literals
* Optional Ruby/CoffeeScript like aliases
* String interpolation
* Arrow function ` -> ` and ` (foo, bar) -> `
* ------ Check History.md for current working syntax ------


RedScript was created to provide a better syntax for AMD modules and to provide
a few aliases to make things a bit nicer to work with (my favs being func, @, puts, ->, and >>).

It was also created as a side project to learn more about Node, NPM Modules and Regular Expressions. In the future I would also like to add a propper lexer/parser to implement more advanced features like optional parens and optional var declarations (feel free to fork!).

You can read more about it on my blog: [Introducing RedScript](http://adamb.me/blog/2013/01/27/introducing-redscript/).


#### To Install
`npm install -g redscript`


#### Learning RedScript is easy, add a bit here and there until you're comfortable!
```coffeescript

# No RedScript syntax, still works!
function sayHello(name) {
  console.log("Hello " + name);  
}

# A little bit of RedScript, func is a more terse alias function, string interpolation
func sayHello(name) {
  console.log("Hello #{name}");
}


 # A lot of RedScript, alias brackets with do/end, puts aliases console.log
func sayHello(name) do
  puts "Hello #{name}"
end

```


#### A better AMD RequireJS syntax
```coffeescript
define module                                                   define(
require 'jquery' as $                                           ['jquery',
require './views/widget'  as Widget                             './views/widget'], function($, Widget) {        

var options = {                                                    var options = {
  moonRoof: true,                                                    moonRoof: true,   
  seats: 5                                                           seats: 5      
}                                                                  }          
 
var getCost = 16899                                                var getCost = 16899;
var wheels = 4                                                     var wheels = 4;
 
# export literal compiles to an object that gets returned          // export literal compiles to an object that gets returned          
export                                                              return {   
  getCost                                                               getCost : getCost,
  hasMoonRoof from options.moonRoof                                     hasMoonRoof : options.moonRoof,   
  getWheels from wheels                                                 getWheels : wheels     
end                                                                 }           
                                                                }); 
```

```coffeescript
define module
require "jquery" as $

# Arrow function, great for parameters, (opt parens not currently avail.)
myBtn.on 'click', ->
  $('.widget').slideToggle "slow"
end

# Alias @ with this.
model.on('change', @render)


# Private blocks
foo = 200
private
  foo = 10
end
alert(foo)  # alerts 200


# Paren free if/for/while
while foo is 200 do
  puts "I'm looping forever"
end

```

See more syntax examples on RedScript's website (coming soon)

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/5bb5e651dc61d19e3b5121ed1f33902c "githalytics.com")](http://githalytics.com/AdamBrodzinski/RedScript)