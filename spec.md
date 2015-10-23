# RedScript Spec Sheet

If you have suggestions on different syntax, please create
an issue: [here](https://github.com/AdamBrodzinski/RedScript/issues).

<br>

#### Variables & automatic semi-colon insertion  
*Status*: **Partially implemented, known bug**

Variables are automatically declared and cannot be re-declared.

```elixir
foo = 12                 const foo = 12;
```
<br>


#### Convenience method aliases for puts & printf

*Status:* **Working**  
`puts` is an alias to `console.log`. This is the only funciton that has optional parens at this time. If parens are omitted a closing paren will be appended to the end of the line.

```ruby
puts "Hello there"                      console.log("Hello there");
puts("Hai!")                            console.log("Hai")
```
<br>


#### Optional Parenthesis

*Status:* **Implemented with RedScript constructs only**

Currently I cannot implement this until I can create a proper lexer. Pull requests welcome ;-) For the time being you have to include parens. A temporary kludgey alias for `end)` is `end-`. This is slightly easier to look at for the short run, but expect this to be dropped in the future.

```ruby
alert 'Hello World!'

# this is how it should be with proper compiler support
some_method one, two

# currently you have to make do and use parens
some_method(one, two)
```
<br>


#### Comments

*Status*: *Working*

Line comments are made with a `#`. RedScript currently does not have multi-line comments but `/*...*/` can be used if needed.

```coffeescript
# I'm a comment                          // I'm a comment
$('#someID').html(foo)                   $('#someID').html(foo)
```
<br>




#### If/else/else if

*Status:* **Partially implemented**

If statements currently are multi-line only.

```ruby
if foo == 10                            if (foo === 10) {
  bar("do stuff")                         bar("do stuff");
else if foo == 20                       } else if (foo === 20) {
  bar("do stuff")                         bar("do stuff");
else                                    } else {
  bar("do stuff")                         bar("do stuff");
end                                     }

throw err if err                        if (err) { throw err; }
```
<br>



#### Modules and module functions

*Status:* **Not Working**

Modules in RedScript are one module per file. ***Multi modules per file will break***.
Public functions are defined with the `def` keyword. Private functions are defined with the `defp` keyword.


```elixir
defmodule PhoneUtils do                    // Module: PhoneUtils
  def normalize_number(number) do          export function normalize_number(number) {
    return number                            return _.chain(number)
    |> remove_char('-')                      .call(remove_char, '-')
    |> remove_char(' ')                      .call(remove_char, ' ')
    |> remove_us_code                        .call(remove_us_code).value();
  end                                      };

  def remove_us_code(str) do               export function remove_us_code(number) {
    return str.replace(/^+1/g, '')           return str.replace(/^+1/g, '')
  end                                      };

  defp remove_char(str, char) do           function remove_char(number) {
    return str.replace(/\s/g, '')            return str.replace(/\s/g, '')
  end                                      };
end
```
<br>

#### Block-like Syntax for Anonymous Functions

*Status:* **Working**

Block like syntax is a shorter way to write an anonymous function. The preceding comma is optional. However, including it may be easier to understand if it's included. Once we have optional parens working this will look *much* nicer! 
```ruby

app.get('/users/:user', do |req|        app.get('/users/:user', function(req) {
  puts req.params.name                    console.log(req.params.name);
end)                                    });

# no params
$myBtn.click( do                        $myBtn.click( function() {
  alert("hi")                             alert("hi");
end)                                    });
```
<br>

#### RequireJS Module Sugar 

*Status:* **Not Implemented**  

Using `define module` wraps the current file in a new anonymous RequireJS module. Exports can either be exported in a export object literal or by using `export foo` to export the foo variable only. Any dependencies can be declared by using `require 'foo' as foo` which sets up foo's returned value in a variable called `foo`.

```ruby

define module                                                   define([ 'jquery',
require 'jquery' as $                                                    './views/widget'],
require './views/widget' as Widget                                function($, Widget) {        

options = {                                                        var options = {
  moonRoof: true,                                                    moonRoof: true,   
  seats: 5                                                           seats: 5      
}                                                                  }          

getCost = 16899                                                    var getCost = 16899;
wheels = 4                                                         var wheels = 4;
 
# export literal compiles to an object that gets returned
export                                                              return {   
  getCost                                                               getCost : getCost,
  hasMoonRoof from options.moonRoof                                     hasMoonRoof : options.moonRoof,   
  getWheels from wheels                                                 getWheels : wheels     
end                                                                 }           
                                                                }); 
# --------------------------------------  new file  -------------------------------------------
define module                                                  define(function() {

func foo(x)                                                      var foo = function(x) {
  puts x                                                           console.log(x);
end                                                              }

export foo                                                       return foo; });
```
<br>

#### Ruby / Coffee style case switch statement

*Status:* **Working**

Switch statements still need `break` inserted to prevent falling through. The exception is one liners, then it's appened to the line.

```ruby
switch fruit                                             switch (fruit) {
when "apple"                                               case "apple":
  puts "it's an appppple"                                    console.log("it's an appppple");
  break                                                      break;
when "bannana" then puts("bannana")                        case "bannana": console.log("bannana"); break;
when "orange"                                              case "orange":
  puts "it's an orange"                                      console.log("it's an orange");
  break                                                      break;
default                                                    default:
  puts "uh oh, bummer"                                       console.log("uh oh, bummer");
end                                                      }
```
<br>

#### Private Blocks

*Status:* **Working**

Private blocks keep variables scoped inside the block using function scope. There is a slight performance hit due to the IIFE. Again, due to the lack of proper lexing/parsing I can't yet use an `end` block. A workaround is `endPriv`, this calls the IIFE. Also due to the variable declaration bug mention above, variables like the example below will currently need var manually inserted to keep `foo` from leaking out and changing global `foo` to `10`. The beginning of the IIFE is nerfed with a semi-colon to prevent any potential errors (especially with the current state of RedScript not having automatic semi-colon insertion). 

```ruby                                                   
foo = 200                                                 var foo = 200; 

private                                                  (function(){
  var foo = 10                                              var foo = 10;
endPriv                                                   })();

alert(foo) #alerts 200                                    alert(foo);
```
<br>

#### Classical Inheritance

*Status*: **Working**

RedScript classes are currently using John Resig's simple inheritance. In the future a solution closer to coffeescript would be ideal, allowing one to inherit from any constructor and still have the correct syntax. The current implementation will not inherit unless the base class is created with RedScript. However, backbone and ember both use the `.extend` method which is convenient since using `class Foo < Backbone.Model.extend(` will call their own extend implementation. Backbone does not have a `this._super` method so if you want to call super you would need to use a backbone plugin for that. Ember uses the same `this._super` syntax as RedScript so calling super will call Ember's implementation.

If you're only using their inheritance implementation you can disable the insertion of RedScript's inheritance by passing the `--no-class` flag.

```ruby
class Animal                                          var Animal = Class.extend({           
  def init(name)                                        init: function(name) {              
    @name = name                                          this.name = name;                 
  end,                                                  },                                  
                                                                                            
  def sayHi                                             sayHi: function() {                 
    puts "Hello"                                          console.log("Hello");             
  end                                                   }                                   
end                                                   });                                   
                                                                                            
class Duck < Animal                                   var Duck = Animal.extend({            
  def init                                              init: function(name) {              
    alert("#{@name} is alive!")                           alert(this.name + " is alive!")   
  end,                                                  },                                  
                                                                                            
  def sayHi                                             sayHi: function() {                 
    super                                                 this._super();                    
    puts "Quack"                                          console.log("Quack");             
  end                                                   }                                   
end                                                   });                                   

duck = new Duck('Darick')                             var duck = new Duck('Darick');
duck.sayHi()                                          duck.sayHi();
```
<br>

#### Prototypal Inheritance

*Status*: **Partially Implemented**

This is an experiment to try and bring out JavaScripts true prototypal nature. The goal is to be able to *easily* inherit without using constructors or faux classes. Vanilla JS makes it very difficult to inherit from another object, unlike [self](http://en.wikipedia.org/wiki/Self_programming_language#Inheritance.2FDelegation), JavaScript's inheritance inspiration. One of the drawbacks to property delegation is keeping state in an object. Using `object myDuck clones duck` will copy all of the properties from duck into myDuck, ensuring it won't grab it's parents property by accident. Currently `clones` is not implemeneted yet.

```ruby
object animal
  name: null,
  
  def sayHi
    puts "Hello"
  end
end

object duck
  parent*: animal,
  name: null,

  def sayHi
    puts "Quack"
  end
end

# this duck's attr's are cloned instead of deligated
# with `parent*`, usefull for statefull objects
#
object myDuck clones duck
  name: 'Darick'
end
```
