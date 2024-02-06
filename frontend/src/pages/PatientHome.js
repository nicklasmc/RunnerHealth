import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
  const { patient } = useAuthContext();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch(
        `http://localhost:4000/patients/${patient.email}`
      );
      const data = await response.json();
      setUser(data);
    };
    document.title = 'Home | RunnerHealth';
    getUserInfo();
  }, [patient.email]);

  return (
    <div className="home page-contents">
      <h2 className="welcome">
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
  );
};

export default Home;
