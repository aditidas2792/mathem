// const BASE_URL = 'https://api.mathem.io/mh-test-assignment';

// export const getDeliveryDates = () => {
//   return fetch(`${BASE_URL}/delivery/dates`)
//     .then(response => response.json())
//     .catch(error => console.log(error));
// };

// export const getDeliveryTimes = (date) => {
//   return fetch(`${BASE_URL}/delivery/times/${date}`)
//     .then(response => response.json())
//     .catch(error => console.log(error));
// };

const BASE_URL = 'https://api.mathem.io/mh-test-assignment';

// Function to get delivery dates
export const getDeliveryDates = () => {
  // Return a promise that resolves with the response JSON if successful,
  // or rejects with the error if unsuccessful
  return fetch(`${BASE_URL}/delivery/dates`)
    .then(response => response.json()) // Parse the response JSON
    .catch(error => {
      console.log(error); // Log the error to the console
      return Promise.reject(error); // Return a rejected promise with the error
    });
};

// Function to get delivery times for a given date
export const getDeliveryTimes = (date) => {
  // Return a promise that resolves with the response JSON if successful,
  // or rejects with the error if unsuccessful
  return fetch(`${BASE_URL}/delivery/times/${date}`)
    .then(response => response.json()) // Parse the response JSON
    .catch(error => {
      console.log(error); // Log the error to the console
      return Promise.reject(error); // Return a rejected promise with the error
    });
};
