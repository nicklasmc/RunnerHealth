import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import "../pages/styles/settingsPage.css";
import Select from "react-select";
// PI :
// - Name (restricted)
// - Pronouns
// - Sex
// - DoB (restricted)
// - marital status
// - Address info (subcontainer)
// - - Address
// - - City
// - - ZIP
// - - State

// CI :
// - Phone
// - Phone 2
// - Work phone
// - email

// other:
// - preferred facility
// - pcp

const UserSettings = () => {
  const { patient } = useAuthContext();
  const { doctor } = useAuthContext();
  const { admin } = useAuthContext();
  const [user, setUser] = useState([]);

  const sexOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Intersex", label: "Intersex" },
    { value: "Other", label: "Other" },
  ];
  
  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Intersex", label: "Intersex" },
    { value: "Other", label: "Other" },
  ];

  useEffect(() => {
    const getUserInfo = async () => {
      let response = null;
      if (patient) {
        response = await fetch(
          `http://localhost:4000/patients/${patient.email}`
        );
      } else if (doctor) {
        response = await fetch(`http://localhost:4000/doctors/${doctor.email}`);
      } else if (admin) {
        response = await fetch(`http://localhost:4000/admins/${admin.email}`);
      }

      const data = await response.json();
      setUser(data[0]);
    };
    getUserInfo();
  }, [patient, doctor, admin]);

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="settings-main-container">
      {user && (
        <>
          <div className="max-h-fit">
            {/* top-row content */}
            <div className="top-row flex border-b-4 border-black">
              <h1 className="text-4xl text-runnerblue">Personal Information</h1>

            </div>
            {/* first row content - contact details */}
            <h1 className="py-4 mt-3 text-2xl font-semibold">Identification</h1>
            <div className="flex px-4">
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
                    value="hi"
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
                    value="hi"
                    disabled
                    className="disabled-input my-auto mx-3"
                  />
                </div>
              </div>

              <div className="flex-col min-w-33%">
                <div className="flex min-h-50%">
                  <div className="flex-shrink-0 my-auto">
                    <label
                      htmlFor="fname"
                      className="flex-shrink-0 text-md min-w-50"
                    >
                      DoB
                    </label>
                  </div>
                  <input
                    type="text"
                    id="patient-last-name"
                    name="lname"
                    value="hi"
                    disabled
                    className="disabled-input mx-3"
                  />
                  <p className = "text-sm text-red-500">Contact your provider's office to update your DoB</p>
                </div>
                
                <div className="flex-shrink-0 mt-3">
                  <label
                    htmlFor="sex"
                    className="flex-shrink-0 my-auto text-md min-w-50"
                  >
                    Sex
                  </label>

                  <select name="sex" id="sex-select" className="my-auto mx-3">
                    <option value="">--Sex--</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="intersex">Intersex</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Second Row - Contact Information */}
            <h1 className="py-4 mt-3 text-2xl font-semibold">Contact Information</h1>
            <div className="flex px-4">
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
                    value="hi"
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
                    value="hi"
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
                    value="hi"
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
                    value="hi"
                    disabled
                    className="disabled-input mx-3"
                  />
                </div>
                
              </div>
            </div>

             {/* Third Row - Additional Information */}
             <h1 className="py-4 mt-3 text-2xl font-semibold">Additional Information</h1>
            <div className="flex px-4">
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
                    value="hi"
                    disabled
                    className="disabled-input my-auto mx-3"
                  />
                </div>

              </div>
              <button className="min-w-150 text-2xl underline underline-offset-3 ml-40">
                Update
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserSettings;
