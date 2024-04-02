import React from "react";
import Select from "react-select";
import "../../pages/styles/appointmentDashboard.css";
import convertMilitaryToTimeslot from "../../utils/convertTime.js";
import axios from "axios";
import { useEffect, useState } from "react";

const AppointmentDashForm = ({
  appointments,
  providers,
  index,
  toggleEditMode,
  toggleFormDropdown,
  user,
  setUpdated,
  updated,
  setAppointment,
}) => {
  const [statusChanged, setStatusChanged] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(appointments);
  const [facilityOptions, setFacilityOptions] = useState();
  const handleFormChange = (e) => {
    console.log(e);
    setSelectedAppointment((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
    console.log(selectedAppointment);
  };

  const handleDoctorChange = (e) => {
    const doctorMatch = providers.find(
      (provider) => provider.label === e.label
    ); // find doctor based on name, store the id & name in doctorMatch

    setSelectedAppointment((values) => ({
      ...values,
      doctor: doctorMatch.value,
    })); // .value contains the id, .label contains the name, we only want the id
  };

  // specific to react-select
  const handleSelectChange = (name, e) => {
    setSelectedAppointment((values) => ({ ...values, [name]: e.value }));
    if (name === "status") {
      setStatusChanged(true);
    }
  };

  // ---------------------------------------------------------
  const handleFormUpdate = async (id) => {
    console.log(selectedAppointment);
    console.log("user------->", user);
    let tempAppt = { ...selectedAppointment, lastEditted: user._id };
    tempAppt = selectedAppointment;
    console.log("tappt---->", tempAppt);
    const tempAppt2 = selectedAppointment;
    delete tempAppt.formDropdown;
    delete tempAppt.editMode;
    let res;

    try {
      if (tempAppt.status === "Approved") {
        try {
          const confirmedApptData = {
            apptDay: tempAppt.preferredDate,
            timeSlot: convertMilitaryToTimeslot(tempAppt.time),
            appointmentId: id,
            docId: appointments.doctor._id,
          };

          res = await axios.post(
            `http://localhost:4000/appointments/confirmAppt`,
            confirmedApptData
          );
          console.log(res.data.message);
          if (res.data.message === "false") {
            window.alert("Date and time already booked");
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (tempAppt) {
        console.log("Status changed?", statusChanged);
        const appointmentResponse = await axios.patch(
          `http://localhost:4000/appointments/updateAppointment/${id}`,
          tempAppt
        );
        console.log(appointmentResponse);
      }
      if (statusChanged) {
        const timeSlot = convertMilitaryToTimeslot(tempAppt.time);
        try {
          const updatedDateResponse = await axios.patch(
            `http://localhost:4000/appointments/removeDate/${tempAppt._id}/${tempAppt.preferredDate}`,
            { timeSlot: timeSlot }
          );
          console.log(updatedDateResponse);
          setSelectedAppointment(tempAppt2);
        } catch (error) {
          console.log("Could not reject appt:", error.message);
        }
      } else {
        setSelectedAppointment(tempAppt2);
      }
      // !!
      setUpdated(!updated);
    } catch (error) {
      console.log(error);
    }
  };
  // ---------------------------------------------------------
  useEffect(() => {
    let facOptions = [];
    if (appointments && appointments.doctor.facility.length > 0) {
      // appts exists and more than 1 facility
      facOptions = appointments.doctor.facility.map((facility) => ({
        value: facility,
        label: facility,
      }));

      setFacilityOptions(facOptions);
    } else {
      // default options
      setFacilityOptions([
        {
          value: "Bakersfield",
          label: "Bakersfield",
        },
      ]);
    }

    console.log("Fac options ---->", facilityOptions);
  }, [updated]);

  // const languageOptions = [
  //   { value: 'spanish', label: 'Spanish' },
  //   { value: 'english', label: 'English' },
  // ];

  const processOptions = [
    { value: "Denied", label: "Deny" },
    { value: "Approved", label: "Approve" },
    { value: "Pending", label: "Set Pending" },
    { value: "Cancelled", label: "Cancel" },
    { value: "Complete", label: "Complete" },
    { value: "NO-SHOW", label: "NO-SHOW" },
  ];

  const providerOptions = providers;

  return (
    <div className="bg-gray-200">
      {appointments.editMode ? (
        <div>
          <div className="appt-cells min-h-150">
            <div className="appt-cell-one">
              <p>
                <span className="text-red-500">Appt ID: </span>
                {appointments._id}
              </p>
              <p>
                <span className="text-red-500">Last Proccessed By: </span>
                {appointments.lastEditted}
              </p>
            </div>

            <div className="appt-cell-two">
              <div className="field flex w-full">
                <label className="field mr-2 min-w-150 font-normal text-red-500">
                  Patient Phone #
                </label>
                <input
                  name="patientPhone"
                  className="inputField flex-auto"
                  type="text"
                  id="inputPhone"
                  value={selectedAppointment.patientPhone}
                  onChange={handleFormChange}
                />
              </div>

              <div className="field flex w-full">
                <label className="field mr-2 min-w-150 font-normal text-red-500">
                  Patient Email
                </label>
                <input
                  name="patientEmail"
                  className="inputField flex-auto"
                  type="text"
                  id="inputEmail"
                  value={selectedAppointment.patientEmail}
                  onChange={(e) => handleFormChange(e)}
                  disabled={!appointments.editMode}
                />
              </div>

              <div className="field flex w-full">
                <label className="field mr-2 min-w-150 font-normal text-red-500">
                  Preferred Language
                </label>
                <input
                  name="languagePreference"
                  className="inputField flex-auto"
                  type="text"
                  id="inputLangauge"
                  value={selectedAppointment.languagePreference}
                  onChange={(e) => handleFormChange(e)}
                  disabled={!appointments.editMode}
                />
              </div>
            </div>

            <div className="mx-5 my-2 flex items-center flex-col justify-between">
              <div className="field flex w-full">
                <label className="field mr-2 min-w-150 font-normal text-red-500">
                  Facility
                </label>
                <div className="w-72">
                  <Select
                    name="facility"
                    options={facilityOptions}
                    placeholder={appointments.facility || "Select Facility..."}
                    isDisabled={!appointments.editMode}
                    onChange={(e) => handleSelectChange("facility", e)}
                  />
                </div>
              </div>

              <div className="field flex w-full">
                <label className="field mr-2 min-w-150 font-normal text-red-500">
                  Provider
                </label>
                <div className="w-72">
                  <Select
                    name="provider"
                    options={providerOptions}
                    placeholder={appointments.provider}
                    isDisabled={!appointments.editMode}
                    onChange={(e) => handleDoctorChange(e)}
                  />
                </div>
              </div>
              <div className="field flex w-full">
                <label className="field mr-2 min-w-150 font-normal text-red-500">
                  Update Status
                </label>
                <div className="w-72">
                  <Select
                    name="status"
                    options={processOptions}
                    placeholder={"Status..."}
                    isDisabled={!appointments.editMode}
                    onChange={(e) => handleSelectChange("status", e)}
                  />
                </div>
              </div>
            </div>

            <div className="my-auto flex-col">
              <div>
                <button
                  className="appt-update-btn"
                  onClick={() => {
                    handleFormUpdate(appointments._id);
                    toggleEditMode(index);
                  }}
                >
                  Save
                </button>
              </div>
              <div>
                <button
                  className="appt-update-btn mt-1"
                  onClick={() => {
                    toggleEditMode(index);
                    toggleFormDropdown(index);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>
              <span className="text-red-500">Patient Comments: </span>
              {appointments.apptComments}
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div className="appt-edit-container">
            <div className="appt-cell-one appt-dropform">
              <p>
                <span className="text-red-500">Appt ID: </span>
                {appointments._id}
              </p>
              <p>
                <span className="text-red-500">Proccessed By: </span>
                {appointments.lastEditted}
              </p>
              <br></br>
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
              <p>
                <span className="text-red-500">Preferred Language: </span>
                {appointments.languagePreference}
              </p>
            </div>
            <div className="appt-cell-three appt-dropform">
              <p>
                <span className="text-red-500">Facility: </span>
                {appointments.facility}
              </p>
              <p>
                <span className="text-red-500">Provider: </span>
                {appointments.doctor.fname} {appointments.doctor.lname}
              </p>
              <p>
                <span className="text-red-500">Status: </span>
                {appointments.status}
              </p>
            </div>
          </div>
          <div className="appt-cell-four">
            <p>
              <span className="text-red-500">Patient Comments: </span>
              {appointments.apptComments}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentDashForm;
