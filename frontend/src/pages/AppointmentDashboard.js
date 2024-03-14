import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/appointmentDashboard.css';
import AppointmentDashForm from '../components/appts/AppointmentDashForm';
import { useAuthContext } from '../hooks/useAuthContext.js';

const AppointmentDashboard = () => {
  // Variables -------------------------------------
  const [updated, setUpdated] = useState(false);
  const [appointment, setAppointment] = useState([]);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { admin } = useAuthContext();
  const [user, setUser] = useState();
  useEffect(() => {
    if (admin) {
      const getUserInfo = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/admins/${admin.email}`
        );
        const data = await response.json();
        setUser(data);
      };
      getUserInfo();

    } else {
      console.log("User is a doctor");
    }
  }, [admin]);

  // -----------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointmentResponse = await axios.get(
          `http://localhost:4000/appointments/getApptAndDoctor`
        );
        // append variables to each appointment
        for (var i = 0; i < appointmentResponse.data.length; i++) {
          appointmentResponse.data[i].formDropdown = false;
          appointmentResponse.data[i].editMode = false;
        }

        const doctorResponse = await axios.get(`http://localhost:4000/doctors`);
        const doctors = doctorResponse.data;

        const mappedDoctors = doctors.map((doctor) => ({
          value: doctor._id,
          label: `${doctor.fname} ${doctor.lname}`,
        }));

        setProviders(mappedDoctors);
        setAppointment(appointmentResponse.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [updated]);

  const toggleFormDropdown = (index) => {
    const tempAppointments = [...appointment]; // copy of the appointments into a temporary one
    tempAppointments[index].formDropdown =
      !tempAppointments[index].formDropdown;
    setAppointment(tempAppointments);
  };

  const toggleEditMode = (index) => {
    const tempAppointments = [...appointment];
    tempAppointments[index].editMode = !tempAppointments[index].editMode; // reverse value of editmode
    tempAppointments[index].formDropdown = true; // formDropdown should always be true in formDropdown
    setAppointment(tempAppointments);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // ----- Notes for Frontend Team ----- //
  // 1. Display uses flexboxes
  // 2. If necessary, redo the entire structure. Do whatever you need to do
  // 3. Referencing data is a little different than any of our other documents since it
  //    combines two different documents. 
  // 4. Buttons are highlighted in blue, labels red
  // ----------------------------------- //


  return (
    <div>
      <div className="appt-main-container">
        {appointment.map((appointments, index) => (
          <div>
            <div key={index} className="appt-cells min-h-150">
              <div className="appt-cell-one">
                <p>
                  <span className="text-red-500" id={`${index}`}>
                    Requested Time:
                  </span>
                  {appointments.time}
                </p>
                <p>
                  <span className="text-red-500">Requested Date: </span>
                  {new Date(appointments.preferredDate).toDateString()}
                </p>
              </div>
              <div className="appt-cell-two">
                <p>
                  <span className="text-red-500">Patient: </span>
                  {appointments.patientFirstName} {appointments.patientLastName}
                </p>
                <p>
                  <span className="text-red-500">Provider: </span>
                  {appointments.doctor.fname} {appointments.doctor.lname}
                </p>
              </div>
              <div className="appt-cell-three">
                <p>
                  <span className="text-red-500">Appointment Type: </span>
                  {appointments.apptReason}
                </p>
              </div>
              <div className="appt-cell-four flex-col">
                <p>
                  <span className="text-red-500">Status: </span>
                  {appointments.status}
                </p>

                {appointments.editMode ? (
                  <div>
                    Editting Form...
                  </div>
                ) : (
                  <div className="appt-cell-five mt-2">
                    <button
                      className="appt-update-btn"
                      onClick={() => toggleFormDropdown(index)}
                    >
                      {appointments.formDropdown ? "Collapse" : "Expand"}
                    </button>
                    <button
                      className="appt-update-btn ml-5"
                      onClick={() => toggleEditMode(index)}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
            {appointments.editMode || appointments.formDropdown ? (
              <AppointmentDashForm
                appointment={appointment}
                appointments={appointments}
                providers={providers}
                index={index}
                toggleFormDropdown={toggleFormDropdown}
                toggleEditMode={toggleEditMode}
                setAppointment={setAppointment}
                admin={user}
                updated={updated}
                setUpdated={setUpdated}
              />
            ) : (
              <div></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default AppointmentDashboard;
