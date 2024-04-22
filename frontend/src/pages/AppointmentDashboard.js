import React, { useState, useEffect, useRef} from "react";
import axios from "axios";
import "./styles/appointmentDashboard.css";
import AppointmentDashForm from "../components/appts/AppointmentDashForm";
import { useAuthContext } from "../hooks/useAuthContext.js";
import convertClockTime from "../utils/convertClockTime.js";
import Select from 'react-select';
// note there is a difference from appointments plural (used in .map)
// and appointment singular (used for rendering specific appt in dropwdown)
const AppointmentDashboard = () => {
  // Variables -------------------------------------
  const [updated, setUpdated] = useState(false);
  const [allAppointments, setAllAppointments] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteringStatus, setFilteringStatus] = useState(false); // true if filtered
  const [statusFilter, setStatusFilter] = useState();
  const [patientOptions, setPatientOptions] = useState([]);
  const { admin } = useAuthContext();
  const { doctor } = useAuthContext();
  const [user, setUser] = useState(null);

  const extractPatients = () => {
    let patientOptions = [];
    patientOptions = appointment.map(({patientFirstName, patientLastName}) => ({
      value: patientLastName,
      label: patientFirstName + " " + patientLastName,
    }));

    let extractedPatients = [...new Set(patientOptions)];
    console.log("ExtractedPatients ->", extractedPatients);
    console.log("Patient Options ->", patientOptions);
    setPatientOptions(patientOptions);
  };


  useEffect(() => {
    if (admin) {
      const getUserInfo = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/admins/${admin.email}`
        );
        const data = await response.json();
        setUser(data);
      };
      setFilteringStatus(false);
      getUserInfo();
    } else if (doctor) {
      const getUserInfo = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/doctors/${doctor.email}`
        );
        const data = await response.json();
        setUser(data[0]);
      };
      setFilteringStatus(false);
      getUserInfo();
    }
  }, [admin, doctor]);

  // -----------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        let appointmentResponse;

          appointmentResponse = await axios.get(
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

        setStatusFilter("All");
        setProviders(mappedDoctors);
        setAllAppointments(appointmentResponse.data);
        setFilteringStatus(false);
        setAppointment(appointmentResponse.data);
        extractPatients();
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [updated]);

  useEffect(() => {
    if (user && appointment && doctor && filteringStatus === false) {
      const filteredResponse = appointment.filter(
        (item) => item.doctor._id === user._id
      );
      setAppointment(filteredResponse);
      setAllAppointments(filteredResponse);
      setFilteringStatus(true);
    }
  }, [user, appointment]);

  useEffect(() => {
      if (statusFilter == "All") {
        setAppointment(allAppointments);
      } else {
        const filteredResponse = allAppointments.filter(
          (item) => item.status === statusFilter
        );
        setAppointment(filteredResponse);
      }
  }, [statusFilter]);



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

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.value);
  };


  if (loading) {
    return <div>Loading...</div>;
  }


  const statusFilterOptions = [
    { value: "All", label: "Show All Appointments" },
    { value: "Pending", label: "Pending Approval" },
    { value: "Approved", label: "Approved" },
    { value: "Denied", label: "Denied" },
    { value: "Cancelled", label: "Cancelled" },
    { value: "Complete", label: "Completed" },
    { value: "NO-SHOW", label: "NO-SHOW" },
  ];


  return (
    <div className="appt-dash-can h-full min-h-screen">
      <div className="appt-main-container">
        <div className=" settings-top-row flex flex-col">
          <div className="top-bar" />
          <div className="flex justify-between">
            <h1 className="settings-top-header">Appointment Dashboard</h1>
            <div className = "flex"> 
            <Select
              className = "leading-10 m-2"
              name="status-filter"
              id="status-filter"
              options={patientOptions}
              placeholder={"Patient"}
              onChange={(e) => handleStatusFilterChange(e)}
              menuPortalTarget={document.body}
              menuPosition={'fixed'} 
            />
            <Select
              className = "leading-10 mr-2 mt-2 mb-2"
              name="status-filter"
              id="status-filter"
              options={statusFilterOptions}
              placeholder={"Status"}
              onChange={(e) => handleStatusFilterChange(e)}
              menuPortalTarget={document.body}
              menuPosition={'fixed'} 
            />
            </div>
          </div>
        </div>
        {appointment.length > 0 ? (
          appointment.map((appointments, index) => (
            <div key={index}>
              <div key={index} className="appt-cells min-h-150">
                <div className="appt-cell-one">
                  <p>
                    <span className="text-red-500" id={`${index}`}>
                      Requested Time:{" "}
                    </span>
                    {convertClockTime(appointments.time)}
                  </p>
                  <p>
                    <span className="text-red-500">Requested Date: </span>
                    {new Date(appointments.preferredDate).toDateString()}
                  </p>
                </div>
                <div className="appt-cell-two">
                  <p>
                    <span className="text-red-500">Patient: </span>
                    {appointments.patientFirstName}{" "}
                    {appointments.patientLastName}
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
                    <div>Editting Form...</div>
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
                  user={user}
                  updated={updated}
                  setUpdated={setUpdated}
                />
              ) : (
                <div></div>
              )}
            </div>
          ))
        ) : (
          <div className = "min-h-fit">
            <h1 className = "text-center my-5 font-bold">No Appointments Found</h1>
          </div>
        )}
      </div>
    </div>
  );
};
export default AppointmentDashboard;
