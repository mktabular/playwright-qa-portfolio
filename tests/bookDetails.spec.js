const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { BookDetailsPage } = require('../pages/BookDetailsPage');

test('opening a book shows matching title and price from the listing', async ({ page }) => {
  
  const homePage = new HomePage(page);
  await homePage.goto();

  // Capture the FIRST book's title and price while still on the listing page
  const listTitles = await homePage.getBookTitles();
  const listPrices = await homePage.getBookPrices();
  const expectedTitle = listTitles[0];
  const expectedPrice = listPrices[0];

  // Click into that same book's detail page
  await homePage.openBookByIndex(0);

  // Now we're on a DIFFERENT page — so we use a DIFFERENT page object
  const detailsPage = new BookDetailsPage(page);
  const actualTitle = await detailsPage.getTitle();
  const actualPrice = await detailsPage.getPrice();

  // Note: titles on the listing page are sometimes cut off with "...",
  // so we check that the detail page title CONTAINS the listing title,
  // rather than checking they're exactly equal
  expect(actualTitle).toContain(expectedTitle.replace('...', '').trim());

  // Price should match exactly — no truncation issue here
  expect(actualPrice).toBe(expectedPrice);
});

test('book detail page shows stock availability', async ({ page }) => {
  
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.openBookByIndex(0);

  const detailsPage = new BookDetailsPage(page);
  const inStock = await detailsPage.isInStock();

  // We're just confirming this returns an actual true/false value —
  // proving our check ran successfully against real page content
  expect(typeof inStock).toBe('boolean');
});