import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext.js';
import { useMemo } from 'react';
import { IconContext } from 'react-icons/lib';

//pages and components
import PatientHome from './pages/PatientHome.js';
import PatientLogin from './pages/PatientLogin.js';
import Landing from './pages/Landing.js';
import PatientSignup from './pages/PatientSignup.js';
import Navi from './components/navbar/Navi.js';
import MNavi from './components/mobile-footy/MobileNav.jsx';

function App() {
  const { patient } = useAuthContext();
  const foo = useMemo(() => ({ size: '2em' }), []);

  return (
    <IconContext.Provider value={foo}>
      <div className="App">
        <BrowserRouter>
          <Navi />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route
                path="/patient_home"
                element={
                  patient ? <PatientHome /> : <Navigate to="/patient_login" />
                }
              />
              <Route
                path="/patient_login"
                element={
                  !patient ? <PatientLogin /> : <Navigate to="/patient_home" />
                }
              />
              <Route
                path="/patient_signup"
                element={
                  !patient ? <PatientSignup /> : <Navigate to="/patient_home" />
                }
              />
            </Routes>
            <MNavi />
          </div>
        </BrowserRouter>
      </div>
    </IconContext.Provider>
  );
}

export default App;
