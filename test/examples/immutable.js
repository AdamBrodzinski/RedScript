// const arr = Immutable([1, 2, 3]);
arr = Immutable([1, 2, 3])
arr = Immutable([1, {foo: 1}, [2,[3]] , 3])

return Immutable([1, 2, 3])

// doesnt convert json
json = {
  foo: [1, 2, 3]
}

// const arr = Immutable({foo: 1, bar: 2});
arr = Immutable({foo: 1, bar: 2})
arr = Immutable({one: 1, two: {three: []}})

// merge/concat

// const state = state.merge({foo: 2, bar: 3});
state = Immutable({isValid: false})
state2 = state.merge({ isValid: true, loading: false});

// const list2 = list.concat([1, 2, 3]);
list = Immutable([1, 2, 3])
list2 = list.concat([ 4, 5, 6]);