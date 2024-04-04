import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
// PI : 
// - Name (restricted)
// - Pronouns
// - Sex 
// - DoB (restricted)
// - marital status
// - Address info (subcontainer)
// - - Address
// - - City
// - - ZIP
// - - State

// CI : 
// - Phone
// - Phone 2
// - Work phone
// - email

// other:
// - preferred facility
// - pcp

const UserSettings = () => {
  const { patient } = useAuthContext();
  const { doctor } = useAuthContext();
  const { admin } = useAuthContext();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUserInfo = async () => {
      let response = null;
      if (patient) {
        response = await fetch(`http://localhost:4000/patients/${patient.email}`);
      } else if (doctor) {
        response = await fetch(`http://localhost:4000/doctors/${doctor.email}`);
      } else if (admin) {
        response = await fetch(`http://localhost:4000/admins/${admin.email}`);
      }

      const data = await response.json();
      setUser(data[0]);
    };
    getUserInfo();
  }, [patient, doctor, admin]);

  useEffect(() => {
    console.log(user);
  },[user]);
  return (
    <div className="bg-white">
      {user && (
        <>
          <p>{user.fname}</p>
          <p>{user.lname}</p>
          <p>{user.email}</p>
        </>
      )}
    </div>
  );
};

export default UserSettings;
