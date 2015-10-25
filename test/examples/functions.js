//  compiles to eq. JavaScript, this example does not
//  include the module syntax: `defmodule` as that is
//  a separate transform (see test/examples/module.rs)
//
//  export function foo() {
//    return "baz"
//  }
//
//  # private func

//  function baz() {
//    return "baz"
//  }

export function foo() {
  return "baz"
}

export function foo_two() {
  return "baz"
}

export function bar(a, b) {
  return "baz"
}

function baz() {
  return "baz"
}

function baz(a, b) {
  return "baz"
}
