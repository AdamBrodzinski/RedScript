# const arr = Immutable([1, 2, 3]);
arr = [1, 2, 3]
arr = [1, {foo: 1}, [2,[3]] , 3]

return [1, 2, 3]

# doesnt convert json
json = {
  foo: [1, 2, 3]
}

# const arr = Immutable({foo: 1, bar: 2});
arr = {foo: 1, bar: 2}
arr = {one: 1, two: {three: []}}

# merge/concat

# const state = state.merge({foo: 2, bar: 3});
state = {isValid: false}
state2 = {state <- isValid: true, loading: false}

# const list2 = list.concat([1, 2, 3]);
list = [1, 2, 3]
list2 = [list <- 4, 5, 6]
