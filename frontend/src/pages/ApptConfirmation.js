import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import './styles/apptCreation.css';
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

        <h2>A member of our team will reach out soon</h2>
        <p>{appt.patientFirstName}</p>
        <p>{appt.patientLastName}</p>
        <p>{appt.apptReason}</p>
        <p>{appt.patientEmail}</p>
        <p>{appt.patientPhone}</p>
        <p>Additional comments: {appt.apptComments}</p>
        <p>Requested Date Range: {appt.preferredDate} </p>
        <p>Requested Time: {appt.time}</p>
      </div>
    </div>
  );
};

export default ApptConfirmation;