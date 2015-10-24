var foo = 2

foo
.pipesCall(add, 10, 20)
.pipesCall(has_parens, 10, 20)
.pipesCall(noparens)
.pipesCall(emprty_parens).value();
//|> square 2
//|> map (x) => x * 2
//|> square

console.log(res);

console.log("foo |> par");
console.log('foo |> par');

// |> square 2
// .thru(square, 2)

function square(x) {
  return x * x;
}
