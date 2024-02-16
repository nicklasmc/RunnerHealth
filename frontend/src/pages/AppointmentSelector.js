import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import axios from 'axios';
// import {useParams} from 'react-router-dom';

const Appointment = () => {
  // --- Retrieving from Database --- //
  const [doctors, setDoctors] = useState([]);
  const getDoctorsList = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/doctors/`);
      setDoctors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorsList();
  }, []);

  // Things we can potentially add to this:
  // - School
  // - Bio
  // - Residency Program
  // - Certifications
  // - Languages

  return (
    <div className="schedule page-contents">
      {/* Maps out all the doctors gathered in the doctors array, think of like for loop */}
      {doctors.map((doctors) => (
        <div
          key={doctors.email}
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            margin: '90px 20px',
          }}
        >
          <p> {doctors._id} </p>
          <h1 style={{ fontSize: '20px' }}>
            {doctors.fname} {doctors.lname}
          </h1>
          <p style={{ fontSize: '20px' }}> {doctors.email} </p>
          <Link to={`/appointment/${doctors._id}`}>Book Appointment</Link>{' '}
          <br />
          <button>Profile</button>
        </div>
      ))}
    </div>
  );
};
export default Appointment;
