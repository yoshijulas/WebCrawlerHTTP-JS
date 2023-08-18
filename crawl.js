const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages) {
  console.log("Crawling " + currentURL);

  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);

  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }
  const normalizedCurrentURL = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL] += 1;
    return pages;
  }

  pages[normalizedCurrentURL] = 1;
  console.log("Crawling " + currentURL);

  try {
    const resp = await fetch(currentURL);
    if (resp.status !== 200) {
      console.log("error in fetch" + resp.status + " in " + currentURL);
      return pages;
    }

    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log("error in fetch" + contentType + " in " + currentURL);
      return pages;
    }

    const HTMLbody = await resp.text();

    const nextURLs = getURLfromHTML(HTMLbody, baseURL);
    for (const url of nextURLs) {
      pages = await crawlPage(baseURL, url, pages);
    }
  } catch {
    console.log("error in fetch" + currentURL);
  }
  return pages;
}

function getURLfromHTML(htmlBody, baseURL) {
  const url = [];
  const dom = new JSDOM(htmlBody);
  dom.window.document.querySelectorAll("a").forEach((link) => {
    if (link.href.startsWith("http")) {
      url.push(link.href);
    } else if (link.href.startsWith("/")) {
      if (baseURL.endsWith("/")) {
        baseURL = baseURL.slice(0, -1);
      }
      url.push(baseURL + link.href);
    }
  });
  return url;
}

function normalizeURL(urlString) {
  const urlObject = new URL(urlString);
  if (urlObject.pathname.endsWith("/")) {
    urlObject.pathname = urlObject.pathname.slice(0, -1);
  }
  return urlObject.hostname + urlObject.pathname;
}

module.exports = {
  normalizeURL,
  getURLfromHTML,
  crawlPage,
};
