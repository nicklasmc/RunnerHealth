import { useState } from 'react';
import { useSignup } from '../hooks/useSignup.js';

const Signup = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    //e.preventDefault();

    await signup(fname, lname, email, password);
  };

  return (
    <div className="page-contents ">
      <div className="container-fluid">
        <form className="signup" onSubmit={handleSubmit}>
          <h3>Sign Up</h3>

          <label>
            First Name:
            <input
              type="text"
              onChange={(e) => setFname(e.target.value)}
              value={fname}
            />
          </label>

          <label>
            Last Name:
            <input
              type="text"
              onChange={(e) => setLname(e.target.value)}
              value={lname}
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          <br></br>
          <br></br>

          <button disabled={isLoading}>Sign Up</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
