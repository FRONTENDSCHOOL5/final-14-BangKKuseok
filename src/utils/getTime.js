export const convertDateFormat = (date) => {
  const dateUTC = new Date(date);
  const year = dateUTC.getFullYear();
  const month = String(dateUTC.getMonth() + 1).padStart(2, '0');
  const day = String(dateUTC.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const minute = 60;
const hour = 3600;
const day = 86400;
const month = 2592000;

export const getTimeGap = (date) => {
  const now = Date.now();
  const commentDate = Date.parse(date);
  //초단위 gap
  const gap = (now - commentDate) / 1000;

  if (gap < minute) {
    return '방금 전';
  } else if (gap < hour) {
    return `${Math.floor(gap / minute)}분 전`;
  } else if (gap < day) {
    return `${Math.floor(gap / hour)}시간 전`;
  } else if (gap < month) {
    return `${Math.floor(gap / day)}일 전`;
  } else {
    return convertDateFormat(date);
  }
};
