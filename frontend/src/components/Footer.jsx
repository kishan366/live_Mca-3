import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 text-center md:text-left">
        {/* About */}
        <div>
          <h4 className="text-xl font-semibold mb-4">E-Learn</h4>
          <p className="text-gray-600">
            Empowering learners worldwide with expert-led courses, interactive tools, and AI assistance.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-600 transition">Home</Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-blue-600 transition">Courses</Link>
            </li>
            <li>
              <Link to="#about" className="hover:text-blue-600 transition">About</Link>
            </li>
            <li>
              <Link to="#contact" className="hover:text-blue-600 transition">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Connect With Us</h4>
          <p className="text-gray-600 mb-4">Email: <a href="mailto:support@elearning.com" className="text-blue-600 hover:underline">support@elearning.com</a></p>
          <div className="flex justify-center md:justify-start gap-4 text-gray-600">
            <a href="#" className="hover:text-blue-600 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-400 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-700 transition"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-pink-500 transition"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 mt-6 pt-4 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} E-Learn. All rights reserved.
      </div>
    </footer>
  );
}
