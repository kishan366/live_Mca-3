import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WrapButton from "@/components/ui/wrap-button"
import { Globe } from "lucide-react"
// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";
import { Skiper58, TextRoll } from "@/components/ui/skiper-ui/skiper58";
import SparkleButton from "@/components/ui/sparkle-button";





// Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import  CardCarousel  from "@/components/ui/card-carousel"


// ✅ Import icons
import { FaBookOpen, FaTasks, FaRobot, FaChartLine, FaCertificate, FaUsers } from "react-icons/fa";

export default function Home() {
  const features = [
    {
      title: "Expert Courses",
      desc: "Learn from industry leaders and top educators worldwide.",
      icon: <FaBookOpen className="text-blue-600 text-5xl mx-auto mb-4" />,
    },
    {
      title: "Quizzes & Tests",
      desc: "Evaluate your progress with interactive assessments.",
      icon: <FaTasks className="text-green-600 text-5xl mx-auto mb-4" />,
    },
    {
      title: "AI Assistance",
      desc: "Get real-time help, personalized learning paths, and chat with our AI-powered assistant.",
      icon: <FaRobot className="text-purple-600 text-5xl mx-auto mb-4" />,
    },
    {
      title: "Progress Tracking",
      desc: "Monitor your journey and celebrate milestones with detailed analytics.",
      icon: <FaChartLine className="text-indigo-600 text-5xl mx-auto mb-4" />,
    },
    {
      title: "Certificates",
      desc: "Earn certificates after successful completion of courses.",
      icon: <FaCertificate className="text-yellow-500 text-5xl mx-auto mb-4" />,
    },
    {
      title: "Community Support",
      desc: "Engage with peers, share ideas, and grow together.",
      icon: <FaUsers className="text-red-500 text-5xl mx-auto mb-4" />,
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-full bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold shadow-lg transition ">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
        <TextRoll
          as="span"
          className="
    text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
    font-extrabold uppercase 
    leading-tight tracking-[-0.03em] 
    transition-colors 
    [word-spacing:0.25rem] sm:[word-spacing:0.5rem] md:[word-spacing:0.75rem] lg:[word-spacing:1rem]
  "
        >
          Learn Anytime, Anywhere
        </TextRoll>


      </h1>
      <p as="span text-center" className="max-w-3xl mx-auto text-lg md:text-xl text-center">
        Interactive courses, quizzes, and AI-powered learning tools to accelerate your growth.
      </p>

      <WrapButton className="mt-10" href="#about">
        <Globe className="animate-spin" />
        Get Started
      </WrapButton>
      <br></br>

      {/* <a
          href="#about"
          className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-gray-200 transition"
        >
          Get Started
        </a> */}


      {/* About Section */}
      <section id="about" className="relative py-20 px-6 sm:px-10 md:px-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">

          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
              About Us
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-6">
              Our platform is designed to make
              <span className="font-semibold text-blue-600 dark:text-blue-400"> learning simple, engaging, and effective</span>.
              With curated
              <span className="font-semibold text-indigo-600 dark:text-indigo-400"> expert content</span>, interactive learning tools,
              and personalized recommendations powered by
              <span className="font-semibold text-purple-600 dark:text-purple-400"> AI</span>,
              we empower learners to achieve their goals faster.
            </p>
            <a
              href="#courses"
              className="flex flex-col mx-auto justify-center text-center items-center align-center py-20"
            >
               <SparkleButton text="Explore Courses" size="lg"/>
            </a>
          </div>

          {/* Image */}
          <div className="md:w-1/2">
            <img
              src="/images/one.png"
              alt="Learning Illustration"
              className="w-full rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>


      {/* Courses Section */}
      <section id="courses" className="py-20 px-6 md:px-20 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-blue-900">Our Popular Courses</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Browse through our wide range of categories designed to suit every learner.
          </p>
        </div>

        <Slider
          dots={true}
          infinite={true}
          centerMode={true}
          centerPadding="60px"
          speed={600}
          slidesToShow={3}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={2500}
          responsive={[
            { breakpoint: 1024, settings: { slidesToShow: 2, centerPadding: "40px" } },
            { breakpoint: 640, settings: { slidesToShow: 1, centerPadding: "0px" } },
          ]}
        >
          {[
            { title: "Web Development", desc: "Learn HTML, CSS, JavaScript & frameworks.", img: "/images/two.png" },
            { title: "Data Science", desc: "Master Python, Machine Learning & AI.", img: "/images/three.png" },
            { title: "UI/UX Design", desc: "Design stunning, user-friendly interfaces.", img: "/images/four.png" },
            { title: "Digital Marketing", desc: "SEO, Ads, Content & Social Media strategies.", img: "/images/five.png" },
          ].map((course, index) => (
            <div key={index} className="px-4">
              <div className="course-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500">
                <img src={course.img} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.desc}</p>
                  <Link
                    to="/courses"
                    className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
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
      <section id="testimonials" className="bg-gray-100 py-20 px-6 md:px-20 text-center">
        <h2 className="text-4xl font-bold mb-12 text-blue-900">What Learners Say</h2>
        <Slider
          dots={true}
          infinite={true}
          speed={800}
          slidesToShow={2}
          slidesToScroll={1}
          autoplay={true}          // ensure this is true
          autoplaySpeed={4000}     // time in ms
          cssEase="ease-in-out"
          className="max-w-4xl mx-auto"
          adaptiveHeight={false}   // fixes uneven card height issue
          responsive={[
            { breakpoint: 1024, settings: { slidesToShow: 1 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
          ]}
        >
          {[
            {
              name: "Alex, Software Engineer",
              text: "This platform helped me learn full-stack development in just 3 months. The quizzes kept me motivated!",
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
            <div key={index} className="px-4 flex justify-center">
              <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition w-full max-w-md">
                <p className="text-gray-700 mb-6 text-lg">&ldquo;{t.text}&rdquo;</p>
                <h4 className="font-semibold text-blue-600">{t.name}</h4>
              </div>
            </div>
          ))}
        </Slider>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 md:px-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-blue-900">Contact Us</h2>
          <p className="text-gray-600 mb-12">
            Have questions or feedback? We'd love to hear from you. Fill out the
            form below or reach out via email.
          </p>

          <form className="grid gap-6 text-left bg-white p-8 rounded-xl shadow-lg">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            >
              support@elearning.com
            </a>
          </div>
        </div>
      </section>
    </div >
  );
}
