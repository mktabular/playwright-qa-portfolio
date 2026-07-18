# 🎭 Playwright QA Automation Portfolio Project

A QA automation portfolio project built with **Playwright (JavaScript)** that demonstrates **UI automation**, **API automation**, and **manual API testing**. This project combines browser automation using the **Page Object Model (POM)** with REST API testing in Playwright and manual API validation using Postman.

The UI tests target the demo e-commerce website **Books to Scrape** (https://books.toscrape.com), while the API tests use the public practice API **JSONPlaceholder** (https://jsonplaceholder.typicode.com).

---

## 📌 Project Overview

This project demonstrates software testing across both the **User Interface (UI)** and **API** layers of an application.

The UI automation suite validates core user journeys of an online bookstore, including navigation, pagination, category filtering, and product details.

The API automation suite validates REST endpoints by testing the complete CRUD lifecycle (Create, Read, Update, Delete), including both positive and negative test scenarios.

In addition to automated API testing with Playwright, the same API scenarios are tested manually using Postman to demonstrate an understanding of both automated and manual testing practices.

---

## ✨ Test Coverage

### UI Automation — Homepage

- Verify the homepage loads successfully
- Verify every book displays a title
- Verify every book displays a price
- Verify pagination loads different books
- Verify category filtering displays the correct books

### UI Automation — Book Details

- Verify the selected book's title matches the listing page
- Verify the selected book's price matches the listing page
- Verify stock availability is displayed correctly

### API Automation (Playwright)

- Verify a GET request returns a list of users
- Verify a GET request returns a single user by ID
- Verify requesting a non-existent user returns **404 Not Found**
- Verify a POST request creates a new resource (**201 Created**)
- Verify a PATCH request partially updates an existing resource
- Verify a PUT request fully replaces an existing resource
- Verify a DELETE request successfully removes a resource

### Manual API Testing (Postman)

The same CRUD scenarios were also executed manually using Postman, with assertions written using `pm.test()` and `pm.expect()`.

---

## 📈 Project Status

- 14 automated Playwright test cases
- 3 Playwright spec files
- 5 Postman requests with assertions
- UI automation completed
- API automation completed
- Manual API testing completed
- GitHub Actions CI workflow verified passing

---

## 🛠️ Tech Stack

- **Playwright (JavaScript)** — UI and API automation
- **Page Object Model (POM)** — maintainable UI test architecture
- **Postman** — manual API testing
- **GitHub Actions** — Continuous Integration (CI)
- **Node.js & npm** — runtime environment and package management

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
│   ├── bookDetails.spec.js
│   └── api.spec.js
├── postman/
│   └── api-practice-tests.postman_collection.json
├── screenshots/
│   └── test-report.png
├── playwright.config.js
├── package.json
└── README.md
```

---

## 🏗️ Why Page Object Model?

This project follows the **Page Object Model (POM)** design pattern to improve code organization, maintainability, and readability.

Instead of placing selectors directly inside test files, page interactions are grouped into reusable page object classes. For example:

```javascript
homePage.openCategoryByName("Travel");
```

This approach reduces duplicated code and ensures UI changes only need to be updated in one place instead of across multiple test files.

---

## ▶️ Running the Tests Locally

Install project dependencies:
```bash
npm install
```

Install Playwright browsers:
```bash
npx playwright install
```

Run the complete test suite:
```bash
npx playwright test
```

Run only the API tests:
```bash
npx playwright test api.spec.js
```

Open the HTML report:
```bash
npx playwright show-report
```

---

## 📮 Manual API Testing with Postman

This repository also includes a Postman collection covering the same CRUD operations tested in Playwright, with request validation written using Postman's built-in scripting features (`pm.test()` and `pm.expect()`).

To use it:
1. Open Postman
2. Select **Import**
3. Import the file: `postman/api-practice-tests.postman_collection.json`

---

## ⚙️ Continuous Integration

GitHub Actions automatically runs the Playwright test suite whenever changes are pushed to the `main` branch. The workflow:

- Installs project dependencies
- Installs Playwright browsers
- Executes the Playwright test suite
- Reports the workflow status

[View verified passing runs](https://github.com/mktabular/playwright-qa-portfolio/actions)

---

## 📊 Sample Test Report

![Test Report](./screenshots/test-report.png)

---

## 🎯 Skills Demonstrated

- UI Test Automation
- API Test Automation
- Manual API Testing
- REST API Testing
- Playwright
- JavaScript
- Page Object Model (POM)
- Postman
- GitHub
- GitHub Actions (CI)
- HTTP Methods (GET, POST, PUT, PATCH, DELETE)
- HTTP Status Code Validation
- Positive and Negative Testing
- Test Case Design

---

## 💡 What I Learned

Building this project helped me strengthen my understanding of UI automation, API automation, and manual API testing. Along the way, I learned how to:

- Design maintainable UI automation using the Page Object Model
- Create reusable page objects and locators
- Write reliable UI test cases for navigation, filtering, pagination, and product validation
- Build automated API tests covering the full CRUD lifecycle
- Validate HTTP status codes such as 200 OK, 201 Created, and 404 Not Found
- Write negative test cases to verify expected failure scenarios
- Understand the difference between PATCH (partial update) and PUT (full replacement)
- Perform manual API testing using Postman
- Organize automated tests into multiple spec files
- Configure Playwright projects, reporters, and browser settings
- Set up and verify Continuous Integration using GitHub Actions

---

## 🚀 Future Improvements

- Execute the test suite across Chromium, Firefox, and WebKit
- Add authentication-based API testing (Bearer Token / OAuth)
- Implement response schema validation
- Add visual regression testing
- Expand UI coverage with additional user scenarios
- Introduce data-driven testing
- Add SQL database validation for end-to-end testing

---

## 👨‍💻 About This Project

This repository is part of my QA Automation portfolio as I continue developing practical skills in software testing and automation. My goal is to build reliable, maintainable automation solutions while following industry best practices and continuously improving my knowledge of modern QA engineering.