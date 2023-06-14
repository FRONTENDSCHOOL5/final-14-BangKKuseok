export const convertDateFormat = (date) => {
  const dateUTC = new Date(date)
  const year = dateUTC.getFullYear();
  const month = String(dateUTC.getMonth() + 1).padStart(2, '0');
  const day = String(dateUTC.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};
