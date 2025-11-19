// session.js
import http from 'k6/http';
import { check } from 'k6';
import { parseHTML } from 'k6/html';
import { BASE_URL, COMMON_HEADERS } from '../config.js';

export function extractUserSession(res) {

  const doc = parseHTML(res.body);
  const userSessionInput = doc.find("input[name='userSession']").first();
  const userSession = userSessionInput.attr('value');

  check(userSession, {
    'userSession extracted': (v) => !!v,
  });

  return userSession;
}
