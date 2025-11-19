export const BASE_URL = 'http://webtours.load-test.ru:1080';

export const COMMON_HEADERS = {
  'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
  'Accept-Encoding': 'gzip, deflate',
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
};

export const FORM_HEADERS = {
  ...COMMON_HEADERS,
  'Content-Type': 'application/x-www-form-urlencoded',
};
