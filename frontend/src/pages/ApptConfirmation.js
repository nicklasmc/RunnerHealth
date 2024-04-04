import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import './styles/apptCreation.css';
import { Link } from 'react-router-dom';
import { format } from "date-fns";
import convertClockTime from "../utils/convertClockTime";

const ApptConfirmation = () => {
  const { id } = useParams();
  const [appt, setApptData] = useState({});
  const [apptDate, setApptDate] = useState();
  const [apptTime, setApptTime] = useState();
  const formatDate = (dateProp) => {
    console.log(dateProp);
    try {
      return format(new Date(dateProp), "MM/dd/yyyy");
    } catch {
      console.log("Invalid date/Unable to format");
      return dateProp;
    }
  };
  
  
  useEffect(() => {
    const getAppointmentInfo = async () => {
      const res = await axios.get(`http://localhost:4000/appointments/${id}`);
      setApptData(res.data);
      let formattedDate = formatDate(res.data.preferredDate);
      let formattedTime = convertClockTime(res.data.time);
      setApptDate(formattedDate);
      setApptTime(formattedTime);
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
                    <td> {apptDate}</td>
                    <td>Email: {appt.patientEmail}</td>
                  </tr>
                </tbody>
                <tbody> 
                  <tr>
                    <td>at {apptTime}</td>
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