# RedScript  
### A Ruby flavored superset of JavaScript

* Paste in compatibility with JS (except a few keywords)
* Cleaner syntax for AMD modules (CommonJS sugar coming later)
* Easier prototypal inheritance
* Cleaner ES5 object literals
* Ruby like syntax that still behaves like JavaScript
* Easy line by line debugging
* Source Maps
* ------ Check [spec.md](https://github.com/AdamBrodzinski/RedScript/blob/master/spec.md) for full syntax and know bugs------

.

RedScript was created to provide a better syntax for AMD modules, easier inheritance and more usable ES5 syntax.

It was also created as a side project to learn more about Node, NPM Modules and Regular Expressions. In the future I would also like to add a proper lexer/parser to implement more advanced features like optional parens and ES5 `attr` properties. *Pull requests welcome ;-)*

You can read more about it on my blog: [Introducing RedScript](http://adamb.me/blog/2013/01/27/introducing-redscript/).


#### To Install Globally and Run

```
npm install -g redscript
redscript watch [fileName fileName2]
```

#### A little RedScript...

```ruby
# RequireJS Modules...
#
define module
require Backbone as BB
require './views/widget' as WidgetView


# Block-like anonymous functions
#
app.get '/users/:name', do |res, req|
  puts req.params.name
end


# Paren-free constructs
#
if foo == 2
  puts "It's #{foo}"
else
  alert "Rut Roh"
end
```
See [spec.md](https://github.com/AdamBrodzinski/RedScript/blob/master/spec.md) for more!

