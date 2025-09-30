import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WrapButton from "@/components/ui/wrap-button";
import { Globe } from "lucide-react";
import { Skiper58, TextRoll } from "@/components/ui/skiper-ui/skiper58";
// import SparkleButton from "@/components/ui/sparkle-button";

// ✅ Import icons
// import {
//   FaBookOpen,
//   FaTasks,
//   FaRobot,
//   FaChartLine,
//   FaCertificate,
//   FaUsers,
// } from "react-icons/fa";

export default function Home() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2 } }, // large tablets
      { breakpoint: 768, settings: { slidesToShow: 1 } }, // mobile
    ],
  };

  return (
    <div className="w-full md:bg-emerald-950  text-white px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 lg:py-12 rounded-lg font-semibold shadow-lg transition">
      {/* Hero Section */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center leading-snug">
        <TextRoll
          as="span"
          className="uppercase font-extrabold tracking-[-0.03em] "
        >
          BrainBuddy
        </TextRoll>
      </h1>

      <p className="max-w-2xl sm:max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-center px-2">
        Interactive courses, quizzes, and AI-powered learning tools to
        accelerate your growth.
      </p>

      <div className="flex justify-center mt-8">
        <WrapButton href="#about">
          <Globe className="animate-spin " />
          Get Started
        </WrapButton>
      </div>
      &nbsp;

      {/* About Section */}
      <section
        id="about"
        className="relative py-16 sm:py-20 px-4 sm:px-8 md:px-16 lg:px-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Text */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
              <TextRoll
                as="span"
                className="font-extrabold tracking-[-0.03em] space-x-2"
              >
                About Us
              </TextRoll>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              Our platform is designed to make
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {" "}
                learning simple, engaging, and effective
              </span>
              . With curated
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                {" "}
                expert content
              </span>
              , interactive tools, and personalized recommendations powered by
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                {" "}
                AI
              </span>
              , we empower learners to achieve their goals faster.
            </p>
            <div className="flex justify-center mt-8">
              <WrapButton href="#courses">
                <Globe className="animate-spin" />
                Explore Courses
              </WrapButton>
            </div>
          </div>

          {/* Image */}
          <div className="md:w-1/2">
            <img
              src="/images/one.png"
              alt="Learning Illustration"
              className="w-full max-w-md sm:max-w-lg mx-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section
        id="courses"
        className="py-16 sm:py-20 px-4 sm:px-8 md:px-16 lg:px-20 bg-gray-50"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-blue-900">
            Our Popular Courses
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-base sm:text-lg">
            Browse through categories designed to suit every learner.
          </p>
        </div>

        <Slider {...sliderSettings}>
          {[
            {
              title: "Web Development",
              desc: "Learn HTML, CSS, JavaScript & frameworks.",
              img: "/images/two.png",
            },
            {
              title: "Data Science",
              desc: "Master Python, Machine Learning & AI.",
              img: "/images/three.png",
            },
            {
              title: "UI/UX Design",
              desc: "Design stunning, user-friendly interfaces.",
              img: "/images/four.png",
            },
            {
              title: "Digital Marketing",
              desc: "SEO, Ads, Content & Social Media strategies.",
              img: "/images/five.png",
            },
          ].map((course, index) => (
            <div key={index} className="px-3">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-500">
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-44 sm:h-52 md:h-60 object-cover"
                />
                <div className="p-4 sm:p-6 text-center">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    {course.desc}
                  </p>
                  <Link
                    to="/courses"
                    className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="bg-gray-100 py-16 sm:py-20 px-4 sm:px-8 md:px-16 lg:px-20 text-center"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-blue-900">
          What Learners Say
        </h2>
        <Slider
          dots
          infinite
          speed={800}
          slidesToShow={2}
          slidesToScroll={1}
          autoplay
          autoplaySpeed={4000}
          responsive={[
            { breakpoint: 1024, settings: { slidesToShow: 1 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
          ]}
        >
          {[
            {
              name: "Alex, Software Engineer",
              text: "This platform helped me learn full-stack development in 3 months. The quizzes kept me motivated!",
            },
            {
              name: "Priya, Student",
              text: "The AI Assistant is a game changer! I could clarify doubts anytime without waiting for a mentor.",
            },
            {
              name: "Ravi, Data Analyst",
              text: "Courses are well-structured and the learning path is clear. Highly recommend!",
            },
            {
              name: "Sara, Designer",
              text: "I loved the interactive quizzes and instant AI help. Made learning fun!",
            },
          ].map((t, index) => (
            <div key={index} className="px-3 flex justify-center">
              <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition w-full max-w-md">
                <p className="text-gray-700 mb-6 text-base sm:text-lg leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
                <h4 className="font-semibold text-blue-600">{t.name}</h4>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-16 sm:py-20 px-4 sm:px-8 md:px-16 lg:px-20 bg-gray-50"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-blue-900">
            Contact Us
          </h2>
          <p className="text-gray-600 mb-12 text-base sm:text-lg">
            Have questions or feedback? We'd love to hear from you.
          </p>

          <form className="grid gap-6 text-left bg-white p-6 sm:p-8 rounded-xl shadow-lg">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>

          <div className="mt-10">
            <p className="text-gray-600 mb-4">Or email us directly at:</p>
            <a
              href="mailto:support@elearning.com"
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            >
              support@elearning.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
