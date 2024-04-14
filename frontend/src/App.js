import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { useMemo } from 'react';
import { IconContext } from 'react-icons/lib';
import ToTop from './helpers/ScrollToTop.jsx';

//pages and components
import PatientHome from './pages/PatientHome';
import PatientLogin from './pages/PatientLogin';
import ApptDocList from './pages/ApptDocList.js';
import Landing from './pages/Landing';
import PatientSignup from './pages/PatientSignup';
import AdminSignup from './pages/AdminSignup';
import AdminHome from './pages/AdminHome';
import AdminLogin from './pages/AdminLogin';
import DoctorSignup from './pages/DoctorSignup';
import DoctorHome from './pages/DoctorHome';
import DoctorLogin from './pages/DoctorLogin';
import Inventory from './pages/Inventory';
import Invoice from './pages/Invoice';
import Records from './pages/Records';
import NotFoundPage from './pages/NotFoundPage';
import UserSettings from './pages/UserSettings.js';
import Navi from './components/navbar/Navi';
import MNavi from './components/mobile-footy/MobileNav.jsx';
import Footer from './components/footer/Footer.jsx';
import ApptCreation from './pages/ApptCreation.js';
import ApptConfirmation from './pages/ApptConfirmation.js';
import AppointmentDashboard from './pages/AppointmentDashboard.js';
import ApptPatient from './pages/ApptPatient.js';

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
              <Route
                path="/inventory"
                element={admin ? <Inventory /> : <Navigate to="/" />}
              />
              <Route
                path="/records"
                element={patient ? <Records /> : <Navigate to="/" />}
              />
              <Route
                path="/invoice"
                element={
                  patient || doctor || admin ? <Invoice /> : <Navigate to="/" />
                }
              />
              <Route
                path="/inventory"
                element={admin ? <Inventory /> : <Navigate to="/" />}
              />
              <Route
                path="/user_settings/:id"
                element={
                  patient || doctor || admin ? (
                    <UserSettings />
                  ) : (
                    <Navigate to="/patient_login" />
                  )
                }
              />
              <Route
                path="/patient_home"
                element={patient ? <PatientHome /> : <Navigate to="/" />}
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
                element={admin ? <AdminHome /> : <Navigate to="/" />}
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
                element={doctor ? <DoctorHome /> : <Navigate to="/" />}
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
                  patient ? <ApptDocList /> : <Navigate to="/patient_login" />
                }
              />
              <Route
                path="/myappointments/:id"
                element={
                  patient ? <ApptPatient /> : <Navigate to="/patient_login" />
                }
              />
              <Route
                path="/appointment/:id"
                element={
                  patient ? <ApptCreation /> : <Navigate to="/patient_login" />
                }
              />
              <Route
                path="/appointment/:id/:id" // read: 'appointment/patientID/apptId'
                element={
                  patient ? (
                    <ApptConfirmation />
                  ) : (
                    <Navigate to="/patient_login" />
                  )
                }
              />
              <Route
                path="/appointment/dashboard/" // NOTE: Consider adding an id paramter which will limit view
                element={
                  admin || doctor ? (
                    <AppointmentDashboard />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route path="*" element={<NotFoundPage />} />
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
