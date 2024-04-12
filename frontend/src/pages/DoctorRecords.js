import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import './styles/push.css';

const Records = () => {
  const { doctor } = useAuthContext();
  const [user, setUser] = useState([]);
  const [title, setTitle] = useState('');
  const [pID, setPID] = useState();
  const [selection, setSelection] = useState([]);
  const [allPatients, setAllPatients] = useState([]);
  let ussop = localStorage.getItem('userID');

  const [file, setFile] = useState();
  const [image, setImage] = useState();

  const handleUpload = (e) => {
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('title', title);
    formdata.append('patientID', pID);
    formdata.append('doctorID', user[0]._id);
    console.log(Array.from(formdata));
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/dupload`, formdata)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const selectPatient = (id) => {
    const element = id;
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/records/${element}`)
      .then((res) => setSelection(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/doctors/${doctor.email}`
      );
      const data = await response.json();
      setUser(data);
      const allpatients = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/doctors/providers/${ussop}`
      );
      const patients = await allpatients.json();
      setAllPatients(patients);
    };
    document.title = 'Records | RunnerHealth';
    getUserInfo();

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/get_images`)
      .then((res) => setImage(res.data[0].image))
      .catch((err) => console.log(err));
  }, [doctor.email, ussop]);

  return (
    <div className="records page-contents container-fluid">
      <h2 className="welcome container-fluid text-2xl">
        Patient Health Information
      </h2>
      <br></br>
      <div className="form-can">
        <h3>File Uploads</h3>
        <input
          type="file"
          id="myImage"
          name="myImage"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input
          type="text"
          id="myTitle"
          name="myTitle"
          placeholder="Enter a Title"
          className="file-input-box"
          value={title}
          onInput={(e) => setTitle(e.target.value)}
          required
        />
        <select
          name="ugroup"
          id="ugroup"
          onChange={(e) => setPID(e.target.value)}
        >
          <option value="" disabled selected>
            Select a patient
          </option>
          {allPatients.length > 0 ? (
            allPatients.map((patients, index) => (
              <option key={patients._id} value={patients.patientID}>
                {patients.pName}
              </option>
            ))
          ) : (
            <option value="" disabled selected>
              Well, this is weird.
            </option>
          )}
        </select>
        <br></br>
        <button
          type="submit"
          className="btn btn-dark submit-btn"
          onClick={handleUpload}
        >
          Submit
        </button>
        <br></br>
        <img
          src={`${process.env.REACT_APP_SERVER_URL}/Images/` + image}
          alt=""
        />
      </div>
      <br></br>
      <div className="the-experiment">
        <div className="patient-list-header">Patient List</div>
        <div className="client-list">
          {allPatients.length > 0 ? (
            allPatients.map((patients, index) => (
              <button
                onClick={() => selectPatient(patients.patientID)}
                key={patients._id}
                className="patient-tag"
              >
                <div>
                  <div id={patients.patientID} className="patientIDs">
                    {index + 1}
                  </div>
                  <div className="">{patients.pName}</div>
                </div>
              </button>
            ))
          ) : (
            <h1> Well, Ummm... You don't Have any patients.</h1>
          )}
        </div>
        <br></br>
        <div className="doc-img-big-can">
          {allPatients && selection == [] ? (
            <div className="doctor-records-view"></div>
          ) : (
            selection.map(({ image, index, _id, title }) => (
              <div className="img-can" key={image.file}>
                <embed
                  src={`${process.env.REACT_APP_SERVER_URL}/Images/` + image}
                  alt=""
                  className="upload-prev rec-top-half"
                />
                <div className="rec-bottom-half">
                  <div className="file-title container">
                    {title}
                    <div className="doc-rec-btn-opt">
                      <a
                        href={
                          `${process.env.REACT_APP_SERVER_URL}/Images/` + image
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rec-view-opt"
                      >
                        <button className="btn btn-dark view-btn-opt">
                          view
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Records;
