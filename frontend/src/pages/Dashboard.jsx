import { Link } from "react-router-dom";

const enrolledCourses = [
    {
        id: "1",
        title: "React for Beginners",
        progress: 65,
        image: "https://source.unsplash.com/400x200/?react,frontend",
    },
    {
        id: "2",
        title: "Node.js Masterclass",
        progress: 40,
        image: "https://source.unsplash.com/400x200/?nodejs,backend",
    },
];

export default function Dashboard() {
    return (
        <div className="p-10 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>

            {/* Enrolled Courses */}
            <h2 className="text-2xl font-semibold mb-4">Enrolled Courses</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                    <div key={course.id} className="bg-white shadow rounded-xl overflow-hidden">
                        <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{course.title}</h3>
                            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                                <div
                                    className="bg-blue-600 h-3 rounded-full"
                                    style={{ width: `${course.progress}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{course.progress}% complete</p>
                            <Link
                                to={`/courses/${course.id}`}
                                className="mt-3 inline-block bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                            >
                                Continue
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* AI Assistant Section */}
            <div className="mt-12 text-center">
                <h2 className="text-2xl font-semibold mb-2">Need Help?</h2>
                <p className="text-gray-600 mb-4">Chat with our AI-powered assistant for guidance.</p>
                <Link
                    to="/assistant"
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-700 transition"
                >
                    Open AI Assistant
                </Link>
                <Link
                    to="/quiz"
                    className="ml-2 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition"
                >
                    Take Quiz
                </Link>

            </div>
        </div>
    );
}
