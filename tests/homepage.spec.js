/*// Import the "test" function (used to define a test case) 
// and "expect" (used to make assertions/checks) from Playwright
const { test, expect } = require('@playwright/test');

// test() defines one test case.
// First argument = a description of what this test verifies (shows up in reports)
// Second argument = an async function that receives "page" — 
// this "page" object represents a real browser tab that Playwright controls for you
test('homepage loads and displays books', async ({ page }) => {
  
  // Tell the browser to navigate to our site.
  // Since we set baseURL in the config, '/' means 'https://books.toscrape.com/'
  await page.goto('/');
  
  // A "locator" doesn't grab the elements yet — it's more like a saved search query.
  // Here we're targeting every <article class="product_pod"> on the page,
  // which is the HTML element that wraps each individual book on this site
  const books = page.locator('article.product_pod');
  
  // .count() actually runs the query and tells us HOW MANY matching elements exist
  const count = await books.count();
  
  // Just for us to see in the terminal while developing — not a real check,
  // just a way to "peek" at what the test found
  console.log('Number of books found:', count);
  
  // This is the actual ASSERTION — the real pass/fail check.
  // We're saying: "I expect the count to be greater than 0"
  // If 0 books were found (e.g. site broke, wrong selector), this line fails the test
  expect(count).toBeGreaterThan(0);
});

// This test checks EVERY book on the page has both a title and a price —
// not just that books exist, but that each one has complete, valid data
test('every book has a title and a price', async ({ page }) => {
  
  await page.goto('/');

  const books = page.locator('article.product_pod');
  const count = await books.count();

  // Loop through each book one by one, from index 0 to count-1
  for (let i = 0; i < count; i++) {
    
    // .nth(i) grabs the i-th book from our list of matches
    const book = books.nth(i);

    // Inside THIS specific book, find its title (an <a> tag inside an <h3>)
    const title = await book.locator('h3 a').textContent();

    // Inside THIS specific book, find its price
    const price = await book.locator('.price_color').textContent();

    // Check the title isn't empty
    expect(title.trim().length).toBeGreaterThan(0);

    // Check the price contains the £ symbol (confirms it's a real price, not broken text)
    expect(price).toContain('£');
  }
});*/


const { test, expect } = require('@playwright/test');

// Import our HomePage class from the pages folder.
// The '../' means "go up one level" (out of tests/) then into pages/
const { HomePage } = require('../pages/HomePage');

test('homepage loads and displays books', async ({ page }) => {
  
  // Create a new HomePage object, passing in Playwright's "page" (the browser tab).
  // This runs the constructor we wrote, which saves "page" and sets up bookCards
  const homePage = new HomePage(page);

  // Instead of writing page.goto('/') directly, we call our own method.
  // Reads like plain English: "go to the home page"
  await homePage.goto();

  // Ask our HomePage object how many books it found — 
  // all the locator logic is hidden inside the class now
  const count = await homePage.getBookCount();

  console.log('Number of books found:', count);

  // Same assertion as before — check that count is greater than 0
  expect(count).toBeGreaterThan(0);
});

test('every book has a title', async ({ page }) => {
  
  const homePage = new HomePage(page);
  await homePage.goto();

  // Get an array of ALL book titles at once, e.g. ["Book A", "Book B", ...]
  const titles = await homePage.getBookTitles();

  // Loop through each title in that array
  for (const title of titles) {
    // Make sure the title isn't empty (after trimming whitespace)
    expect(title.trim().length).toBeGreaterThan(0);
  }
});

test('every book has a price', async ({ page }) => {
// Create a new HomePage object and navigate to the homepage
  const homePage = new HomePage(page);
  await homePage.goto();
    // Get an array of ALL book prices at once, e.g. [19.99, 22.50, ...]
  const prices = await homePage.getBookPrices();

  // Check every price is a valid number greater than 0
  for (const price of prices) {
    expect(price).toBeGreaterThan(0);
  }

});

test('clicking next page shows different books', async ({ page }) => {
  
  const homePage = new HomePage(page);
  await homePage.goto();

  // Capture the titles on page 1, BEFORE navigating away
  const firstPageTitles = await homePage.getBookTitles();

  // Confirm a next page actually exists before trying to click it
  const hasNext = await homePage.hasNextPage();
  expect(hasNext).toBeTruthy();

  // Navigate to page 2
  await homePage.goToNextPage();

  // Capture the titles now shown on page 2
  const secondPageTitles = await homePage.getBookTitles();

  // The two arrays should NOT be identical — proves the page actually changed
  expect(secondPageTitles).not.toEqual(firstPageTitles);
});

test('selecting a category filters the book results', async ({ page }) => {
  
  const homePage = new HomePage(page);
  await homePage.goto();

  // Click the "Travel" category in the sidebar
  await homePage.openCategoryByName('Travel');

  // The page header should now say "Travel" to confirm we're on the right filtered page
  await expect(homePage.pageTitle).toContainText('Travel');

  // There should still be at least 1 book shown in this category
  const count = await homePage.getBookCount();
  expect(count).toBeGreaterThan(0);
});

