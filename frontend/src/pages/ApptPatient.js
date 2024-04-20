import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { VscChevronRight } from "react-icons/vsc";
import axios from "axios";
import convertMilitaryToTimeslot from "../utils/convertTime.js";
import convertClockTime from "../utils/convertClockTime.js";
import Select from 'react-select';
const ApptPatient = () => {
  const { id } = useParams();
  const [apptList, setApptList] = useState([]); // represents ALL appts
  const [allAppointments, setAllAppointments] = useState([]); // for use with filter
  const [selectedAppt, setSelectedAppt] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const { patient } = useAuthContext();
  const [user, setUser] = useState([]);
  const [open, setOpen] = React.useState(false);
  const statusFilterOptions = [
    { value: "All", label: "Show All Appointments" },
    { value: "Pending", label: "Pending Approval" },
    { value: "Approved", label: "Approved" },
    { value: "Denied", label: "Denied" },
    { value: "Cancelled", label: "Cancelled" },
    { value: "Complete", label: "Completed" },
    { value: "NO-SHOW", label: "NO-SHOW" },
  ];

  // const [selectedApptId, setSelectedApptId] = useState(null);
  const handleOpen = (index) => {
    console.log("My index------->", index);
    const tempAppt = apptList[index];
    setSelectedAppt(tempAppt);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const getUserInfo = async () => {
    const response = await fetch(
      `http://localhost:4000/patients/${patient.email}`
    );
    const data = await response.json();
    setUser(data);
  };

  const getApptInfo = async () => {
    const response = await fetch(
      `http://localhost:4000/appointments/patient/${id}`
    );
    const data = await response.json();
    setApptList(data);
    setAllAppointments(data);
  };

  useEffect(() => {
    setStatusFilter("All");
    getUserInfo();
    getApptInfo();
  }, [patient.email]);

  const formatDate = (dateProp) => {
    try {
      return format(new Date(dateProp), "MM/dd/yyyy");
    } catch {
      console.log("Invalid date/Unable to format");
      return dateProp;
    }
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.value);
  };

  const RenderStatus = (status) => {
    if (status === "Pending") {
      return <p>Status: Pending Approval</p>;
    } else if (!status) {
      return <p>Status: Loading...</p>;
    } else {
      return <p>Status: {status}</p>;
    }
  };

  const handleCancelAppt = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/appointments/updateApptStatus/${selectedAppt._id}`,
        {
          status: "Cancelled",
        }
      );
      console.log("myrep-------->", response);
      const convertedTimeSlot = convertMilitaryToTimeslot(selectedAppt.time);
      const remRes = await axios.patch(
        `http://localhost:4000/appointments/removeDate/${selectedAppt._id}/${selectedAppt.preferredDate}`,
        { timeSlot: convertedTimeSlot }
      );

      console.log("here ---->", remRes.data.message);
      handleClose();
      getApptInfo();
    } catch (error) {
      console.log("uh oh---->", error);
    }
  };

  useEffect(() => {
    if (statusFilter) {
      if (statusFilter == "All") {
        setApptList(allAppointments);
      } else {
        const filteredResponse = allAppointments.filter(
          (item) => item.status === statusFilter
        );
        setApptList(filteredResponse);
      }
    }
  }, [statusFilter]);

  return (
    <div className="patient-appt-main-container">
      <div className="patient-appt-content-container">
        <div className="patient-appt-header-can">
          <div className="top-bar" />
          <p className="patient-appt-header">My Appointments</p>
          <Select
            className="leading-10 m-2"
            name="status-filter"
            id="status-filter"
            options={statusFilterOptions}
            placeholder={"Filter By..."}
            onChange={(e) => handleStatusFilterChange(e)}
            menuPortalTarget={document.body}
            menuPosition={"fixed"}
          />
        </div>
        {apptList.length > 0 ? (
          apptList.map((appts, index) => (
            <div key={index} className="patient-each-appt-container">
              <div className="each-appt-content">
                <div className="cell-1">
                  <p>
                    <span className="patient-appt-label">Date Received:</span>{" "}
                    {formatDate(appts.createdAt)}
                  </p>
                  <p>
                    <span className="patient-appt-label">
                      Date/Time Requested:
                    </span>{" "}
                    {formatDate(appts.preferredDate)}{" "}
                    {convertClockTime(appts.time)}
                  </p>
                </div>
                <div className="cell-2">
                  <p>
                    <span className="patient-appt-label">Reason:</span>{" "}
                    {appts.apptReason}{" "}
                  </p>
                  <p>
                    <span className="patient-appt-label">Provider:</span>{" "}
                    {appts.doctor.fname} {appts.doctor.lname}
                  </p>
                </div>
                <div className="cell-3">
                  <span className="patient-appt-label">
                    {RenderStatus(appts.status)}
                  </span>
                  {appts.status === "Approved" || appts.status === "Pending" ? (
                    <div>
                      <Button
                        className="patient-appt-cancel"
                        onClick={() => handleOpen(index)}
                      >
                        Cancel
                      </Button>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="appointment-cancel-confirmation"
                        aria-describedby="cancel-appointment"
                      >
                        <Box sx={style}>
                          <Typography
                            id="appointment-cancel-confirmation"
                            variant="h6"
                            component="h2"
                          >
                            Cancel your Appointment?
                          </Typography>
                          <Typography id="cancel-appointment" sx={{ mt: 2 }}>
                            <div>
                              <Button onClick={() => handleCancelAppt()}>
                                Confirm
                              </Button>
                              <Button onClick={handleClose}> Cancel </Button>
                            </div>
                          </Typography>
                        </Box>
                      </Modal>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="cell-4">
                  <Button className="patient-appt-cancel">
                    <Link to={`/appointment/${id}/${appts._id}`}>
                      View <VscChevronRight />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="cell-5">
                <p className="patient-appt-label overflow-scroll">
                  Additional Comments:
                  <span className="text-gray-500 px-3 font-normal">
                    {appts.apptComments}
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="min-h-fit">
            <h1 className="text-center my-5 font-bold">
              No Appointments Found
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApptPatient;
