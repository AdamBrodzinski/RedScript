# RedScript 2.0

###### *Note, this compiler is just a prototype and is not production ready*

* **Functional paradigm**
* **Immutable data in RedScript**
* **Think in *transformations* with pipe operator `|>` (like F# & Elixir)**
* **Lodash built in (patched to be immutable)**
* **Compile time type inference checking**


RedScript was created to provide a first class functional experience in the browser. It is inspired from Elixir but does not have the same features (ElixirScript aims to do this). Our main goal is to provide easy interoperability with other JavaScript libraries.

If this prototype is popular enough I would love help to create a proper compiler.


#### To Install Globally and Run

```
sudo npm install -g redscript
redscript watch [fileName fileName2]
```

#### A little RedScript...

```elixir
# use functions like unix pipe

"hello world " |> String.trim |> String.capitalize
#>>> "HELLO WORLD"
```
