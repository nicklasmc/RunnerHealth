import React from 'react';
import first from './imgs/doctors-patient.jpg';
import second from './imgs/data_storage.jpg';
import third from './imgs/wait-room.jpg';
import fourth from './imgs/ehrs.jpg';
import fifth from './imgs/mission.jpg';
import sixth from './imgs/chido.jpg';
import seven from './imgs/nc.jpg';
import eight from './imgs/nr.jpg';
import nine from './imgs/dr.jpg';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Landing() {
  return (
    <div className="page-contents landing-page">
      <Carousel className="landing-showcase">
        <Carousel.Item>
          <img src={first} className="showcase-img" alt="..." />
          <Carousel.Caption>
            <h3 className="carousel-header">Better Healthcare</h3>
            <p>Runner Health helps to improve the quality of healthcare.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={second} className="showcase-img" alt="..." />
          <Carousel.Caption>
            <h3 className="carousel-header">Electronic Health Records</h3>
            <p>
              Store medical records more efficiently by utilizing the cloud.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={third} className="showcase-img" alt="..." />
          <Carousel.Caption>
            <h3 className="carousel-header">Faster Response Times</h3>
            <p>
              Improve response times with EHRs and automating administrative
              tasks.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="rh-landing-bit">
        <div className="runner-what container-fluid">
          <div className="runner-what-l">
            <h1 className="subsec-title">Runner Health</h1>
            <p>
              Runner Health is a hospital management application that uses
              electronic health records (EHR) to help transition medical
              facilities into a digital cloud-based system for healthcare. There
              is a significant benefit for healthcare facilities to transition
              to a fully digital system for managing patient health information.{' '}
            </p>
            <p className="runner-overflow">
              EHRs will allow facilities to have streamlined access to records
              and reduce the clutter that physical records bring to the
              workspace. It will also facilitate the management of appointments,
              invoices, and other administrative tasks while reducing daily
              costs and improving the quality of care that a patient receives.
              Physicians will be able to respond to a patient's request for
              medical records at a faster rate.
            </p>
            <p className="runner-overflow">
              With the implementation of EHRs, a complete medical history can be
              maintained and stored securely for as long as the patient
              requires. With the advancements being made in technology, an EHR
              is an essential asset for all healthcare providers.
            </p>
          </div>
          <div className="runner-what-r">
            <img src={fourth} className="runner-img" />
          </div>
        </div>
        <div className="runner-mission">
          <div className="runner-mission-l">
            <img src={fifth} className="runner-img" />
          </div>
          <div className="runner-mission-r">
            <h1 className="subsec-title">Our Mission</h1>
            <p>
              Runner Health is committed to assisting healthcare providers in
              the transition from paper-based records to electronic health
              record systems.
            </p>
          </div>
        </div>
        <div className="runner-team container-fluid">
          <h1 className="subsec-title">Team Members</h1>
          <div className="runner-team-box">
            <Card className="team-member-card">
              <Card.Img variant="top" className="team-img" src={seven} />
              <Card.Body>
                <Card.Title className="team-member-name">
                  Nicklas Chang
                </Card.Title>
                <Card.Text>Group Liaison</Card.Text>
              </Card.Body>
            </Card>
            <Card className="team-member-card">
              <Card.Img variant="top" className="team-img" src={sixth} />
              <Card.Body>
                <Card.Title className="team-member-name">
                  Chidi Okpara
                </Card.Title>
                <Card.Text>Full Stack Developer</Card.Text>
              </Card.Body>
            </Card>
            <Card className="team-member-card">
              <Card.Img variant="top" className="team-img" src={eight} />
              <Card.Body>
                <Card.Title className="team-member-name">
                  Nicholas Romasanta
                </Card.Title>
                <Card.Text>Back-end Development</Card.Text>
              </Card.Body>
            </Card>
            <Card className="team-member-card">
              <Card.Img variant="top" className="team-img" src={nine} />
              <Card.Body>
                <Card.Title className="team-member-name">
                  Daniel Rivera
                </Card.Title>
                <Card.Text>Front-end Development</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="runner-service container-fluid">
          <div className="runner-service-l">
            <h1 className="subsec-title">Services</h1>
          </div>
          <div className="runner-service-r"></div>
        </div>
        <div className="runner-review container-fluid">
          <div className="runner-review-l">
            <h1 className="subsec-title">User Stories</h1>
          </div>
          <div className="runner-review-r"></div>
        </div>
        <div className="runner-contact container-fluid">
          <div className="runner-contact-l">
            <h1 className="subsec-title">Contacts Us</h1>
          </div>
          <div className="runner-contact-r"></div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
