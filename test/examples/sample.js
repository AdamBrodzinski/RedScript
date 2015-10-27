import Immutable from 'seamless-immutable';
// auto declared constants
  const bar = 2

// perhaps throw warning/error if user uses these
// as they will be global and leak
bar ||= 2
bar += 2
bar *= 2
bar /= 10

// Alias @ with this.
@someProp = foo

// valid__q = true
valid__q = true

// double check ||= behaves with Immutable
opts ||= Immutable({thing: false})
opts ||= state.merge({ thing: false});

if (foo == false do) {
  // do stuff
}

if (isValid__q do) {
    return true
  } else {
    return false
}


$('#someID').on('click', (foo, bar) =>
  // do stuff
});


const Foo = React.createClass({
  render() {
    return (
      <div className='Foo'>
        Hello World!
      </div>
    );
  },
})
