foo = 2

foo
|> add 10, 20
|> has_parens(10, 20)
|> noparens
|> emprty_parens()
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
