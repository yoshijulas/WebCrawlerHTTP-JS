function printReport(pages) {
  console.log("=== Report ===");

  console.log("Pages with most hits:");
  const sortedPages = sortPages(pages);
  for (const page of sortedPages) {
    const url = page[0];
    const hits = page[1];
    console.log("Found " + hits + " hits on " + url);
  }
  console.log("=== End Report ===");
}

function sortPages(pages) {
  const pagesArray = Object.entries(pages);
  pagesArray.sort((a, b) => {
    return b[1] - a[1];
  });
  return pagesArray;
}

module.exports = { sortPages, printReport };
