# RedScript 2.0
### It's like CoffeeScript but immutable & functional

* **Think in *transformations* with pipe operator `|>` (like F# & Elixir)**
* **Lodash built in (patched to be immutable)**
* **Pattern matching like Elixir eliminates most if/else statements**
* **Immutable data in RedScript**
* **Functional paradigm**
* **Compile time type inference checking**


RedScript was created to provide a first class functional experience in the browser. It is inspired from Elixir but does not have all of the features (ElixirScript aims to do this). Our main goal is to provide easy interoperability with other JavaScript libraries while still providing a first class functional experience in JavaScript.

If this prototype is popular enough I would love help to create a proper compiler.


#### To Install Globally and Run

```
# Note, this compiler is just a prototype and is not production ready
sudo npm install -g redscript
redscript watch [fileName fileName2]
```

#### Think in pipes instead of nesting functions

```elixir
# use functions like unix pipe

"hello world " |> String.trim |> String.uppercase
#>>> "HELLO WORLD"

["foo", "bar ", " baz"]
|> Enum.map (x) -> String.upcase(x)
|> inspect
|> take 2

# log ["FOO", "BAR", "BAZ"]
# >>> ["FOO", "BAR"]
```

#### Immutable Data
Mutable data in JavaScript can be painful. RedScript uses [Seamless-Immutable](https://github.com/rtfeldman/seamless-immutable) to effeciently reuse the existing nested objects rather than instantiating new ones when merging.
```elixir
state = {bar: 5}
state.foo = 10   # won't mutate
# merge object and return new object
state2 = {state <- foo: 2, bar: 3}

list = []             
list2 = [list <- 1, 2, 3]
list3 = [list <- new_list]
```

#### Modules exposing public functions (no classes!)

```elixir
# RedScript
import {imported_func} from "foo"

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


#### Plays well with React
We've added a bit of sugar for creating React stateless components so that you don't have to wrap it in parens and use a `return` keyword.


```elixir

defmodule TodoItem::ReactComponent do
  def component(props) do
    <div>
      <h1>Name: { state.player_name }</h1>
      <p>Is selected: { props.is_selected }</p>
      <input type='button' onClick={ handle_click } />
    </div>
  end

  defp handle_click(e) do
    alert("Hello World")
  end
end
```


##### [More syntax:](https://github.com/AdamBrodzinski/RedScript/blob/master/spec.md)
