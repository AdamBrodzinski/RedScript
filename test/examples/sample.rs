# auto declared constants
  bar = 2

# perhaps throw warning/error if user uses these
# as they will be global and leak
bar ||= 2
bar += 2
bar *= 2
bar /= 10

# Alias @ with this.
@someProp = foo

# valid__q = true
valid? = true

# double check ||= behaves with Immutable
opts ||= {thing: false}
opts ||= {state <- thing: false}

if foo == false do
  # do stuff
end

if isValid? do
    return true
  else
    return false
end


$('#someID').on('click', (foo, bar) =>
  # do stuff
end);


Foo = React.createClass({
  render() {
    return (
      <div className='Foo'>
        Hello World!
      </div>
    );
  },
})
