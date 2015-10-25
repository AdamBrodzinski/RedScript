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
state = {bar: 5}                                const state = Immutable({bar: 5});
state.foo = 10   # won't mutate
# merge object and return new object
state2 = {state <- foo: 2, bar: 3}              const state = state.merge({foo: 2, bar: 3});

list = []                                       const list = Immutable([]);
list2 = [list <- 1, 2, 3]                       const list2 = list.concat([1, 2, 3]);
list3 = [list <- new_list]                      const list3 = list.concat(new_list);
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

#### Built In Support For Lo-Dash
Just snake case the [API you already know](https://lodash.com/docs). To keep things tidy, functions are placed in namespaces. Collections are in the Enum namespace, Array in List, Strings are in a String namespace, etc... (however you could still just import lo-dash ES6 style to remove the namespace).

```elixir
                                                     # or use pipe operator with lo-dash
List.take(["a", "b", "c"], 2)                        ["a", "b", "c"] |> List.take(2)
#>> ["a", "b"]

List.flatten_deep([1, [2, 3, [4]]])                  [1, [2, 3, [4]]] |> List.flatten_deep
#>> [1, 2, 3, 4]

Enum.reject([1, 2, 3, 4], (n) => n % 2 == 0)         [1, 2, 3, 4] |> Enum.reject((n) => n % 2 == 0)
#>> [1, 3]
```


#### Plays well with React
We've added a bit of sugar for creating render function. It must be the *last* function in the module for this to work.

```elixir
# must use .StateComponent to module name to activate React sugar

defmodule Complex.StateComponent do
  def getInitialState do
    return { isReady: false }
  end

  def render(props, state) do
    <div>
      <h1>Hello World</h1>
      <p>Is ready: {state.isReady}</p>
    </div>
  end
end
```

```elixir
# however stateless React components work best!
# using .Component adds render sugar (no parens and return)

defmodule MySimple.Component do
  defp handle_click(e) do
    alert("Hello World")
  end

  def Simple(props) do
    <div>
      <h1>Stateless Component</h1>
      <p>Is ready: {props.isReady}</p>
      <input type='button' onClick={handleClick} />
    </div>
  end
end
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
