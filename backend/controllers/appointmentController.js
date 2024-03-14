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
    const appointment = await Appointment.find({patientId: id});
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateApptStatus = async (req,res) => {
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: "Appointment does not exist"})
  }
  try {
    const appointment = await Appointment.findByIdAndUpdate(id, req.body);
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

const checkDate = async (req, res) => {
  const { date } = req.params;
  try {
    const day = await ApptDate.findOne({apptDay: new Date(date)});
    if (day) {
      res.json({found:true});
    }
    else {
      res.json({found:false});
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createApptDate = async (req, res) => {
  const { preferredDate } = req.params;
  console.log(preferredDate);
  try {
    const newApptDate = await ApptDate.create({ apptDay: new Date(preferredDate) });
    res.status(200).json(newApptDate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createConfirmedAppt = async (req, res) => {
  const { apptDay, timeSlot, appointmentId } = req.body;
  console.log("Timeslot -----> ",timeSlot);
  try {
    const day = new Date(apptDay);
    const apptDate = await ApptDate.findOne({ apptDay: day });
    // useful ref https://www.mongodb.com/docs/manual/reference/operator/query/in/
    if (apptDate && apptDate[timeSlot]) {
      // appointment is sitting in the appt collection, grab it w/ doctor id
      const bookingAppt = await Appointment.findById(appointmentId);
      const doctorId = bookingAppt.doctor;

      // take everything in the appointment collection
      // 1. find inside appt collection
      // 2. break it down to where the _id is equal to...
      // 3. ... the appt id IN the timeslot (because we only need THOSE)
      // 4. now that we have it, populate existingappt w/ doctor info
      // 5. appointments are now populated w/ doctor info
      const existingAppointments = await Appointment.find({
        _id: { $in: apptDate[timeSlot] },
      }).populate("doctor");

      // iterate through every single appointment, find if the doctor
      // is booked or not
      for (let i = 0; i < existingAppointments.length; i++) { // length of arr.;
        console.log(`Comparing ${existingAppointments[i].doctor._id} with ${doctorId}`);
        if (existingAppointments[i].doctor._id.equals(doctorId)) {
          console.log("Doctor Already booked...");
          return res.status(200).json({ message: "false" });
        }
      }
    }

    if (!apptDate) { 
      console.log("ApptDate not found!!!");
      // create apptDate if we need it
      const newApptDateData = {
        apptDay: day,
        [timeSlot]: [appointmentId]
      };
      console.log("checkpoint waiting... new apptdate");
      await ApptDate.create(newApptDateData);
      console.log("checkpoint created new apptdate");
    } else {
      // push into the timeslot
      console.log("ApptDate found, updating...");
      apptDate[timeSlot].push(appointmentId);
      await apptDate.save();
    }

    console.log("checkpoint final");
    res.status(200).json({ message: "true" });
  } catch (error) {
    console.error("Error creating confirmed appointment:", error);
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
  getTakenDates,
  removeDate,
  updateApptStatus,
  checkDate,
  createApptDate
};