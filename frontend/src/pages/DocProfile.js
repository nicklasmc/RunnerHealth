import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../pages/styles/docProfile.css';

const DocProfile = () => {
  // --- Retrieving from Database --- //
  const { id } = useParams(); // Gather id from URL
  const [doctors, setDoctors] = useState([]);

  // Reference for the following, in case this is useful elsewhere: 
  // https://stackoverflow.com/questions/53775936/import-image-dynamically-in-react-component
  const [imgName, setImgName] = useState(null); 
  const [docImage, setDocImage] = useState();


  const getDoctorsList = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/doctors/${id}`);
      setDoctors(res.data);

      const emailName = String(res.data.email);
      if (typeof emailName == 'string') {
        const extractedImgName = emailName.split('@')[0];
        setImgName(extractedImgName); // images will be rendered based on the first part of the email
        console.log(extractedImgName);
      } else {
        // console.log("Error fetching image");
        setImgName("placeholder");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorsList();
  }, []);

  useEffect(() => {
    const getImage = async () => {
      try {
        const img = await import (`./imgs/${imgName}.png`); // dynamically import 
        setDocImage(img.default); 
      } catch (error) {
        const img = await import (`./imgs/placeholder.png`); // dynamically import 
        setDocImage(img.default); 
      }
    };
    
    getImage();
  }, [imgName]); // load if imgName has been updated 


  if (!doctors) {
    return <div className="loading">Loading...</div>;
  }


  return (
    <div className="doc-profile page-contents">
      <div className="profile-container">
        <div className="doc-head">
          <h1 className="name">
            {doctors.fname} {doctors.lname}, {doctors.title}
          </h1>
           <img src={docImage} className="doc-img" alt={`${doctors.fname} ${doctors.lname}`} />  
        </div>
        <div className="doc-info">
          <h2 className="doc-headers">Gender:</h2>
          <p className="doc-text"> {doctors.gender}</p>
          <h2 className="doc-headers">Specialty:</h2>
          <p className="doc-text"> {doctors.specialization}</p>
          <h2 className="doc-headers">Education: </h2>
          <p className="doc-text"> {doctors.education}</p>
        </div>
        <div className="doc-contact">
          <h2 className="doc-headers">Email Contact: </h2>
          <p className="doc-text"> {doctors.email} </p>
        </div>
      </div>
    </div>
  );
};

export default DocProfile;
