import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);

  // highlight current section on home page
  useEffect(() => {
    if (location.pathname !== "/") return;

    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, [location.pathname]);

  const handleScroll = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); // close menu on mobile
    }
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "courses", label: "Courses" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          E-Learning
        </Link>

        {/* Hamburger (mobile only) */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6">
          {location.pathname === "/" ? (
            <>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleScroll(e, item.id)}
                    className={`${
                      activeSection === item.id
                        ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    } transition`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/reels"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Reels
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/courses" className="hover:text-blue-600">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/reels" className="hover:text-blue-600">
                  Reels
                </Link>
              </li>
            </>
          )}

          {/* Signup only (Login removed) */}
          <li>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Signup
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4">
          <ul className="flex flex-col space-y-4">
            {location.pathname === "/" ? (
              <>
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleScroll(e, item.id)}
                      className={`block ${
                        activeSection === item.id
                          ? "text-blue-600 font-semibold"
                          : "text-gray-700 hover:text-blue-600"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <Link
                    to="/reels"
                    onClick={() => setIsOpen(false)}
                    className="block text-gray-700 hover:text-blue-600"
                  >
                    Reels
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/courses"
                    onClick={() => setIsOpen(false)}
                    className="block text-gray-700 hover:text-blue-600"
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    to="/reels"
                    onClick={() => setIsOpen(false)}
                    className="block text-gray-700 hover:text-blue-600"
                  >
                    Reels
                  </Link>
                </li>
              </>
            )}

            {/* Signup only (Login removed) */}
            <li>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition"
              >
                Signup
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
