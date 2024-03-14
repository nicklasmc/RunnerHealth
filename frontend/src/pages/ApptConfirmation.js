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
        <div className='appt-container'>
          <h1 className='confirm-title'>Appointment Request Received!</h1>
            <div className='confirm-appt-msg'>
              <h2 className='confirm-appt-msg-cont'> Thank you {appt.patientFirstName}, 
                your appointment has been successfully scheduled!</h2>
                <br/>
                <br/>
                <h2 className='confirm-appt-msg-cont'>A member of our team 
                will reach out to you soon. Please come prepared and on time for your
                appointment.</h2>
              <h2 className='confirm-appt-msg-notice'><strong><em> If you wish to cancel or reschedule, 
                please contact your provider as soon as possible.</em></strong></h2>
            </div>
          <h2 className='confirm-appt-table'> 
            <strong>Appointment information for {appt.patientFirstName} {appt.patientLastName}</strong></h2>
              <table className='confirm-appt-table'>
                <tbody>
                  <tr>
                    <td> <strong>Your {appt.apptReason} appointment is scheduled for:</strong> </td>
                    <td> <strong>Additional information regarding your appointment will be sent to your contact information:</strong></td>
                  </tr>
                </tbody>  
                <tbody> 
                  <tr>
                    <td> {appt.preferredDate}</td>
                    <td>Email: {appt.patientEmail}</td>
                  </tr>
                </tbody>
                <tbody> 
                  <tr>
                    <td>at {appt.time}</td>
                    <td>Phone: {appt.patientPhone} </td>
                  </tr>
                </tbody>
              </table>
          <h2 className='notice'> Please save this confirmation in the event that you need to
            reschedule or cancel your appointment.</h2>
          <Link to="/patient_home" className="appt-return">
            <button className="appt-main-container-btn">
              Click here to return Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApptConfirmation;