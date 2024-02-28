import { Link } from 'react-router-dom';
import { UseLogout } from '../../hooks/useLogout';
import { UseAdminLogout } from '../../hooks/useAdminLogout';
import { UseDoctorLogout } from '../../hooks/useDoctorLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import Logo from '../../pages/imgs/rh_logo_shadow.png';
import first from'../../pages/imgs/placeholder.png';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { VscAccount } from 'react-icons/vsc';

const Navi = () => {
  const { logout } = UseLogout();
  const { adminLogout } = UseAdminLogout();
  const { doctorLogout } = UseDoctorLogout();
  const { patient, admin, doctor } = useAuthContext();
  const navDropdownTitle = (<span className="bg-gray"><VscAccount /></span>);

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
    <Navbar className="bg-body-tertiary" sticky="top">
      <Container className="topnav-contents">
        <Navbar.Brand className="rh-topnav-logo">
          <Link to="/">
            <img
              alt="RH"
              src={Logo}
              className="d-inline-block align-top rh-logo"
            />
          </Link>
        </Navbar.Brand>

        <nav>
          {patient && (
            <div className="page-links top-navi">
              <Link to="/patient_home" className="link-btn">
                Home
              </Link>
              <Link to="/records" className="link-btn">
                Records
              </Link>
              <Link to="/schedule" className="link-btn">
                Schedule
              </Link>
              <Link to="/invoice" className="link-btn">
                Invoice
              </Link>
              <div className="flex justify-center items-center">
                <NavDropdown className="flex flex-col justify-center items-center pl-5" title={navDropdownTitle}>
                  <img src={first} className="h-44 w-44 rounded-full border-2"></img>
                  <NavDropdown.ItemText className="">{patient.fname}{patient.lname}</NavDropdown.ItemText>
                  <NavDropdown.ItemText className="">{patient.email}</NavDropdown.ItemText>
                  <NavDropdown.Divider />
                  <NavDropdown.Item className="text-center"> 
                    PROFILE
                  </NavDropdown.Item>
                  <NavDropdown.Item className="text-center" onClick={handleClick}> 
                    LOGOUT
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </div>
          )}
          {admin && (
            <div className="page-links top-navi">
              <Link to="/admin_home" className="link-btn">
                Home
              </Link>
              <Link to="/inventory" className="link-btn">
                Inventory
              </Link>
              <Link to="/schedule" className="link-btn">
                Schedule
              </Link>
              <Link to="/invoice" className="link-btn">
                Invoice
              </Link>
              <div>
                <span style={{ padding: 10 }} className="pname">
                  {admin.email}
                </span>
                <Button
                  onClick={handleAdminClick}
                  className="btn logout-btn bg-slate-500"
                  variant="secondary"
                >
                  LOGOUT
                </Button>
              </div>
            </div>
          )}
          {doctor && (
            <div className="page-links top-navi">
              <Link to="/doctor_home" className="link-btn">
                Home
              </Link>
              <Link to="/records" className="link-btn">
                Records
              </Link>
              <Link to="/schedule" className="link-btn">
                Schedule
              </Link>
              <Link to="/invoice" className="link-btn">
                Invoice
              </Link>
              <div>
                <span style={{ padding: 10 }} className="pname">
                  {doctor.email}
                </span>
                <Button
                  onClick={handleDoctorClick}
                  className="btn logout-btn bg-slate-500"
                  variant="secondary"
                >
                  LOGOUT
                </Button>
              </div>
            </div>
          )}
          {!patient && !admin && !doctor && (
            <div className="top-navi">
              <Link to="/login_selection">
                <Button className="creds-btn">LOGIN</Button>
              </Link>
              <Link to="/signup_selection">
                <Button className="creds-btn">JOIN</Button>
              </Link>
            </div>
          )}
        </nav>
      </Container>
    </Navbar>
  );
};

export default Navi;
