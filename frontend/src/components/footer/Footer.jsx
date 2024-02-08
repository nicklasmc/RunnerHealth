import { FaGithubSquare, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      {/* line */}
      <div className="w-full h-px bg-[#000] mt-0 mb-0 footy-border"></div>
      {/* footer */}
      <div className="px-1 py-7  mx-auto footy">
        {/* top */}
        <div className="flex justify-between gap-y-2 flex-wrap container-sm footy-contents">
          {/* left */}
          <div className="mx-0 md:mx-0">
            <div className=" flex items-center gap-8 mb-3 ">
              {/* logo */}
              <div className=" flex gap-2 items-center text-2xl text-#000 font-bold rh-footer-can">
                <img
                  src={require('./img/health-heart.png')}
                  alt=""
                  className="footy-logo"
                />
                <span>Runner Health</span>
              </div>
            </div>
            <br />
            {/* disc */}
            <div className="text-[#000]">
              <a href="#" className="footy-links">
                Terms of Service
              </a>
              <a href="#" className="footy-links">
                Privacy Policy
              </a>
              <a href="#" className="footy-links">
                Documentation
              </a>
              <a href="#" className="footy-links">
                Source Code
              </a>
              <a href="#" className="footy-links">
                Contact Us
              </a>
            </div>
            <p style={{ lineHeight: 1 }}>
              <br />
              <br />
            </p>
          </div>
          {/* right */}
          <div className=" mx-0 md:mx-0">
            {/* title */}
            <h2 className=" text-#000 text-2xl font-medium mb-3">Socials</h2>
            {/* media */}
            <div className="flex items-center gap-2">
              <a title="LinkedIn" href="#">
                <FaLinkedin color="goldenrod" />
              </a>
              <a
                title="X"
                href="https://github.com/nicklasmc/RunnerHealth"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithubSquare color="goldenrod" />
              </a>
            </div>
          </div>
        </div>
        {/* bottom */}
        <div className="text-center text-#000 pb-2 mt-3 container-sm cp-right-text">
          © 2024 Runner Health. All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Footer;
