var foo = 2

var res = _.chain(foo)
.thru(square 2, 3)
.thru(map var x => x * 2)
.thru(square).value()

console.log(res);


function square(x) {
  return x * x;
}
