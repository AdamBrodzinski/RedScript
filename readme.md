# RedScript 2.0
### It's like CoffeeScript but immutable & functional

* **Think in *transformations* with pipe operator `|>` (like F# & Elixir)**
* **Lodash built in (patched to be immutable)**
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
# merge new keys into state and return new object
state2 = {state <- foo: 2, bar: 3}

list = []
list2 = [list <- 1, 2, 3]
list3 = [list <- new_list]
```

#### Modules exposing public functions (no classes!)

```elixir
# RedScript                                # compiled JavaScript
import {imported_func} from "foo"          import {imported_func} from "foo";

defmodule PhoneUtils do                    // Module: PhoneUtils
  def normalize_number(number) do          export function normalize_number(number) {
    return number                            return _.chain(number)
    |> imported_func('-')                    .call(imported_func, '-')
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

#### Built in support for Lo-Dash
Just snake case the [API you already know](https://lodash.com/docs). To keep things tidy, functions are in namespaces. Collections are in the Enum namespace, Array in List, Strings are in a String namespace, etc...

```elixir

List.take(["a", "b", "c"], 2)
# >> ["a", "b"]


Enum.reject([1, 2, 3, 4], (n) => n % 2 == 0)
# >> [1, 3]
```

#### Pattern Matching Coming Soon!


#### Plays well with React

```elixir
Complex = React.createClass({
  def getInitialState do
    { isReady: false }
  end,

  def render do
    <div>
      <h1>Hello World</h1>
      <p>Is ready: {this.state.isReady}</p>
    </div>
  end
})

# stateless React components work best!

def Simple(props) do
  <div>
    <h1>Stateless Component</h1>
    <p>Is ready: {props.isReady}</p>
  </div>
end
```
