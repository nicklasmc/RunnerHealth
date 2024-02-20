const express = require('express');
const {
  createAppointment,
  getOneAppointment,
  getAllAppointments,
  createConfirmedDate,
  getApptAndDoctor,
  getTakenDates,
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

// grab appointment by patient ID
router.get('/:id', getOneAppointment);


// --- ApptDate routes --- // 

// post date into the apptdates collection to keep track of reserved dates
router.post('/confirmDate', createConfirmedDate);

// get all dates in our apptdates via doctor's mongoDB ID
router.get('/getTakenDates/:id', getTakenDates);

module.exports = router;
