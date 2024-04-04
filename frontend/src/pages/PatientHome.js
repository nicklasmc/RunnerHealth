import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import first from './imgs/placeholder.png';
import { SlArrowRightCircle } from 'react-icons/sl';
import { LiaAddressBook } from 'react-icons/lia';
import '../pages/styles/appointments.css';

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
    <div className="home-page flex-auto flex-col min-h-screen">
      <div className="flex flex-col mt-4 items-start h-full w-11/12 bg-white shadow-md">
        <div className="bg-[goldenrod] w-full top-0 p-2"/>
        <h2 className="flex justify-center items-center text-center flex-wrap text-5xl m-0 px-2">
        <span className="px-4 my-2"><img src={first} alt="placeholder" className="h-40 w-40 rounded-full border-2"/></span>
          Welcome, &nbsp;
          {user ? (
            user.map((user, index) => (
              <div key={index} className="flex justify-center items-center text-center">
                <span>{user.fname}</span>&nbsp;
                <span>{user.lname}</span>!
              </div>
            ))
          ) : (
            <h1>Gathering Data...</h1>
          )}
        </h2>
      </div>
      <div className="flex w-11/12 justify-center pt-5 flex-row gap-6">

        <div className="w-1/4 h-96 shadow-lg border-solid border-2 bg-white ">
          <div className="bg-white sticky top-0">
          <div className="bg-[goldenrod] w-full top-0 p-2"/>
          {user.map((user, index) => (
            <Link to="/">
              <p className="text-3xl mb-0 p-3 border-solid border-b-2">Records</p>
            </Link>
          ))}
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-2xl my-6 p-3">
              Upload, Store and View your medical records.
            </p>
            <Link to="/" className="my-6">
              <button className="records-button">
                View Records
                <LiaAddressBook className=""/>
              </button>
            </Link>
          </div>
        </div>

        <div className="w-2/4 h-96 shadow-lg bg-white border-solid border-2 overflow-y-scroll">
          <div className="bg-white sticky top-0">
          <div className="bg-[goldenrod] w-full top-0 p-2"/>
            {user.map((user, index) => (
              <Link to={`/myappointments/${user._id}`}>
                <p className="text-3xl mb-0 p-3 border-solid border-b-2 ">My Appointments</p>
              </Link>
            ))}
          </div>
          <div className="flex flex-col justify-start box-border">
          {apptList.toReversed().map((appts, index) => (
            <div key={index} className="flex min-h-50 border-solid border-b-2 p-4 justify-between items-center text-xl gap-10">
              <div className="flex flex-row items-center">
              {user.map((user, index) => (
                <Link to={`/myappointments/${user._id}`} className="">
                  <button className="appt-button">
                    View
                    <SlArrowRightCircle className=""/>
                  </button>
                </Link>
              ))}
              </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="mb-6">{formatReason(appts.apptReason)}</p>
                  <p className="">Dr. {appts.doctor.fname} {appts.doctor.lname}</p>
                </div>
              <div className="flex flex-col">
                <p className="mb-3">Date of Service: {formatDate(appts.preferredDate)} at {appts.time}</p>
                <div className="flex-1 border-t-2 border-gray-200"/>
                <p className="mt-3">Facility: {appts.doctor.facility[0]}</p>
              </div>
            </div>
          ))}
          </div>
        </div>

        <div className="w-1/4 h-96 shadow-lg border-solid border-2 bg-white">
          <div className="bg-white sticky top-0">
          <div className="bg-[goldenrod] w-full top-0 p-2"/>
          {user.map((user, index) => (
            <Link to="/">
              <p className="text-3xl mb-0 p-3 border-solid border-b-2">Invoice</p>
            </Link>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
