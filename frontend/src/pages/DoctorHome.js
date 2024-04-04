import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext.js';
import { Link } from 'react-router-dom'; 
import first from './imgs/placeholder.png';

const Home = () => {
  const { doctor } = useAuthContext();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/doctors/${doctor.email}`
      );
      const data = await response.json();
      setUser(data);
    };
    document.title = 'Home | RunnerHealth';
    getUserInfo();
  }, [doctor.email]);

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
  </div>
  );
};

export default Home;
