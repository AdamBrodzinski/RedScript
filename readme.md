# RedScript  
### A Ruby flavored superset of JavaScript

RedScript was created to provide a better syntax for AMD modules and to provide
a few aliases to make things a bit nicer to work with.

It was also created as a side project to learn more about Node, NPM Modules and
to learn Regular Expressions. In the future I would also like to add a
lexer/parser to implement more advanced features (feel free to fork!).

I would also like to let JavaScript's prototype goodness shine through by adding
conviences and syntax to make working with straight objects and prototypes
*easier* than using faux classes and constructors.

* Better syntax for AMD modules
* Better object inheritence
* Easier ES5 object litterals
* Alias { } with do end
* Alias is, isnt, and, or with ===, !==, &&, ||
* Arrow function
* More explicet object literals
* Define object methods with def keyword

Once I have a solid parser/lexer, I would like to implement:

* optional parens
* no var declarations (e.g. coffeescript/ruby/python)
* possibly optional type checking? not sure how useful it would be

### NPM module coming soon!


#### A better AMD RequireJS syntax
```coffeescript
# define an anonymous AMD module and require deps    // # define an anonymous AMD module and require deps
define module                                        define(
require 'jquery' as $                                ["jquery", "./libs/toolbox", "backbone"], function($,_,Backbone) {
require './libs/toolbox' as tb
require 'backbone' as Backbone                       

# do stuff                                           // do stuff

export {                                            return {
  apiName1: methodName1                             apiName1: methodName1
	apiName2: methodName2                             apiName2: methodName2 
}                                                   }
```

```coffeescript
# define an anonymous AMD module and require dependancies
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
require 'jquery' as $
require './myFile' as baz

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
