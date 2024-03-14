import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import './styles/apptCreation.css';
import { Link } from 'react-router-dom';
const ApptConfirmation = () => {
  const { id } = useParams();
  const [appt, setApptData] = useState({});
  console.log(id);
  useEffect(() => {
    const getAppointmentInfo = async () => {
      const res = await axios.get(`http://localhost:4000/appointments/${id}`);
      setApptData(res.data);
    };
    getAppointmentInfo();
  }, [id]);

  return (
    <div>
      <div className='appt-main-container'>
        <h1 className='subsec-title'>Appointment Request Received!</h1>
          <div className='confirm-appt-msg'>
            <h2 className='confirm-appt-msg-cont'> Thank you {appt.patientFirstName}, 
              your appointment has been successfully scheduled! A member of our team 
              will reach out to you soon. Attached below is all the information needed
              for your upcoming appointment. Please come prepared and on time for your
              appointment.<strong><em> If you wish to cancel or reschedule your 
                apppointment, please contact us as soon as possible.</em></strong></h2>
          </div>
        <h2 className='confirm-appt-table'> 
          <strong>Appointment information for {appt.patientFirstName} {appt.patientLastName}</strong></h2>
            <table className='confirm-appt-table'>
              <tbody>
                <tr>
                  <td> <strong>Your {appt.apptReason} appointment in regards to:</strong> </td>
                  <td> <strong>Any additional information regarding your appointment with: ~Dr.~
                    will be sent to your provided contact information:</strong></td>
                </tr>
              </tbody>  
              <tbody> 
                <tr>
                  <td> {appt.apptComments} is scheduled for {appt.preferredDate} at {appt.time}</td>
                  <td>Email: {appt.patientEmail} Phone: {appt.patientPhone} </td>
                </tr>
              </tbody>
            </table>
        <h2 className='notice'> Please save this message in the event that you need to
          reschedule or cancel your appointment</h2>
        <Link to="/patient_home" className="link-btn" >
          <p className='appt-main-container-btn'>
            Click here to return Home
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ApptConfirmation;