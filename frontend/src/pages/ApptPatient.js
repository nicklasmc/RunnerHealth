import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {
  format,
  formatDistance,
  formatRelative,
  subDays,
  endOfDay,
} from "date-fns";
import axios from "axios";
import "./styles/apptCreation.css";

const ApptPatient = () => {
  const { id } = useParams();
  const [appt, setAppt] = useState([]);
  const { patient } = useAuthContext();
  const [user, setUser] = useState([]);
  const [apptId, setApptId] = useState();
  const [apptStatus, setApptStatus] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
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
    console.log(data);
    setAppt(data);
    setApptId(data[0]._id);
    setApptStatus(data[0].status);
  };

  useEffect(() => {
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

  const ApptLink = () => {
    if (apptId) {
      return (
        <Link to={`/appointment/${id}/${apptId}`}>
          View Confirmation Receipt
        </Link>
      );
    } else {
      return <p>Loading...</p>;
    }
  };

  const RenderStatus = () => {
    if (apptStatus === "Pending") {
      return <p> Status: Pending Approval</p>;
    } else if (!apptStatus) {
      return <p>Status: Loading...</p>;
    } else {
      return <p> Status: {apptStatus} </p>;
    }
  };

  const handleCancelAppt = async () => {
    const response = await axios.patch(
      `http://localhost:4000/appointments/updateApptStatus/${apptId}`,
      {
        status: "Cancelled",
      }
    );
    handleClose();
    getApptInfo();
  };

  return (
    <div>
      <div className="appt-main-container">
        <h1 className="text-center">My Appointments</h1>
        <div className="border-t-8">
          {appt.map((appts, index) => (
            <div className="min-h-50 border-b-8 border-t-0 flex justify-around max-w-full">
              <div className="cell-1">
                <p>Requested on: {formatDate(appts.createdAt)}</p>
                <p>For: {formatDate(appts.preferredDate)}</p>
              </div>
              <div className="cell-2">
                <p>Reason: {appts.apptReason} </p>
                <ApptLink />
              </div>
              <div>
                <RenderStatus />
                <Button onClick={handleOpen}>Cancel</Button>
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
                        <Button onClick={handleCancelAppt}>Confirm</Button>
                        <Button onClick={handleClose}> Cancel </Button>
                      </div>
                    </Typography>
                  </Box>
                </Modal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApptPatient;
