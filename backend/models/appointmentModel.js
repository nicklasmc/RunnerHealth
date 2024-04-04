const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema(
    {
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor',
            required: true
        },
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
            required: [true, 'Patient Id required'],
        },
        facility: {
            type: String,
            default: null, 
        },
        apptComments: {
            type: String,
            default: null,
        },
        apptReason: {
            type: String,
            required: [true, 'Enter a reason for visit'],
        },
        patientFirstName: {
            type: String,
            required: [true, 'Enter a first name'],
        },
        patientLastName: {
            type: String,
            required: [true, 'Enter a last name'],
        },
        patientEmail: {
            type: String,
            required: [true, 'Enter an email'],
        },
        patientPhone: {
            type: String,
            required: [true, 'Enter a phone number'],
        },
        languagePreference: {
            type: String,
            required: [true, 'Enter a language preference'],
        },
        preferredDate: {
            type: Date,
            required: [true, 'Enter a start date'],
        },
        confirmedDate: {
            type: Date,
            default: null,
        },
        time: {
            type: String,
            required: [true, 'Enter a preferred time'],
        },
        status: {
            type: String,
            required: [true, 'Status required'],
            default: "Pending",
        },
        lastEditted: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
            required: false,
            default: null,
        }
        
    },
    {
        timestamps: true,
    }

)

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
