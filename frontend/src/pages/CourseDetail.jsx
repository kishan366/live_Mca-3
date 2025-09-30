import { useParams, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

const sampleCourses = [
  {
    id: "1",
    title: "React for Beginners",
    description: "Learn the basics of React and build dynamic apps.",
    price: 49,
    image: "/images/1.png",
    syllabus: ["Introduction", "JSX & Components", "Props & State", "Routing", "Hooks"],
  },
  {
    id: "2",
    title: "Node.js Masterclass",
    description: "Deep dive into backend development with Node.js.",
    price: 59,
    image: "/images/2.png",
    syllabus: ["Node Basics", "Express.js", "REST APIs", "Authentication", "Deployment"],
  },
  {
    id: "3",
    title: "MongoDB Essentials",
    description: "Learn NoSQL with MongoDB and scale apps.",
    price: 39,
    image: "/images/3.png",
    syllabus: ["Intro to NoSQL", "CRUD Operations", "Indexes", "Aggregation", "Atlas"],
  },
];

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = sampleCourses.find((c) => c.id === id);

  if (!course) {
    return <p className="text-center text-red-600 mt-10">Course not found.</p>;
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <img src={course.image} alt={course.title} className="w-full rounded-xl shadow-lg mb-6" />
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      <p className="text-gray-600 mb-4">{course.description}</p>
      <p className="text-xl font-bold text-blue-600 mb-6">${course.price}</p>

      <h2 className="text-2xl font-semibold mb-3">Syllabus</h2>
      <ul className="list-disc list-inside space-y-1 mb-6">
        {course.syllabus.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>

      {/* Auth Based Enroll Button */}
      <div>
        {/* Not logged in → Sign In Modal */}
        <SignedOut>
          <SignInButton mode="modal" redirectUrl={`/courses/${id}/videos`}>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition">
              Enroll Now
            </button>
          </SignInButton>
        </SignedOut>

        {/* Logged in → Go to videos page */}
        <SignedIn>
          <button
            onClick={() => navigate(`/courses/${id}/videos`)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
          >
            Enroll Now
          </button>
        </SignedIn>
      </div>
    </div>
  );
}
