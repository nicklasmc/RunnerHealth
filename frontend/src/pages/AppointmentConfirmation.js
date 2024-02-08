import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import './styles/bookAppointment.css';
const ConfirmationPage = () => {
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


  // For reference: 
  // ---------------
  // providerId: '',
  // facility: '', 
  // reasonForVisit: '',
  // patientFirstName: '',
  // patientLastName: '',
  // patientEmail: '',
  // patientPhone: '',
  // languagePreference: '',
  // dateStart: '',
  // dateEnd: '',
  // time: '',

  return (
    <div>
      <div className='appt-main-container'>
        <h1>Appointment Request Received!</h1>
        <h2>A member of our team will reach out soon</h2>
        <p>{appt.facility}</p>
        <p>{appt.patientFirstName}</p>
        <p>{appt.patientLastName}</p>
        <p>{appt.reasonForVisit}</p>
        <p>{appt.patientEmail}</p>
        <p>{appt.patientPhone}</p>
        <p>Requested Date Range: {appt.dateStart} - {appt.dateEnd}</p>
        <p>Requested Time: {appt.time}</p>
      </div>
    </div>
  );
};

export default ConfirmationPage;