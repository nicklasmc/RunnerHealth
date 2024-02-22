import { Link } from 'react-router-dom';

const SignupSelector = () => {
  return (
    <div className="home page-contents container-fluid">
      <div className="container">
        <button>
          <Link to="/doctor_signup">Doctors</Link>
        </button>
        <br></br>
        <button>
          <Link to="/admin_signup">Workers</Link>
        </button>
        <br></br>
        <button>
          <Link to="/patient_signup">Patients</Link>
        </button>
      </div>
    </div>
  );
};

export default SignupSelector;
