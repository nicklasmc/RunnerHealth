import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext.js';
import { Link } from 'react-router-dom'; 
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
    <div className="home page-contents container-fluid">
      <h2 className="welcome container-fluid text-2xl">
        Welcome,&nbsp;Dr.&nbsp;
        {user ? (
          user.map((user, index) => (
            <div key={index} className="uname">
              <span>{user.fname}</span>&nbsp;
              <span>{user.lname}</span>!
              <Link to={`/user_settings/${user._id}`} className="home-button">
                <h3>User Settings</h3>
              </Link>
            </div>
          ))
        ) : (
          <h1>Gathering Data...</h1>
        )}
      </h2>
    </div>
  );
};

export default Home;
