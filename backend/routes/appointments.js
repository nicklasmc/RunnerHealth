const express = require('express');
const {
  createAppointment,
  getOneAppointment,
} = require('../controllers/appointmentController');
const cors = require('cors');
const router = express.Router();
router.use(express.json());
router.use(cors());



// // grab all appointments
// router.get('/', getAllAppointments);

// create new appointment 
router.post('/', createAppointment);

// // grab appointment based on doctor ID
// router.get('/doctor/:doctorId', getAppointmentForDoctor);

// // grab appointment based on patient ID
// router.get('/patient/:patientId', getAppointmentForPatient);

// grab appointment based on appointment ID
router.get('/:id', getOneAppointment);

// // update an appointment
// router.patch('/:id', updateAppointment);

// // delete an appointment
// router.delete('/:id', deleteAppointment);

module.exports = router;
