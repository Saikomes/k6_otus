import { formBody } from "./utils.js";

export function buildSearchBody(depart, arrive, departDate, returnDate) {
  return formBody({
    advanceDiscount: 0,
    depart,
    departDate,
    arrive,
    returnDate,
    numPassengers: 1,
    roundtrip: "on",
    seatPref: "None",
    seatType: "Coach",
    "findFlights.x": 39,
    "findFlights.y": 11,
    ".cgifields": "roundtrip",
  });
}

export function buildSelectBody(outbound, returned) {
  return formBody({
    outboundFlight: outbound,
    returnFlight: returned,
    numPassengers: 1,
    advanceDiscount: 0,
    seatType: "Coach",
    seatPref: "None",
    "findFlights.x": 40,
    "findFlights.y": 6,
  });
}

export function buildPayBody(selectedOutbound, selectedReturn, passenger, passengerFullName) {
  return formBody({
    outboundFlight: selectedOutbound,
    returnFlight: selectedReturn,
    firstName: passenger.firstName,
    lastName: passenger.lastName,
    address1: passenger.address1,
    address2: passenger.address2,
    pass1: passengerFullName,
    numPassengers: 1,
    creditCard: passenger.creditCard,
    expDate: passenger.expDate,
    oldCCOption: "",
    seatType: "Coach",
    seatPref: "None",
    advanceDiscount: 0,
    JSFormSubmit: "off",
    "buyFlights.x": 54,
    "buyFlights.y": 6,
    ".cgifields": "saveCC",
  });
}
