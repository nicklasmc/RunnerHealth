import { Link } from 'react-router-dom';
import { UseLogout } from '../../hooks/useLogout.js';
import { UseAdminLogout } from '../../hooks/useAdminLogout';
import { UseDoctorLogout } from '../../hooks/useDoctorLogout';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import { IoIosHome } from 'react-icons/io';
import { IoDocumentText } from 'react-icons/io5';
import { FaFileInvoiceDollar } from 'react-icons/fa6';
import { BsCalendar2DateFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';

const MNavi = () => {
  const { logout } = UseLogout();
  const { adminLogout } = UseAdminLogout();
  const { doctorLogout } = UseDoctorLogout();
  const { patient, doctor, admin } = useAuthContext();

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
    <Navbar className="bg-body-tertiary MNavi" fixed="bottom">
      {patient && (
        <>
          <Link to="/patient_home" className="bttm-link-btn">
            <IoIosHome />
          </Link>
          <Link to="#features" className="bttm-link-btn">
            <IoDocumentText />
          </Link>
          <div className="bttm-link-btn">
            <DropdownButton
              drop={'up'}
              title=<FaUserCircle className="bttm-link-btn profile-options-btn" />
              variant="dark"
              className="dd-profile-btn"
            >
              <Dropdown.Item eventKey="4">
                <Button
                  onClick={handleClick}
                  className="btn mnav-logout-btn"
                  variant="secondary"
                >
                  LOGOUT
                </Button>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="1">Edit Profile</Dropdown.Item>
              <Dropdown.Item eventKey="2">Notifications</Dropdown.Item>
              <Dropdown.Item eventKey="3">Settings</Dropdown.Item>
            </DropdownButton>
          </div>
          <Link to="#features" className="bttm-link-btn">
            <BsCalendar2DateFill />
          </Link>
          <Link to="#pricing" className="bttm-link-btn">
            <FaFileInvoiceDollar />
          </Link>
        </>
      )}
      {admin && (
        <>
          <Link to="/admin_home" className="bttm-link-btn">
            <IoIosHome />
          </Link>
          <Link to="#features" className="bttm-link-btn">
            <IoDocumentText />
          </Link>
          <div className="bttm-link-btn">
            <DropdownButton
              drop={'up'}
              title=<FaUserCircle className="bttm-link-btn profile-options-btn" />
              variant="dark"
              className="dd-profile-btn"
            >
              <Dropdown.Item eventKey="4">
                <Button
                  onClick={handleAdminClick}
                  className="btn mnav-logout-btn"
                  variant="secondary"
                >
                  LOGOUT
                </Button>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="1">Edit Profile</Dropdown.Item>
              <Dropdown.Item eventKey="2">Notifications</Dropdown.Item>
              <Dropdown.Item eventKey="3">Settings</Dropdown.Item>
            </DropdownButton>
          </div>
          <Link to="#features" className="bttm-link-btn">
            <BsCalendar2DateFill />
          </Link>
          <Link to="#pricing" className="bttm-link-btn">
            <FaFileInvoiceDollar />
          </Link>
        </>
      )}
      {doctor && (
        <>
          <Link to="/doctor_home" className="bttm-link-btn">
            <IoIosHome />
          </Link>
          <Link to="#features" className="bttm-link-btn">
            <IoDocumentText />
          </Link>
          <div className="bttm-link-btn">
            <DropdownButton
              drop={'up'}
              title=<FaUserCircle className="bttm-link-btn profile-options-btn" />
              variant="dark"
              className="dd-profile-btn"
            >
              <Dropdown.Item eventKey="4">
                <Button
                  onClick={handleDoctorClick}
                  className="btn mnav-logout-btn"
                  variant="secondary"
                >
                  LOGOUT
                </Button>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="1">Edit Profile</Dropdown.Item>
              <Dropdown.Item eventKey="2">Notifications</Dropdown.Item>
              <Dropdown.Item eventKey="3">Settings</Dropdown.Item>
            </DropdownButton>
          </div>
          <Link to="#features" className="bttm-link-btn">
            <BsCalendar2DateFill />
          </Link>
          <Link to="#pricing" className="bttm-link-btn">
            <FaFileInvoiceDollar />
          </Link>
        </>
      )}
      {!patient && !doctor && !admin && (
        <div className="bott-navi">
          <Link className="bttm-link-btn mnav-login" to="/login_selection">
            LOGIN
          </Link>
          <Link className="bttm-link-btn mnav-join" to="/signup_selection">
            JOIN
          </Link>
        </div>
      )}
    </Navbar>
  );
};

export default MNavi;
