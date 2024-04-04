// use to convert times
// ex. 0900 -> time09
const convertClockTime = (time) => {
  let hour = time.substring(0, 2);
  if (time === '1200') {
    return `12:00 PM`;
  }
  if (hour < 12) {
  return `${hour}:00 AM`;
  } else {
    hour = hour % 12;
    return `${hour}:00 PM`;
  }
};

export default convertClockTime;
