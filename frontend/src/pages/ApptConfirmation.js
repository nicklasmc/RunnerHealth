import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/apptCreation.css';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import convertClockTime from '../utils/convertClockTime';

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
    <div className="confirm-main-container">
      <h1 className="confirm-title">Appointment Request Received!</h1>
        <div className="confirm-appt-msg">
          <p className="confirm-appt-msg-cont"> Thank you {appt.patientFirstName}, 
            your appointment has been successfully scheduled!</p>
          <p className="confirm-appt-msg-cont">A member of our team 
            will reach out to you soon. Please come prepared and on time for your
            appointment.</p>
          <p className="confirm-appt-msg-notice"><strong><em> If you wish to cancel or reschedule, 
            please contact your provider as soon as possible.</em></strong></p>
        </div>
      <div className="confirm-appt-content-container">
        <div className="confirm-appt-container">
          <div className="confirm-appt-content">
            <div className="confirm-cell-1">
              <p>
                <span className="confirm-appt-label">Date Received:</span>{" "}
                {formatDate(appt.createdAt)}
              </p>
              <p>
                <span className="confirm-appt-label">Date/Time Requested:</span>{" "}
                {formatDate(appt.preferredDate)} {" "}{convertClockTime(appt.time)}
              </p>
            </div>
            <div className="confirm-cell-2">
              <p>
                <span className="confirm-appt-label">Reason:</span>{" "}
                {appt.apptReason}{" "}
              </p>
              <p>
                <span className="confirm-appt-label">Provider:</span>{" "}
                {appt.doctor.fname} {appt.doctor.lname}
              </p>
            </div>
          </div>
        </div>
      </div>
      <h2 className="notice"> Please save this confirmation in the event that you need to
        reschedule or cancel your appointment.</h2>
      <Link to="/patient_home" className="appt-return">
        <button className="appt-button">
          Click here to return Home
        </button>
      </Link>
    </div>
  );
};

export default ApptConfirmation;