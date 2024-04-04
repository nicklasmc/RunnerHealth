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
import convertMilitaryToTimeslot from "../utils/convertTime.js";
import convertClockTime from "../utils/convertClockTime.js";

const ApptPatient = () => {
  const { id } = useParams();
  const [apptList, setApptList] = useState([]); // represents ALL appts
  const [selectedAppt, setSelectedAppt] = useState([]);
  const { patient } = useAuthContext();
  const [user, setUser] = useState([]);
  const [open, setOpen] = React.useState(false);
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

  return (
    <div>
      <div className="appt-main-container">
        <h1 className="text-center mb-4 text-4xl font-semibold">
          My Appointments
        </h1>
        <div className="border-t-4">
          {apptList.map((appts, index) => (
            <div
              key={index}
              className="min-h-50 border-b-4 border-t-0 flex-col my-2"
            >
              <div className="justify-around flex min-w-full my-2">
                <div className="cell-1 flex-1">
                  <p>
                    <span className="font-semibold">Date Received:</span>{" "}
                    {formatDate(appts.createdAt)}
                  </p>
                  <p>
                    <span className="font-semibold">Date Requested:</span>{" "}
                    {formatDate(appts.preferredDate)}
                  </p>
                  <p>
                    <span className="font-semibold">Time Requested:</span>{" "}
                    {convertClockTime(appts.time)}
                  </p>
                </div>
                <div className="cell-2 flex-1">
                  <p>
                    <span className="font-semibold">Reason:</span>{" "}
                    {appts.apptReason}{" "}
                  </p>
                  <p>
                    <span className="font-semibold">Provider:</span>{" "}
                    {appts.doctor.fname} {appts.doctor.lname}
                  </p>
                  <span className="text-runnerblue">
                    <Link to={`/appointment/${id}/${appts._id}`}>
                      View Receipt
                    </Link>
                  </span>
                </div>
                <div className="cell-3 flex-1">
                  <span className="font-semibold">
                    {RenderStatus(appts.status)}
                  </span>
                  {appts.status === "Approved" || appts.status === "Pending" ? (
                    <div>
                      <Button onClick={() => handleOpen(index)}>Cancel</Button>
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
              </div>
              <div className="cell-4 border-t-2 border-dotted py-2">
                <p className="overflow-scroll font-semibold">
                  Additional Comments:
                  <span className="text-gray-500 px-3 font-normal">
                    {appts.apptComments}
                  </span>
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
