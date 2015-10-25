
foo = [1, 2, 3] |> Enum.uppcase

_.chain(res)
.pipesCall(has_parens, 10, 20)
.pipesCall(map, (x) => x * 2)
.pipesCall(map, ((x) => x * 2))
.pipesCall(map, (x => x * 2))
.pipesCall(map, x => x * 2).value();

