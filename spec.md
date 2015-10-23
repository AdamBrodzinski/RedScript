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

#### Anonymous Functions

*Status:* **Working**

Anonymous functions are like ES6 but with a skinny arrow. These compile to fat arrows so they have the same scoping rules (though you shouldn't need to use `this` anyhow).
```elixir

Enum.reject([1, 2, 3, 4], (n) -> n % 2 == 0)
```
<br>


#### Equality

Double equals are compiled to tripple equals.

```elixir
4 == 4
# >> true

4 == "4"
# >> false
```



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
