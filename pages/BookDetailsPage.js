// Represents an individual book's product detail page
class BookDetailsPage {

  constructor(page) {
    this.page = page;

    this.title = page.locator('.product_main h1');
    this.price = page.locator('.product_main .price_color');
    this.availability = page.locator('.product_main .availability');
  }

  async getTitle() {
    return this.title.textContent();
  }

  async getPrice() {
    const text = await this.price.textContent();
    return parseFloat(text.replace('£', ''));
  }

  async isInStock() {
    const text = await this.availability.textContent();
    return text.includes('In stock');
  }

}

module.exports = { BookDetailsPage };