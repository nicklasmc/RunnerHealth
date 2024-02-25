import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/appointmentDashboard.css";
import AppointmentDashForm from "../components/AppointmentDashForm";
import Select from "react-select";

const AppointmentDashboard = () => {
  // Variables -------------------------------------
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(true);
  // -----------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointmentResponse = await axios.get(
          `http://localhost:4000/appointments/getApptAndDoctor`
        );
        for (var i = 0; i < appointmentResponse.data.length; i++) {
          appointmentResponse.data[i].formDropdown = false; // append an additional var for dropdown use
          appointmentResponse.data[i].editMode = false;
        }
        setAppointment(appointmentResponse.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const toggleFormDropdown = (index) => {
    const tempAppointments = [...appointment]; // copy of the appointments into a temporary one
    tempAppointments[index].formDropdown =
      !tempAppointments[index].formDropdown;
    setAppointment(tempAppointments); // adjust the appointments!
  };

  const toggleEditMode = (index) => {
    const tempAppointments = [...appointment];
    tempAppointments[index].editMode = !tempAppointments[index].editMode;
    tempAppointments[index].formDropdown = true;
    setAppointment(tempAppointments);
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  // ----- Notes for Frontend Team ----- //
  // 1. Display uses flexboxes
  // 2. appt-cell-one, appt-cell-two, and appt-cell-three have identical styling
  // 3. If necessary, redo the entire structure. Do whatever you need to do
  // 4. Referencing data is a little different than any of our other documents since it
  //    combines two different documents. Refer to that for more information.
  // 5. Buttons are highlighted in blue, labels red
  // ----------------------------------- //

  return (
    <div>
      <div className="appt-main-container">
        {appointment.map((appointments, index) => (
          <div>
            <div key={index} className="appt-cells">
              <div className="appt-cell-one">
                <p>
                  <span className="text-red-500" id={`${index}`}>
                    Requested Time:{" "}
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
                  placeholder
                </p>
              </div>
              <div className="appt-cell-four">
                <p>
                  <span className="text-red-500">Status: </span>
                  {appointments.status}
                </p>

                {appointments.editMode ? (
                  <div> </div>
                ) : (
                  <div className="ml-5">
                    <button
                      className="appt-update-btn"
                      onClick={() => toggleFormDropdown(index)}
                    >
                      {appointments.formDropdown ? "Collapse" : "Expand"}
                    </button>
                    <button
                      className="appt-update-btn"
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
              appointment = {appointment} 
                appointments={appointments}
                index={index}
                toggleFormDropdown={toggleFormDropdown}
                toggleEditMode={toggleEditMode}
                setAppointment={setAppointment}
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
