# RedScript Spec Sheet
### The following lists RedScript's syntax along with how it is currently implemented (if at all).

RedScript is currently aiming at having a near drop in ability for JavaScript. There are a few keywords that could collide, and we'll have linter for that
in the future. If you have suggestions on different syntax, please create
an issue: [here](https://github.com/AdamBrodzinski/RedScript/issues).

#### Automatic variable declaration & automatic semi-colon insertion 

*Status*: **Not Implemented**

```ruby
foo = 12                                 var foo = 12;

# RedScript also catches missing colon
bar = {                                  var bar = {
  foo: "bar",                              foo: "bar",
  baz: "qux"                               baz: "qux",
  foo2: "bar2"                             foo2: "bar2"
}                                        };
```

#### Convenience method aliases for puts & printf

*Status:* **Working**  
`puts` and `printf` are aliases to `console.log` and `process.stdout.write`. `printf` is only available with node enviroments. These are the only methods that have optional parens at this time. If parens are omitted a closing paren will be appended to the end of the line. Parenless multi lines are not possible.

```ruby
puts "Hello there"                      console.log("Hello there");
puts("Hai!")                            console.log("Hai")
printf "Hola"                           process.stdout.write("Hola")
printf("Hola")                          process.stdout.write("Hola")
```

#### Optional Parenthesis

*Status:* **Partially Implemented** *(parenless RedScript constructs)*

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


#### Ruby flavored function expressions

*Status:* **Working**

```ruby
func say(msg)                            var say = function(msg) {
  puts msg                                 console.log(msg)
end                                      };

# Optional function parens
func sayHello
  puts "Hello"
end
```

#### Comments

*Status*: **Known Bug**

Comments currently have a bug, they cannot immediately follow a word character. This is due to hashes being interpolated inside a string, thus creating a comment inside a jQuery selector. RedScript currently does not have multi-line comments but `/*...*/` can be used.

```coffeescript
# I'm a comment                          // I'm a comment
#Currently failing to compile            #Currently failing to compile 
$('#someID').html(foo)                   $('#someID').html(foo) # No worries here
```

#### Alias @ with this

*Status:* Working

```ruby
function FooClass(name, age) {           function FooClass(name, age){
  @name = name                             this.name = name;
  @age = age                               this.age = age;
}                                        }
```

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

#### If/else/else if

```ruby
if foo == 10                            if (foo === 10) {
  bar("do stuff")                         bar("do stuff");
else if foo == 20                       } else if (foo === 20) {
  bar("do stuff")                         bar("do stuff");
else                                    } else {
  bar("do stuff")                         bar("do stuff");
end                                     }

puts("hello") if foo == 2               if (foo === 2) { console.log("hello"); }
```


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



