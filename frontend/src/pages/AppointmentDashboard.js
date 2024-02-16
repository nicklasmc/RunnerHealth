import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { useAuthContext } from '../hooks/useAuthContext'; // SAVE FOR USER GROUPS
import './styles/appointmentDashboard.css';


const AppointmentDashboard = () => {
    // Variables
    // ----------------------------------------------- 
    //const { patient } = useAuthContext();  // !!! Switch to applicable user group. This is a placeholder not meant for deployment !!! //
    const [appointment, setAppointment] = useState({});
    const [loading, setLoading] = useState(true);
    // ----------------------------------------------- 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const appointmentResponse = await axios.get(`http://localhost:4000/appointments/appointmentAndDoctor`);
                setAppointment(appointmentResponse.data);
                setLoading(false);
            }
            catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }


    // ------------------------- // 
    // NOTES FOR FUTURE REFERENCE:
    // - Variables via route `http://localhost:4000/appointments/appointmentAndDoctor` in controller file:
    // 1. 'appointment' object is good as is
    // 2. 'doctorAppointment' is an array belonging to 'appointment' obj, dereference with [0] and append a ? in case 
    // it has not rendered
    // 3. Refer to MongoDB official documentation on $lookup, this gave us a combination of both doctors and appointments
    // ------------------------- // 



    // ----- Notes for Frontend Team ----- // 
    // 1. Display uses flexboxes
    // 2. appt-cell-left, appt-cell-middle, and appt-cell-right have identical styling
    // 3. If necessary, redo the entire structure. Do whatever you need to do
    // 4. Referencing data is a little different than any of our other documents since it 
    //    combines two different documents. Refer to that for more information.
    // ----------------------------------- // 
    return (

        <div>
            <div className="appt-main-container">
                    {appointment.map((appointments) => (
                        <div key={appointments._id} className="appt-cells">
                            <div className = "appt-cell-one">
                                <p> <span className = "text-red-500">Appt ID:</span> {appointments._id} </p>
                                <p> <span className = "text-red-500">Requested Time:</span> {appointments.time} </p>
                                <p> <span className = "text-red-500">Requested Date:</span> {new Date(appointments.dateStart).toDateString()} - {new Date(appointments.dateEnd).toDateString()} </p>
                                <p> <span className = "text-red-500">Preferred Language:</span> {appointments.languagePreference}</p>
                            </div>
                            <div className = "appt-cell-two">
                                <p> <span className = "text-red-500">Patient Name:</span> {appointments.patientFirstName} {appointments.patientLastName} </p>
                                <p> <span className = "text-red-500">Doctor Name:</span> {appointments.doctorAppointment[0]?.fname} {appointments.doctorAppointment[0]?.lname}</p>
                                <p> <span className = "text-red-500">Facility:</span> {appointments.facility}</p>
                            </div>
                            <div className = "appt-cell-three">
                                <p>Reason for Visit: {appointments.reasonForVisit} </p>
                            </div>
                            <div className = "appt-cell-four">
                                <p> <span className = "text-red-500">Status:</span> {appointments.confirmed ? 'Confirmed' : 'Pending'} </p>
                                <button className = "appt-update-btn">Update Status</button> <br></br>
                                <button> Confirm </button>
                            </div>
                        </div>
                    ))}
                </div>

        </div>
    )
};
export default AppointmentDashboard;