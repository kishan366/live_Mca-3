import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    if (location.pathname !== "/") return; // only run on Home page

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

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [location.pathname]);

  const handleScroll = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "features", label: "Features" },
    { id: "courses", label: "Courses" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          E-Learning
        </Link>
        <ul className="flex space-x-6">
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
              {/* ✅ Reels page link when on home */}
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
              <li>
                <Link to="/login" className="hover:text-blue-600">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-blue-600">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
