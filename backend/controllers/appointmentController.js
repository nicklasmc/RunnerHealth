const { default: mongoose } = require('mongoose');
const Appointment = require('../models/appointmentModel');
const Doctor = require('../models/doctorModel');


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
  
    const {
      doctorID,
      patientId,
      facility,
      reasonForVisit,
      patientFirstName,
      patientLastName,
      patientEmail,
      patientPhone,
      languagePreference,
      dateStart,
      dateEnd,
      time,
      confirmed,
    } = req.body;

    const newAppointmentDetails = { 
      doctorID,
      patientId,
      facility,
      reasonForVisit,
      patientFirstName,
      patientLastName,
      patientEmail,
      patientPhone,
      languagePreference,
      dateStart,
      dateEnd,
      time,
      confirmed,
    };
    // adding to db
    try {
    const newAppointment = await Appointment.create(newAppointmentDetails);

    res.status(200).json(newAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// grab appointment based on patient Id
const getOneAppointment = async (req,res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such appointmnet' });
  }
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// combine appointments and doctors fields based on the foreign key attributes using mongodb
const getAppointmentAndDoctor = async (req,res) => {
  try {
    const appointments = await Appointment.aggregate([
      {
        $lookup: {
          from: "doctors",
          localField: "doctorID",
          foreignField: "_id",
          as: "doctorAppointment"
        }
      }
    ]);
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

};

module.exports = {
  // getAllAppointments,
  createAppointment,
  getOneAppointment,
  getAllAppointments,
  getAppointmentAndDoctor
}