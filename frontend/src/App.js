import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { useMemo } from 'react';
import { IconContext } from 'react-icons/lib';
import ToTop from './helpers/ScrollToTop.jsx';

//pages and components
import PatientHome from './pages/PatientHome';
import PatientLogin from './pages/PatientLogin';
import AppointmentSelector from './pages/AppointmentSelector.js';
import Landing from './pages/Landing';
import PatientSignup from './pages/PatientSignup';
import AdminSignup from './pages/AdminSignup';
import AdminHome from './pages/AdminHome';
import AdminLogin from './pages/AdminLogin';
import DoctorSignup from './pages/DoctorSignup';
import DoctorHome from './pages/DoctorHome';
import DoctorLogin from './pages/DoctorLogin';
import SignupSelector from './pages/SignupSelector';
import LoginSelector from './pages/LoginSelector';
import Navi from './components/navbar/Navi';
import MNavi from './components/mobile-footy/MobileNav.jsx';
import Footer from './components/footer/Footer.jsx';
import BookAppointments from './pages/BookAppointment.js';
import AppointmentConfirmation from './pages/AppointmentConfirmation.js';
import AppointmentDashboard from './pages/AppointmentDashboard.js';
import DocProfile from './pages/DocProfile.js';

function App() {
  const { patient, admin, doctor } = useAuthContext();
  const foo = useMemo(() => ({ size: '2em' }), []);

  return (
    <IconContext.Provider value={foo}>
      <div className="App">
        <BrowserRouter>
          <ToTop />
          <Navi />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/signup_selection" element={<SignupSelector />} />
              <Route path="/login_selection" element={<LoginSelector />} />
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
              <Route
                path="/admin_home"
                element={admin ? <AdminHome /> : <Navigate to="/admin_login" />}
              />
              <Route
                path="/admin_login"
                element={
                  !admin ? <AdminLogin /> : <Navigate to="/admin_home" />
                }
              />
              <Route
                path="/admin_signup"
                element={
                  !admin ? <AdminSignup /> : <Navigate to="/admin_home" />
                }
              />
              <Route
                path="/doctor_home"
                element={
                  doctor ? <DoctorHome /> : <Navigate to="/doctor_login" />
                }
              />
              <Route
                path="/doctor_login"
                element={
                  !doctor ? <DoctorLogin /> : <Navigate to="/doctor_home" />
                }
              />
              <Route
                path="/doctor_signup"
                element={
                  !doctor ? <DoctorSignup /> : <Navigate to="/doctor_home" />
                }
              />
              {/* Appointments */}
              <Route
                path="/appointment"
                element={
                  patient ? (
                    <AppointmentSelector />
                  ) : (
                    <Navigate to="/patient_login" />
                  )
                }
              />
              <Route
                path="/doc_profile/:id"
                element={
                  patient ? <DocProfile /> : <Navigate to="/patient_login" />
                }
              />
              <Route
                path="/appointment/:id"
                element={
                  patient ? (
                    <BookAppointments />
                  ) : (
                    <Navigate to="/patient_login" />
                  )
                }
              />
              <Route
                path="/appointment/:id/:id"
                element={
                  patient ? (
                    <AppointmentConfirmation />
                  ) : (
                    <Navigate to="/patient_login" />
                  )
                }
              />
              <Route
                path="/appointment/dashboard/" // NOTE: Consider adding an id paramter which will limit view
                element={
                  patient ? (
                    <AppointmentDashboard />
                  ) : (
                    <Navigate to="/patient_login" />
                  )
                }
              />
            </Routes>
            <Footer />
            <MNavi />
          </div>
        </BrowserRouter>
      </div>
    </IconContext.Provider>
  );
}

export default App;
