import { randomItem } from './utils.js';
import { parseHTML } from 'k6/html';

export function parseCities(html) {
  const doc = parseHTML(html);

  const departCities = doc
    .find("select[name='depart'] option")
    .map((idx, sel) => sel.attr('value'));

  const arriveCities = doc
    .find("select[name='arrive'] option")
    .map((idx, sel) => sel.attr('value'));

  return { doc, departCities, arriveCities };
}

export function chooseCities(departCities, arriveCities) {
  let departCity = randomItem(departCities);
  let arriveCity = randomItem(arriveCities);

  // исключим совпадение
  if (arriveCities.length > 1) {
    while (arriveCity === departCity) {
      arriveCity = randomItem(arriveCities);
    }
  }

  return { departCity, arriveCity };
}