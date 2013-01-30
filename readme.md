# RedScript  
### A Ruby flavored superset of JavaScript

RedScript was created to provide a better syntax for AMD modules and to provide
a few aliases to make things a bit nicer to work with.

It was also created as a side project to learn more about Node, NPM Modules and Regular Expressions. In the future I would also like to add a lexer/parser to implement more advanced features like optional parens and optional var declarations (feel free to fork!).

I would also like to let JavaScript's prototypal goodness shine through by adding
convinces and syntax to make working with just objects & prototypes
*easier* than using faux classes with constructors.

* Cleaner syntax for AMD modules
* Easier prototypal object inheritance
* Cleaner ES5 object literals
* Alias `{` `}` with `do` & `end`
* Alias `is`, `isnt`, `and`, `or` `==`   with   `===`, `!==`, `&&`, `||` `===`
* Alias `prototype` with `>>`
* Alias `#` with `//`
* Alias `func` with `function`
* Arrow function ` -> ` and ` (foo, bar) -> `
* Define object methods with def keyword

#### To Install
`npm install -g redscript`

#### *** Check History.md for changes and current working syntax ***

#### A better AMD RequireJS syntax
```coffeescript
define module                                                   define(function() {        
 
var options = {                                                     var options = {
    moonRoof: true,                                                     moonRoof: true,   
    seats: 5                                                            seats: 5      
}                                                                   }          
 
getCost = 16899                                                 var getCost = 16899;  
var wheels = 4                                                      var wheels = 4;
 
# export literal compiles to an object that gets returned           // export literal compiles to an object that gets returned          
export                                                              return {   
  getCost                                                             getCost : getCost,
  hasMoonRoof from options.moonRoof                                   hasMoonRoof : options.moonRoof,   
  getWheels from wheels                                               getWheels : wheels     
end                                                                 }           
                                                                }); 
```

```coffeescript
# define an anonymous AMD module and require dependencies
define module
require 'jquery' as $
require './utils/toolbox' as tb

function sayHello () {
  $('body').html('Hello World!');
}

# Arrow function in a callback
fs.readFile('/etc/passwd', (err, data) ->
  if (err) throw err;
  console.log(data);
});

# Alias @ with this.
model.on('change', @render)

```


```coffeescript
define module

# Func alias
func sayHello () {
  alert("Hi!");
}

# alias { } with do end
func sayHello(msg) do
  alert(msg);
end

# Private blocks
foo = 200
private
  foo = 10
end
alert foo  # alerts 200

# Arrow function, great for parameters
mbtn.on 'click', ->
  $('.widget').slideToggle "slow"
end

# Paren free if/for/while
while foo is 200 do
  console.log "I'm looping forever"
end

```

See more syntax examples on RedScript's website (coming soon)

![analytics](http://cl.ly/image/1R062u1A290l)
