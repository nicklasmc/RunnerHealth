import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UseLogout } from '../../hooks/useLogout';
import { UseAdminLogout } from '../../hooks/useAdminLogout';
import { UseDoctorLogout } from '../../hooks/useDoctorLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import Logo from '../../pages/imgs/rh_logo_shadow.png';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import first from'../../pages/imgs/placeholder.png';
import { VscAccount } from 'react-icons/vsc';
import { IconButton } from '@mui/material';
import FlyoutLink from './flyout.jsx';


const Navi = () => {
  
  const { logout } = UseLogout();
  const { adminLogout } = UseAdminLogout();
  const { doctorLogout } = UseDoctorLogout();
  const { patient, admin, doctor } = useAuthContext();
  const navDropdownTitle = (<span className="bg-gray"><IconButton size="small"><VscAccount color="white"/></IconButton></span>);

  const handleClick = () => {
    logout();
  };

  const handleAdminClick = () => {
    adminLogout();
  };

  const handleDoctorClick = () => {
    doctorLogout();
  };

  return (
    <Navbar className="bg-[#003594]" sticky="top">
      <Container className="topnav-contents">
        <Navbar.Brand className="rh-topnav-logo">
          {patient && (
            <Link to="/patient_home">
              <img
                alt="RH"
                src={Logo}
                className="d-inline-block align-top rh-logo"
              />
            </Link>
          )}
          {admin && (
            <Link to="/admin_home">
              <img
                alt="RH"
                src={Logo}
                className="d-inline-block align-top rh-logo"
              />
            </Link>
          )}
          {doctor && (
            <Link to="/doctor_home">
              <img
                alt="RH"
                src={Logo}
                className="d-inline-block align-top rh-logo"
              />
            </Link>
          )}
          {!patient && !admin && !doctor && (
            <Link to="/">
              <img
                alt="RH"
                src={Logo}
                className="d-inline-block align-top rh-logo"
              />
            </Link>
          )}
        </Navbar.Brand>

        <nav>
          {patient && (
            <div className="page-links top-navi">
              <div className="link-btn">
                <FlyoutLink className="" href="#" FlyoutContent={RecordsContent}>
                Records
                </FlyoutLink>
              </div>
              <div className="link-btn">
                <FlyoutLink className="" href="#" FlyoutContent={ScheduleContent}>
                Schedule
                </FlyoutLink>
              </div>
              <div className="link-btn">
                <FlyoutLink className="" href="#" FlyoutContent={InvoiceContent}>
                Invoice
                </FlyoutLink>
              </div>
              <div className="link-btn">
                <FlyoutLink className="" href="#" FlyoutContent={ProfileContent}>
                {navDropdownTitle}
                </FlyoutLink>
              </div>
            </div>
          )}
          {admin && (
            <div className="page-links top-navi">
              <div className="link-btn">
                <FlyoutLink className="" href="#" FlyoutContent={RecordsContent}>
                Records
                </FlyoutLink>
              </div>
              <div className="link-btn">
                <FlyoutLink className="" href="#" FlyoutContent={ScheduleContent}>
                Schedule
                </FlyoutLink>
              </div>
              <div className="link-btn">
                <FlyoutLink className="" href="#" FlyoutContent={InvoiceContent}>
                Invoice
                </FlyoutLink>
              </div>
              <div className="link-btn">
                <FlyoutLink className="" href="#" FlyoutContent={ProfileContent}>
                {navDropdownTitle}
                </FlyoutLink>
              </div>
            </div>
          )}
          {doctor && (
            <div className="page-links top-navi">
              <div className="link-btn">
                <FlyoutLink className="" href="#" FlyoutContent={RecordsContent}>
                Records
                </FlyoutLink>
              </div>
              <div className="link-btn">
                <FlyoutLink className="" href="#" FlyoutContent={ScheduleContent}>
                Schedule
                </FlyoutLink>
              </div>
              <div className="link-btn">
                <FlyoutLink className="" href="#" FlyoutContent={InvoiceContent}>
                Invoice
                </FlyoutLink>
              </div>
              <div className="link-btn">
                <FlyoutLink className="" href="#" FlyoutContent={ProfileContent}>
                {navDropdownTitle}
                </FlyoutLink>
              </div>
            </div>
          )}
          {!patient && !admin && !doctor && (
            <div className="page-links top-navi gap-3">
              <div className="">
                <Link to="/login_selection">
                  <button 
                  className="w-full bg-[goldenrod] text-[#003594] rounded-lg px-6 py-2 font-bold transition-colors hover:bg-[#001A70] hover:text-white">
                  Login
                  </button>
                </Link>
              </div>
              <div className="">
                <Link to="/signup_selection">
                  <button 
                  className="w-full bg-[goldenrod] text-[#003594] rounded-lg px-4 py-2 font-bold transition-colors hover:bg-[#001A70] hover:text-white">
                  Signup
                  </button>
                </Link>
              </div>
            </div>
          )}
        </nav>
      </Container>
    </Navbar>
  );
};

const InvoiceContent = () => {

  const { logout } = UseLogout();
  const { adminLogout } = UseAdminLogout();
  const { doctorLogout } = UseDoctorLogout();
  const { patient, admin, doctor } = useAuthContext();

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
    <div>
    {user ? (
      user.map((user, index) => (
        <div className="flex text-center justify-center w-64 bg-white p-6 shadow-xl">
          <div className="mb-3 space-y-3">
            <h3 className="font-bold text-xl">Patient Invoices</h3>
            <div className="flex-1 border-t-2 border-gray-200"/>
            <a href="#" className="block text-base hover:underline">
              Pay Balance
            </a>
            <a href="#" className="block text-base hover:underline">
              Send Invoice
            </a>
            <a href="#" className="block text-base hover:underline">
              View Invoices
            </a>
          </div>
        </div>
      )) 
      ) : (
      <h1>Gathering Data...</h1>
    )}
    </div>
    );
  };

const ProfileContent = () => {
  const { logout } = UseLogout();
  const { adminLogout } = UseAdminLogout();
  const { doctorLogout } = UseDoctorLogout();
  const { patient, admin, doctor } = useAuthContext();

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

  const handleClick = () => {
    logout();
  };

  const handleAdminClick = () => {
    adminLogout();
  };

  const handleDoctorClick = () => {
    doctorLogout();
  };

  return (
    <div>
    {user ? (
      user.map((user, index) => (
        <div className="flex text-center justify-center w-64 bg-white p-6 shadow-xl">
          <div className="mb-3 space-y-3">
            <img src={first} className="h-44 w-44 rounded-full border-2"></img>
            <h3 className="font-bold text-xl">{user.fname} {user.lname}</h3>
            <h3 className="font-bold text-xl">{user.email}</h3>
            <div className="flex-1 border-t-2 border-gray-200"/>
            <Link to={`/user_settings/${user._id}`} className="block text-base hover:underline">
              <a href="#">
                Profile
              </a>
            </Link>
            <Link to={`/user_settings/${user._id}`} className="block text-base hover:underline">
              <a href="#">
                Settings
              </a>
            </Link>
            <div className="flex-1 border-t-2 border-gray-200"/>
            <button 
            className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white"
            onClick={handleClick}>
            Logout
            </button>
          </div>
        </div>
      )) 
    ) : (
    <h1>Gathering Data...</h1>
  )}
  </div>
  );
};

const RecordsContent = () => {
  const { logout } = UseLogout();
  const { adminLogout } = UseAdminLogout();
  const { doctorLogout } = UseDoctorLogout();
  const { patient, admin, doctor } = useAuthContext();

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

  const handleClick = () => {
    logout();
  };

  const handleAdminClick = () => {
    adminLogout();
  };

  const handleDoctorClick = () => {
    doctorLogout();
  };

return (
  <div>
  {user ? (
      user.map((user, index) => (
        <div className="flex text-center justify-center w-64 bg-white p-6 shadow-xl">
          <div className="mb-3 space-y-3">
          <h3 className="font-bold text-xl">Patient Records</h3>
          <div className="flex-1 border-t-2 border-gray-200"/>
          <Link to="/appointment" className="block text-base hover:underline">
          <a href="#">
              Medical Records
          </a>
          </Link>
          <Link to={`/myappointments/${user._id}`} className="block text-base hover:underline">
          <a href="#">
              Electronic Health Records
          </a>
          </Link>
          <Link to={`/myappointments/${user._id}`} className="block text-base hover:underline">
          <a href="#">
              Personal Health Information (PHI)
          </a>
          </Link>
          </div>
      </div>
    )) 
  ) : (
  <h1>Gathering Data...</h1>
)}
</div>
);
};

const ScheduleContent = () => {
  const { logout } = UseLogout();
  const { adminLogout } = UseAdminLogout();
  const { doctorLogout } = UseDoctorLogout();
  const { patient, admin, doctor } = useAuthContext();
  
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

  const handleClick = () => {
    logout();
  };

  const handleAdminClick = () => {
    adminLogout();
  };

  const handleDoctorClick = () => {
    doctorLogout();
  };

  return (
    <div>
      {user ? (
          user.map((user, index) => (
            <div className="flex text-center justify-center w-64 bg-white p-6 shadow-xl">
              <div className="mb-3 space-y-3">
              <h3 className="font-bold text-xl">Appointments</h3>
              <div className="flex-1 border-t-2 border-gray-200"/>
              <Link to="/appointment" className="block text-base hover:underline">
              <a href="#">
                  Schedule Appointments
              </a>
              </Link>
              <Link to={`/myappointments/${user._id}`} className="block text-base hover:underline">
              <a href="#">
                  Upcoming Appointments
              </a>
              </Link>
              <Link to={`/myappointments/${user._id}`} className="block text-base hover:underline">
              <a href="#">
                  Appointment History
              </a>
              </Link>
              </div>
          </div>
        )) 
      ) : (
      <h1>Gathering Data...</h1>
    )}
    </div>
  );
};

export default Navi;
