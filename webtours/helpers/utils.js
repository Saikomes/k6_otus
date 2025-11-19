export function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function parseCSV(text) {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',');

  return lines.slice(1).map((line) => {
    const cols = line.split(',').map((c) => c.replace(/^"|"$/g, ''));
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = cols[i];
    });
    return obj;
  });
}

export function formBody(params) {
  return Object.entries(params)
    .map(
      ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v ?? '')}`,
    )
    .join('&');
}
