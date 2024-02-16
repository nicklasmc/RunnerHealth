import { FaGithubSquare, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footy bg-white py-8">
      <div className="footy-container container mx-auto px-4">
        {/* Footer top */}
        <div className="logo-text flex flex-col md:flex-row justify-between gap-y-6">
          {/* Logo and Text */}
          <div className="rh-footer-can flex items-center">
            <img
              src={require('./img/health-heart.png')}
              alt="Runner Health"
              className="footy-logo w-16 h-16 mr-3 text-goldenrod"
            />
            <span className="text-2xl font-bold text-black">Runner Health</span>
          </div>
          {/* Navigation */}
          <nav className="footy-nav flex flex-wrap gap-x-6">
            <a href="#" className="footy-links">Terms of Service</a>
            <a href="#" className="footy-links">Privacy Policy</a>
            <a href="#" className="footy-links">Documentation</a>
            <a href="https://github.com/nicklasmc/RunnerHealth" className="footy-links">Source Code</a>
            <a href="/contact_us" className="footy-links">Contact Us</a>
          </nav>
        </div>
        {/* Socials and Copyright */}
        <div className="social-copy flex flex-col md:flex-row justify-between mt-6 ml-6">
          {/* Social icons */}
          <div className="social-icons flex gap-x-4">
            <a href="#" title="LinkedIn">
              <FaLinkedin className="icon text-2xl" />
            </a>
            <a href="https://github.com/nicklasmc/RunnerHealth" title="GitHub" target="_blank" rel="noreferrer">
              <FaGithubSquare className="icon text-2xl" />
            </a>
          </div>
          {/* Copyright */}
          <p className="footy-copyright text-gray-600 mt-2 md:mt-0">© 2024 Runner Health. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;