foo = 2

res = _.chain(foo)
|> square 2, 3
|> map x => x * 2
|> square

puts res


function square(x) {
  return x * x;
}
