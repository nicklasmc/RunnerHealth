const { default: mongoose } = require("mongoose");
const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");
const ApptDate = require("../models/apptDateModel");

// get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({}).sort({ createdAt: -1 });
    console.log(appointments);
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// create single appointment
const createAppointment = async (req, res) => {
  // adding to db
  try {
    const newAppointment = await Appointment.create(req.body);

    res.status(200).json(newAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// grab appointment based on appt Id
const getOneAppointment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such appointmnet" });
  }
  try {
    const appointment = await Appointment.findById(id);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// gets all appt's listed under patient's id
const getPatientAppointment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Patient does not exist" });
  }
  try {
    const appointment = await Appointment.find({ patientId: id });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateApptStatus = async (req, res) => {
  const { id } = req.params;
  const updateInfo = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Appointment does not exist" });
  }
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: id },
      updateInfo,
      {
        new: true,
      }
    );
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// get appointment populated with doctor's information as well
const getApptAndDoctor = async (req, res) => {
  try {
    const appts = await Appointment.find({}).populate("doctor");
    res.status(200).json(appts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const removeDate = async (req, res) => {
  try {
    const { date } = req.params;
    const { id } = req.params;
    const { timeSlot } = req.body;
    // populate, but only if it matches the doctor's id
    const appts = await ApptDate.findOne({ apptDay: date }).populate();
    if (appts) {
      const updatedAppt = await ApptDate.findOneAndUpdate(
        { _id: appts._id },
        { $pull: { [timeSlot]: id } },
        { new: true }
      );

      res.status(200).json({ message: updatedAppt });
    } else {
      // no appts found
      res.status(200).json({ message: "No appointment found" });
    }
  } catch (error) {
    console.log("error---->", error);
    res.status(400).json({ message: error.message });
  }
};

const getApptsByDate = async (req, res) => {
  const { date } = req.params;
  const { id } = req.params;
  try {
    // populate, but only if it matches the doctor's id
    const appts = await ApptDate.find({ apptDay: date })
      .populate("time09")
      .populate({
        path: "time09",
        match: { doctor: id },
      })
      .populate({
        path: "time10",
        match: { doctor: id },
      })
      .populate({
        path: "time11",
        match: { doctor: id },
      })
      .populate({
        path: "time12",
        match: { doctor: id },
      })
      .populate({
        path: "time13",
        match: { doctor: id },
      })
      .populate({
        path: "time14",
        match: { doctor: id },
      })
      .populate({
        path: "time15",
        match: { doctor: id },
      })
      .populate({
        path: "time16",
        match: { doctor: id },
      });

    res.status(200).json(appts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const updatedForm = req.body;

  try {
    const updatedAppt = await Appointment.findByIdAndUpdate(id, updatedForm);
    if (!updatedAppt) {
      return res.status(404).json({ error: "No such appointmnet" });
    }
    res.status(200).json(updatedAppt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const checkDate = async (req, res) => {
  const { date } = req.params;
  try {
    const day = await ApptDate.findOne({ apptDay: new Date(date) });
    if (day) {
      res.json({ found: true });
    } else {
      res.json({ found: false });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createApptDate = async (req, res) => {
  const { preferredDate } = req.params;
  console.log(preferredDate);
  try {
    const newApptDate = await ApptDate.create({
      apptDay: new Date(preferredDate),
    });
    res.status(200).json(newApptDate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createConfirmedAppt = async (req, res) => {
  const { apptDay, timeSlot, appointmentId, docId } = req.body;
  console.log("Timeslot -----> ", timeSlot);
  console.log("Day -----> ", apptDay);
  console.log("ID -----> ", appointmentId);
  console.log("Doc -----> ", docId);

  try {
    // 1: grab the date, populate it
    let apptDate = await ApptDate.findOne({ apptDay: apptDay }).populate({
      path: timeSlot,
      populate: {
        path: "doctor",
      },
    });
    if (!apptDate) {
      console.log("No apptDate found");
      const newApptDate = await ApptDate.create({
        apptDay: new Date(apptDay),
      });
      console.log("Created new ApptDate:", newApptDate);
      apptDate = await ApptDate.findOne({ apptDay: apptDay }).populate({
        path: timeSlot,
        populate: {
          path: "doctor",
        },
      });
    }

    let currentDocs = [];
    // 2. gather all doctors in the timeslot
    apptDate[timeSlot].forEach((element) => {
      currentDocs.push(element.doctor._id.toString()); // conv. to string for processing
    });
    var filteredDocs = currentDocs.filter((val) => val === docId);
    console.log("currentDocs:", currentDocs);
    console.log("filteredDocs:", filteredDocs);

    // check timeslot against what we have
    if (filteredDocs.length === 0) {
      console.log("timeslot is empty!");
      apptDate[timeSlot].push(appointmentId);
      await apptDate.save();
      res.status(200).json({ message: "true" });
    } else {
      console.log("timeslot is reserved, push denied");
      return res.status(200).json({ message: "false" });
    }
  } catch (error) {
    return res.status(400).json({ message: "false" });
  }
};

// gets all appt's listed under doctor's id
const getDoctorAppointment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Doctor does not exist" });
  }
  try {
    const appointment = await Appointment.find({ doctor: id });
    // console.log(appointment);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  updateAppointment,
  createConfirmedAppt,
  createAppointment,
  getOneAppointment,
  getAllAppointments,
  getPatientAppointment,
  getApptAndDoctor,
  getApptsByDate,
  removeDate,
  updateApptStatus,
  checkDate,
  createApptDate,
  getDoctorAppointment,
};
