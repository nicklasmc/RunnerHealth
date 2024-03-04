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

// grab appointment based on patient Id
const getOneAppointment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such appointmnet" });
  }
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
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

// store the confirmed date inside of DB
const createConfirmedDate = async (req, res) => {
  const apptObj = {
    takenDate: req.body[0],
    appointment: req.body[1],
  };

  try {
    const appts = await ApptDate.create(apptObj);

    res.status(200).json(appts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const removeDate = async (req, res) => {
  const { id } = req.params;
  try {
    const appts = await ApptDate.deleteOne({ appointment: id });
    res.status(200).json(appts);
  
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTakenDates = async (req, res) => {
  const { id } = req.params; // id corresponds to doctor's mongoDB ID
  try {
    // significantly more complex query, deeper search
    // time to use mongodb functions... great..

    // steps:
    // 1. get appointments belonging to a doctor
    // 2. cross-reference with the takenDates in apptDates collection
    // 3. extract and return only the takenDates

    const gatheredDates = await Appointment.aggregate([
      // 1. get appointments belonging to a doctor, ensure of type mongoose id
      { $match: { doctor: new mongoose.Types.ObjectId(id) } },

      // 2. cross-reference with the takenDates in apptDates collection
      {
        // still in appointments,
        $lookup: {
          from: "apptdates", // inside apptdates
          localField: "_id", // still in appointments, use the id's per doc
          foreignField: "appointment", // do not confuse for collection! this is a FIELD
          as: "apptDates", // store as apptdates
        },
      },

      { $unwind: "$apptDates" }, // apptDates got from the 'as' field above

      // 3. extract and return only the takenDates
      {
        $project: {
          _id: 0, // 0 to disable, don't need this here
          takenDate: "$apptDates.takenDate", // project all the takenDates
        },
      },

      // reached the final stage, save into gatheredDates variable
    ]);

    const takenDates = gatheredDates;
    console.log(takenDates);
    res.status(200).json(takenDates);
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

module.exports = {
  updateAppointment,
  createConfirmedDate,
  createAppointment,
  getOneAppointment,
  getAllAppointments,
  getApptAndDoctor,
  getTakenDates,
  removeDate,
};