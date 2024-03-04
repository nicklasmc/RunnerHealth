import { useState } from 'react';
import { useAdminLogin } from '../hooks/useAdminLogin.js';
import { Link } from 'react-router-dom';
import Logo from '../pages/imgs/rh_logo_shadow.png';
import '../pages/styles/Signup.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useAdminLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  const handlePresetLogin = async (e) => {
    e.preventDefault();
    await login('ctest@smail.com', 'ABCabc123!');
  }

  const invalidFields = !email || !password;

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <Link to="/">
            <img alt="RH" src={Logo} className="logo" />
          </Link>

          <h3>Log in to your Runner Health Account</h3>
          <h5>Health Worker Login</h5>

          <label>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </label>

          <label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </label>

          <button
            className="signup-button"
            disabled={isLoading || invalidFields}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>

          {error && <div className="error">{error}</div>}
        </form>
      </div>
      <div className="switch-section-container">
        <div className="switch-section">
          <p>
            Don't have an account?{' '}
            <Link to="/admin_signup" className="switch-link">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
      <button onClick={handlePresetLogin}>
        Preset Login
      </button>
    </div>
  );
};

export default AdminLogin;
