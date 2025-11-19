export function addDays(date, days) {
  const d = new Date(date.getTime());
  d.setDate(d.getDate() + days);
  return d;
}


export function formatDate(d) {
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

export function generateFlightDates() {
  const today = new Date();
  return {
    departDate: formatDate(addDays(today, 1)),
    returnDate: formatDate(addDays(today, 2)),
  };
}