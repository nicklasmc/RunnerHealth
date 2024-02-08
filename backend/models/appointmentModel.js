const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema(
    {
        providerId: {
            type: String,
            required: [true, 'Provider Id required'],
        },
        patientId: {
            type: String,
            required: [true, 'Patient Id required'],
        },
        facility: {
            type: String,
            required: [true, 'Enter a facility'],
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
        }
    }

)

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
