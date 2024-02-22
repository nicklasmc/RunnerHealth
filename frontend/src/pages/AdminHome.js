import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext.js';
import { Link } from 'react-router-dom'; // FLAGGED FOR REMOVAL

const Home = () => {
  const { admin } = useAuthContext();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/admins/${admin.email}`
      );
      const data = await response.json();
      setUser(data);
    };
    document.title = 'Home | RunnerHealth';
    getUserInfo();
  }, [admin.email]);

  return (
    <div className="home page-contents container-fluid">
      <h2 className="welcome container-fluid text-2xl">
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
      <br></br>
      <br></br>
      <div className="sched-link">
        {/* MARKED FOR REMOVAL */}
        <Link to="/appointment/dashboard/" className="ml-10">
          {' '}
          Appointment Dashboard (TEMP){' '}
        </Link>
        {/* MARKED FOR REMOVAL */}
      </div>
    </div>
  );
};

export default Home;
