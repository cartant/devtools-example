"use strict";

// A naïve implementation of a function that returns the 'best' testing-library
// query for the specified element.

function suggestQuery(element) {
  return {
    element,
    query: "whatever",
  };
}
