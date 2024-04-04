const express = require('express');
const {
  createAppointment,
  getOneAppointment,
  getPatientAppointment,
  getAllAppointments,
  createConfirmedAppt,
  getApptAndDoctor,
  getApptsByDate,
  updateAppointment,
  removeDate,
  updateApptStatus,
  checkDate,
  createApptDate,
  getDoctorAppointment
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

// get all appts owned by a doctor
router.get('/doctor/:id', getDoctorAppointment);



// --- ApptDate routes --- // 

// post date into the apptdates collection to keep track of reserved dates
router.post('/confirmAppt', createConfirmedAppt);

// get all dates in our apptdates via doctor's mongoDB ID
router.get('/getApptsByDate/:date/:id', getApptsByDate);

// check if date has been initialized 
router.get('/checkDate/:date', checkDate);

// check if date has been initialized 
router.post('/createApptDate/:preferredDate', createApptDate);

// get all dates in our apptdates via doctor's mongoDB ID
router.patch('/updateAppointment/:id', updateAppointment);

// update specifically the status 
router.patch('/updateApptStatus/:id', updateApptStatus);

router.patch('/removeDate/:id/:date', removeDate);

module.exports = router;
