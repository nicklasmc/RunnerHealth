import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import first from './imgs/placeholder.png';
import { SlArrowRightCircle } from 'react-icons/sl';
import { LiaAddressBook } from 'react-icons/lia';
import '../pages/styles/patienthome.css';

const Home = () => {
  const [apptList, setApptList] = useState([]); // represents ALL appts
  const { patient } = useAuthContext();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(`http://localhost:4000/patients/${patient.email}`);
        const userData = await response1.json()
  
        if (userData) {
          setUser(userData);
          const response2= await fetch(`http://localhost:4000/appointments/patient/${userData[0]._id}`);
          const apptData = await response2.json();
          setApptList(apptData);
        } else {
          console.log('first else');
        }
      } catch (error) {
          console.log('second else');
      }
    };
  
    fetchData();
  }, [patient.email]);

  const formatDate = (dateProp) => {
    try {
      return format(new Date(dateProp), "MM/dd/yyyy");
    } catch {
      console.log("Invalid date/Unable to format");
      return dateProp;
    }
  };

  const formatReason = (prop) => {
    if (prop === "Other") {
      return "Reason for Visit: Other"
    }  
    else {
      return prop;
    }
  };

  return (
    <div className="home-page">
      <div className="header-container">
        <div className="top-bar bg-[goldenrod] w-full top-0 p-2"/>
        <h2 className="header-content">
        <span className="header-image-span"><img src={first} alt="placeholder" className="header-image"/></span>
          Welcome, &nbsp;
          {user ? (
            user.map((user, index) => (
              <div key={index} className="header-text">
                <span>{user.fname}</span>&nbsp;
                <span>{user.lname}</span>!
              </div>
            ))
          ) : (
            <h1>Gathering Data...</h1>
          )}
        </h2>
      </div>
      <div className="body-container">

        <div className="records-container">
          <div className="content-section">
          <div className="top-bar"/>
          {user.map((user, index) => (
            <Link to="/">
              <p className="content-header">Records</p>
            </Link>
          ))}
          </div>
          <div className="content-text-container">
            <p className="content-text">
              Upload, Store and View your medical records.
            </p>
            <Link to="/" className="records-button-link">
              <button className="records-button">
                View Records
                <LiaAddressBook className=""/>
              </button>
            </Link>
          </div>
        </div>

        <div className="appts-container">
          <div className="content-section">
          <div className="top-bar"/>
            {user.map((user, index) => (
              <Link to={`/myappointments/${user._id}`}>
                <p className="content-header">My Appointments</p>
              </Link>
            ))}
          </div>
          <div className="appts-list">
          {apptList.toReversed().map((appts, index) => (
            <div key={index} className="each-appt">
              <div className="appt-button-container">
              {user.map((user, index) => (
                <Link to={`/myappointments/${user._id}`} className="">
                  <button className="appt-button">
                    View
                    <SlArrowRightCircle className=""/>
                  </button>
                </Link>
              ))}
              </div>
                <div className="appt-doc-name">
                  <p className="appt-text mb-6">{formatReason(appts.apptReason)}</p>
                  <p className="appt-text">Dr. {appts.doctor.fname} {appts.doctor.lname}</p>
                </div>
              <div className="appt-info-container">
                <p className="appt-text mb-3">Date of Service: {formatDate(appts.preferredDate)} at {appts.time}</p>
                <div className="appt-single-border"/>
                <p className="appt-text mt-3">Facility: {appts.doctor.facility[0]}</p>
              </div>
            </div>
          ))}
          </div>
        </div>

        <div className="invoice-container">
          <div className="content-section">
          <div className="top-bar"/>
          {user.map((user, index) => (
            <Link to="/">
              <p className="content-header">Invoice</p>
            </Link>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
