#  compiles to eq. JavaScript, this example does not
#  include the module syntax: `defmodule` as that is
#  a separate transform (see test/examples/module.rs)
#
#  export function foo() {
#    return "baz"
#  }
#
#  # private func

#  function baz() {
#    return "baz"
#  }

def foo do
  return "baz"
end

def foo_two() do
  return "baz"
end

def bar(a, b) do
  return "baz"
end

defp baz do
  return "baz"
end

defp baz(a, b) do
  return "baz"
end
