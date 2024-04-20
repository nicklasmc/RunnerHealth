import React from "react";
import Select from "react-select";
import "../../pages/styles/appointmentDashboard.css";
import convertMilitaryToTimeslot from "../../utils/convertTime.js";
import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import extractTimes from "../../utils/extractTimes";

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
  const [startDate, setStartDate] = useState(new Date(selectedAppointment.preferredDate));
  const [timeOptions, setTimeOptions] = useState([]);
  const [apptTime, setApptTime] = useState();

  useEffect(() => {
    // use to populate
    const fetchAvailability = async () => {
      const availResponse = await axios.get(
        // use /:date/:id
        `http://localhost:4000/appointments/getApptsByDate/${startDate}/${appointments.doctor._id}`
      );
      let timeOps = extractTimes(availResponse);
      setTimeOptions(timeOps);
    };
    if (startDate) {
      // only do if there is actually a date selected
      fetchAvailability();
    }
  }, [startDate, appointments.doctor]);

  const handleTimeChange = (e) => {
    setApptTime(e.value);
  };

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

    let tempAppt = selectedAppointment;
    const timeSlot = convertMilitaryToTimeslot(tempAppt.time);
    tempAppt = { ...tempAppt, lastEditted: user.id };
    tempAppt = { ...tempAppt, preferredDate: startDate };
    const tempAppt2 = selectedAppointment; // copy into separate obj so we can keep the formdropdown and edit data
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
          } else {
            const appointmentResponse = await axios.patch(
              `http://localhost:4000/appointments/updateAppointment/${id}`,
              tempAppt
            );

            console.log(appointmentResponse);
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (
        (tempAppt.status === "Cancelled" ||
          tempAppt.status === "Complete" ||
          tempAppt.status === "NO-SHOW" ||
          tempAppt.status === "Pending" ||
          tempAppt.status === "Denied") && { statusChanged }
      ) {
        try {
          // delete in the date reservation
          await axios.patch(
            `http://localhost:4000/appointments/removeDate/${tempAppt._id}/${tempAppt.preferredDate}`,
            { timeSlot: timeSlot }
          );
          // update info
          await axios.patch(
            `http://localhost:4000/appointments/updateAppointment/${tempAppt._id}`,
            tempAppt
          );
          setSelectedAppointment(tempAppt2);
        } catch (error) {
          console.log("Could not update appt:", error.message);
        }
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
              <div className="mb-3">
                <div className="customDatePickerWidth flex">
                  <span className="text-red-500 min-w-50">Date: </span>
                  <DatePicker
                    closeOnScroll={true}
                    showIcon
                    wrapperClassName="datePicker"
                    inputProps={{ style: { width: 200 } }}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
              </div>
              <div className="flex">
                <span className="text-red-500 min-w-50">Time: </span>
                <Select
                  name="appt-time"
                  id="appt-time"
                  options={timeOptions}
                  isOptionDisabled={(option) => option.disabled}
                  placeholder={"Time"}
                  onChange={(e) => handleTimeChange(e)}
                />
              </div>
            </div>

            <div className="appt-cell-two min-w-400">
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
              <div className="field flex w-full mt-2">
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
          <div className = "appt-cell-five mt-4 py-4 px-3 border-t-2 border-dotted border-black">
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
              <p className = "mb-2">
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
              <p className = "mb-2">
                <span className="text-red-500">Patient Phone #: </span>
                {appointments.patientPhone}
              </p>
              <p className = "mb-2">
                <span className="text-red-500">Patient Email: </span>
                {appointments.patientEmail}
              </p>
              <p>
                <span className="text-red-500">Preferred Language: </span>
                {appointments.languagePreference}
              </p>
            </div>
            <div className="appt-cell-three appt-dropform">
              <p className = "mb-2 mt-3">
                <span className="text-red-500">Facility: </span>
                {appointments.facility}
              </p>
              <p className = "mb-2">
                <span className="text-red-500">Provider: </span>
                {appointments.doctor.fname} {appointments.doctor.lname}
              </p>
              <p className = "mb-2">
                <span className="text-red-500">Status: </span>
                {appointments.status}
              </p>
            </div>
          </div>
          <div className="appt-cell-four mt-4">
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
