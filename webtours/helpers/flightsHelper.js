import { randomItem } from './utils.js';
import { parseHTML } from 'k6/html';

export function chooseFlights(outboundFlights, returnFlights) {
  return {
    selectedOutbound: randomItem(outboundFlights),
    selectedReturn: randomItem(returnFlights),
  };
}

export function parseFlights(html) {
  const doc = parseHTML(html);

  const outboundFlights = doc
    .find("input[name='outboundFlight']")
    .map((idx, sel) => sel.attr('value'));

  const returnFlights = doc
    .find("input[name='returnFlight']")
    .map((idx, sel) => sel.attr('value'));

  return { doc, outboundFlights, returnFlights };
}