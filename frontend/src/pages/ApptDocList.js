import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../pages/styles/appointments.css';
import { VscCalendar } from 'react-icons/vsc';

// INSTRUCTIONS FOR ADDING NEW IMAGES
// 1. Img type MUST be of .png
// 2. Img MUST be named after the doctor's mongodb-given id
// 3. place in pages/imgs
const ApptDocList = () => {
  const [doctors, setDoctors] = useState([]);

  const getDoctorsList = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/doctors/`
      );
      setDoctors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // does not work at the moment
  // const getImage = async (id) => {
  //   try {
  //   const img = await import (`../public/imgs/${id}.png`); // dynamically import
  //   return img.default;
  //   } catch (error) {
  //   // console.log("Error getting image: ", error);
  //   const img = await import (`./imgs/placeholder.png`); // dynamically import
  //   return img.default;
  //   }

  // };

  useEffect(() => {
    getDoctorsList();
  }, []);

  return (
    <div className="doc-list-page">
      <div className="select-content">
        {doctors.map((doctor) => (
          <div key={doctor.email} className="doc-card-wrapper">
            <div className="doc-card">
              <div className="image-content">
                <span className="overlay"></span>

                <div className="doc-card-image">
                  <img
                    src={require(`../../public/imgs/${doctor._id}.png`)}
                    alt="placeholder"
                    className="card-img"
                  ></img>
                </div>
              </div>

              <div className="doc-card-content">
                <h2 className="name">
                  {doctor.fname} {doctor.lname}
                </h2>
                <p className="description">Specialty: </p>

                <Link to={`/appointment/${doctor._id}`}>
                  <button className="book-button">
                    <VscCalendar className="calendar-icon" />
                    Book Appointment
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApptDocList;
