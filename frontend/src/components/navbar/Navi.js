import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UseLogout } from '../../hooks/useLogout';
import { UseAdminLogout } from '../../hooks/useAdminLogout';
import { UseDoctorLogout } from '../../hooks/useDoctorLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import Logo from '../../pages/imgs/rh_logo_shadow.png';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import first from '../../pages/imgs/placeholder.png';
import { VscAccount } from 'react-icons/vsc';
import { IconButton } from '@mui/material';
import FlyoutLink from './flyout.jsx';

const Navi = () => {
  const { logout } = UseLogout();
  const { adminLogout } = UseAdminLogout();
  const { doctorLogout } = UseDoctorLogout();
  const { patient, admin, doctor } = useAuthContext();

  const location = useLocation();

  const displayNavbar = () => {
    const excludePathnames = ['/patient_login', '/patient_signup'];
    return !excludePathnames.includes(location.pathname);
  };


  const navDropdownTitle = (
    <span className="bg-gray">
      <IconButton size="small">
        <VscAccount color="white" />
      </IconButton>
    </span>
  );

  const handleClick = () => {
    logout();
  };

  const handleAdminClick = () => {
    adminLogout();
  };

  const handleDoctorClick = () => {
    doctorLogout();
  };

  return displayNavbar() ? (
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
                <FlyoutLink
                  className=""
                  href="#"
                  FlyoutContent={RecordsContent}
                >
                  Records
                </FlyoutLink>
              </div>
              <div className="link-btn">
                <FlyoutLink
                  className=""
                  href="#"
                  FlyoutContent={ScheduleContent}
                >
                  Appointments
                </FlyoutLink>
              </div>
              <div className="link-btn">
                <FlyoutLink
                  className=""
                  href="#"
                  FlyoutContent={InvoiceContent}
                >
                  Invoice
                </FlyoutLink>
              </div>
              <div className="link-btn">
                <FlyoutLink
                  className=""
                  href="#"
                  FlyoutContent={ProfileContent}
                >
                  {navDropdownTitle}
                </FlyoutLink>
              </div>
            </div>
          )}
          {admin && (
            <div className="page-links top-navi">
              <div className="link-btn">
                <FlyoutLink
                  className=""
                  href="#"
                  FlyoutContent={InventoryContent}
                >
                  Inventory
                </FlyoutLink>
              </div>
              <div className="link-btn">
                <FlyoutLink
                  className=""
                  href="#"
                  FlyoutContent={ScheduleContent}
                >
                  Appointments
                </FlyoutLink>
              </div>
              <div className="link-btn">
                <FlyoutLink
                  className=""
                  href="#"
                  FlyoutContent={InvoiceContent}
                >
                  Invoice
                </FlyoutLink>
              </div>
              <div className="link-btn">
                <FlyoutLink
                  className=""
                  href="#"
                  FlyoutContent={ProfileContent}
                >
                  {navDropdownTitle}
                </FlyoutLink>
              </div>
            </div>
          )}
          {doctor && (
            <div className="page-links top-navi">
              <div className="link-btn">
                <FlyoutLink
                  className=""
                  href="#"
                  FlyoutContent={InventoryContent}
                >
                  Inventory
                </FlyoutLink>
              </div>
              <div className="link-btn">
                <FlyoutLink
                  className=""
                  href="#"
                  FlyoutContent={ScheduleContent}
                >
                  Appointments
                </FlyoutLink>
              </div>
              <div className="link-btn">
                <FlyoutLink
                  className=""
                  href="#"
                  FlyoutContent={InvoiceContent}
                >
                  Invoice
                </FlyoutLink>
              </div>
              <div className="link-btn">
                <FlyoutLink
                  className=""
                  href="#"
                  FlyoutContent={ProfileContent}
                >
                  {navDropdownTitle}
                </FlyoutLink>
              </div>
            </div>
          )}
          {!patient && !admin && !doctor && (
            <div className="page-links top-navi gap-3">
              <div className="">
                <Link to="/patient_login">
                  <button className="w-full bg-[goldenrod] text-[#003594] rounded-lg px-6 py-2 font-bold transition-colors hover:bg-[#001A70] hover:text-white">
                    Login
                  </button>
                </Link>
              </div>
              <div className="">
                <Link to="/patient_signup">
                  <button className="w-full bg-[goldenrod] text-[#003594] rounded-lg px-4 py-2 font-bold transition-colors hover:bg-[#001A70] hover:text-white">
                    Signup
                  </button>
                </Link>
              </div>
            </div>
          )}
        </nav>
      </Container>
    </Navbar>
  ) : null;
};

const InventoryContent = () => {
  const { logout } = UseLogout();
  const { adminLogout } = UseAdminLogout();
  const { doctorLogout } = UseDoctorLogout();
  const { patient, admin, doctor } = useAuthContext();

  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUserInfo = async () => {
      let response = null;
      if (patient) {
        response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/patients/${patient.email}`
        );
      } else if (doctor) {
        response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/doctors/${doctor.email}`
        );
      } else if (admin) {
        response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/admins/${admin.email}`
        );
      }

      const data = await response.json();
      setUser(data);
    };
    getUserInfo();
  }, [patient, doctor, admin]);

  return (
    <>
      {user ? (
        user.map((user, index) => (
          <div className="flex text-center justify-center w-64 bg-white p-6 shadow-xl">
            <div className="space-y-3">
              <Link to="/*" className="block text-l hover:underline">
                <a href="#">Website Inventory</a>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <h1>Gathering Data...</h1>
      )}
    </>
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
      let response = null;
      if (patient) {
        response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/patients/${patient.email}`
        );
      } else if (doctor) {
        response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/doctors/${doctor.email}`
        );
      } else if (admin) {
        response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/admins/${admin.email}`
        );
      }

      const data = await response.json();
      setUser(data);
    };
    getUserInfo();
  }, [patient, doctor, admin]);

  return (
    <>
      {user ? (
        user.map((user, index) => (
          <div className="flex text-center justify-center w-64 bg-white p-6 shadow-xl">
            <div className="space-y-3">
              {patient && (
                <>
                  <Link to="/invoice" className="block text-l hover:underline">
                    <a href="#">Pay Balance</a>
                  </Link>
                  <div className="flex-1 border-t-2 border-gray-200" />
                  <Link to="/invoice" className="block text-l hover:underline">
                    <a href="#">View Invoices</a>
                  </Link>
                </>
              )}
              {doctor && (
                <>
                  <Link to="/invoice" className="block text-l hover:underline">
                    <a href="#">Send Invoice</a>
                  </Link>
                  <div className="flex-1 border-t-2 border-gray-200" />
                  <Link to="/invoice" className="block text-l hover:underline">
                    <a href="#">View Invoices</a>
                  </Link>
                </>
              )}
              {admin && (
                <>
                  <Link to="/invoice" className="block text-l hover:underline">
                    <a href="#">Send Invoice</a>
                  </Link>
                  <div className="flex-1 border-t-2 border-gray-200" />
                  <Link to="/invoice" className="block text-l hover:underline">
                    <a href="#">View Invoices</a>
                  </Link>
                </>
              )}
            </div>
          </div>
        ))
      ) : (
        <h1>Gathering Data...</h1>
      )}
    </>
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
      let response = null;
      if (patient) {
        response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/patients/${patient.email}`
        );
      } else if (doctor) {
        response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/doctors/${doctor.email}`
        );
      } else if (admin) {
        response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/admins/${admin.email}`
        );
      }

      const data = await response.json();
      setUser(data);
    };
    getUserInfo();
  }, [patient, doctor, admin]);

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
    <>
      {user ? (
        user.map((user, index) => (
          <div className="flex text-center justify-center w-64 bg-white p-6 shadow-xl">
            <div className="space-y-3">
              <img
                src={first}
                className="h-44 w-44 rounded-full border-2"
              ></img>
              <h3 className="font-bold text-xl">
                {user.fname} {user.lname}
              </h3>
              <h3 className="font-bold text-xl">{user.email}</h3>
              <div className="flex-1 border-t-2 border-gray-200" />
              <Link
                to={`/user_settings/${user._id}`}
                className="block hover:underline text-bold text-xl"
              >
                <a href="#">Profile Settings</a>
              </Link>
              <div className="flex-1 border-t-2 border-gray-200" />
              <button
                className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white"
                onClick={handleClick}
              >
                Logout
              </button>
            </div>
          </div>
        ))
      ) : (
        <h1>Gathering Data...</h1>
      )}
    </>
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
      let response = null;
      if (patient) {
        response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/patients/${patient.email}`
        );
      } else if (doctor) {
        response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/doctors/${doctor.email}`
        );
      } else if (admin) {
        response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/admins/${admin.email}`
        );
      }

      const data = await response.json();
      setUser(data);
    };
    getUserInfo();
  }, [patient, doctor, admin]);

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
    <>
      {user ? (
        user.map((user, index) => (
          <div className="flex text-center justify-center w-64 bg-white p-6 shadow-xl">
            <div className="space-y-3">
              {admin && (
                <>
                  <Link
                    to="/appointment"
                    className="block text-l hover:underline"
                  >
                    <a href="#">Medical Records</a>
                  </Link>
                </>
              )}
              {patient && (
                <>
                  <Link
                    to={`/records`}
                    className="block text-l hover:underline"
                  >
                    <a href="#">Electronic Health Records</a>
                  </Link>
                </>
              )}
              {doctor && (
                <>
                  <Link to="/drecords" className="block text-l hover:underline">
                    <a href="#">Medical Records</a>
                  </Link>
                  <div className="flex-1 border-t-2 border-gray-200" />
                  <Link
                    to={`/drecords`}
                    className="block text-l hover:underline"
                  >
                    <a href="#">Electronic Health Records</a>
                  </Link>
                  <div className="flex-1 border-t-2 border-gray-200" />
                  <Link
                    to={`/drecords`}
                    className="block text-l hover:underline"
                  >
                    <a href="#">Personal Health Information (PHI)</a>
                  </Link>
                </>
              )}
            </div>
          </div>
        ))
      ) : (
        <h1>Gathering Data...</h1>
      )}
    </>
  );
};

const ScheduleContent = () => {
  const { logout } = UseLogout();
  const { adminLogout } = UseAdminLogout();
  const { doctorLogout } = UseDoctorLogout();
  const { patient, admin, doctor } = useAuthContext();
  const [apptList, setApptList] = useState([]);

  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUserInfo = async () => {
      let response = null;
      if (patient) {
        response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/patients/${patient.email}`
        );
      } else if (doctor) {
        response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/doctors/${doctor.email}`
        );
      } else if (admin) {
        response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/admins/${admin.email}`
        );
      }

      const data = await response.json();
      setUser(data);
    };
    getUserInfo();
  }, [patient, doctor, admin]);

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
    <>
      {user ? (
        user.map((user, index) => (
          <div className="flex text-center justify-center w-64 bg-white p-6 shadow-xl">
            <div className="space-y-3">
              {!patient && !doctor && !admin && (
                <>
                  <Link
                    to="/appointment"
                    className="block text-l hover:underline"
                  >
                    <a href="#">Schedule</a>
                  </Link>
                  <div className="flex-1 border-t-2 border-gray-200" />
                  <Link
                    to={`/myappointments/${user._id}`}
                    className="block text-l hover:underline"
                  >
                    <a href="#">My Appointments</a>
                  </Link>
                </>
              )}
              {patient && (
                <>
                  <Link
                    to="/appointment"
                    className="block text-l hover:underline"
                  >
                    <a href="#">Schedule</a>
                  </Link>
                  <div className="flex-1 border-t-2 border-gray-200" />
                  <Link
                    to={`/myappointments/${user._id}`}
                    className="block text-l hover:underline"
                  >
                    <a href="#">My Appointments</a>
                  </Link>
                </>
              )}
              {admin && (
                <>
                  <Link
                    to="/appointment/dashboard/"
                    className="block text-l hover:underline"
                  >
                    <a href="#">Appointment Dashboard</a>
                  </Link>
                </>
              )}
              {doctor && (
                <>
                  <Link
                    to="/appointment/dashboard/"
                    className="block text-l hover:underline"
                  >
                    <a href="#">Appointment Dashboard</a>
                  </Link>
                </>
              )}
            </div>
          </div>
        ))
      ) : (
        <h1>Gathering Data...</h1>
      )}
    </>
  );
};

export default Navi;
