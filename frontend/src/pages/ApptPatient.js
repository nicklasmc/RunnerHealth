import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import axios from "axios";
import "./styles/apptCreation.css";

const ApptPatient = () => {
  const { id } = useParams();
  const [apptList, setApptList] = useState([]); // represents ALL appts
  const { patient } = useAuthContext();
  const [user, setUser] = useState([]);
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
    setApptList(data);

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

  const RenderStatus = (status) => {
    if (status === "Pending") {
      return <p>Status: Pending Approval</p>;
    } else if (!status) {
      return <p>Status: Loading...</p>;
    } else {
      return <p>Status: {status}</p>;
    }
  };

  const handleCancelAppt = async (apptId) => {
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
        <h1 className="text-center mb-4">My Appointments</h1>
        <div className="border-t-4">
          {apptList.map((appts) => (
            <div className="min-h-50 border-b-4 border-t-0 flex-col my-2">
              <div className="justify-around flex min-w-full my-2">
                <div className="cell-1 flex-1">
                  <p>Date Received: {formatDate(appts.createdAt)}</p>
                  <p>Date Requested: {formatDate(appts.preferredDate)}</p>
                  <p>Provider: {appts.doctor}</p>
                </div>
                <div className="cell-2 flex-1">
                  <p>Reason: {appts.apptReason} </p>
                  <Link to={`/appointment/${id}/${appts._id}`}>
                    View Confirmation Receipt
                  </Link>
                </div>
                <div className="cell-3 flex-1">
                  {RenderStatus(appts.status)}
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
                          <Button onClick={() => handleCancelAppt(appts._id)}>Confirm</Button>
                          <Button onClick={handleClose}> Cancel </Button>
                        </div>
                      </Typography>
                    </Box>
                  </Modal>
                </div>
              </div>
              <div className="cell-4 border-t-2 border-dotted py-2">
                <p>Additional Comments:
                  <span className="text-gray-500 px-3"> {appts.apptComments} </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApptPatient;
