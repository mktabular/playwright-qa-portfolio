// A "class" is a blueprint for creating objects.
// This class represents the homepage — anything you can DO or FIND on that page
// will live inside this class as a method or a locator.
class HomePage {

  // The constructor runs automatically when we create a "new HomePage(page)".
  // It receives the Playwright "page" object (the browser tab) and saves it,
  // so every method in this class can use it.
  constructor(page) {
    this.page = page;

    // We define our locators HERE, once, as class properties.
    // Every test that uses HomePage will reuse this exact same locator —
    // no more retyping 'article.product_pod' in every test file.
    this.bookCards = page.locator('article.product_pod');
    this.nextPageLink = page.locator('.next a');
  }

  // This method navigates the browser to the homepage.
  // We write "goto" as a method here instead of typing page.goto('/') 
  // directly in every test — so tests read like plain English: homePage.goto()
  async goto() {
    await this.page.goto('/');
  }

  // Returns how many books are currently on the page
  async getBookCount() {
    return this.bookCards.count();
  }

  // Returns an array of all book titles as plain text
  async getBookTitles() {
    return this.bookCards.locator('h3 a').allTextContents();
  }

    // Returns an array of prices as NUMBERS (not text), e.g. [19.99, 22.50, ...]
  async getBookPrices() {
    // First, grab all price text as strings, e.g. "£19.99"
    const priceTexts = await this.bookCards.locator('.price_color').allTextContents();

    // .map() runs a function on EVERY item in the array and returns a new array
    // Here, for each price string, we remove the "£" symbol, then convert to a number
    return priceTexts.map((priceText) => parseFloat(priceText.replace('£', '')));
  }

  // Clicks the "next" pagination link to go to the following page of books
  async goToNextPage() {
    await this.nextPageLink.click();
  }

  // Checks whether a "next" link exists on the current page
  // (the last page won't have one)
  async hasNextPage() {
    return this.nextPageLink.isVisible();
  }

}

// This makes HomePage importable from other files (like our test files)
module.exports = { HomePage };