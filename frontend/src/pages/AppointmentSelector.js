import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../pages/styles/appointments.css';
import first from './imgs/placeholder.png';

const Appointment = () => {
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
      <div className="doc-cards grid lg:grid-cols-3 md:grid-cols-2 mobile:grid-cols-1 mobile: flex-shrink-0 gap-5 p-5">
        {doctors.map((doctor) => (
          <div key={doctor.email} className="doctor-card bg-white text-black rounded-xl border-1 border-black border-solid shrink-0 shadow md">
            <div className="flex justify-evenly items-center p-3 shrink-0">
              <div className="flex flex-col items-center">
                <img src={first} alt="Doctor" className="h-44 w-44 rounded-full border-2 border-black border-solid"/>
                <h1 className="text-xl font-semibold">{doctor.fname} {doctor.lname}, {doctor.title}</h1>
              </div>
              <div className="ml-4">
                <div className="flex flex-col items-center mb-4 shrink-0">
                  <p className="text-lg">Gender: {doctor.gender}</p>
                  <p className="text-lg">Specialty: {doctor.specialization}</p>
                  <p className="text-lg">Education: {doctor.education}</p>
                </div>
                <div className="flex flex-col items-center shrink-0">
                  <p className="text-lg">{doctor.email}</p>
                  <Link to={`/appointment/${doctor._id}`} className="bg-[goldenrod] text-white text-lg px-4 py-1 rounded-xl inline-block mt-2">Book Appointment</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointment;
