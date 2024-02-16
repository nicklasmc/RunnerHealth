import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../pages/styles/docProfile.css';

const DocProfile = () => {
  // --- Retrieving from Database --- //
  const { id } = useParams(); // Gather id from URL
  const [doctors, setDoctors] = useState([]);
  const getDoctorsList = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/doctors/${id}`);
      setDoctors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorsList();
  }, []);

  if (!doctors) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="doc-profile page-contents">
      <div className="profile-container">
        <h1 className="name">
          {doctors.fname} {doctors.lname}, {doctors.title}
        </h1>
        <p style={{ fontSize: '20px' }}> {doctors.email} </p>
        <p style={{ fontSize: '20px' }}> {doctors.specialization} </p>
        <p style={{ fontSize: '20px' }}> {doctors.education} </p>
      </div>
    </div>
  );
};

export default DocProfile;
