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
    <div className="page-contents grid grid-cols-2 mobile:grid-cols-1 gap-4 m-auto w-full">
      {doctors.map((doctor) => (
        <div key={doctor.email} className="doctor-card bg-white text-black rounded-xl border-2 border-black border-solid m-5">
          <div className="flex flex-col items-center p-3">
            <img src={first} alt="Doctor" className="h-44 w-44 rounded-full border-2 border-black border-solid"/>
            <h1 className="text-xl font-semibold mt-2">{doctor.fname} {doctor.lname}</h1>
          </div>

          <div className="flex flex-col justify-center items-center pr-4 pl-4">
            <p className="text-xl">Gender: {doctor.gender}</p>
            <p className="text-xl">Specialty: {doctor.specialization}</p>
            <p className="text-xl">Education: {doctor.education}</p>
          </div>

          <div className="flex flex-col justify-center items-center pt-3 pl-4 pr-4 pb-4">
            <p className="text-center text-xl mb-2">{doctor.email}</p>
            <button>
              <Link to={`/appointment/${doctor._id}`} className="bg-[goldenrod] text-white text-xl px-7 py-1 rounded-xl">Book Appointment</Link>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Appointment;
