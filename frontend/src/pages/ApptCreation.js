import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import '../pages/styles/appointments.css';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import Select from 'react-select';

const ApptCreation = () => {
  // -----------------------------------------------
  // Variables
  const navigate = useNavigate();
  const { id } = useParams(); // Gather id from URL
  const [doctors, setDoctors] = useState({});
  const { patient } = useAuthContext();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState();
  const [takenDates, setTakenDates] = useState([]);
  const [visitReason, setVisitReason] = useState(); // needed for react-select

  const apptOptions = [
    { value: 'Followup', label: 'Follow Up' },
    { value: 'Physical', label: 'Physical' },
    { value: 'Labwork', label: 'Lab Work' },
    { value: 'Other', label: 'Other (Please explain below)' },
  ];



  const processOptions = [
    { value: '7:00', label: 'Deny' },
    { value: 'Approved', label: 'Approve' },
    { value: 'Pending', label: 'Set Pending' },
    { value: 'Cancelled', label: 'Cancel' },
    { value: 'Complete', label: 'Complete' },
    { value: 'NO-SHOW', label: 'NO-SHOW' },
  ];
  // -----------------------------------------------
  const handleSubmit = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      console.log(visitReason);
      const formData = {
        doctor: id,
        patientId: user[0]._id,
        apptComments: document.getElementById('appt-comments').value,
        apptReason: visitReason,
        patientFirstName: document.getElementById('patient-first-name').value,
        patientLastName: document.getElementById('patient-last-name').value,
        patientEmail: document.getElementById('email').value,
        patientPhone: document.getElementById('phone').value,
        languagePreference: document.getElementById('languagePreference').value,
        preferredDate: selectedDate,
        time: document.getElementById('appt-time').value,
      };

      console.log(formData);

      const response = await axios.post(
        'http://localhost:4000/appointments',
        formData
      );
      const appointmentId = response.data._id;
      navigate(`/appointment/${id}/${appointmentId}`);
    } catch (error) {
      console.error(error, 'error, missing input');
    }
  };
  // -----------------------------------------------


  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientResponse = await axios.get(
          `http://localhost:4000/patients/${patient.email}`
        );
        const doctorResponse = await axios.get(
          `http://localhost:4000/doctors/${id}`
        );
        const dateResponse = await axios.get(
          `http://localhost:4000/appointments/getTakenDates/${id}`
        );
        setDoctors(doctorResponse.data);
        setUser(patientResponse.data);

        // grab from the takenDate field, go over all of the via map, store in tempArr
        const tempArr = dateResponse.data.map((i) => new Date(i.takenDate));
        setTakenDates(tempArr);
        setLoading(false);
        console.log(dateResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id, patient.email]);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <div className="appt-main-container">
        <button onClick={() => navigate(-1)} className="appt-backbtn">
          &#x25c0; Back
        </button>
        <h1 className="appt-greeting">Schedule Your Appointment</h1>
        <div className="appt-sub-container">
          <p className="appt-static">
            Physician: {doctors.fname} {doctors.lname}
          </p>
          {/* Speciality not currently a field in actual database, will add later but will not cause errors here */}
          <p className="appt-static">{doctors.speciality}</p>

          <div className="appt-form-wrapper">
            <form className="appt-form" onSubmit={handleSubmit}>
              <div className="appt-form-section-left">
                <label htmlFor="appt-reason">Reason for Visit:</label>
                <div>
                  <Select
                    id='appt-reason'
                    name='appt-reason'
                    options={apptOptions}
                    placeholder={'Reason for visit...'}
                    onChange={(e) => setVisitReason(e.value)}
                  />
                </div>
                <textarea
                  type='text'
                  id='appt-comments'
                  name='appt-comments'
                  maxLength={300}
                  rows='4'
                  cols='50'
                  placeholder=' Enter additional information here...'
                />
                <p className="text-red-500">
                  In the case of emergency, please dial 911
                </p>
              </div>

              <div className="appt-form-section-middle">
                <h2>Contact Information</h2>

                <div>
                  {user ? (
                    <div>
                      <label htmlFor="fname">Patient's First Name</label>
                      <input
                        type='text'
                        id='patient-first-name'
                        name='fname'
                        value={user[0].fname}
                        disabled
                        className='disabled-input'
                      />
                      <label htmlFor="lname">Patient's Last Name</label>
                      <input
                        type='text'
                        id='patient-last-name'
                        name='lname'
                        value={user[0].lname}
                        disabled
                        className='disabled-input'
                      />
                    </div>
                  ) : (
                    <div> Loading... </div>
                  )}
                </div>

                <label htmlFor="email">Email</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='e.g email@domain.com'
                />
                <label htmlFor="phone">Phone Number</label>
                <input
                  type='tel'
                  id='phone'
                  name='phone'
                  placeholder='e.g (123) 456-7890'
                />
                <label htmlFor="languagePreference">Language Preference</label>
                <select name="languagePreference" id="languagePreference">
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                </select>
              </div>

              <div className="appt-form-section-right">
                <h2>Appointment Time</h2>
                <DayPicker
                  showOutsideDays // show days outside of the month for accessibility purposes
                  fixedWeeks // fixed to 6 week display, prevents resizing to ease up styling
                  mode='single' // single date selection only
                  onSelect={setSelectedDate}
                  disabled={[{ dayOfWeek: [0, 6] }, ...takenDates]} // gray out the weekends and taken dates
                />
                <h2>Preferred Time:</h2>
                <input type="time" id="appt-time" name="time" />
                <p className="text-red-500">
                  Note: A member of staff will be in contact to confirm a final
                  date and time based on availability.
                </p>
                <br />
                <button
                  type="submit"
                  className="submit-button"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ApptCreation;
