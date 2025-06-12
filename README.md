# Playwright HROne Automation

This project automates HROne portal workflows using Playwright and the Page Object Model.

## Project Structure

```
PlayWright/
├── PageObjects/
│   ├── attendance-calendar-data.js
│   ├── dashboard-popup-iframes.js
│   ├── login-page.js
│   ├── select-on-duty-dates.js
│   ├── time-update-and-submit.js
│   └── user-info.js
├── tests/
│   └── HrOne_Attendance.spec.js
├── config.js
└── README.md
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure your credentials

Edit `config.js` and set your HROne username, password, and other test data.

```js
module.exports = {
  loginUser: {
    userName: "your.email@domain.com",
    password: "yourPassword"
  },
  onDutyReason: "Work From Home",
  comments: "WFH"
};
```

### 3. Run the tests

```bash
npx playwright test
```

Or to run a specific test:

```bash
npx playwright test tests/HrOne_Attendance.spec.js
```

## Page Object Model

- All page interactions are encapsulated in the `PageObjects/` folder.
- Test logic is kept clean and readable in the `tests/` folder.

##  Customization

- Update selectors in page objects if your HROne UI changes.
- Add more tests in the `tests/` folder as needed.
