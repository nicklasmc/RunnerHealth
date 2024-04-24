import { FaGithubSquare, FaLinkedin } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  const displayNavbar = () => {
    const excludePathnames = 
    ['/patient_login', '/patient_signup', '/doctor_login', '/doctor_signup', '/admin_login', '/admin_signup'];
    return !excludePathnames.includes(location.pathname);
  };

  return displayNavbar() ? (
    <footer className="footy container bg-[#003594] py-8">
      <div className="footy-container">
        {/* Footer top */}
        <div className="logo-text">
          {/* Logo and Text */}
          <div className="rh-footer-can flex items-center">
            <img
              src={require('./img/health-heart.png')}
              alt="Runner Health"
              className="footy-logo w-16 h-16 mr-3 text-goldenrod"
            />
            <span className="text-2xl font-bold text-white">Runner Health</span>
          </div>
          {/* Navigation */}
          <nav className="footy-nav flex flex-wrap gap-x-6">
            <a href="#" className="footy-links">Terms of Service</a>
            <a href="#" className="footy-links">Privacy Policy</a>
            <a href="#" className="footy-links">Documentation</a>
            <a href="/contact_us" className="footy-links">Contact Us</a>
          </nav>
        </div>
        {/* Socials and Copyright */}
        <div className="social-copy">
          {/* Social icons */}
          <div className="footer-icons flex gap-x-4">
            <a href="#" title="LinkedIn">
              <FaLinkedin className="icon text-2xl" />
            </a>
            <a href="https://github.com/nicklasmc/RunnerHealth" title="GitHub" target="_blank" rel="noreferrer">
              <FaGithubSquare className="icon text-2xl" />
            </a>
          </div>
          {/* Copyright */}
          <p className="footy-copyright text-white mt-2 md:mt-0">© 2024 Runner Health. All rights reserved.</p>
        </div>
      </div>
    </footer>
  ) : null;
};

export default Footer;