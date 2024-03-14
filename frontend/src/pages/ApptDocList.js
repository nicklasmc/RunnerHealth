import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../pages/styles/appointments.css';
import first from './imgs/placeholder.png';
import { VscCalendar } from 'react-icons/vsc';

const ApptDocList = () => {
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

  return (
    <div className ="appointments-page shrink-0">
        <div className="select-content">
          {doctors.map((doctor) => (
            <div key={doctor.email} className="card-wrapper">
              <div className ="card">
                <div className ="image-content">
                  <span className="overlay"></span>

                  <div className="card-image">
                    <img src={first} alt="placeholder" className="card-img"></img>
                  </div> 
                </div>

                <div className="card-content">
                  <h2 className="name">{doctor.fname} {doctor.lname}, {doctor.title}</h2>
                  <p className="description">Specialty: </p>

                  
                  <Link to={`/appointment/${doctor._id}`}><button className="book-button"><VscCalendar className="calendar-icon"/>Book Appointment</button></Link>
                </div>

              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default ApptDocList;
