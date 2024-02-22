import { Link } from 'react-router-dom';

const LoginSelector = () => {
  return (
    <div className="home page-contents container-fluid">
      <div className="container">
        <button>
          <Link to="/doctor_login">Doctors</Link>
        </button>
        <br></br>
        <button>
          <Link to="/admin_login">Workers</Link>
        </button>
        <br></br>
        <button>
          <Link to="/patient_login">Patients</Link>
        </button>
      </div>
    </div>
  );
};

export default LoginSelector;
