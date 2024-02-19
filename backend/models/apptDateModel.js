const mongoose = require('mongoose');
const  Appointment = require('./appointmentModel');

// controllers found in appointmentController.js to reduce amount of files

const apptDateSchema = mongoose.Schema(
    {
    takenDate: { 
        type: Date,
        required: [true, 'Date required'],
     },
     appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment"
     }
    }
)

const ApptDate = mongoose.model('ApptDate', apptDateSchema);

module.exports = ApptDate;
