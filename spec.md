# RedScript Spec Sheet

If you have suggestions on different syntax, please create
an issue: [here](https://github.com/AdamBrodzinski/RedScript/issues).

<br>

## Comments

RedScript has one kind of comment, a single line. All text is ignored to the right of the `#`.

```coffeescript
# this is a single line comment
# commented_out_func()
```

## Maps

RedScript does not not have an "Object" type like JavaScript. It has
a "Map" type that acts like an immutable JavaScript literal. To make a change 
you can call `Map.put` to make a copy of the object with the new keys. This
works similar to using ES6 spread syntax in a new object in JavaScript.

You can also use the literal notation `new_map = {old_map <- new_key: "foo"}`,
this works the same as Map.put but it can be easier to read in certain
situtations (Map.put can also be piped).

If you have to mutate a map for performance reasons you have to explicitly
call `Map.mutate`


#### trying to mutate JS style will throw an error
```text
map.bar = 4

Error: you can't mutate using the dot notation
Try using:
  map_copy = {old_map <- bar: 4}
or
  map_copy = Map.put(old_map, "bar", 4)
```

In order to change a value of a map you must use Map.put or the shorthand notation.

```elixir
map = {foo: 1, bar: 2}
map = Map.put(map, "bar", 4)
IO.inspect(map)
#log {foo: 1, bar: 4}

# or literal notation
map = {map <- foo: 2}
IO.inspect(map)
#log {foo: 1, bar: 4}
```


