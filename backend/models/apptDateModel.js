const mongoose = require("mongoose");
const Appointment = require("./appointmentModel");

// controllers found in appointmentController.js to reduce amount of files
// format:
// timexx, where the xx is the first two digits of the MILITARY TIME equivalent
// ex.
// time13 refers to 13:00, which in turn refers to 1:00 pm


const apptDateSchema = mongoose.Schema({
  apptDay: {
    type: Date,
    required: [true, "Date Required"],
  },
  time09: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  time10: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  time11: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  time12: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  time13: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  time14: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  time15: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  time16: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
});

const ApptDate = mongoose.model("ApptDate", apptDateSchema);

module.exports = ApptDate;
