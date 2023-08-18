const { sortPages } = require("./report.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL", () => {
  const input = {
    "https://blog.boot.dev/path": 2,
    "https://blog.boot.dev/": 3,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://blog.boot.dev/", 3],
    ["https://blog.boot.dev/path", 2],
  ];
  expect(actual).toEqual(expected);
});
