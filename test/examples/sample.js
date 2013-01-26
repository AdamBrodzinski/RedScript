define module
import 'jQuery' as $
import 'http' as http

bool foo = false
bool bar = true
int score = 23
double = 1.43
obj = 

### check for aliases *before converting* ###

if foo is false or bar isnt true and baz != false
  # do stuff
end

# Alias @ with this.
@someProp = foo

# has a do after if
if foo is false do
  # do stuff
end

# no do on end
if /foo/.test(line)
  line.append
end

# function alias
func () {

}

printc("foo");

$('#someID').on('click', (foo, bar) =>
  # do stuff
end);

##
# widget =
#   attach: ->
#     el.bind 'click', (event) =>
#       doStuffWithThis()
##


changeIt = (foo, bar) =>
  printc "hello world"
end

changeIt = (foo, bar) ->
  printc "hello world"
end

changeIt = -> |foo|
  printc "hello world"
end

changeIt = -> |$, _, 1, foo, BaR|
  printc "hello world"
end

# func def

changeIt = func do

end

if (arg is '-w'
  or arg is '--watch'
  or arg is 'watch') do
  options.watchFiles = true;
  argList.splice(index,index);
end


################################
object foo
  status: on,

  def foo
    return @status
  end
endO

# attach a method to foo's prototype
def foo >> method2 |msg| do
  alert msg
end


foo = {
  status: on,

  getStatus: function () {
    return this.status;
  }
};

#// attach a method to foo's prototype
foo.prototype.method2 = function (msg) {
  alert(msg);
};


##################################

def object >> method ||
  
end

def object >> method ||
  
end

mySlice = someString[1:3]
mySlice = someString.slice(1,3)


module.exports.hellWorld = function () {
  alert("hello world");
}

def exports.helloWorld
  alert "hello world"
end


def someOb >> helloWorld
  alert "hello world"
end

var someOb >> helloWorld
  alert "hello world"
end





 Testing output