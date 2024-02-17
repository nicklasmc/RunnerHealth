const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema(
    {
        doctorID: {
            type: String,
            required: true
        },
        patientId: {
            type: String,
            required: [true, 'Patient Id required'],
        },
        facility: {
            type: String,
            default: null, // Needs to be null for when a request is submitted, updated by staff
        },
        reasonForVisit: {
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
        dateStart: {
            type: Date,
            required: [true, 'Enter a start date'],
        },
        dateEnd: {
            type: Date,
            required: [true, 'Enter an end date'],
        },
        time: {
            type: String,
            required: [true, 'Enter a preferred time'],
        },
        confirmed: {
            type: Boolean,
            required: false,
        },
        pending: {
            type: Boolean,
            required: false,
        }
    }

)

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
