import { Link } from 'react-router-dom'; // FLAGGED FOR REMOVAL
import { useAuthContext } from '../hooks/useAuthContext';

const Schedule = () => {
  const { admin, doctor, patient } = useAuthContext();

  return (
    <div className="schedule page-contents container-fluid">
      <h2 className="welcome container-fluid text-2xl">
        This is the Schedule Page
      </h2>
      <h3>View or Confirm Appointments</h3>
      <h3>Create Appoinments</h3>
      <h3>Cancel Appointment</h3>
      <br></br>
      <br></br>
      {(admin || doctor) && (
        <div className="sched-link">
          {/* MARKED FOR REMOVAL */}
          <Link to="/appointment/dashboard/" className="ml-10">
            {' '}
            Appointment Dashboard (TEMP){' '}
          </Link>
          {/* MARKED FOR REMOVAL */}
        </div>
      )}
    </div>
  );
};

export default Schedule;
