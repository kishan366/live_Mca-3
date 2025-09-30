import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const sampleCourses = [
  {
    id: "1",
    title: "React for Beginners",
    description: "Learn the basics of React and build dynamic apps.",
    price: 49,
    image: "/images/1.png",
    syllabus: ["Introduction", "JSX & Components", "Props & State", "Routing", "Hooks"],
    videos: [
      { title: "Introduction", url: "https://www.youtube.com/embed/KJgsSFOSQv0" },
      { title: "JSX & Components", url: "https://www.youtube.com/embed/8Yj8c8c8c8c" },
      { title: "Props & State", url: "https://www.youtube.com/embed/Tn6-PIqc4UM" },
      { title: "Routing", url: "https://www.youtube.com/embed/Tn6-PIqc4UM" },
      { title: "Hooks in Depth", url: "https://www.youtube.com/embed/dpw9EHDh2bM" },
    ],
  },
  {
    id: "2",
    title: "Node.js Masterclass",
    description: "Deep dive into backend development with Node.js.",
    price: 59,
    image: "/images/2.png",
    syllabus: ["Node Basics", "Express.js", "REST APIs", "Authentication", "Deployment"],
    videos: [
      { title: "Node Basics", url: "https://www.youtube.com/embed/fBNz5xF-Kx4" },
      { title: "Express.js", url: "https://www.youtube.com/embed/L72fhGm1tfE" },
      { title: "REST APIs", url: "https://www.youtube.com/embed/pKd0Rpw7O48" },
      { title: "Authentication", url: "https://www.youtube.com/embed/6M5nG2g2g2g" },
      { title: "Deployment", url: "https://www.youtube.com/embed/6M5nG2g2g2g" },
    ],
  },
  {
    id: "3",
    title: "MongoDB Essentials",
    description: "Learn NoSQL with MongoDB and scale apps.",
    price: 39,
    image: "/images/3.png",
    syllabus: ["Intro to NoSQL", "CRUD Operations", "Indexes", "Aggregation", "Atlas"],
    videos: [
      { title: "Intro to NoSQL", url: "https://www.youtube.com/embed/-56x56UppqQ" },
      { title: "CRUD Operations", url: "https://www.youtube.com/embed/ofme2o29ngU" },
      { title: "Indexes", url: "https://www.youtube.com/embed/aqvq6l4y9Ms" },
      { title: "Aggregation", url: "https://www.youtube.com/embed/4y3qM1aH8jY" },
      { title: "Atlas", url: "https://www.youtube.com/embed/5D9mK3kK3kK" },
    ],
  },
];

export default function CourseVideos() {
  const { id } = useParams();
  const course = sampleCourses.find((c) => c.id === id);

  // load last watched index from localStorage
  const getSavedIndex = () => {
    const saved = localStorage.getItem(`course-${id}-lastVideo`);
    return saved ? parseInt(saved, 10) : 0;
  };

  const [currentIndex, setCurrentIndex] = useState(getSavedIndex);

  useEffect(() => {
    // save whenever currentIndex changes
    localStorage.setItem(`course-${id}-lastVideo`, currentIndex);
  }, [currentIndex, id]);

  if (!course) {
    return <p className="text-center text-red-600 mt-10">Course not found.</p>;
  }

  const currentVideo = course.videos[currentIndex];

  const handleNext = () => {
    if (currentIndex < course.videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      {/* Course Info */}
      <div className="mb-8">
        <img
          src={course.image}
          alt={course.title}
          className="w-full rounded-xl shadow-lg mb-6"
        />
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{course.title}</h1>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <p className="text-xl font-bold text-blue-600 mb-6">${course.price}</p>
      </div>

      {/* Video Player + Sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Video Player */}
        <div className="md:col-span-2 bg-white shadow-lg rounded-xl overflow-hidden">
          <h2 className="text-xl font-semibold px-4 pt-4">{currentVideo?.title}</h2>
          <div className="aspect-video">
            <iframe
              src={currentVideo?.url}
              title={currentVideo?.title}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center px-4 py-3 border-t">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`px-4 py-2 rounded-lg ${
                currentIndex === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === course.videos.length - 1}
              className={`px-4 py-2 rounded-lg ${
                currentIndex === course.videos.length - 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>
        </div>

        {/* Video List (Syllabus Linked) */}
        <div className="bg-gray-50 shadow-lg rounded-xl p-4">
          <h2 className="text-xl font-semibold mb-3">Syllabus</h2>
          <ul className="space-y-2">
            {course.videos.map((video, index) => (
              <li
                key={index}
                className={`cursor-pointer p-2 rounded-md transition ${
                  currentIndex === index
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-100"
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                {index + 1}. {video.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
