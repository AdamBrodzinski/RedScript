# RedScript  
### A Ruby flavored superset of JavaScript

* Paste in compatibility with JS
* Cleaner syntax for AMD modules (CommonJS sugar coming later)
* Easier class like inheritance & self based prototypal inheritance syntax
* Cleaner ES5 object literals with ruby like `attr` syntax
* Pragmatic Ruby syntax that still behaves like JavaScript
* Easy debugging
* Source Maps
* ------ Check [spec.md](https://github.com/AdamBrodzinski/RedScript/blob/master/spec.md) for full syntax and know bugs------

<br>

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

# Make constructors quack like a duck
#
class Duck < Animal
  def init(name)
    @name = name
  end,

  def sayHi
    puts 'Quack'
  end
end

# Easier prototypal inheritance (influenced from self)
#
raceCar = {
  parent*: car,
  topSpeed: 200
}
```
See [spec.md](https://github.com/AdamBrodzinski/RedScript/blob/master/spec.md) for more!

