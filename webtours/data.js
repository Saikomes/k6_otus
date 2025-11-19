import { parseCSV } from './helpers/utils.js';

export const users = JSON.parse(open('./resources/testUser.json'));
export const passengers = parseCSV(open('./resources/testPassenger.csv'));
