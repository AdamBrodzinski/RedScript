# RedScript Spec Sheet

If you have suggestions on different syntax, please create
an issue: [here](https://github.com/AdamBrodzinski/RedScript/issues).

<br>

## Variables

RedScript has one kind of variable and does not need to be declared. 
However they have the same scoping rules as JavaScript's `let`. 

```elixir
result = 10 + 5
result = result + 5
# IO.inspect(result)
# 15
```

Compiled JavaScript:
```javascript
let result = 10 + 5
result = result + 5
// IO.inspect(result)
// 15
```



## Comments

RedScript has one kind of comment, a single line. All text is ignored to the right of the `#`.

```coffeescript
# this is a single line comment
# commented_out_func()
```

## String

RedScript has one kind of string, a double quote. Single quotes will not compile. <br>
Strings can be interpolated with the `#{}` construct.

```elixir
name = "Jane"
"Hello #{name}"
```

Compiles to JavaScript:

```javascript
let name = "Jane"
`Hello ${name}`
```


## Number

Number is the same as the JavaScript implementation.

```javascript
typeof 1 == "number"
typeof 1.4 == "number"
```

## Symbol

Symbol is the same as the ES6 JavaScript implementation with a syntax similar to Elixir/Ruby.


```elixir
env = :prod

typeof :prod == "symbol"
# >> true
typeof env == "symbol"
# >> true

# use a symbol with a map (string keys are standard)
res = {foo: 1, [:bar]: 2}
```

Compiles to JavaScript:

```javascript
let env = Symbol.for(":prod")

typeof Symbol.for(":prod") == "symbol"
typeof env == "symbol"

// use a symbol with a map (string keys are standard)
let res = {foo: 1, [Symbol.for(":bar")]: 2}
```



## Boolean

Booleans are the same as JavaScript and many other languages.

```javascript
true
false
```

## Null

Null is the same as the JavaScript implementation.

```javascript
null
```


## Undefined

Undefined is the same as the JavaScript implementation.

```javascript
undefined
```

## Basic Arithmetic

Arithmetic is the same as the JavaScript implementation.

```elixir
1 + 2
# 3
5 * 5
# 25
10 / 2
# 5.0
```


## Maps

RedScript does not not have an "Object" type like JavaScript. It has
a "Map" type that acts like an immutable JavaScript literal. To make a change
you must copy the object and merge in the new key/values. 

You can copy maps in several ways. However `Map.put` and the literal notation are
the most frequently used. `Map.put` is ideal for changing a map inside a pipeline.
Both of these are similar to using ES6 spread syntax in JavaScript.

If you *have* to mutate a map for performance reasons you have to explicitly
call `Map.mutate`


#### trying to mutate JS style will throw an error
```text
map.bar = 4
# or
map["bar"] = 4

Error: you can't mutate Maps
Perhaps you want to try using:
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
#log {foo: 2, bar: 4}
```

Compiled JavaScript

```javascript
map = {foo: 1, bar: 2}
map = Map.put(map, "bar", 4)
IO.inspect(map)
//log {foo: 1, bar: 4}

// or literal notation
map = {...map, foo: 2}
IO.inspect(map)
//log {foo: 2, bar: 4}
```




## If Else Uness

RedScript borrows the same sytax from Elixir for if, else, and unless

```elixir

if foo > 2 do
  # do work
end

if foo > 2 do
  # do work
else if foo > 2
  # do work
else
  # do work
end

unless foo > 2 do
  # do work
end
```

Compiled JavaScript

```javascript

if (foo > 2) {
  // do work
}

if (foo > 2) {
  // do work  
} else if (foo > 2) {
  // do work  
} else {
  // do work
}

if (!(foo > 2)) {
 // do work
}
```


