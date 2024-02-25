import React from "react";
import Select from "react-select";
import "../pages/styles/appointmentDashboard.css";
import axios from "axios";
const AppointmentDashForm = ({
  appointment,
  appointments,
  index,
  toggleEditMode,
  toggleFormDropdown,
  setAppointment,
}) => {
    const handleStatusChange = (index, value) => {
        const tempAppointments = [...appointment]; // copy of the appointments into a temporary one
        tempAppointments[index].status = value;
        console.log(tempAppointments[index]);
        setAppointment(tempAppointments); // adjust the appointments!
      };

    const onChange = (val) => { 
        handleStatusChange(index, val.value);
    }
    
  const handleFormUpdate = async (id, index) => {
    const tempAppt = [...appointment];
    delete tempAppt[index].formDropdown;

    try {
      const appointmentResponse = await axios.patch(
        `http://localhost:4000/appointments/updateAppointment/${id}`,
        tempAppt[index]
      );

      if (tempAppt[index].status === "Approved") {
        try {
          const dateObj = [tempAppt[index].preferredDate, tempAppt[index]._id];
          const updatedDateResponse = await axios.post(
            `http://localhost:4000/appointments/confirmDate/`,
            dateObj
          );
          console.log(updatedDateResponse);
        } catch (error) {
          console.log(error);
        }
      }

      if (tempAppt[index].status === "Denied") {
        try {
          const updatedDateResponse = await axios.delete(
            `http://localhost:4000/appointments/removeDate/${tempAppt[index]._id}`
          );
          console.log(updatedDateResponse);
        } catch (error) {}
      }
      console.log(appointmentResponse);
    } catch (error) {
      console.log(error);
    }
  };
  // The following is for use in the <Select/> tag from react-select
  // react documentation at https://react-select.com/home
  const facilityOptions = appointments.doctor.facility.map((facility) => ({
    value: facility,
    label: facility,
  }));

  const languageOptions = [
    { value: "spanish", label: "Spanish" },
    { value: "english", label: "English" },
  ];

  const processOptions = [
    { value: "Denied", label: "Deny" },
    { value: "Approved", label: "Approve" },
    { value: "Pending", label: "Set Pending" },
  ];

  const fieldStyle = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "black",
      fontSize: "18px",
    }),
    control: (baseStyles) => ({
      ...baseStyles,
      width: 200,
      height: 30,
      display: "flex",
      borderColor: "gray",
    }),
  };
  // end of react-select defintions

  return (
    <div>
      {appointments.editMode ? (
        <div className="appt-edit-container">
          <div>
            <p>
              <span className="text-red-500">Appt ID: </span>
              {appointments._id}
            </p>
            <p>
              <span className="text-red-500">Proccessed By: </span>
            </p>
          </div>

          <div className="mx-5 my-2">
            <div className="field">
              <span className="block">Patient Phone #</span>
              <input
                className="inputField"
                type="text"
                id="inputPhone"
                value={appointments.patientPhone}
                onChange={(e) => {}}
                disabled={!appointments.editMode}
              />
            </div>
            <div className="field">
              <span className="block">Patient Email</span>
              <input
                className="inputField"
                type="text"
                id="inputEmail"
                value={appointments.patientEmail}
                onChange={(e) => {}}
                disabled={!appointments.editMode}
              />
            </div>
          </div>
          <div className="mx-5">
            <div className="field">
              <span className="block">Preferred Language</span>
              <Select
                name="facility"
                options={languageOptions}
                placeholder={
                  appointments.languagePreference || "Select Language..."
                }
                isDisabled={!appointments.editMode}
                styles={fieldStyle}
              />
            </div>
            <form action="">
              <span className="block">Facility</span>
              <Select
                name="facility"
                options={facilityOptions}
                placeholder={appointments.facility || "Select Facility..."}
                isDisabled={!appointments.editMode}
                styles={fieldStyle}
              />
            </form>
          </div>

          <div>
            <form action="" className="ml-5">
              <Select
                name="processForm"
                options={processOptions}
                placeholder={"Update Status"}
                isDisabled={!appointments.editMode}
                styles={fieldStyle}
                onChange = {onChange}
              />
            </form>
          </div>
          <div>
            <button
              className="appt-update-btn"
              onClick={() => {
                handleFormUpdate(appointments._id, index);
                toggleEditMode(index);
              }}
            >
              Save
            </button>
            <button
              className="appt-update-btn"
              onClick={() => {
                {
                  toggleEditMode(index);
                  toggleFormDropdown(index);
                }
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="appt-edit-container">
          <div className="appt-cell-one appt-dropform">
            <p>
              <span className="text-red-500">Appt ID: </span>
              {appointments._id}
            </p>
            <p>
              <span className="text-red-500">Proccessed By: </span>
            </p>
          </div>
          <div className="appt-cell-two appt-dropform">
            <p>
              <span className="text-red-500">Patient Phone #: </span>
              {appointments.patientPhone}
            </p>
            <p>
              <span className="text-red-500">Patient Email: </span>
              {appointments.patientEmail}
            </p>
          </div>
          <div className="appt-cell-three appt-dropform">
            <p>
              <span className="text-red-500">Patient Comments: </span>
              <br></br>
              {appointments.reasonForVisit}
            </p>
          </div>
          <div className="appt-cell-four appt-dropform">
            <p>
              <span className="text-red-500">Facility: </span>
              {appointments.facility}
            </p>
            <p>
              <span className="text-red-500">Preferred Language: </span>
              {appointments.languagePreference}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentDashForm;
