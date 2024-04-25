const extractTimes = (prop) => {
  // works with timexx format in appDateModel.js
  let tempArr = [];
  if (prop.data.length > 0) {
    // check 9:00
    if (prop.data[0].time09.length === 0) {
      tempArr.push({ value: "0900", label: "9:00 AM" });
    } else {
      tempArr.push({ value: "0900", label: "9:00 AM", disabled: true });
    }
    // 10:00 - 1000
    if (prop.data[0].time10.length === 0) {
      tempArr.push({ value: "1000", label: "10:00 AM" });
    } else {
      tempArr.push({ value: "1000", label: "10:00 AM", disabled: true });
    }
    // 11:00 - 1100
    if (prop.data[0].time11.length === 0) {
      tempArr.push({ value: "1100", label: "11:00 AM" });
    } else {
      tempArr.push({ value: "1100", label: "11:00 AM", disabled: true });
    }
    // 12:00 - 1200
    if (prop.data[0].time12.length === 0) {
      tempArr.push({ value: "1200", label: "12:00 PM" });
    } else {
      tempArr.push({ value: "1200", label: "12:00 PM", disabled: true });
    }
    // 1:00 - 1300
    if (prop.data[0].time13.length === 0) {
      tempArr.push({ value: "1300", label: "1:00 PM" });
    } else {
      tempArr.push({ value: "1300", label: "1:00 PM", disabled: true });
    }
    // 2:00 - 1400
    if (prop.data[0].time14.length === 0) {
      tempArr.push({ value: "1400", label: "2:00 PM" });
    } else {
      tempArr.push({ value: "1400", label: "2:00 PM", disabled: true });
    }
    // 3:00 - 1500
    if (prop.data[0].time15.length === 0) {
      tempArr.push({ value: "1500", label: "3:00 PM" });
    } else {
      tempArr.push({ value: "1500", label: "3:00 PM", disabled: true });
    }
    // 4:00 - 1600
    if (prop.data[0].time16.length === 0) {
      tempArr.push({ value: "1600", label: "4:00 PM" });
    } else {
      tempArr.push({ value: "1600", label: "4:00 PM", disabled: true });
    }
  } else {
    console.log("no found apptDate");
    tempArr = [
      { value: "0900", label: "9:00 AM" },
      { value: "1000", label: "10:00 AM" },
      { value: "1100", label: "11:00 AM" },
      { value: "1200", label: "12:00 PM" },
      { value: "1300", label: "1:00 PM" },
      { value: "1400", label: "2:00 PM" },
      { value: "1500", label: "3:00 PM" },
      { value: "1600", label: "4:00 PM" },
    ];
  }
  return tempArr;
};

export default extractTimes;
