import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import './styles/push.css';

const Records = () => {
  const { patient } = useAuthContext();
  const [file, setFile] = useState();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState();
  const [error, setError] = useState();
  let ussop = localStorage.getItem('userID');

  const handleUpload = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('title', title);
    formdata.append('patientID', ussop);
    if (title === '' || title === undefined) {
      setError('Enter a title');
      return;
    }
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/upload`, formdata)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setError('');
    setTitle('');
  };

  const handleClick = async (id) => {
    if (!image) {
      console.log('nothing to see here...');
      return;
    }
    fetch(`${process.env.REACT_APP_SERVER_URL}/records/` + id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${patient.token}`,
      },
    });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/records/${ussop}`)
      .then((res) => setImage(res.data))
      .catch((err) => console.log(err));

    return () => {
      document.title = 'Records | RunnerHealth';
      console.log('All done');
    };
  }, [image]);

  return (
    <div className="home-page">
      <div className="records-patient-page">
        <div className="records-page-header">
          <div className="top-bar"/>
          <h2 className="records-header-text">
            Upload Records
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

      <div className="records-patient-section">
        <div className="records-page-header">
          <div className="top-bar"/>
          <h2 className="records-header-text">
            Patient Records
          </h2>
        </div>
        <div className="img-big-can">
          {image && image.length > 0 ? (
            image.map(({ image, index, _id, title }) => (
              <div className="img-can" key={image.file}>
                <embed
                  src={`${process.env.REACT_APP_SERVER_URL}/Images/` + image}
                  alt=""
                  className="upload-prev rec-top-half"
                />
                <div className="rec-bottom-half">
                  <div className="file-title container">
                    {title}
                    <div className="rec-btn-opt">
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
                      <button onClick={() => handleClick(_id)}>
                        <FaTrashAlt className="trash-icon" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-pics">
              <h1>Upload Records</h1>
            </div>
          )}
        </div>
      </div>
        {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Records;
