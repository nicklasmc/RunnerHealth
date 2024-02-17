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
        <div className="doc-head">
          <h1 className="name">
            {doctors.fname} {doctors.lname}, {doctors.title}
          </h1>
          <img src={doctors.image} className="doc-img" alt={`${doctors.fname} ${doctors.lname}`} />
        </div>
        <div className="doc-info">
          <h2 className="doc-headers">Gender:</h2>
          <p className="doc-text"> {doctors.gender}</p>
          <h2 className="doc-headers">Specialty:</h2>
          <p className="doc-text"> {doctors.specialization}</p>
          <h2 className="doc-headers">Education: </h2>
          <p className="doc-text"> {doctors.education}</p>
        </div>
        <div className="doc-contact">
          <h2 className="doc-headers">Email Contact: </h2>
          <p className="doc-text"> {doctors.email} </p>
        </div>
      </div>
    </div>
  );
};

export default DocProfile;
