# const arr = Immutable([1, 2, 3]);
arr = [1, 2, 3]
arr = [1, {foo: 1}, [2,[3]] , 3]

# const arr = Immutable({foo: 1, bar: 2});
arr = {foo: 1, bar: 2}
arr = {one: 1, two: {three: []}}

# merge/concat

# const state = state.merge({foo: 2, bar: 3});
state2 = {state <- foo: 2, bar: 3}

# const list2 = list.concat([1, 2, 3]);
list2 = [list <- 1, 2, 3]
