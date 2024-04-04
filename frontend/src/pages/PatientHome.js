import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import { format } from "date-fns";

const Home = () => {
  const [apptList, setApptList] = useState([]); // represents ALL appts
  const { patient } = useAuthContext();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch('http://localhost:4000/patients/${patient.email}');
        const userData = await response1.json()
  
        if (userData) {
          setUser(userData);
          const response2= await fetch('http://localhost:4000/appointments/patient/${userData[0]._id}');
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

  return (
    <div className="home-page flex flex-col min-h-screen gap-8">
      <div>
        <h2 className="flex flex-wrap h-1/2 text-6xl">
          Welcome, &nbsp;
          {user ? (
            user.map((user, index) => (
              <div key={index} className="uname">
                <span>{user.fname}</span>&nbsp;
                <span>{user.lname}</span>!
              </div>
            ))
          ) : (
            <h1>Gathering Data...</h1>
          )}
        </h2>
      </div>
      <div className="flex w-full p-5 flex-row gap-6">
        <div className="w-1/3 h-96 shadow-lg bg-white border-black border-solid border-2">
          <h3 className="font-bold text-2xl mb-0 p-3 ">Invoice</h3>
          <div className="flex-1 border-t-2 border-black"/>
        </div>
        <div className="w-1/3 h-96 shadow-lg bg-white border-black border-solid border-2">
          <h3 className="font-bold text-2xl mb-0 p-3 ">Recent Appointments</h3>
          <div className="flex-1 border-t-2 border-black"/>
          {apptList.map((appts, index) => (
            <div key={index} className="">
              <p>Provider: {appts.doctor}</p>
            </div>
          ))}
        </div>
        <div className="w-1/3 h-96 shadow-lg bg-white border-black border-solid border-2">
          <h3 className="font-bold text-2xl mb-0 p-3 ">Invoice</h3>
          <div className="flex-1 border-t-2 border-black"/>
        </div>
      </div>
    </div>
  );
};

export default Home;
