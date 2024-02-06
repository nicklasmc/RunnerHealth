import { Link } from 'react-router-dom';
import { UseLogout } from '../../hooks/useLogout.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import Logo from '../imgs/rh_logo_shadow.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import { IoIosHome } from 'react-icons/io';
import { IoDocumentText } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { GrSchedule } from 'react-icons/gr';
import { FaFileInvoiceDollar } from 'react-icons/fa6';

const MNavi = () => {
  const { logout } = UseLogout();
  const { patient } = useAuthContext();

  const handleClick = () => {
    logout();
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
              title=<CgProfile className="bttm-link-btn profile-options-btn" />
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
            <GrSchedule />
          </Link>
          <Link to="#pricing" className="bttm-link-btn">
            <FaFileInvoiceDollar />
          </Link>
        </>
      )}
      {!patient && (
        <div className="bott-navi">
          <Link className="bttm-link-btn mnav-login" to="/patient_login">
            LOGIN
          </Link>
          <Link className="bttm-link-btn mnav-join" to="/patient_signup">
            JOIN
          </Link>
        </div>
      )}
    </Navbar>
  );
};

export default MNavi;
