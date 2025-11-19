import http from 'k6/http';
import { check, group } from 'k6';

export const options = {
  scenarios: {
    ya_scenario: {
      executor: 'ramping-arrival-rate',
      exec: 'ya',
      startRate: 0,
      timeUnit: '1m',
      preAllocatedVUs: 10,
      maxVUs: 50,
      stages: [
        { duration: '5m', target: 60 },
        { duration: '10m', target: 60 },
        { duration: '5m', target: 72 },
        { duration: '10m', target: 72 },
      ],
    },

    www_scenario: {
      executor: 'ramping-arrival-rate',
      exec: 'www',
      startRate: 0,
      timeUnit: '1m',
      preAllocatedVUs: 20,
      maxVUs: 80,
      stages: [
        { duration: '5m', target: 120 },
        { duration: '10m', target: 120 },
        { duration: '5m', target: 144 },
        { duration: '10m', target: 144 },
      ],
    },
  },
};

export function ya() {
  group('tx_ya', () => {
    const res = http.get('http://ya.ru');

    check(res, {
      'tx_ya: status is 200': (r) => r.status === 200,
    });
  });
}

export function www() {
  group('tx_www', () => {
    const res = http.get('http://www.ru');

    check(res, {
      'tx_www: status is 200': (r) => r.status === 200,
    });
  });
}
