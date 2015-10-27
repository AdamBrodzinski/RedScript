import Immutable from 'seamless-immutable';
// single line pipes not finished
const bar = _.chain(Immutable([1, 2, 3])).pipesCall(Enum.uppcase).value();

// [1, 2, 3] .pipesCall(Enum.uppcase).pipesCall(Enum.uppcase).value();
// [1, 2, 3] |> Enum.uppcase |> Enum.uppcase

const f = _.chain(Immutable([1, 2, 3])).pipesCall(Enum.uppcase(3, 2)).pipesCall(Enum.uppcase).value();
return _.chain(Immutable([5, 2, 3])).pipesCall(Enum.uppcase).value();
const b = _.chain(bar).pipesCall(Enum.uppcase).value();
return _.chain(bar).pipesCall(Enum.uppcase).value();


const foo = 20

return _.chain(foo)
.pipesCall(multi_no_parens, 10, 20)
.pipesCall(multi_has_parens, 10, 20)
.pipesCall(no_parens)
.pipesCall(empty_parens).value();


const res = _.chain(foo)
.pipesCall(has_parens, 10, 20)
.pipesCall(map, (x) => x * 2)
.pipesCall(map, ((x) => x * 2))
.pipesCall(map, (x => x * 2))
.pipesCall(map, x => x * 2).value();

