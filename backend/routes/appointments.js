const express = require('express');
const {
  createAppointment,
  getOneAppointment,
  getAllAppointments,
  getAppointmentAndDoctor,
  getApptAndDoctor,
  // getAppointmentById
} = require('../controllers/appointmentController');

const cors = require('cors');
const router = express.Router();
router.use(express.json());
router.use(cors());



// // grab all appointments
router.get('/', getAllAppointments);

// create new appointment 
router.post('/', createAppointment);
 
// get single appointment

// router.post('/confirmApptDate', createApptDate);

// grab all appointments populated with doctors
router.get('/getApptAndDoctor', getApptAndDoctor);

router.get('/:id', getOneAppointment);

module.exports = router;
