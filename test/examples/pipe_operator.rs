foo = 2

res = foo
|> add 10, 20
|> has_parens(10, 20)
|> noparens
|> emprty_parens()

res
|> add 10, 20
|> has_parens(10, 20)
|> map (x) => x * 2

|> emprty_parens()


return {foo: 1, bar: 2}
|> add 10, 20

[1, 2, 22]
|> add 10, 20

//|> square 2
//|> map (x) => x * 2
//|> square

puts res

puts "foo |> par"
puts 'foo |> par'

# |> square 2
# .thru(square, 2)

function square(x) {
  return x * x;
}
