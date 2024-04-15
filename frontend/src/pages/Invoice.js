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

  const markConfirmed = async (id) => {
    axios
      .patch(
        `${process.env.REACT_APP_SERVER_URL}/invoices/patient_invoices/confirm/${id}`
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

  useEffect(() => {
    document.title = 'Invoice | RunnerHealth';

    getPatientList();
    getInvoices();

    if (admin) {
      getDoctorList();
      console.log(allDoctors);
    }
  }, [invoices, pending]);

  return (
    <div className="home-page">
      <div className="invoice-can">
        {admin || doctor ? (
          <>
            {/*Create an Invoice*/}
            <div className="invoice-page-section">
              <div className="invoice-page-header">
                <div className="top-bar bg-[goldenrod] w-full top-0 p-2" />
                <h2 className="records-header-text">Create an Invoice</h2>
              </div>
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

                <label htmlFor="subject" className="create-invoice-label">
                  Service provided:
                </label>
                <input
                  name="subject"
                  placeholder="Service Title"
                  className="create-invoice-input"
                  required
                />

                <label htmlFor="dateDue" className="create-invoice-label">
                  Enter a due date:
                </label>
                <input
                  type="date"
                  id="dateDue"
                  name="dateDue"
                  className="create-invoice-input"
                  required
                />

                <label htmlFor="origin" className="create-invoice-label">
                  Doctor's office:
                </label>
                <select
                  name="origin"
                  id="origin"
                  className="create-invoice-input"
                  required
                >
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

                <label htmlFor="origin" className="create-invoice-label">
                  Choose a recipient:
                </label>
                <select
                  name="recipient"
                  id="recipient"
                  className="create-invoice-input"
                  required
                >
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

                <label htmlFor="origin" className="create-invoice-label">
                  Service Description:
                </label>
                <textarea
                  name="message"
                  className="msg-txt-area"
                  placeholder="Description of service provided"
                  required
                />

                <label htmlFor="origin" className="create-invoice-label">
                  Link to invoice:
                </label>
                <input
                  name="link"
                  placeholder="Include link to Stripe"
                  className="create-invoice-input"
                  required
                />
                <div className="create-invoice-buttons">
                  <button type="submit" className="msg-submit-btn">
                    Send
                  </button>
                  <button className="msg-clear-btn">Cancel</button>
                </div>
              </form>
            </div>

            <div className="all-invoices">
              {/*Unpaid Invoices*/}
              <div className="invoice-page-section">
                <div className="invoice-page-header">
                  <div className="top-bar bg-[goldenrod] w-full top-0 p-2" />
                  <h2 className="records-header-text">Unpaid Invoices</h2>
                </div>
                <div className="invoice-cards-can">
                  {unpaid && unpaid.length > 0 ? (
                    unpaid
                      .filter((invoice, index) => index < 3)
                      .map((invoice) => (
                        <Card key={invoice._id} className="invoice-cards">
                          <Card.Header className="invoice-header-can">
                            <div className="each-card-header-can">
                              <h2 className="each-card-header">
                                INVOICE #&#x2022;&#x2022;&#x2022;&#x2022;
                                {valueToString(invoice._id)}
                              </h2>
                              <h2 className="each-card-header">
                                Date sent: {getProperDate(invoice.dateSent)}
                              </h2>
                            </div>
                          </Card.Header>
                          <Card.Body>
                            <div className="inv-meta-can">
                              <div className="invoice-date-can">
                                <Card.Title className="invoice-date">
                                  From: Dr.{' '}
                                  {invoice.senders[0].fname +
                                    ' ' +
                                    invoice.senders[0].lname}
                                </Card.Title>
                                <Card.Title className="invoice-date">
                                  Date due: {getProperDate(invoice.dateDue)}
                                </Card.Title>
                              </div>
                            </div>
                            <div className="invoice-page-can">
                              <Card.Title className="invoice-page-title">
                                Subject: {invoice.subject}
                              </Card.Title>
                            </div>
                            <div className="invoice-page-can">
                              <Card.Title className="invoice-page-message">
                                Message: {invoice.message}
                              </Card.Title>
                            </div>

                            <a
                              href={invoice.link}
                              className="cta-can"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Button className="inv-link-btn">
                                Payment Link
                              </Button>
                            </a>
                          </Card.Body>
                        </Card>
                      ))
                  ) : (
                    <div className="no-pics">
                      <h1>All Invoices Are Paid! Rejoice!</h1>
                    </div>
                  )}
                </div>
              </div>

              {/*Pending Confirmation*/}
              <div className="invoice-page-section">
                <div className="invoice-page-header">
                  <div className="top-bar bg-[goldenrod] w-full top-0 p-2" />
                  <h2 className="records-header-text">Pending Confirmation</h2>
                </div>
                <div className="invoice-cards-can">
                  {pending && pending.length > 0 ? (
                    pending
                      .filter((invoice, index) => index < 3)
                      .map((invoice) => (
                        <Card key={invoice._id} className="invoice-cards">
                          <Card.Header className="invoice-header-can">
                            <div className="each-card-header-can">
                              <h2 className="each-card-header">
                                INVOICE #&#x2022;&#x2022;&#x2022;&#x2022;
                                {valueToString(invoice._id)}
                              </h2>
                              <h2 className="each-card-header">
                                Date sent: {getProperDate(invoice.dateSent)}
                              </h2>
                            </div>
                          </Card.Header>
                          <Card.Body>
                            <div className="inv-meta-can">
                              <div className="invoice-date-can">
                                <Card.Title className="invoice-date">
                                  From: Dr.{' '}
                                  {invoice.senders[0].fname +
                                    ' ' +
                                    invoice.senders[0].lname}
                                </Card.Title>
                                <Card.Title className="invoice-date">
                                  Date due: {getProperDate(invoice.dateDue)}
                                </Card.Title>
                              </div>
                            </div>
                            <div className="invoice-page-can">
                              <Card.Title className="invoice-page-title">
                                Subject: {invoice.subject}
                              </Card.Title>
                            </div>
                            <div className="invoice-page-can">
                              <Card.Title className="invoice-page-message">
                                Message: {invoice.message}
                              </Card.Title>
                            </div>

                            <div className="cta-can">
                              <Button
                                className="inv-link-btn"
                                onClick={() => markConfirmed(invoice._id)}
                              >
                                Click to Confirm
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      ))
                  ) : (
                    <div className="no-pics">
                      <h1>No Invoices Pending Confirmation</h1>
                    </div>
                  )}
                </div>
              </div>

              {/*Paid Invoices*/}
              <div className="invoice-page-section">
                <div className="invoice-page-header">
                  <div className="top-bar bg-[goldenrod] w-full top-0 p-2" />
                  <h2 className="records-header-text">Paid Invoices</h2>
                </div>
                <div className="invoice-cards-can">
                  {confirmed && confirmed.length > 0 ? (
                    confirmed
                      .filter((invoice, index) => index < 3)
                      .map((invoice) => (
                        <Card key={invoice._id} className="invoice-cards">
                          <Card.Header className="invoice-header-can">
                            <div className="each-card-header-can">
                              <h2 className="each-card-header">
                                INVOICE #&#x2022;&#x2022;&#x2022;&#x2022;
                                {valueToString(invoice._id)}
                              </h2>
                              <h2 className="each-card-header">
                                Date sent: {getProperDate(invoice.dateSent)}
                              </h2>
                            </div>
                          </Card.Header>
                          <Card.Body>
                            <div className="inv-meta-can">
                              <div className="invoice-date-can">
                                <Card.Title className="invoice-date">
                                  From: Dr.{' '}
                                  {invoice.senders[0].fname +
                                    ' ' +
                                    invoice.senders[0].lname}
                                </Card.Title>
                                <Card.Title className="invoice-date">
                                  Date due: {getProperDate(invoice.dateDue)}
                                </Card.Title>
                              </div>
                            </div>
                            <div className="invoice-page-can">
                              <Card.Title className="invoice-page-title">
                                Subject: {invoice.subject}
                              </Card.Title>
                            </div>
                            <div className="invoice-page-can">
                              <Card.Title className="invoice-page-message">
                                Message: {invoice.message}
                              </Card.Title>
                            </div>

                            <div className="cta-can">
                              <Button className="inv-link-btn">Paid</Button>
                            </div>
                          </Card.Body>
                        </Card>
                      ))
                  ) : (
                    <div className="no-pics">
                      <h1>No Paid Invoices</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/*Unpaid Invoices*/}
            <div className="invoice-page-section">
              <div className="invoice-page-header">
                <div className="top-bar bg-[goldenrod] w-full top-0 p-2" />
                <h2 className="records-header-text">Unpaid Invoices</h2>
              </div>
              <div className="invoice-cards-can">
                {unpaid && unpaid.length > 0 ? (
                  unpaid
                    .filter((invoice, index) => index < 3)
                    .map((invoice) => (
                      <Card key={invoice._id} className="invoice-cards">
                        <Card.Header className="invoice-header-can">
                          <div className="each-card-header-can">
                            <h2 className="each-card-header">
                              INVOICE #&#x2022;&#x2022;&#x2022;&#x2022;
                              {valueToString(invoice._id)}
                            </h2>
                            <h2 className="each-card-header">
                              Date sent: {getProperDate(invoice.dateSent)}
                            </h2>
                          </div>
                          <button
                            className="btn mark-paid-btn"
                            title="Mark as Paid"
                            onClick={() => markPaid(invoice._id)}
                          >
                            |||||
                          </button>
                        </Card.Header>
                        <Card.Body>
                          <div className="inv-meta-can">
                            <div className="invoice-date-can">
                              <Card.Title className="invoice-date">
                                From: Dr.{' '}
                                {invoice.senders[0].fname +
                                  ' ' +
                                  invoice.senders[0].lname}
                              </Card.Title>
                              <Card.Title className="invoice-date">
                                Date due: {getProperDate(invoice.dateDue)}
                              </Card.Title>
                            </div>
                          </div>
                          <div className="invoice-page-can">
                            <Card.Title className="invoice-page-title">
                              Subject: {invoice.subject}
                            </Card.Title>
                          </div>
                          <div className="invoice-page-can">
                            <Card.Title className="invoice-page-message">
                              Message: {invoice.message}
                            </Card.Title>
                          </div>

                          <a
                            href={invoice.link}
                            className="cta-can"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Button className="inv-link-btn">
                              Click to pay
                            </Button>
                          </a>
                        </Card.Body>
                      </Card>
                    ))
                ) : (
                  <div className="no-pics">
                    <h1>All Invoices Are Paid! Rejoice!</h1>
                  </div>
                )}
              </div>
            </div>

            {/*Pending Confirmation*/}
            <div className="invoice-page-section">
              <div className="invoice-page-header">
                <div className="top-bar bg-[goldenrod] w-full top-0 p-2" />
                <h2 className="records-header-text">Pending Confirmation</h2>
              </div>
              <div className="invoice-cards-can">
                {pending && pending.length > 0 ? (
                  pending
                    .filter((invoice, index) => index < 3)
                    .map((invoice) => (
                      <Card key={invoice._id} className="invoice-cards">
                        <Card.Header className="invoice-header-can">
                          <div className="each-card-header-can">
                            <h2 className="each-card-header">
                              INVOICE #&#x2022;&#x2022;&#x2022;&#x2022;
                              {valueToString(invoice._id)}
                            </h2>
                            <h2 className="each-card-header">
                              Date sent: {getProperDate(invoice.dateSent)}
                            </h2>
                          </div>
                          <button
                            className="btn mark-paid-btn"
                            title="Mark as Paid"
                            onClick={() => markPaid(invoice._id)}
                          >
                            |||||
                          </button>
                        </Card.Header>
                        <Card.Body>
                          <div className="inv-meta-can">
                            <div className="invoice-date-can">
                              <Card.Title className="invoice-date">
                                From: Dr.{' '}
                                {invoice.senders[0].fname +
                                  ' ' +
                                  invoice.senders[0].lname}
                              </Card.Title>
                              <Card.Title className="invoice-date">
                                Date due: {getProperDate(invoice.dateDue)}
                              </Card.Title>
                            </div>
                          </div>
                          <div className="invoice-page-can">
                            <Card.Title className="invoice-page-title">
                              Subject: {invoice.subject}
                            </Card.Title>
                          </div>
                          <div className="invoice-page-can">
                            <Card.Title className="invoice-page-message">
                              Message: {invoice.message}
                            </Card.Title>
                          </div>

                          <a
                            href={invoice.link}
                            className="cta-can"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Button className="inv-link-btn">
                              Click to pay
                            </Button>
                          </a>
                        </Card.Body>
                      </Card>
                    ))
                ) : (
                  <div className="no-pics">
                    <h1>No Invoices Pending Confirmation</h1>
                  </div>
                )}
              </div>
            </div>

            {/*Paid Invoices*/}
            <div className="invoice-page-section">
              <div className="invoice-page-header">
                <div className="top-bar bg-[goldenrod] w-full top-0 p-2" />
                <h2 className="records-header-text">Paid Invoices</h2>
              </div>
              <div className="invoice-cards-can">
                {confirmed && confirmed.length > 0 ? (
                  confirmed
                    .filter((invoice, index) => index < 3)
                    .map((invoice) => (
                      <Card key={invoice._id} className="invoice-cards">
                        <Card.Header className="invoice-header-can">
                          <div className="each-card-header-can">
                            <h2 className="each-card-header">
                              INVOICE #&#x2022;&#x2022;&#x2022;&#x2022;
                              {valueToString(invoice._id)}
                            </h2>
                            <h2 className="each-card-header">
                              Date sent: {getProperDate(invoice.dateSent)}
                            </h2>
                          </div>
                          <button
                            className="btn mark-paid-btn"
                            title="Mark as Paid"
                            onClick={() => markPaid(invoice._id)}
                          >
                            |||||
                          </button>
                        </Card.Header>
                        <Card.Body>
                          <div className="inv-meta-can">
                            <div className="invoice-date-can">
                              <Card.Title className="invoice-date">
                                From: Dr.{' '}
                                {invoice.senders[0].fname +
                                  ' ' +
                                  invoice.senders[0].lname}
                              </Card.Title>
                              <Card.Title className="invoice-date">
                                Date due: {getProperDate(invoice.dateDue)}
                              </Card.Title>
                            </div>
                          </div>
                          <div className="invoice-page-can">
                            <Card.Title className="invoice-page-title">
                              Subject: {invoice.subject}
                            </Card.Title>
                          </div>
                          <div className="invoice-page-can">
                            <Card.Title className="invoice-page-message">
                              Message: {invoice.message}
                            </Card.Title>
                          </div>

                          <a
                            href={invoice.link}
                            className="cta-can"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Button className="inv-link-btn">
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
            </div>
          </>
        )}
      </div>
    </div>
  );
}
