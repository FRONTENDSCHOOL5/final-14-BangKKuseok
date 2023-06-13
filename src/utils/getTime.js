export const convertDateFormat = (date) => {
  let dateISO = date.replace(/\D/g, ' ').split(' ');
  dateISO[1]--;
  const dateUTC = new Date(Date.UTC.apply(null, dateISO));

  const year = dateUTC.getFullYear();
  const month = String(dateUTC.getMonth() + 1).padStart(2, '0');
  const day = String(dateUTC.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};
