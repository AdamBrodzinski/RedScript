// const arr = Immutable([1, 2, 3]);
const arr = Immutable([1, 2, 3])
const arr = Immutable([1, {foo: 1}, [2,[3]] , 3])

return Immutable([1, 2, 3])

// doesnt convert json
const json = {
  foo: [1, 2, 3]
}

// const arr = Immutable({foo: 1, bar: 2});
const arr = Immutable({foo: 1, bar: 2})
const arr = Immutable({one: 1, two: {three: []}})

// merge/concat

// const state = state.merge({foo: 2, bar: 3});
const state = Immutable({isValid: false})
const state2 = state.merge({ isValid: true, loading: false});

// const list2 = list.concat([1, 2, 3]);
const list = Immutable([1, 2, 3])
const list2 = list.concat([ 4, 5, 6]);
