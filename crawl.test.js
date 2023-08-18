const { normalizeURL, getURLfromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL", () => {
  const input = "https://blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip CAPS", () => {
  const input = "https://BLOG.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL http", () => {
  const input = "http://blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("Get URLS from HTML Absolute", () => {
  const inputHTMLBody = `
    <html>
    <body>
    <a href="https://blog.boot.dev/">link</a>
    </body>
    </html>`;
  const inputBaseURL = "https://blog.boot.dev/";
  const actual = getURLfromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.boot.dev/"];
  expect(actual).toEqual(expected);
});

test("Get URLS from HTML Relative", () => {
  const inputHTMLBody = `
    <html>
    <body>
    <a href="/path/">link</a>
    </body>
    </html>`;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLfromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.boot.dev/path/"];
  expect(actual).toEqual(expected);
});

test("Get URLS from HTML BOTH", () => {
  const inputHTMLBody = `
    <html>
    <body>
    <a href="/path/">link</a>
    <a href="https://blog.boot.dev/">link</a>
    </body>
    </html>`;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLfromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.boot.dev/path/", "https://blog.boot.dev/"];
  expect(actual).toEqual(expected);
});

test("Invalid", () => {
  const inputHTMLBody = `
    <html>
    <body>
    <a href="Invalid">link</a>

    </body>
    </html>`;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLfromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
