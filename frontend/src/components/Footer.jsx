import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        
        {/* About */}
        <div>
          <h4 className="text-2xl font-bold mb-4 text-white">E-Learn</h4>
          <p className="text-gray-400 leading-relaxed">
            Empowering learners worldwide with expert-led courses, interactive 
            tools, and AI assistance to make education accessible for everyone.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-2xl font-bold mb-4 text-white">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-blue-400 transition-colors">Courses</Link>
            </li>
            <li>
              <Link to="#about" className="hover:text-blue-400 transition-colors">About</Link>
            </li>
            <li>
              <Link to="#contact" className="hover:text-blue-400 transition-colors">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="text-2xl font-bold mb-4 text-white">Connect With Us</h4>
          <p className="text-gray-400 mb-4">
            Email:{" "}
            <a
              href="mailto:support@elearning.com"
              className="text-blue-400 hover:underline"
            >
              support@elearning.com
            </a>
          </p>
          <div className="flex justify-center md:justify-start gap-6 text-xl">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-blue-500 transition-transform transform hover:scale-110"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-sky-400 transition-transform transform hover:scale-110"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="hover:text-blue-600 transition-transform transform hover:scale-110"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-pink-500 transition-transform transform hover:scale-110"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-white">E-Learn</span>. All rights reserved.
      </div>
    </footer>
  );
}
