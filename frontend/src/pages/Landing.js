import React, { Component } from 'react';
import { useState, useCallback, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaGithubSquare, FaLinkedin, FaPortrait } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { VscCalendar, VscKey, VscFolder } from 'react-icons/vsc';

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
  const isBreakpoint = useMediaQuery(800)

  return (
    <div className="landing-page">
      <div className="landing-showcase">
        <Carousel>
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
      </div>
      <div className="rh-landing-bit">
        { isBreakpoint ? (
          <div className="runner-hook-small">
            <div className="runner-hook-small-a">
              <VscCalendar color="goldenrod" fontSize="1.0em"/>
              <p className="runner-hook-small-sec">Schedule Appointments</p>
            </div>
            <div className="runner-hook-small-b">
              <VscFolder color="goldenrod" fontSize="1.0em"/>
              <p className="runner-hook-small-sec">Store Medical Records</p>
            </div>
            <div className="runner-hook-small-c">
              <VscKey color="goldenrod" fontSize="1.0em"/>
              <p className="runner-hook-small-sec">Seamless Payment</p>
            </div>
          </div>
        ) : (
          <div className="runner-hook">
            <p className="runner-hook-header">
              Explore Our Services
            </p>
            <div className="runner-hook-text">
              <div className="runner-hook-a">
                <p className="runner-hook-sec-text">Schedule Appointments</p>
                <p className="runner-hook-a-text">
                  Setup healthcare appointments with a provider
                </p>
              </div>
              <p className="runner-hook-slant">/</p>
              <div className="runner-hook-b">
                <p className="runner-hook-sec-text">Store Medical Records</p>
                <p className="runner-hook-a-text">
                  Upload and retrieve medical health records
                </p>
              </div>
              <p className="runner-hook-slant">/</p>
              <div className="runner-hook-c">
                <p className="runner-hook-sec-text">Seamless Payment</p>
                <p className="runner-hook-a-text">
                  Pay and review invoices from appointments
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="runner-what">
          <div className="runner-what-content">
            <div className="runner-what-a">
              <p className="runner-what-title">TIRED OF WAITING?</p>
              <div className="runner-what-text">
                <p className="runner-what-hook">
                  Make Healthcare easy with Runner Health. 
                </p>
                <p className="runner-what-paragraph">
                We know Doctor's visits can be frustrating. The team at Runner Health is
                dedicated to providing an easy to use Electronic Health 
                Record service that works with your providers to safely
                and securely store your information. Access your health
                records and schedule your appointments with Runner Health
                Today!
                </p>
              </div>
              <Link to="/patient_login" className="">
                <button className="appt-button mb-4">
                  Explore with us
                </button>
              </Link>
            </div>
            <div className="runner-what-b">
              <img src={fourth} className="runner-what-img" />
            </div>
          </div>
        </div>
       
        <div className="runner-team">
          <h1 className="subsec-title">The Runner Health Team</h1>
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


const useMediaQuery = (width) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener("change", updateTarget);

    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change", updateTarget);
  }, []);

  return targetReached;
};

export default Landing;
