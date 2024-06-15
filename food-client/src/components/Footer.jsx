import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-neutral h-44 text-neutral-content">
      <aside>
        <MdFastfood className="h-16 w-16" />
        <p>
          HarvestHub Industries Ltd.
          <br />
          All rights reserved &copy; 2024
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <a href="https://www.facebook.com/Md.Nur9211/" target="_blank">
            <FaFacebook className="w-10 h-10" />
          </a>
          <a href="https://github.com/Md-Nur" target="_blank">
            <FaGithub className="w-10 h-10" />
          </a>
          <a href="https://www.linkedin.com/in/mdnur9211/" target="_blank">
            <FaLinkedin className="w-10 h-10" />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
