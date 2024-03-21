// use to convert times
// ex. 0900 -> time09
const convertMilitaryToTimeslot = (militaryTime) => {
  let hour = militaryTime.substring(0, 2);
  console.log("miltime: ", militaryTime)
  console.log("hour: ", hour);
  return `time${hour}`;
};

export default convertMilitaryToTimeslot;
