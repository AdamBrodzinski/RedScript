# single line pipes not finished
bar = [1, 2, 3] |> Enum.uppcase

# [1, 2, 3] .pipesCall(Enum.uppcase).pipesCall(Enum.uppcase).value();
# [1, 2, 3] |> Enum.uppcase |> Enum.uppcase

f = [1, 2, 3] |> Enum.uppcase(3, 2) |> Enum.uppcase
return [5, 2, 3] |> Enum.uppcase
b = bar |> Enum.uppcase
return bar |> Enum.uppcase


foo = 20

return foo
|> multi_no_parens 10, 20
|> multi_has_parens(10, 20)
|> no_parens
|> empty_parens()


res = foo
|> has_parens(10, 20)
|> map (x) => x * 2
|> map((x) => x * 2)
|> map(x => x * 2)
|> map x => x * 2

