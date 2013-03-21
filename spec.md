# RedScript Spec Sheet

If you have suggestions on different syntax, please create
an issue: [here](https://github.com/AdamBrodzinski/RedScript/issues).

<br>

#### Automatic variable declaration & automatic semi-colon insertion  
*Status*: **Working, known bug**

Currently RedScript does not take function scope into account. Any 
variables that are declared inside of a function multiple times can
lead to unintended global leaks. To disable auto declaration pass
`--no-declaration` as an argument. Another work around is to manually
declare variables with the var keyword. Constants are pre-processed at
compile time. This allows some memory savings in certain cases where it
can be utilized.

```ruby
foo = 12                 var foo = 12;
foo = 20                 foo = 20;

# Constants are preprocessed
AMOUNT = 233
puts AMOUNT             console.log(233)

# !! Lexical scoping bug in current version !!
func foo                var foo = function() {
  baz = 20                var baz = 20;       
end                     };                    

func bar                var bar = function() {
  baz = 30                baz = 30;       
end                     };                     
```
<br>

#### Convenience method aliases for puts & printf

*Status:* **Working**  
`puts` and `printf` are aliases to `console.log` and `process.stdout.write`. `printf` is only available with node enviroments. These are the only methods that have optional parens at this time. If parens are omitted a closing paren will be appended to the end of the line. Parenless multi lines are not possible.

```ruby
puts "Hello there"                      console.log("Hello there");
puts("Hai!")                            console.log("Hai")
printf "Hola"                           process.stdout.write("Hola")
printf("Hola")                          process.stdout.write("Hola")
```
<br>

#### Optional Parenthesis

*Status:* **Implemented with RedScript constructs only**

Currently I cannot implement this until I can create a proper lexer. Pull requests welcome ;-) For the time being you have to include parens. A temporary kludgey alias for `end)` is `end-`. This is slightly easier to look at for the short run, but expect this to be dropped in the future.

```ruby
alert 'Hello World!'

getUser '/users/1', do
  alert user
end

# Currently you still have to use parens for anything that's not a RedScript construct.
getUser( '/users/1', do
  alert(user)
end)

# A kludgey alias for `end)` is `end-`
getUser( '/users/1', do
  alert(user)
end-
```
<br>


#### Ruby flavored function expressions

Func declares the function as an expression. I am still undecided if `func` should decalare it like below or just compile into a regular function. The lack of function hoisting obviosly has it pro's and cons. Vanilla JS functions of course will still work as well.

*Status:* **Working**

```ruby
func say(msg)                            var say = function(msg) {
  puts "Message: #{msg}"                   console.log("Message: " + msg);
end                                      };

# Optional function parens
func sayHello
  puts "Hello"
end
```
<br>

#### Comments

*Status*: **Known Bug**

Comments currently have a bug, they cannot immediately follow a word character. This is due to hashes being interpolated inside a string, thus creating a comment inside a jQuery selector. RedScript currently does not have multi-line comments but `/*...*/` can be used.

```coffeescript
# I'm a comment, compiles ok             // I'm a comment, compiles ok
#Currently failing to compile            #Currently failing to compile 
$('#someID').html(foo)                   $('#someID').html(foo) # No worries here
```
<br>

#### Alias @ with this

*Status:* Working

```ruby
function FooClass(name, age) {           function FooClass(name, age){
  @name = name                             this.name = name;
  @age = age                               this.age = age;
}                                        }
```
<br>


#### Loops

*Status:* **Not Implemented**

Parens are optional on multi-line for/while/until statements
```ruby
while foo == 200                        while (foo === 200) {
  puts "I'm looping forever"              console.log("I'm looping forever");
end                                     }

for key in obj                          for (var key in obj) {
   alert(key)                             alert(key);
end                                     }

for key,val in obj                      for (var key in obj) { var val = obj[key];
  puts 'My key is: #{key}'                console.log('My key is: ' + key);
  puts 'My value is: #{val}'              console.log('My value is: ' + val);
end                                     }
```
<br>

#### If/else/else if

*Status:* **Partially implemented**

If statements currently are multi-line. If you would like to use a one liner, you can still use vanilla js `if (err) throw err;`.

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

#### Methods & Object Literal

*Status:* **Working**

```ruby
object auto                                   var auto = {
  wheels: 4,                                    wheels: 4,
  engine: true,                                 engine: true,

  def honk                                      honk: function() {
    puts "hoooonk"                                console.log("hooooonk");
  end,                                          },

  def sayHi(msg)                                sayHi: function(msg) {
    puts msg                                      console.log(msg);
  end                                           }
end                                           }

# Define outside of object literal
def auto.add(x, y)                            auto.add = function(x,y) {
  return x + @wheels                            return x + this.wheels;
end                                           };

# Define method attached to prototype
def Car >>> sub(x,y)                          Car.prototype.sub = function(x, y) {
  return x - y                                  return x - y;
end                                           };
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
# --------------------------------------  new file below  -------------------------------------------
define module                                                  define(function() {

func foo(x)                                                      var foo = function(x) {
  puts x                                                           console.log(x);
end                                                              }

export foo                                                       return foo; });
```
<br>

#### Ruby / Coffee style case switch statement

*Status:* **Working**

```ruby
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
<br>

#### Private Blocks

*Status:* **Not Implemented**

Private blocks keep variable scoped inside the block using function scope. There is a slight performance hit due to the IIFE.

```ruby                                                   
foo = 200)                                                var foo = 200; 
private                                                   (function(){
  foo = 10                                                  var foo = 10;
endPriv                                                   })();
#alerts 200
alert(foo)                                                alert(foo);
```
<br>

#### Classical Inheritance

*Status*: **Not Implemented**

```ruby
class Animal
  def init(name)
    @name = name
  end,

  def sayHi
    puts "Hello"
  end
end

class Duck < Animal
  def init
    super
  end,

  def sayHi
    puts "Quack"
  end
end

duck = new Duck('Darick')
duck.sayHi()
```
<br>

#### Prototypal Inheritance

*Status*: **Not Implemented**

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
