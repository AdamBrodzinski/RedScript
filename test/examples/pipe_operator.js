// single line pipes not finished
bar = [1, 2, 3] |> Enum.uppcase

foo = 20

return _.chain(foo)
.pipesCall(multi_no_parens, 10, 20)
.pipesCall(multi_has_parens, 10, 20)
.pipesCall(no_parens)
.pipesCall(empty_parens).value();


res = _.chain(foo)
.pipesCall(has_parens, 10, 20)
.pipesCall(map, (x) => x * 2)
.pipesCall(map, ((x) => x * 2))
.pipesCall(map, (x => x * 2))
.pipesCall(map, x => x * 2).value();

