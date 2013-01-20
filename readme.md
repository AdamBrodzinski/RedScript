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
* Alias { } with do end
* Alias is, isnt, and, or with ===, !==, &&, ||
* Arrow function
* More explicet object literals
* Define object methods with def keyword

### NPM module coming soon!


```coffeescript
# define an anonomous amd module and require dependancies
define module
require 'jquery' as $
require './myFile' as baz


# Private blocks
foo = 200
private
  foo = 10
end
alert foo


# Arrow function, great for parameters
mbtn.on 'click', ->
  $('.widget').slideToggle "slow"
end


while foo is 200 do
  console.log "I'm looping forever"
end

```

See more syntax examples on RedScript's website (coming soon)
