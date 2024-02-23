import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useParams, useNavigate } from "react-router-dom";
// import { useAuthContext } from '../hooks/useAuthContext'; // SAVE FOR USER GROUPS
import './styles/appointmentDashboard.css';

const AppointmentDashboard = () => {
  // Variables -------------------------------------
  //const { patient } = useAuthContext();  // !!! Switch to applicable user group. This is a placeholder not meant for deployment !!! //
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

  const handleValueChange = (index, value) => {
    const tempAppointments = [...appointment]; // copy of the appointments into a temporary one
    tempAppointments[index].status = value;
    console.log(tempAppointments[index]);
    setAppointment(tempAppointments); // adjust the appointments!
  };

  const handleFormUpdate = async (id, index) => {
    const tempAppt = [...appointment];
    delete tempAppt[index].formDropdown;

    try {
      const appointmentResponse = await axios.patch(
        `http://localhost:4000/appointments/updateAppointment/${id}`,
        tempAppt[index]
      );

      if (tempAppt[index].status === "Confirmed") {
        try {
          const dateObj = [tempAppt[index].preferredDate, tempAppt[index]._id];
          console.log(dateObj);
          const updatedDateResponse = await axios.post(
            `http://localhost:4000/appointments/confirmDate/`,
            dateObj
          );
          console.log(updatedDateResponse);
        } catch (error) {
          console.log(error);
        }
      }

    } catch (error) {
      console.log(error);
    }
  };



  if (loading) {
    return <div>Loading...</div>;
  }

  // ------------------------- //
  // NOTES FOR FUTURE REFERENCE:
  // - Variables via route `http://localhost:4000/appointments/appointmentAndDoctor` in controller file:
  // 1. 'appointment' object is good as is
  // 2. 'doctorAppointment' is an array belonging to 'appointment' obj, dereference with [0] and append a ? in case
  // it has not rendered
  // 3. Refer to MongoDB official documentation on $lookup, this gave us a combination of both doctors and appointments
  // ------------------------- //

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
                  <span className="text-red-500">Appt ID: </span>
                  {appointments._id}
                </p>
                <p>
                  <span className="text-red-500">Requested Time: </span>
                  {appointments.time}
                </p>
                <p>
                  <span className="text-red-500">Requested Date: </span>
                  {new Date(appointments.preferredDate).toDateString()}
                </p>
                <p>
                  <span className="text-red-500">Preferred Language: </span>
                  {appointments.languagePreference}
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
                  <span className="text-red-500">Reason for Visit: </span>
                  {appointments.reasonForVisit}
                </p>
              </div>
              <div className="appt-cell-four">
                <p>
                  <span className="text-red-500">Status: </span>
                  {appointments.status}
                </p>
                <button
                  className="appt-update-btn"
                  onClick={() => toggleFormDropdown(index)}
                >
                  Edit
                </button>

                <button
                  className="appt-update-btn"
                  onClick={() => handleFormUpdate(appointments._id, index)}
                >
                  Confirm
                </button>
              </div>
            </div>
            {appointments.formDropdown && (
              <div className="appt-edit">
                <form action="">
                  <label
                    htmlFor="facility"
                    className="text-red-500 font-normal"
                  >
                    Facility
                  </label>
                  <select name="facility">
                    {appointments.doctor.facility.map((facilityName, index) => (
                      <option value={facilityName} key={index}>
                        {facilityName.location}
                      </option>
                    ))}
                  </select>
                </form>

                <form action="" className="ml-5">
                  <label htmlFor="status" className="text-red-500 font-normal">
                    Status
                  </label>
                  <select
                    name="status"
                    value={appointments.status}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                  >
                    <option value="Confirmed">Confirm</option>
                    <option value="Denied">Deny</option>
                    <option value="Pending">Pending</option>
                  </select>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default AppointmentDashboard;
