// debug.js
import { users, passengers } from './data.js';
import { runLogin } from './steps/login.js';
import { runSelectAndBuy } from './steps/flights.js';

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const user = users[0];
  const passenger = passengers[0];
  const passengerFullName = `${passenger.firstName} ${passenger.lastName}`;

  runLogin(user);
  runSelectAndBuy(passenger, passengerFullName);
}
