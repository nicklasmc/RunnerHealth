import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaGithubSquare, FaLinkedin, FaPortrait } from 'react-icons/fa';

/*images*/
import first from './imgs/doctors-patient.jpg';
import second from './imgs/data_storage.jpg';
import third from './imgs/wait-room.jpg';
import fourth from './imgs/ehrs.jpg';
import fifth from './imgs/mission.jpg';
import sixth from './imgs/chido.jpg';
import seven from './imgs/nc.jpg';
import eight from './imgs/nr.jpg';
import nine from './imgs/dr.jpg';
import ten from './imgs/records.jpg';
import elle from './imgs/appointments.jpg';
import twelve from './imgs/payment.jpg';
import thirteen from './imgs/doc.jpg';
import fourteen from './imgs/healthcare-worker.jpg';
import fifteen from './imgs/patient.jpg';

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
            <p className="runner-mission-statement">
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
                <ListGroup variant="flush" className="team-member-info-can">
                  <ListGroup.Item>
                    <Card.Title className="team-member-name">
                      Nicklas Chiang
                    </Card.Title>
                  </ListGroup.Item>
                  <ListGroup.Item>Computer Science B.S.</ListGroup.Item>
                  <ListGroup.Item>
                    Group Liaison | Front-end Dev.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="flex items-center gap-2 social-links">
                      <a
                        title="LinkedIn"
                        href="https://www.linkedin.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaLinkedin/>
                      </a>
                      <a
                        title="GitHub"
                        href="https://github.com/nicklasmc"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaGithubSquare/>
                      </a>
                    </div></ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
            <Card className="team-member-card">
              <Card.Img variant="top" className="team-img" src={sixth} />
              <Card.Body>
                <Card.Text></Card.Text>
                <ListGroup variant="flush" className="team-member-info-can">
                  <ListGroup.Item>
                    <Card.Title className="team-member-name">
                      Chidi Okpara
                    </Card.Title>
                  </ListGroup.Item>
                  <ListGroup.Item>Computer Science B.S.</ListGroup.Item>
                  <ListGroup.Item>Full Stack Development</ListGroup.Item>
                  <ListGroup.Item className="">
                    <div className="social-links flex items-center gap-2">
                      <a
                        title="LinkedIn"
                        href="https://www.linkedin.com/in/chidi-okpara/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaLinkedin/>
                      </a>
                      <a
                        title="GitHub"
                        href="https://github.com/Chidoskii"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaGithubSquare/>
                      </a>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
            <Card className="team-member-card">
              <Card.Img variant="top" className="team-img" src={eight} />
              <Card.Body>
                <Card.Title className="team-member-name"></Card.Title>
                <Card.Text></Card.Text>
                <ListGroup variant="flush" className="team-member-info-can">
                  <ListGroup.Item>
                    <Card.Title className="team-member-name">
                      Nicholas Romasanta
                    </Card.Title>
                  </ListGroup.Item>
                  <ListGroup.Item>Computer Science B.S.</ListGroup.Item>
                  <ListGroup.Item>Back-end Development</ListGroup.Item>
                  <ListGroup.Item>                    
                    <div className="flex items-center gap-2 social-links">
                      <a
                        title="LinkedIn"
                        href="https://www.linkedin.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaLinkedin/>
                      </a>
                      <a
                        title="GitHub"
                        href="https://github.com/nromasanta"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaGithubSquare/>
                      </a>
                    </div></ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
            <Card className="team-member-card">
              <Card.Img variant="top" className="team-img" src={nine} />
              <Card.Body>
                <ListGroup variant="flush" className="team-member-info-can">
                  <ListGroup.Item>
                    <Card.Title className="team-member-name">
                      Daniel Rivera
                    </Card.Title>
                  </ListGroup.Item>
                  <ListGroup.Item>~Your Degree Here~</ListGroup.Item>
                  <ListGroup.Item>Front-end Development</ListGroup.Item>
                  <ListGroup.Item>                    
                    <div className="flex items-center gap-2 social-links">
                      <a
                        title="LinkedIn"
                        href="https://www.linkedin.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaLinkedin/>
                      </a>
                      <a
                        title="GitHub"
                        href="https://github.com/ChaDaniel"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaGithubSquare/>
                      </a>
                    </div></ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="runner-service container-fluid">
          <h1 className="subsec-title">Services</h1>
          <div className="all-services-can">
            <div className="services-can">
              <div className="service-img-can">
                <img className="service-img" alt=".." src={ten} />
              </div>
              <div className="service-desc">Store Medical Records</div>
            </div>
            <div className="service-divider"></div>
            <div className="services-can">
              <div className="service-img-can">
                <img className="service-img" alt=".." src={elle} />
              </div>
              <div className="service-desc">Schedule Appointments</div>
            </div>
            <div className="service-divider"></div>
            <div className="services-can">
              <div className="service-img-can">
                <img className="service-img" alt=".." src={twelve} />
              </div>
              <div className="service-desc">Make Payments</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
