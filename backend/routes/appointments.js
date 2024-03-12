const express = require('express');
const {
  createAppointment,
  getOneAppointment,
  getPatientAppointment,
  getAllAppointments,
  createConfirmedDate,
  getApptAndDoctor,
  getTakenDates,
  updateAppointment,
  removeDate,
  updateApptStatus
} = require('../controllers/appointmentController');

const cors = require('cors');
const router = express.Router();
router.use(express.json());
router.use(cors());



// // grab all appointments
router.get('/', getAllAppointments);

// create new appointment 
router.post('/', createAppointment);

// grab all appointments populated with doctors
router.get('/getApptAndDoctor', getApptAndDoctor);

// grab appointment by appt ID
router.get('/:id', getOneAppointment);

// grab all appointments by patient id
router.get('/patient/:id', getPatientAppointment);



// --- ApptDate routes --- // 

// post date into the apptdates collection to keep track of reserved dates
router.post('/confirmDate', createConfirmedDate);

// get all dates in our apptdates via doctor's mongoDB ID
router.get('/getTakenDates/:id', getTakenDates);

// get all dates in our apptdates via doctor's mongoDB ID
router.patch('/updateAppointment/:id', updateAppointment);

// update specifically the status 
router.patch('/updateApptStatus/:id', updateApptStatus);

router.delete('/removeDate/:id', removeDate);

module.exports = router;
