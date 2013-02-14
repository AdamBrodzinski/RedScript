# RedScript  
### A Ruby flavored superset of JavaScript

* Paste in compatibility with JS (except a few keywords)
* Cleaner syntax for AMD modules (CommonJS sugar coming later)
* Easier prototypal inheritance
* Cleaner ES5 object literals
* Optional Ruby/CoffeeScript like aliases
* String interpolation
* Block like syntax for anonymous functions
* Function expressions, define functions in a Ruby like way
* ------ Check [History.md](https://github.com/AdamBrodzinski/RedScript/blob/master/History.md) for current working syntax ------


RedScript was created to provide a better syntax for AMD modules and to provide
a few aliases to make things a bit nicer to work with (my favs being func, @, puts, ->, and >>).

It was also created as a side project to learn more about Node, NPM Modules and Regular Expressions. In the future I would also like to add a propper lexer/parser to implement more advanced features like optional parens and optional var declarations (feel free to fork!).

You can read more about it on my blog: [Introducing RedScript](http://adamb.me/blog/2013/01/27/introducing-redscript/).


#### To Install and Run
```
npm install -g redscript

redscript watch [fileName fileName2]
```

#### Learning RedScript is easy, add a bit here and there until you're comfortable!
```coffeescript

# No RedScript syntax... still works!
function sayHello(name) {
  console.log("Hello " + name);  
}

# function expressions                                 // function expressions
func sayHello(name)                                    var sayHello = function(name) {
  # puts aliases console.log                             // puts aliases console.log
  puts "Hello #{name}"                                   console.log("Hello " + name);
end                                                    }
```


#### A better AMD RequireJS syntax
```coffeescript
define module                                                   define(
require 'jquery' as $                                           ['jquery',
require './views/widget'  as Widget                             './views/widget'], function($, Widget) {        

options = {                                                        var options = {
  moonRoof: true,                                                    moonRoof: true,   
  seats: 5                                                           seats: 5      
}                                                                  }          

getCost = 16899                                                var getCost = 16899;
wheels = 4                                                     var wheels = 4;
 
# export literal compiles to an object that gets returned
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


# Block like syntax for anonnynous functions 
myBtn.on 'click', do |e|
  e.preventDefault()
  @widget.slideToggle "slow"
end


# Alias this with @.
model.on('change', @render)


# Private blocks
foo = 200
private
  foo = 10
end
alert(foo)  # alerts 200


# Paren free for/while
while foo is 200
  puts "I'm looping forever"
end


# Multi-Line if/else/else if
if foo == 10
  bar("do stuff")
else if foo == 20
  bar("do stuff")
else
  bar("do stuff")
end


# Ruby/Coffee style switch statements
switch fruit                                             switch (fruit) {
when "apple"                                               case "apple":
  puts "it's an appppple"                                    console.log("it's an appppple");
  break;                                                     break;
when "bannana" then puts("bannana")                        case "bannana": console.log("bannana"); break;
when "orange"                                              case "orange":
  puts "it's an orange"                                      console.log("it's an orange");
  break;                                                     break;
default                                                    default:
  puts "uh oh, bummer"                                       console.log("uh oh, bummer");
end                                                      }
```

```
    # object literal declarations
    
    object myWidget
      key, "value"
      def sayHi(name)
        puts "Hello #{name}"
      end,
      def getKey
        return @key
      end
    end

    # define method outside of object literal

    def myWidget.sayBye
      puts "goodbye!"
    end

    # attaches baz to String's prototype

    def String >>> baz(x)
      # do stuff
    end
```




See more syntax examples on RedScript's website (coming soon)

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/5bb5e651dc61d19e3b5121ed1f33902c "githalytics.com")](http://githalytics.com/AdamBrodzinski/RedScript)
