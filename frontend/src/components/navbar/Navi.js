import { Link } from 'react-router-dom';
import { UseLogout } from '../../hooks/useLogout';
import { UseAdminLogout } from '../../hooks/useAdminLogout';
import { UseDoctorLogout } from '../../hooks/useDoctorLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import Logo from '../imgs/rh_logo_shadow.png';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const Navi = () => {
  const { logout } = UseLogout();
  const { adminLogout } = UseAdminLogout();
  const { doctorLogout } = UseDoctorLogout();
  const { patient, admin, doctor } = useAuthContext();

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
    <Navbar className="bg-body-tertiary" fixed="top">
      <Container fluid className="topnav-contents">
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
              <div>
                <span style={{ padding: 10 }} className="pname">
                  {patient.email}
                </span>
                <Button
                  onClick={handleClick}
                  className="btn logout-btn bg-slate-500"
                  variant="secondary"
                >
                  LOGOUT
                </Button>
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
