import { useAuthContext } from '../hooks/useAuthContext';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './styles/push.css';

export default function Invoice() {
  const navigate = useNavigate();
  const { patient, admin, doctor } = useAuthContext();
  const [allPatients, setAllPatients] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [unpaid, setUnpaid] = useState([]);
  const [pending, setPending] = useState([]);
  const [confirmed, setConfirmed] = useState([]);
  let ussop = localStorage.getItem('userID');
  let orgID = localStorage.getItem('orgID');
  let todaysDate = getDate();

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}-${month}-${date}`;
  }

  function valueToString(id) {
    let invnum = id.toString().slice(-6).toUpperCase();
    return invnum;
  }

  function getProperDate(date) {
    let value = new Date(date);
    let newdate = value.toLocaleDateString();
    return newdate;
  }

  const markPaid = async (id) => {
    axios
      .patch(
        `${process.env.REACT_APP_SERVER_URL}/invoices/patient_invoices/${id}`
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const submitInvoice = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/invoice`, formdata, {
        'Content-Type': 'multipart/form-data',
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    navigate('/invoice');
  };

  const getPatientList = async () => {
    if (doctor) {
      const allpatients = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/doctors/providers/${ussop}`
      );
      const patients = await allpatients.json();
      setAllPatients(patients);
    }
    if (admin) {
      const allpatients = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/orgs/patients/${orgID}`
      );
      const patients = await allpatients.json();
      setAllPatients(patients);
      console.log(patients);
    }
  };

  const getDoctorList = async () => {
    if (admin) {
      const alldoctors = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/admins/colleagues/${ussop}`
      );
      const doctors = await alldoctors.json();
      setAllDoctors(doctors);
    }
  };

  const getInvoices = async () => {
    if (patient) {
      const info = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/patients/${patient.email}`
      );
      const user = await info.json();

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/invoices/patient_invoices/${user[0]._id}`
      );
      const data = await response.json();
      setInvoices(data);

      const unpaid = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/invoices/patient_invoices/unpaid/${user[0]._id}`
      );
      const list = await unpaid.json();
      setUnpaid(list);

      const pending = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/invoices/patient_invoices/pending/${user[0]._id}`
      );
      const plist = await pending.json();
      setPending(plist);

      const paid = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/invoices/patient_invoices/paid/${user[0]._id}`
      );
      const paidList = await paid.json();
      setConfirmed(paidList);
    }
    if (admin || doctor) {
      const unpaid = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/invoices/sent_invoices/unpaid/${ussop}`
      );
      const list = await unpaid.json();
      setUnpaid(list);

      const pending = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/invoices/sent_invoices/pending/${ussop}`
      );
      const plist = await pending.json();
      setPending(plist);

      const paid = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/invoices/sent_invoices/paid/${ussop}`
      );
      const paidList = await paid.json();
      setConfirmed(paidList);
    }
  };

  const getSender = async (sender) => {
    const doctor = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/invoices/patient_invoices/sender/${sender}`
    );
    const info = await doctor.json();
    const result = info[0];
    return result;
  };

  useEffect(() => {
    document.title = 'Invoice | RunnerHealth';

    getPatientList();
    getInvoices();

    if (admin) {
      getDoctorList();
      console.log(allDoctors);
    }
  }, [invoices]);

  return (
    <div className="home page-contents container-fluid">
      <div className="container">
        {admin || doctor ? (
          <div>
            <h1 className="invoice-section-header invoice-create-hdr">
              {' '}
              Create an Invoice{' '}
            </h1>
            <form
              className="message-form-can"
              onSubmit={(e) => submitInvoice(e)}
            >
              <input
                name="createdBy"
                value={ussop}
                placeholder="You are the author"
                type="hidden"
              />
              <input name="dateSent" value={todaysDate} type="hidden" />
              <label htmlFor="subject">Service provided:</label>
              <input name="subject" placeholder="Service Title" required />
              <label htmlFor="dateDue">Enter a due date:</label>
              <input type="date" id="dateDue" name="dateDue" required />
              <label htmlFor="origin">Doctor's office:</label>
              <select name="origin" id="origin" required>
                <option value="" disabled selected>
                  Select a doctor
                </option>
                {admin && allDoctors.length > 0 ? (
                  allDoctors.map((doctors, index) => (
                    <option key={doctors._id} value={doctors.doctorID}>
                      Dr. {doctors.dName}
                    </option>
                  ))
                ) : (
                  <option value={ussop} selected>
                    Bill to your office
                  </option>
                )}
              </select>
              <label htmlFor="origin">Choose a recipient:</label>
              <select name="recipient" id="recipient" required>
                <option value="" disabled selected>
                  Select a patient
                </option>
                {doctor && allPatients.length > 0
                  ? allPatients.map((patients, index) => (
                      <option key={patients._id} value={patients.patientID}>
                        {patients.pName}
                      </option>
                    ))
                  : allPatients.map((patients, index) => (
                      <option key={patients._id} value={patients._id}>
                        {patients.fname} {patients.lname}
                      </option>
                    ))}
              </select>
              <label htmlFor="origin">Service Description:</label>
              <textarea
                name="message"
                className="msg-txt-area"
                placeholder="Description of service provided"
                required
              />
              <label htmlFor="origin">Link to invoice:</label>
              <input
                name="link"
                placeholder="Include link to Stripe"
                required
              />
              <button type="submit" className="btn btn-dark msg-submit-btn">
                Send
              </button>
              <button className="btn btn-dark msg-clear-btn">Cancel</button>
            </form>
            <div className="hr-divider-can">
              <hr className="hr-divider-line-solo"></hr>
            </div>
            <div className="unpaid-invoices-can container-fluid">
              <h1 className="invoice-section-header"> Unpaid Invoices </h1>
              <div className="invoice-cards-can">
                {unpaid && unpaid.length > 0 ? (
                  unpaid
                    .filter((invoice, index) => index < 3)
                    .map((invoice) => (
                      <Card key={invoice._id} className="invoice-cards">
                        <Card.Header className="invoice-header-can">
                          <div>
                            INVOICE #&#x2022;&#x2022;&#x2022;&#x2022;
                            {valueToString(invoice._id)}
                          </div>
                          <button
                            className="btn btn-dark"
                            title="Mark as Paid"
                            onClick={() => markPaid(invoice._id)}
                          >
                            |||||
                          </button>
                        </Card.Header>
                        <Card.Body>
                          <div className="inv-meta-can">
                            <div className="sender-info">From: Dr.</div>
                            <div className="invoice-date-can">
                              <Card.Text className="invoice-date">
                                Date sent: {getProperDate(invoice.dateSent)}
                              </Card.Text>
                              <Card.Text className="invoice-date">
                                Date due: {getProperDate(invoice.dateDue)}
                              </Card.Text>
                            </div>
                          </div>
                          <Card.Title>{invoice.subject}</Card.Title>

                          <Card.Text>{invoice.message}</Card.Text>
                          <a
                            href={invoice.link}
                            className="cta-can"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Button
                              variant="primary"
                              className="btn btn-dark inv-link-btn"
                            >
                              Click to pay
                            </Button>
                          </a>
                        </Card.Body>
                      </Card>
                    ))
                ) : (
                  <div className="no-pics">
                    <h1>Well this is weird...</h1>
                  </div>
                )}
              </div>
              <div className="hr-divider-can">
                <hr className="hr-divider-line"></hr>
                <div>VIEW ALL</div>
                {'>>'}
              </div>
              <h1 className="invoice-section-header"> Pending Confirmation </h1>
              <div className="invoice-cards-can">
                {pending && pending.length > 0 ? (
                  pending
                    .filter((invoice, index) => index < 3)
                    .map((invoice) => (
                      <Card key={invoice._id} className="invoice-cards">
                        <Card.Header className="invoice-header-can">
                          <div>
                            INVOICE #&#x2022;&#x2022;&#x2022;&#x2022;
                            {valueToString(invoice._id)}
                          </div>
                          <button
                            className="btn btn-dark"
                            title="Mark as Paid"
                            onClick={() => markPaid(invoice._id)}
                          >
                            |||||
                          </button>
                        </Card.Header>
                        <Card.Body>
                          <div className="inv-meta-can">
                            <div className="sender-info">From: Dr.</div>
                            <div className="invoice-date-can">
                              <Card.Text className="invoice-date">
                                Date sent: {getProperDate(invoice.dateSent)}
                              </Card.Text>
                              <Card.Text className="invoice-date">
                                Date due: {getProperDate(invoice.dateDue)}
                              </Card.Text>
                            </div>
                          </div>
                          <Card.Title>{invoice.subject}</Card.Title>

                          <Card.Text>{invoice.message}</Card.Text>
                          <a
                            href={invoice.link}
                            className="cta-can"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Button
                              variant="primary"
                              className="btn btn-dark inv-link-btn"
                            >
                              Click to pay
                            </Button>
                          </a>
                        </Card.Body>
                      </Card>
                    ))
                ) : (
                  <div className="no-pics">
                    <h1>No Pending Invoices</h1>
                  </div>
                )}
              </div>
              <div className="hr-divider-can">
                <hr className="hr-divider-line"></hr>
                <div>VIEW ALL</div>
                {'>>'}
              </div>
              <h1 className="invoice-section-header"> Paid Invoices </h1>
              <div className="invoice-cards-can">
                {confirmed && confirmed.length > 0 ? (
                  confirmed
                    .filter((invoice, index) => index < 3)
                    .map((invoice) => (
                      <Card key={invoice._id} className="invoice-cards">
                        <Card.Header className="invoice-header-can">
                          <div>
                            INVOICE #&#x2022;&#x2022;&#x2022;&#x2022;
                            {valueToString(invoice._id)}
                          </div>
                          <button
                            className="btn btn-dark"
                            title="Mark as Paid"
                            onClick={() => markPaid(invoice._id)}
                          >
                            |||||
                          </button>
                        </Card.Header>
                        <Card.Body>
                          <div className="inv-meta-can">
                            <div className="sender-info">From: Dr.</div>
                            <div className="invoice-date-can">
                              <Card.Text className="invoice-date">
                                Date sent: {getProperDate(invoice.dateSent)}
                              </Card.Text>
                              <Card.Text className="invoice-date">
                                Date due: {getProperDate(invoice.dateDue)}
                              </Card.Text>
                            </div>
                          </div>
                          <Card.Title>{invoice.subject}</Card.Title>

                          <Card.Text>{invoice.message}</Card.Text>
                          <a
                            href={invoice.link}
                            className="cta-can"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Button
                              variant="primary"
                              className="btn btn-dark inv-link-btn"
                            >
                              Click to pay
                            </Button>
                          </a>
                        </Card.Body>
                      </Card>
                    ))
                ) : (
                  <div className="no-pics">
                    <h1>No Paid Invoices</h1>
                  </div>
                )}
              </div>
              <div className="hr-divider-can">
                <hr className="hr-divider-line"></hr>
                <div>VIEW ALL</div>
                {'>>'}
              </div>
            </div>
          </div>
        ) : (
          <div className="unpaid-invoices-can container-fluid">
            <h1 className="invoice-section-header"> Unpaid Invoices </h1>
            <div className="invoice-cards-can">
              {unpaid && unpaid.length > 0 ? (
                unpaid
                  .filter((invoice, index) => index < 3)
                  .map((invoice) => (
                    <Card key={invoice._id} className="invoice-cards">
                      <Card.Header className="invoice-header-can">
                        <div>
                          INVOICE #&#x2022;&#x2022;&#x2022;&#x2022;
                          {valueToString(invoice._id)}
                        </div>
                        <button
                          className="btn btn-dark"
                          title="Mark as Paid"
                          onClick={() => markPaid(invoice._id)}
                        >
                          |||||
                        </button>
                      </Card.Header>
                      <Card.Body>
                        <div className="inv-meta-can">
                          <div className="sender-info">From: Dr.</div>
                          <div className="invoice-date-can">
                            <Card.Text className="invoice-date">
                              Date sent: {getProperDate(invoice.dateSent)}
                            </Card.Text>
                            <Card.Text className="invoice-date">
                              Date due: {getProperDate(invoice.dateDue)}
                            </Card.Text>
                          </div>
                        </div>
                        <Card.Title>{invoice.subject}</Card.Title>

                        <Card.Text>{invoice.message}</Card.Text>
                        <a
                          href={invoice.link}
                          className="cta-can"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button
                            variant="primary"
                            className="btn btn-dark inv-link-btn"
                          >
                            Click to pay
                          </Button>
                        </a>
                      </Card.Body>
                    </Card>
                  ))
              ) : (
                <div className="no-pics">
                  <h1>Well this is weird...</h1>
                </div>
              )}
            </div>
            <div className="hr-divider-can">
              <hr className="hr-divider-line"></hr>
              <div>VIEW ALL</div>
              {'>>'}
            </div>
            <h1 className="invoice-section-header"> Pending Confirmation </h1>
            <div className="invoice-cards-can">
              {pending && pending.length > 0 ? (
                pending
                  .filter((invoice, index) => index < 3)
                  .map((invoice) => (
                    <Card key={invoice._id} className="invoice-cards">
                      <Card.Header className="invoice-header-can">
                        <div>
                          INVOICE #&#x2022;&#x2022;&#x2022;&#x2022;
                          {valueToString(invoice._id)}
                        </div>
                        <button
                          className="btn btn-dark"
                          title="Mark as Paid"
                          onClick={() => markPaid(invoice._id)}
                        >
                          |||||
                        </button>
                      </Card.Header>
                      <Card.Body>
                        <div className="inv-meta-can">
                          <div className="sender-info">From: Dr.</div>
                          <div className="invoice-date-can">
                            <Card.Text className="invoice-date">
                              Date sent: {getProperDate(invoice.dateSent)}
                            </Card.Text>
                            <Card.Text className="invoice-date">
                              Date due: {getProperDate(invoice.dateDue)}
                            </Card.Text>
                          </div>
                        </div>
                        <Card.Title>{invoice.subject}</Card.Title>

                        <Card.Text>{invoice.message}</Card.Text>
                        <a
                          href={invoice.link}
                          className="cta-can"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button
                            variant="primary"
                            className="btn btn-dark inv-link-btn"
                          >
                            Click to pay
                          </Button>
                        </a>
                      </Card.Body>
                    </Card>
                  ))
              ) : (
                <div className="no-pics">
                  <h1>No Pending Invoices</h1>
                </div>
              )}
            </div>
            <div className="hr-divider-can">
              <hr className="hr-divider-line"></hr>
              <div>VIEW ALL</div>
              {'>>'}
            </div>
            <h1 className="invoice-section-header"> Paid Invoices </h1>
            <div className="invoice-cards-can">
              {confirmed && confirmed.length > 0 ? (
                confirmed
                  .filter((invoice, index) => index < 3)
                  .map((invoice) => (
                    <Card key={invoice._id} className="invoice-cards">
                      <Card.Header className="invoice-header-can">
                        <div>
                          INVOICE #&#x2022;&#x2022;&#x2022;&#x2022;
                          {valueToString(invoice._id)}
                        </div>
                        <button
                          className="btn btn-dark"
                          title="Mark as Paid"
                          onClick={() => markPaid(invoice._id)}
                        >
                          |||||
                        </button>
                      </Card.Header>
                      <Card.Body>
                        <div className="inv-meta-can">
                          <div className="sender-info">From: Dr.</div>
                          <div className="invoice-date-can">
                            <Card.Text className="invoice-date">
                              Date sent: {getProperDate(invoice.dateSent)}
                            </Card.Text>
                            <Card.Text className="invoice-date">
                              Date due: {getProperDate(invoice.dateDue)}
                            </Card.Text>
                          </div>
                        </div>
                        <Card.Title>{invoice.subject}</Card.Title>

                        <Card.Text>{invoice.message}</Card.Text>
                        <a
                          href={invoice.link}
                          className="cta-can"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button
                            variant="primary"
                            className="btn btn-dark inv-link-btn"
                          >
                            Click to pay
                          </Button>
                        </a>
                      </Card.Body>
                    </Card>
                  ))
              ) : (
                <div className="no-pics">
                  <h1>No Paid Invoices</h1>
                </div>
              )}
            </div>
            <div className="hr-divider-can">
              <hr className="hr-divider-line"></hr>
              <div>VIEW ALL</div>
              {'>>'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
