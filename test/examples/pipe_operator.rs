# single line pipes not finished
bar = [1, 2, 3] |> Enum.uppcase

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

