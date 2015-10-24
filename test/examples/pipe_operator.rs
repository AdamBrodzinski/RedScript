foo = 2

res = _.chain(foo)
|> add 10, 20
//|> square 2
//|> map (x) => x * 2
//|> square

puts res

# |> square 2
# .thru(square, 2)

function square(x) {
  return x * x;
}
