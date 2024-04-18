import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles/push.css';
import first from './imgs/placeholder.png';

const Home = () => {
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
      localStorage.setItem('userID', data[0]._id);
      localStorage.setItem('orgID', data[0].org);
      const allpatients = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/doctors/providers/${ussop}`
      );
      const patients = await allpatients.json();
      setAllPatients(patients);
    };
    document.title = 'Home | RunnerHealth';
    getUserInfo();

    axios
    .get(`${process.env.REACT_APP_SERVER_URL}/get_images`)
    .then((res) => setImage(res.data[0].image))
    .catch((err) => console.log(err));
  }, [doctor.email, ussop]);

  return (
    <div className="home-page gap-8">
      <div className="header-container">
        <div className="top-bar bg-[goldenrod] w-full top-0 p-2" />
        <h2 className="header-content">
          <span className="header-image-span">
            <img src={first} alt="placeholder" className="header-image" />
          </span>
          Welcome, &nbsp;
          {user ? (
            user.map((user, index) => (
              <div key={index} className="header-text">
                <span>{user.fname}</span>&nbsp;
                <span>{user.lname}</span>!
              </div>
            ))
          ) : (
            <h1>Gathering Data...</h1>
          )}
        </h2>
      </div>
      
      <div className="dhome-records-container">
        <div className="records-horizon-con">

          {/*Patient List*/}
          <div className="records-page">
            <div className="records-page-header">
              <div className="top-bar"/>
              <h2 className="records-header-text">
                Patient List
              </h2>
            </div>
            <div className="the-experiment">
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
            </div>
          </div>

          {/*File Uploads*/}
          <div className="records-page">
            <div className="records-page-header">
              <div className="top-bar"/>
              <h2 className="records-header-text">
                Record Uploads
              </h2>
            </div>
            <div className="form-can">
                <input
                  type="file"
                  id="myImage"
                  name="myImage"
                  className="file-image-upload"
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
                <button
                  type="submit"
                  className="records-patient-button"
                  onClick={handleUpload}
                >
                  Submit
                </button>
                <img
                  src={`${process.env.REACT_APP_SERVER_URL}/Images/` + image}
                  alt=""
                />
              </div>
          </div>

        </div>

        {/*Patient Records*/}
        <div className="records-records-section">
          <div className="records-page-header">
            <div className="top-bar"/>
            <h2 className="records-header-text">
              Patient Records
            </h2>
          </div>
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
                            View
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
    </div>
  );
};

export default Home;
