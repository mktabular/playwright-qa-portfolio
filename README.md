# 🎭 Playwright QA Automation Portfolio Project

A UI test automation project built with **Playwright (JavaScript)** using the **Page Object Model (POM)** design pattern. This project automates functional testing of the demo e-commerce website **Books to Scrape** (https://books.toscrape.com).

---

## 📌 Project Overview

This project tests key user flows of an online bookstore — homepage functionality, pagination, category filtering, and individual product page validation — using Playwright with a Page Object Model structure for maintainability.

---

## ✨ Test Coverage

### Homepage
- Verify the homepage loads and displays books
- Verify every book displays a title
- Verify every book displays a price
- Verify pagination loads different books on the next page
- Verify selecting a category filters the results

### Book Details
- Verify the selected book's title and price match what was shown on the listing page
- Verify stock availability is displayed on the detail page

**Current Status**
- 7 automated test cases
- 2 spec files
- Tested and passing on Chromium (config supports Firefox and WebKit, not yet run across all three)

---

## 🛠️ Tech Stack

- **Playwright** (JavaScript)
- **Page Object Model (POM)**
- **GitHub Actions** (CI/CD workflow configured via Playwright's scaffolding)

---

## 📂 Project Structure

```text
playwright-qa-portfolio/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── pages/
│   ├── HomePage.js
│   └── BookDetailsPage.js
├── tests/
│   ├── homepage.spec.js
│   └── bookDetails.spec.js
├── playwright.config.js
├── package.json
└── README.md
```

---

## 🏗️ Why Page Object Model?

Instead of placing selectors directly inside test files, page interactions are organized into reusable page object classes (`pages/`). Tests call readable methods such as:

```javascript
homePage.openCategoryByName('Travel');
```

instead of repeating raw CSS selectors across the test suite. If the site's HTML structure changes, only the page object needs updating — not every test.

---

## ▶️ Running the Tests Locally

```bash
npm install
npx playwright install
npx playwright test
```

Open the HTML report:

```bash
npx playwright show-report
```

---

## ⚙️ Continuous Integration

A GitHub Actions workflow (`.github/workflows/playwright.yml`) is configured to run the test suite automatically on every push to `main`.

---

## 📊 Sample Test Report

![Test Report](./screenshots/test-report.png)

---

## 💡 What I Learned

Building this project helped me strengthen my understanding of UI test automation using Playwright. Along the way I learned how to:

- Build a page object structure with reusable locators and methods
- Write test assertions for data integrity, navigation, and filtering
- Organize tests into multiple spec files
- Configure Playwright's `baseURL`, reporters, and browser projects
- Set up a GitHub Actions workflow for automated test runs

---

## 🚀 Future Improvements

- Confirm and screenshot a passing CI run in GitHub Actions
- Run the full suite across Chromium, Firefox, and WebKit
- Add API testing using Playwright's `request` context
- Add visual regression testing
- Expand coverage with additional scenarios (e.g. empty search results, invalid pages)

---

## 👨‍💻 About This Project

This project is part of my ongoing QA automation learning journey and portfolio development.