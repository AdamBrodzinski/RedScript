# RedScript 2.0


## Project is Deprecated

After the recent changes in ReasonML there really isn't a valid reason to keep working on this project anymore as ReasonML does a much better job, provides more safety, and in my opinion has an even nicer syntax and developer exerience.

https://reasonml.github.io/

-----------------------



### It's like CoffeeScript but immutable & functional

Why use yet another sugar for JavaScript? Here are some features that go beyond a nice sytax:

* **Immutable data**
* **Pattern matching in module functions**
* **No support for classes or OO forces a functional (yet pragmatic) coding style**
* **Think in *data transformations* with the pipe operator `|>` (like Unix pipes, F# & Elixir)**
* **Standard Lib that utilizes Lodash (patched to be immutable)**
* **CLI for compiling and creating projects **
* **Compile time type inference checking using Flow**


RedScript was created to provide a first class functional experience in the browser. I was tired of trying to coerce JavaScript into being a functional language (by not using the bad parts by convention and using other libs).

It is inspired from Elixir but it does not have all of the features ([ElixirScript](https://github.com/bryanjos/elixirscript) aims to do this). Our main goal is to provide easy interoperability with other JavaScript libraries (like CoffeeScript, not like Elm) while still providing a first class functional experience in JavaScript.


#### To Install Globally and Run

```
# 2.0 is a work in progress, not all features implemented
# Note, this compiler is just a prototype and is not production ready
sudo npm install -g redscript
redscript watch [fileName fileName2]
```

#### Think in pipes instead of nesting functions

```elixir
# use functions like unix pipe

"hello world " |> String.trim |> String.uppercase
#>>> "HELLO WORLD"

["foo", "bar", " baz"]
  |> Enum.map((x) -> String.upcase(x))
  |> inspect()
  |> take(2)

# inspect-output ["FOO", "BAR", "BAZ"]
# >>> ["FOO", "BAR"]
```

#### Immutable Data (not currently supported)
Mutable data in JavaScript can lead to tricky bugs
```elixir
state = {bar: 3}

# throws an error
state.bar = 10

# create copy and merge in new key/values
new_state = {state <- foo: 2, baz: 4}
# >> {foo: 2, bar: 3, baz: 4}

list = [1, 2]             
list_two = [5, 6]
combined_list = [list <- 3, 4, list_two]
```

#### Modules exposing public functions (no classes!)

```elixir
import {some_js_function} from "some-js-or-redscript-module"

defmodule PhoneUtils do
  def normalize_number(number) do
    return number
    |> imported_func('-')
    |> remove_char(' ')  
    |> remove_us_code    
  end                    

  def remove_us_code(str) do
    return str.replace(/^+1/g, '')
  end                             

  defp remove_char(str, char) do  
    return str.replace(/\s/g, '') 
  end
end
```

#### Built In Support For Lo-Dash
Just snake case the [API you already know](https://lodash.com/docs). To keep things tidy, functions are placed in namespaces. Collections are in the Enum namespace, Array in List, Strings are in a String namespace, etc... (however you could still just import lo-dash ES6 style to remove the namespace).

```elixir
                                                 # or use pipe operator with lo-dash
List.take(["a", "b", "c"], 2)                    ["a", "b", "c"] |> List.take(2)
#>> ["a", "b"]

List.flatten_deep([1, [2, 3, [4]]])              [1, [2, 3, [4]]] |> List.flatten_deep
#>> [1, 2, 3, 4]

Enum.reject([1, 2, 3, 4], (n) => n % 2 == 0)      [1, 2, 3, 4] |> Enum.reject((n) => n % 2 == 0)
#>> [1, 3]
```


#### Pattern Matching Coming Soon!
Pattern matching can eliminate the use of if statements and can really clean up code. This is on the backlog but PRs are welcome!
```elixir
defmodule MyUtils do
  def count([]) do
    return 0
  end

  def count([head|tail]) do
    return 1 + count(tail)
  end
end
```


### [Full Syntax](https://github.com/AdamBrodzinski/RedScript/blob/master/spec.md)
