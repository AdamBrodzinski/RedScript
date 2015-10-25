// const arr = Immutable([1, 2, 3]);
arr = Immutable([1, 2, 3]);
arr = Immutable([1, {foo: 1}, [2,[3]] , 3]);

// const arr = Immutable({foo: 1, bar: 2});
arr = Immutable({foo: 1, bar: 2});
arr = Immutable({one: 1, two: {three: []}});

// merge/concat

// const state = state.merge({foo: 2, bar: 3});
state2 = Immutable({state <- foo: 2, bar: 3});

// const list2 = list.concat([1, 2, 3]);
list2 = Immutable([list <- 1, 2, 3]);
