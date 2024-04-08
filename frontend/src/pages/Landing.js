import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaGithubSquare, FaLinkedin, FaPortrait } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
            <h1 className="subsec-title">TIRED OF WAITING?</h1>
            <h2 className="subsec-title2">Schedule, Manage, Store, Recieve, Runner
              Health is a service that does it all</h2>
              <p className="runner-overflow">
                Make Healthcare easy with Runner Health. We know Doctor's 
                visits can be frustrating, The team at Runner Health is
                dedicated to providing an easy to use Electronic Health 
                Record service that works with your providers to safely
                and securely store your information. Access your health
                records and schedule your appointments with Runner Health
                Today!
              </p>
            <p className="runner-overflow-b">
              <Link to="/patient_login" className="appt-return">
                <button className="appt-button">
                  Explore with us
                </button>
              </Link>
            </p>
          </div>
          <div className="runner-what-r">
            <img src={fourth} className="runner-img" />
          </div>
        </div>
       
        <div className="runner-team">
          <h1 className="subsec-title">The Runner Health Team</h1>
          <div className="runner-team-box container-fluid">
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
                  <ListGroup.Item>Back-end Development</ListGroup.Item>
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
                  <ListGroup.Item>Computer Science B.S. </ListGroup.Item>
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
      </div>
    </div>
  );
}

export default Landing;
