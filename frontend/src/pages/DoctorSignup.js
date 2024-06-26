import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDoctorSignup } from '../hooks/useDoctorSignup.js';
import Logo from '../pages/imgs/rh_logo_shadow.png';
import './styles/Signup.css';

const Signup = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useDoctorSignup();

  const invalidFields = !fname || !lname || !email || !password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(fname, lname, email, password);
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <Link to="/">
            <img alt="RH" src={Logo} className="logo" />
          </Link>

          <h3>Create an account with Runner Health</h3>
          <h5>Doctor Signup</h5>

          <label>
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) => setFname(e.target.value)}
              value={fname}
              required
            />
          </label>

          <label>
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLname(e.target.value)}
              value={lname}
              required
            />
          </label>

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
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>

          {error && <div className="error">{error}</div>}
        </form>
      </div>
      <div className="switch-section-container mt-2">
        <div className="switch-section">
          <p>
            Not a Doctor?{' '}Signup as{' '}
            <Link to="/patient_signup" className="switch-link">
              Patient
            </Link>
            {' '} or {' '}
            <Link to="/admin_signup" className="switch-link">
              Admin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
