import CourseCard from "../components/CourseCard";

const sampleCourses = [
  {
    id: 1,
    title: "React for Beginners",
    description: "Learn the basics of React and build dynamic apps.",
    price: 49,
    image: "/images/1.png"
  },
  {
    id: 2,
    title: "Node.js Masterclass",
    description: "Deep dive into backend development with Node.js.",
    price: 59,
    image: "/images/2.png"
  },
  {
    id: 3,
    title: "MongoDB Essentials",
    description: "Learn NoSQL with MongoDB and scale apps.",
    price: 39,
    image: "/images/3.png"
  },
];

export default function Courses() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-center mb-8">Available Courses</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sampleCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
