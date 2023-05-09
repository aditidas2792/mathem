# Getting Started with Mathem's Delivery React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

As part of the web application:
- User can select delivery date and respective time for their delivery. 
- User can opt for home delivery
- User can view the delivery confirmation in the Confirmation page
- If they want to edit, they can do that from Confirmation page, which will bring the user back to Delivery page

Assumptions/Limitations:
- Ideally the delivery details will be sent back to backend API and retrieved again from there for Confirmation page, but for the sake of this assignment, I have stored the details in LocalStorage.
- I have tried to add some tests, but they aren't very thorough and still have some errors.

Directory:

```
├── src
|   ├── components
|   |   ├── DateList.js
|   |   └── TimeList.js
|   ├── pages
|   |   ├── confirmation-page
|   |   |   ├── ConfirmationPage.js
|   |   |   └── styles.css
|   |   └── delivery-page
|   |       ├── DeliveryPage.js
|   |       └── styles.css
|   └── services
|       └── Api.js
|   ├── App.css
|   ├── App.js
|   ├── App.text.js
└── README.md

```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
