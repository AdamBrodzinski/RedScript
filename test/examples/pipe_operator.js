var foo = 2

var res = _.chain(foo)
.pipesCall(add, 10, 20)
.pipesCall(has_parens, 10, 20)
.pipesCall(noparens)
.pipesCall(emprty_parens).value();

_.chain(res)
.pipesCall(add, 10, 20)
.pipesCall(has_parens, 10, 20)
.pipesCall(map, x) => x * 2).value();

.pipesCall(emprty_parens).value();


return _.chain({foo: 1, bar: 2})
.pipesCall(add, 10, 20).value();

_.chain([1, 2, 22])
.pipesCall(add, 10, 20).value();

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
