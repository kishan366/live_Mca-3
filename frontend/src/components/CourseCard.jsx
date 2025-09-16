import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
      <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{course.title}</h3>
        <p className="text-gray-600 text-sm">{course.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-blue-600 font-bold">${course.price}</span>
          <Link 
            to={`/courses/${course.id}`} 
            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
