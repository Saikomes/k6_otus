import http from "k6/http";
import { group, check, sleep } from "k6";

import { BASE_URL, COMMON_HEADERS, FORM_HEADERS } from "../config.js";

import { generateFlightDates } from "../helpers/dateHelper.js";
import { buildSearchBody, buildSelectBody, buildPayBody } from "../helpers/bodyBuilder.js";

import { parseCities, chooseCities } from "../helpers/citiesHelper.js";
import { parseFlights, chooseFlights } from "../helpers/flightsHelper.js";

export function runSelectAndBuy(passenger, passengerFullName) {
  group("TXN_SelectAndBuy", () => {
    // Переход на страницу поиска рейсов
    let res = http.get(`${BASE_URL}/cgi-bin/welcome.pl`, {
      headers: COMMON_HEADERS,
      params: { page: "search" },
    });
    check(res, { "flights welcome 200": (r) => r.status === 200 });

    res = http.get(`${BASE_URL}/cgi-bin/nav.pl`, {
      headers: COMMON_HEADERS,
      params: { in: "flights", page: "menu" },
    });
    check(res, { "flights nav 200": (r) => r.status === 200 });

    res = http.get(`${BASE_URL}/cgi-bin/reservations.pl`, {
      headers: COMMON_HEADERS,
      params: { page: "welcome" },
    });
    check(res, { "reservations welcome 200": (r) => r.status === 200 });

    // Выбор города вылета и времени прилёта
    const { departCities, arriveCities } = parseCities(res.body);

    if (!departCities.length || !arriveCities.length) {
      console.error("ERROR: no cities found");
      return;
    }

    const { departCity, arriveCity } = chooseCities(departCities, arriveCities);


    const { departDate, returnDate } = generateFlightDates();


    //Поиск рейсов
    const searchBody = buildSearchBody(departCity, arriveCity, departDate, returnDate);

    res = http.post(`${BASE_URL}/cgi-bin/reservations.pl`, searchBody, {
      headers: FORM_HEADERS,
    });
    check(res, { "search roundtrip 200": (r) => r.status === 200 });

    const { outboundFlights, returnFlights } = parseFlights(res.body);


    //Выбор рейсов
    const { selectedOutbound, selectedReturn } = chooseFlights(outboundFlights, returnFlights);

    const selectBody = buildSelectBody(selectedOutbound, selectedReturn);

    res = http.post(`${BASE_URL}/cgi-bin/reservations.pl`, selectBody, {
      headers: FORM_HEADERS,
    });
    check(res, { "select flight 200": (r) => r.status === 200 });


    // Покупка билетов
    const payBody = buildPayBody(selectedOutbound, selectedReturn, passenger, passengerFullName);

    res = http.post(`${BASE_URL}/cgi-bin/reservations.pl`, payBody, {
      headers: FORM_HEADERS,
    });
    check(res, { "payment 200": (r) => r.status === 200 });

    //Возврат на главную страницу
    res = http.post(`${BASE_URL}/cgi-bin/welcome.pl`, null, {
      headers: COMMON_HEADERS,
      params: { page: "menus" },
    });
    check(res, { "return welcome 200": (r) => r.status === 200 });

    res = http.get(`${BASE_URL}/cgi-bin/login.pl`, {
      headers: COMMON_HEADERS,
      params: { intro: "true" },
    });
    check(res, { "return login 200": (r) => r.status === 200 });

    res = http.get(`${BASE_URL}/cgi-bin/nav.pl`, {
      headers: COMMON_HEADERS,
      params: { in: "home", page: "menu" },
    });
    check(res, { "return nav 200": (r) => r.status === 200 });

  });
}
