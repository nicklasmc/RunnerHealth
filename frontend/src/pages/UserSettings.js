import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import '../pages/styles/settingsPage.css';

const UserSettings = () => {
  const { patient } = useAuthContext();
  const { doctor } = useAuthContext();
  const { admin } = useAuthContext();
  const [user, setUser] = useState([]);
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [pharmacy, setPharmacy] = useState();
  const [dob, setDob] = useState();

  const addressData = {
    123: '123 Main St',
    223: '5006 Python Rd',
    323: '9775 Torvalds Ave',
    423: '7273 Linux Rd',
    523: '5543 Intel St',
    623: '9827 Runner Rd',
  };

  const phoneData = {
    123: '(661) 982-3214',
    223: '(653) 321-7652',
    323: '(877) 922-6544',
    423: '(551) 223-2254',
    523: '(667) 543-1385',
    623: '(538) 642-6464',
  };

  const dobData = {
    123: '10/21/2008',
    223: '09/03/2006',
    323: '02/18/2014',
    423: '08/01/2001',
    523: '08/14/2021',
    623: '10/23/2002',
  };

  useEffect(() => {
    const getUserInfo = async () => {
      let response = null;
      if (patient) {
        response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/patients/${patient.email}`
        );
      } else if (doctor) {
        response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/doctors/${doctor.email}`
        );
      } else if (admin) {
        response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/admins/${admin.email}`
        );
      }

      const data = await response.json();
      setUser(data[0]);
    };
    getUserInfo();
  }, [patient, doctor, admin]);

  useEffect(() => {
    console.log(user);

    let values = Object.values(addressData);
    const randomAddress = values[parseInt(Math.random() * values.length)];
    const randomPharmacy = values[parseInt(Math.random() * values.length)];
    values = Object.values(phoneData);
    const randomPhone = values[parseInt(Math.random() * values.length)];
    values = Object.values(dobData);
    const randomDob = values[parseInt(Math.random() * values.length)];
    setAddress(randomAddress);
    setPhone(randomPhone);
    setPharmacy(randomPharmacy);
    setDob(randomDob);
  }, [user]);

  return (
    <div className="settings-page-can">
      <div className="settings-main-container">
        {user && (
          <>
            {/* top-row content */}
            <div className=" settings-top-row flex flex-col">
              <div className="top-bar" />
              <h1 className="settings-top-header">Personal Information</h1>
              <p className="text-red-500 text-sm leading-3 mr-0 mb-4 ml-4">
                Contact your provider's office to update your information
              </p>
            </div>
            <div className="settings-content">
              {/* first row content - contact details */}
              <h1 className="settings-header">Identification</h1>
              <div className="settings-1">
                <div className="flex-col min-w-33%">
                  <div className="flex">
                    <label
                      htmlFor="fname"
                      className="flex-shrink-0 my-auto text-md"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="patient-first-name"
                      name="fname"
                      value={user.fname}
                      disabled
                      className="disabled-input my-auto mx-3"
                    />
                  </div>
                  <div className="flex mt-4">
                    <label
                      htmlFor="fname"
                      className="flex-shrink-0 my-auto text-md"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="patient-last-name"
                      name="lname"
                      value={user.lname}
                      disabled
                      className="disabled-input my-auto mx-3"
                    />
                  </div>
                </div>

                <div className="flex-col min-w-33%">
                  <div className="settings-1-section-2">
                    <div className="settings-dob">
                      <label
                        htmlFor="fname"
                        className="items-center justify-center text-md min-w-50"
                      >
                        DoB
                      </label>
                      <input
                        type="text"
                        id="patient-last-name"
                        name="lname"
                        value={dob}
                        disabled
                        className="settings-dob-input disabled-input"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Row - Contact Information */}
              <h1 className="settings-header">Contact Information</h1>
              <div className="settings-2">
                <div className="flex-col min-w-33%">
                  <div className="flex">
                    <label
                      htmlFor="phone"
                      className="flex-shrink-0 my-auto text-md min-w-50"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      id="patient-phone"
                      name="phone"
                      value={phone}
                      disabled
                      className="disabled-input my-auto mx-3"
                    />
                  </div>
                  <div className="flex mt-4">
                    <label
                      htmlFor="email"
                      className="flex-shrink-0 my-auto text-md min-w-50"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      id="patient-email"
                      name="email"
                      value={user.email}
                      disabled
                      className="disabled-input my-auto mx-3"
                    />
                  </div>
                </div>

                <div className="flex-col min-w-33%">
                  <div className="flex min-h-50%">
                    <div className="flex-shrink-0 my-auto">
                      <label
                        htmlFor="workPhone"
                        className=" text-md max-w-50 min-w-50"
                      >
                        Work Phone
                      </label>
                    </div>
                    <input
                      type="text"
                      id="patient-workphone"
                      name="workPhone"
                      value={phone}
                      disabled
                      className="disabled-input mx-3"
                    />
                  </div>
                  <div className="flex min-h-50%">
                    <div className="flex-shrink-0 my-auto">
                      <label
                        htmlFor="address"
                        className=" text-md max-w-50 min-w-50"
                      >
                        Address
                      </label>
                    </div>
                    <input
                      type="text"
                      id="patient-address"
                      name="address"
                      value={address}
                      disabled
                      className="disabled-input mx-3"
                    />
                  </div>
                </div>
              </div>

              {/* Third Row - Additional Information */}
              <h1 className="settings-header">Additional Information</h1>
              <div className="settings-3">
                <div className="flex-col min-w-33%">
                  <div className="flex">
                    <label
                      htmlFor="phone"
                      className="flex-shrink-0 my-auto text-md min-w-50"
                    >
                      Preferred Pharmacy
                    </label>
                    <input
                      type="text"
                      id="patient-phone"
                      name="phone"
                      value={pharmacy}
                      disabled
                      className="disabled-input my-auto mx-3"
                    />
                  </div>
                </div>
                <button className="update-settings-button">Update</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserSettings;
