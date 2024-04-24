import React, { useState, useEffect, useRef} from "react";
import axios from "axios";
import "./styles/appointmentDashboard.css";
import AppointmentDashForm from "../components/appts/AppointmentDashForm";
import { useAuthContext } from "../hooks/useAuthContext.js";
import convertClockTime from "../utils/convertClockTime.js";
import Select from 'react-select';
import { isBefore, isAfter, isEqual, endOfDay, format} from "date-fns";
// note there is a difference from appointments plural (used in .map)
// and appointment singular (used for rendering specific appt in dropwdown)
const AppointmentDashboard = () => {
  // Variables -------------------------------------
  const [updated, setUpdated] = useState(false);
  const [allAppointments, setAllAppointments] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filteringStatus, setFilteringStatus] = useState(null);
  const [statusFilter, setStatusFilter] = useState();
  const [patientFilter, setPatientFilter] = useState();
  const [typeFilter, setTypeFilter] = useState();
  const [dateOne, setDateOne] = useState();
  const [dateTwo, setDateTwo] = useState();
  const [selectedPatientFilter, setSelectedPatientFilter] = useState(null);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState(null);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState(null);
  const [patientOptions, setPatientOptions] = useState([]);

  const { admin } = useAuthContext();
  const { doctor } = useAuthContext();
  const [user, setUser] = useState(null);

  const extractPatients = () => {
    let fullPatientArray = [];
    fullPatientArray = appointment.map(({patientFirstName, patientLastName}) => ({
      value: patientLastName,
      label: patientFirstName + " " + patientLastName,
    }));

    let tempArr = fullPatientArray.map(JSON.stringify);
    let uniquePatients = [...new Set(tempArr)];
    let uniquePatientsArray = Array.from(uniquePatients).map(JSON.parse);

    if(uniquePatientsArray.length === 0) {
      setPatientOptions([{value: "No Patients Found", label: "No Patients Found"}]);
    }

    let allPatientLabel = {value:"All Patients", label:"All Patients"};
    uniquePatientsArray.unshift(allPatientLabel);
    setPatientOptions(uniquePatientsArray);
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


        setProviders(mappedDoctors);
        setAllAppointments(appointmentResponse.data);
        setFilteringStatus(false);
        setAppointment(appointmentResponse.data);
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
      if (appointment) {
        extractPatients();
      }
      setFilteringStatus(true);
    } 
  
  }, [user, appointment]);

  useEffect(() => {
    if (allAppointments.length > 0) {
      extractPatients();
    }
  }, [allAppointments]);

  const filterDate = (prop) => {
    let tempArr = prop;
    let tempDateOne = new Date(dateOne.replace(/-/g, '\/').replace(/T.+/, ''));

    let tempDateTwo = new Date(dateTwo.replace(/-/g, '\/').replace(/T.+/, ''));
 

    let finalArray = tempArr.filter(
      (item) => (
      ((isEqual((new Date(item.preferredDate.replace(/-/g, '\/').replace(/T.+/, ''))),(tempDateOne))) || (isAfter((new Date(item.preferredDate)),(tempDateOne))))
       && 
      ((isEqual((new Date(item.preferredDate.replace(/-/g, '\/').replace(/T.+/, ''))), (tempDateTwo))) || (isBefore((new Date(item.preferredDate)), (tempDateTwo))))
      )
    );
    return finalArray;
  }


  const applyFilter = () => {
    let filteredResponse = allAppointments;
    if (statusFilter === "Any Status" && patientFilter === "All Patients" && typeFilter === "All Types") { // show all
      setAppointment(allAppointments);
      if (dateOne && dateTwo) {
        setAppointment(filterDate(allAppointments));
      }
    } else {
      if (statusFilter && (statusFilter !== "Any Status") && 
      ((patientFilter === null) || (patientFilter === "All Patients")) && 
      ((typeFilter === null) || (typeFilter === "All Types"))) { // filter by status only
        filteredResponse = allAppointments.filter(
          (item) => item.status === statusFilter
        );
        setAppointment(filteredResponse);

      } else if (patientFilter && (patientFilter !== "All Patients") && 
      ((statusFilter === null) || (statusFilter === "Any Status")) && 
      ((typeFilter === null) || (typeFilter === "All Types"))) { // filter by patient only
        filteredResponse = allAppointments.filter(
          (item) => item.patientLastName === patientFilter
        );
        setAppointment(filteredResponse);

      } else if (typeFilter && (typeFilter !== "All Types") && 
      ((statusFilter === null) || (statusFilter === "Any Status")) && 
      ((patientFilter === null) || (patientFilter === "All Patients"))) { // filter by type of appt only
        filteredResponse = allAppointments.filter(
          (item) => item.apptReason === typeFilter
        );
        setAppointment(filteredResponse);

      } else if (patientFilter || statusFilter || typeFilter) { // filter by all
        filteredResponse = allAppointments;
        if (patientFilter !== "All Patients" && patientFilter) {
          filteredResponse = allAppointments.filter(
            (item) => item.patientLastName === patientFilter
          );
        }
        if (statusFilter !== "Any Status" && statusFilter) {
          filteredResponse = filteredResponse.filter(
            (item) => item.status === statusFilter
          );
        }
        if (typeFilter !== "All Types" && typeFilter) {
          filteredResponse = filteredResponse.filter(
            (item) => item.apptReason === typeFilter
          );
        }
        setAppointment(filteredResponse);
      }
      if (dateOne && dateTwo) {
        setAppointment(filterDate(filteredResponse));
      }

    }
  };

  const resetFilter = () => {
    setPatientFilter(null);
    setStatusFilter(null);
    setTypeFilter(null);
    setSelectedPatientFilter(null);
    setSelectedStatusFilter(null);
    setSelectedTypeFilter(null);
    document.getElementById("date-one").value = null;
    document.getElementById("date-two").value = null;
    setDateOne(null);
    setDateTwo(null);

    setAppointment(allAppointments);
  };



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
    setSelectedStatusFilter({value: e.value, label:e.value});
  };
  const handlePatientFilterChange = (e) => {
    setPatientFilter(e.value);
    setSelectedPatientFilter({value: e.value, label:e.value});
  };

  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.value);
    setSelectedTypeFilter({value: e.value, label:e.value});
  };

  const handleDateOneChange = (e) => {
    let date = document.getElementById("date-one").value;
    setDateOne(date);
  };

  const handleDateTwoChange = (e) => {
    let date = document.getElementById("date-two").value;
    setDateTwo(date);
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  const statusFilterOptions = [
    { value: "Any Status", label: "Any Status" },
    { value: "Pending", label: "Pending Approval" },
    { value: "Approved", label: "Approved" },
    { value: "Denied", label: "Denied" },
    { value: "Cancelled", label: "Cancelled" },
    { value: "Complete", label: "Completed" },
    { value: "NO-SHOW", label: "NO-SHOW" },
  ];

  const typeFilterOptions = [
    { value: "All Types", label: "All Types"},
    { value: "Followup", label: "Follow Up" },
    { value: "Physical", label: "Physical" },
    { value: "Labwork", label: "Lab Work" },
    { value: "Other", label: "Other (Please explain below)" },
  ];

  return (
    <div className="appt-dash-can h-full min-h-screen">
      <div className="appt-main-container">
        <div className=" settings-top-row flex flex-col">
          <div className="top-bar" />
          <div className="flex flex-col">
            <h1 className="settings-top-header">Appointment Dashboard</h1>

            <div className = "flex flex-row"> 
              <div className="flex flex-grow-0 flex-shrink-0 m-3 items-center justify-center">
                <input aria-label="Date" type="date" id = "date-one"  className="flex items-center" onChange={handleDateOneChange}/>
                <p className = "my-2.5 mx-2"> To </p>
                <input aria-label="Date" type="date" id = "date-two" onChange={handleDateTwoChange} />
              </div>
              <Select
                className="leading-8 m-2 mt-3"
                name="patient-filter"
                id="patient-filter"
                value={selectedPatientFilter}
                options={patientOptions}
                placeholder={"Patient"}
                onChange={(e) => handlePatientFilterChange(e)}
                menuPortalTarget={document.body}
                menuPosition={'fixed'}
              />
              <Select
                className="leading-8 m-2 mt-3"
                name="type-filter"
                id="type-filter"
                value={selectedTypeFilter}
                options={typeFilterOptions}
                placeholder={"Appt Type"}
                onChange={(e) => handleTypeFilterChange(e)}
                menuPortalTarget={document.body}
                menuPosition={'fixed'}
              />
              <Select
                className="leading-8 m-2 mt-3"
                name="status-filter"
                id="status-filter"
                value={selectedStatusFilter}
                options={statusFilterOptions}
                placeholder={"Status"}
                onChange={(e) => handleStatusFilterChange(e)}
                menuPortalTarget={document.body}
                menuPosition={'fixed'}
              />
              <div className = "flex flex-shrink-0 items-center">
                <button className=" m-2 mt-3 underline" onClick={applyFilter}>
                  Apply Filter</button>
                <button className=" m-2 mt-3 underline" onClick={resetFilter}>
                  Reset Filter</button>
              </div>
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
