import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext';
import './styles/bookAppointment.css';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';



const BookAppointment = () => {
    // ----------------------------------------------- 
    // Variables
    const navigate = useNavigate();
    const { id } = useParams(); // Gather id from URL
    const [doctors, setDoctors] = useState({});
    const { patient } = useAuthContext();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [docID, setDocID] = useState();
    const [selectedDate, setSelectedDate] = useState();
    // ----------------------------------------------- 
    const handleSubmit = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        const formData = {
            doctor: docID,
            patientId: user[0]._id,
            reasonForVisit: document.getElementById('appt-reason').value,
            patientFirstName: document.getElementById('patient-first-name').value,
            patientLastName: document.getElementById('patient-last-name').value,
            patientEmail: document.getElementById('email').value,
            patientPhone: document.getElementById('phone').value,
            languagePreference: document.getElementById('languagePreference').value,
            preferredDate: selectedDate,
            time: document.getElementById('appt-time').value,
        };

        try {
        const response = await axios.post('http://localhost:4000/appointments', formData);
        const appointmentId = response.data._id;
        navigate(`/appointment/${id}/${appointmentId}`);
        } catch(error) {
            console.error("error, missing input");
        }
        // console.log("Appointment Creation Successful!");
        // console.log("Appointment with ID : ", response.data._id); // get the ID of the doc just created by mognodb

    }
    // ----------------------------------------------- 
    useEffect(() => {
        const fetchData = async () => {
            try {

                // Notes on the following:
                // Patient is being stored as an array
                // Doctor is being stored as an object
                // Will look at making them both be objects for consistency sake, but it works as is 
                const patientResponse = await axios.get(`http://localhost:4000/patients/${patient.email}`);
                const doctorResponse = await axios.get(`http://localhost:4000/doctors/${id}`);
                setDocID(doctorResponse.data._id);
                setDoctors(doctorResponse.data);
                setUser(patientResponse.data);
                setLoading(false);

            }
            catch (error) {
                console.log(error);
            }
        };

        fetchData();
        // add id, ensure the page changes once the id in the url changes or if the logged in patient's email (how we check who is logged in) changes
    }, [id, patient.email]);

    useEffect( () => {
        if (selectedDate) {
            console.log(selectedDate);
        }
    }, [selectedDate]);

    if (loading) {
        return <div>Loading...</div>
    }
;
    // console.log(user[0]._id);
    // console.log(doctors._id);

    return (

        <div>
            <div className="appt-main-container">
                <button onClick={() => navigate(-1)} className="appt-backbtn">&#x25c0; Back</button>
                <h1 className="appt-greeting">Schedule Your Appointment</h1>
                <div className="appt-sub-container">
                    <p className="appt-static">Physician: {doctors.fname} {doctors.lname}</p>
                    {/* Speciality not currently a field in actual database, will add later but will not cause errors here */}
                    <p className="appt-static">{doctors.speciality}</p> 

                    <div className="appt-form-wrapper">
                        <form className="appt-form" onSubmit={handleSubmit}>
                            <div className="appt-form-section-left">
                                <label htmlFor="appt-reason">Reason for Visit:</label>
                                <input type="text" id="appt-reason" name="appt-reason" />
                            </div>

                            <div className="appt-form-section-middle">
                                <h2>Contact Information</h2>

                                <div>
                                    {user ? (
                                        <div>
                                            <label htmlFor="fname">Patient's First Name</label>
                                            <input type="text" id="patient-first-name" name="fname" value={user[0].fname} disabled className="disabled-input" />
                                            <label htmlFor="lname">Patient's Last Name</label>
                                            <input type="text" id="patient-last-name" name="lname" value={user[0].lname} disabled className="disabled-input" />
                                        </div>
                                    ) : (<div> Loading... </div>)}
                                </div>

                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="e.g email@domain.com" />
                                <label htmlFor="phone">Phone Number</label>
                                <input type="tel" id="phone" name="phone" placeholder="e.g (123) 456-789" />
                                <label htmlFor="languagePreference">Language Preference</label>
                                <select name="languagePreference" id="languagePreference">
                                    <option value="English">English</option>
                                    <option value="Spanish">Spanish</option>
                                </select>
                            </div>

                            <div className="appt-form-section-right">
                                <h2>Appointment Time</h2>
                                <DayPicker 
                                    showOutsideDays // show days outside of the month for accessibility purposes 
                                    fixedWeeks // fixed to 6 week display, prevents resizing to ease up styling 
                                    mode = "single" // single date selection only
                                    onSelect={setSelectedDate} // useState, will convert all inputs to be of this type
                                    disabled = {{dayOfWeek: [0,6]}} // gray out the weekends
                                />
                                <h2>Preferred Time:</h2>
                                <input type="time" id="appt-time" name="time" />      
                                <p className = "text-red-500">Note: A member of staff will be in contact to 
                                confirm a final date and time based on availability.</p>
                                <br />
                                <br />
                                <button type="submit" className="submit-button">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default BookAppointment;