var foo = 2

var res = _.chain(foo)
.pipesCall(add, 10, 20).value();
//|> square 2
//|> map (x) => x * 2
//|> square

console.log(res);

// |> square 2
// .thru(square, 2)

function square(x) {
  return x * x;
}
