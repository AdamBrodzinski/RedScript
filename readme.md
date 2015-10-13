# RedScript 2.0

* **Functional paradigm**
* **Immutable data in RedScript**
* **Think in *transformations* with pipe operator `|>` (like F# & Elixir)**
* **Lodash built in (patched to be immutable)**
* **Compile time type inference checking**


RedScript was created to provide a first class functional experience in the browser. It is inspired from Elixir but does not have the same features (ElixirScript aims to do this). Our main goal is to provide easy interoperability with other JavaScript libraries while still providing a first class experience.

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

"hello world " |> String.trim |> String.capitalize
#>>> "HELLO WORLD"

["foo", "bar ", " baz"]
|> map (x) -> String.capitalize(x)
|> inspect
|> take 2

#>>> ["FOO", "BAR", "BAZ"]
#>>> ["FOO", "BAR"]
```

#### Plays well with React

```elixir
let Complex = React.createClass({
  def getInitialState do
    return { isReady: false }
  end,

  def render() do
    <div>
      <h1>Hello World</h1>
      <p>Is ready: {this.isReady}</p>
    </div>
  end
})
export Complex;

# stateless React components work best!

def simple(props) do
  <div>
    <h1>Stateless Component</h1>
    <p>Is ready: {props.isReady}</p>
  </div>
end
```
