# RedScript Spec Sheet
#### The following lists all of RedScripts current syntax along with how it is currently implemented (if at all).

RedScript is currently aiming at having drop in ability for JavaScript.
There are a few keywords that could collide, and we'll have linter for that
in the future.

#### Automatic variable declaration & automatic semi-colon insertion 

```ruby
foo = 12                                 var foo = 12;

# RedScript also catches missing colon
bar = {                                  var bar = {
  foo: "bar",                              foo: "bar",
  baz: "qux"                               baz: "qux",
  foo2: "bar2"                             foo2: "bar2"
}                                        }
```


