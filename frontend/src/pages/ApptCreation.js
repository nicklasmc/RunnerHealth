import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import '../pages/styles/appointments.css';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import Select from 'react-select';
import extractTimes from '../utils/extractTimes';

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
  const [visitReason, setVisitReason] = useState(null); // needed for react-select
  const [creationComments, setCreationComments] = useState(null);
  const [apptTime, setApptTime] = useState();
  const [timeOptions, setTimeOptions] = useState([]);

  const apptOptions = [
    { value: 'Followup', label: 'Follow Up' },
    { value: 'Physical', label: 'Physical' },
    { value: 'Labwork', label: 'Lab Work' },
    { value: 'Other', label: 'Other (Please explain below)' },
  ];

  const handleSubmit = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (document.getElementById('creation-comments').value) {
      setCreationComments(document.getElementById('creation-comments').value);
    } else {
      setCreationComments('N/A');
    }

    try {
      console.log(visitReason);
      const formData = {
        doctor: id,
        patientId: user[0]._id,
        apptComments: creationComments,
        apptReason: visitReason,
        patientFirstName: document.getElementById('patient-first-name').value,
        patientLastName: document.getElementById('patient-last-name').value,
        patientEmail: document.getElementById('email').value,
        patientPhone: document.getElementById('phone').value,
        languagePreference: document.getElementById('languagePreference').value,
        preferredDate: selectedDate,
        time: apptTime,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/appointments`,
        formData
      );
      const appointmentId = response.data._id;
      navigate(`/appointment/${id}/${appointmentId}`);
    } catch (error) {
      window.alert('Please fill out all fields!');
      console.error(error, 'error, missing input');
    }
  };
  // -----------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/patients/${patient.email}`
        );
        const doctorResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/doctors/byId/${id}`
        );
        // const apptDocAppts = await axios.get(
        //   `${process.env.REACT_APP_SERVER_URL}/appointments/doctor/${id}`
        // );
        setDoctors(doctorResponse.data);
        setUser(patientResponse.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id, patient.email]);

  const handleTimeChange = (e) => {
    setApptTime(e.value);
  };

  useEffect(() => {
    // use to populate
    const fetchAvailability = async () => {
      const availResponse = await axios.get(
        // use /:date/:id
        `${process.env.REACT_APP_SERVER_URL}/appointments/getApptsByDate/${selectedDate}/${id}`
      );
      let timeOps = extractTimes(availResponse);
      setTimeOptions(timeOps);
    };
    if (selectedDate) {
      // only do if there is actually a date selected
      fetchAvailability();
    }
  }, [selectedDate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="creation-page-can">
      <div className="creation-main-container">
        <button onClick={() => navigate(-1)} className="creation-backbtn">
          &#x25c0; Back
        </button>
        <h1 className="creation-greeting font-extrabold text-xl">
          Schedule Your Appointment
        </h1>
        <p className="creation-physician font-extrabold">
          Physician - {doctors.fname} {doctors.lname}
        </p>
        <div className="creation-sub-container">
          {/* Speciality not currently a field in actual database, will add later but will not cause errors here */}
          <p className="creation-static">{doctors.speciality}</p>

          <div className="creation-form-wrapper mt-2">
            <form className="creation-form" onSubmit={handleSubmit}>
              <div className="creation-form-section-left-half">
                <div className="creation-form-section-left">
                  <label htmlFor="creation-reason">Reason for Visit:</label>
                  <div>
                    <Select
                      id="creation-reason"
                      name="appt-reason"
                      options={apptOptions}
                      placeholder={'Reason for visit...'}
                      onChange={(e) => setVisitReason(e.value)}
                    />
                  </div>
                  <textarea
                    type="text"
                    id="creation-comments"
                    name="appt-comments"
                    maxLength={300}
                    rows="4"
                    cols="50"
                    placeholder=" Enter additional information here..."
                  />
                  <p className="mt-4 text-red-500">
                    In the case of emergency, please dial 911
                  </p>
                </div>

                <div className="creation-form-section-middle">
                  <h2 className="creation-form-section-middle-header">
                    Contact Information:
                  </h2>

                  <div>
                    {user ? (
                      <div>
                        <label htmlFor="fname">Patient's First Name</label>
                        <input
                          type="text"
                          id="patient-first-name"
                          name="fname"
                          value={user[0].fname}
                          disabled
                          className="disabled-input"
                        />
                        <label htmlFor="lname">Patient's Last Name</label>
                        <input
                          type="text"
                          id="patient-last-name"
                          name="lname"
                          value={user[0].lname}
                          disabled
                          className="disabled-input"
                        />
                      </div>
                    ) : (
                      <div> Loading... </div>
                    )}
                  </div>

                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="e.g email@domain.com"
                  />
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="e.g (123) 456-7890"
                  />
                  <label htmlFor="languagePreference">
                    Language Preference
                  </label>
                  <select name="languagePreference" id="languagePreference">
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                  </select>
                </div>
              </div>

              <div className="creation-form-section-right">
                <h2 className="creation-form-right-header">
                  Appointment Time:
                </h2>
                <DayPicker
                  className="creation-form-date-picker"
                  showOutsideDays // show days outside of the month for accessibility purposes
                  fixedWeeks // fixed to 6 week display, prevents resizing to ease up styling
                  mode="single" // single date selection only
                  onSelect={setSelectedDate}
                  disabled={[{ dayOfWeek: [0, 6] }]} // gray out the weekends and taken dates
                />
                <h2 className="creation-time-header">Preferred Time:</h2>
                <Select
                  name="creation-time"
                  id="appt-time"
                  options={timeOptions}
                  isOptionDisabled={(option) => option.disabled}
                  placeholder={'Time'}
                  onChange={(e) => handleTimeChange(e)}
                />
                <p className="creation-form-right-note mt-4 text-red-500">
                  Note: A member of staff will be in contact to confirm a final
                  date and time based on availability.
                </p>
                <br />
                <div className="creation-button-container">
                  <button type="submit" className="creation-button">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ApptCreation;
