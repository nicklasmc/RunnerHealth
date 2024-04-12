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
    <div className="records page-contents container-fluid">
      <h2 className="phi-header container-fluid text-2xl">
        Personal Health Information
      </h2>

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
      <br></br>
      <div className="form-can">
        <h3 className="upload-header">Upload Files</h3>
        <input
          type="file"
          id="myImage"
          name="myImage"
          className="file-input-box"
          onChange={(e) => setFile(e.target.files[0])}
          required
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
        <br></br>
        <button
          type="submit"
          className="btn btn-dark submit-btn"
          onClick={handleUpload}
        >
          Submit
        </button>
        <br></br>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default Records;
