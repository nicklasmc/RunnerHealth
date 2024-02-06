import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import Logo from './imgs/rh_logo_shadow.png';

const Navi = () => {
  const { logout } = useLogout();
  const { patient } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="topnav">
        <Link to="/patient_home">
          <img src={Logo} className="rh-logo" alt="RH" />
        </Link>
        <div className="container">
          <Link to="/">
            <h1 className="banner"> Runner Health</h1>
          </Link>
        </div>
        <nav>
          {patient && (
            <div>
              <span style={{ padding: 10 }}>{patient.email}</span>
              <button onClick={handleClick}>LOGOUT</button>
            </div>
          )}
          {!patient && (
            <div>
              <Link to="/patient_login">LOGIN</Link>
              <Link to="/patient_signup">JOIN</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navi;
