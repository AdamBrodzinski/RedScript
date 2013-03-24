# RedScript  
### A Ruby Flavored JavaScript Experiment

* Paste (almost) any JS into a RedScript file
* Cleaner syntax for modules (AMD and CommonJS)
* Easier class like inheritance & self based prototypal inheritance syntax

RedScript was created to provide a better syntax for AMD modules, easier inheritance and more usable ES5 syntax. It was also created as a side project to learn more about Node, NPM Modules and Regular Expressions. In the future I would also like to add a proper lexer/parser to implement more advanced features like optional parens and ES5 `attr_accessor` like properties. *Pull requests welcome ;-)*

You can read more about it on my blog: [Introducing RedScript](http://adamb.me/blog/2013/01/27/introducing-redscript/).


#### To Install Globally and Run

```
sudo npm install -g redscript
redscript watch [fileName fileName2]
```

#### A little RedScript...

```ruby
# RequireJS AMD Modules...
#
define module
require 'backbone' as Backbone                                       * see spec.md for full translation
require './views/widget' as WidgetView


# Block-like anonymous functions
# Note, parens are currently req. around get/end, see spec.md
#
app.get '/users/:name', do |res, req|                                 app.get('/users/:name', function(res,req) {
  puts req.params.name                                                  console.log(req.params.name);
end                                                                   });


# Paren-free constructs
#
if foo == 2                                                           if (foo === 2) {
  puts "It's #{foo}"                                                    console.log("It's " + foo);
else                                                                  } else {
  alert "Rut Roh"                                                       alert("Rut Roh");
end                                                                   }


# Make constructors quack like a duck
#                                                                     # note, inheritance methods are opt. inserted
class Duck < Animal                                                   var Duck = Animal.extend({
  def init(name)                                                        init: function(name) {
    super foo, bar                                                        this._super(foo, bar);
    @name = name                                                          this.name = name;
  end,                                                                  },

  def sayHi                                                             sayHi: function() {
    puts 'Hello!'                                                         console.log('Hello!');
  end                                                                   }
end                                                                   });


# Easier prototypal style inheritance (influenced from self)
#                                                                     # uses non-standard __proto__ prop
raceCar = {                                                           var racecar = {
  parent*: car,                                                         __proto__: car,
  topSpeed: 200                                                         topSpeed: 200
}                                                                     }
```
### See [spec.md](https://github.com/AdamBrodzinski/RedScript/blob/master/spec.md) for full syntax!

