import { useState } from "react";

const mockCourses = [
  { id: "1", title: "React for Beginners", students: 120, image: "https://source.unsplash.com/400x200/?react" },
  { id: "2", title: "Node.js Masterclass", students: 80, image: "https://source.unsplash.com/400x200/?nodejs" },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState("courses");

  // ✅ Course state
  const [courses, setCourses] = useState(mockCourses);
  const [newCourse, setNewCourse] = useState({ title: "", students: 0, image: "" });

  // ✅ Edit modal state
  const [editingCourse, setEditingCourse] = useState(null);
  const [editData, setEditData] = useState({ title: "", students: 0, image: "" });

  // ✅ Add Course
  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.image) return;
    setCourses([
      ...courses,
      { id: Date.now().toString(), title: newCourse.title, students: newCourse.students, image: newCourse.image }
    ]);
    setNewCourse({ title: "", students: 0, image: "" });
  };

  // ✅ Delete Course
  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  // ✅ Open Edit Modal
  const openEditModal = (course) => {
    setEditingCourse(course);
    setEditData({ title: course.title, students: course.students, image: course.image });
  };

  // ✅ Save Edits
  const handleSaveEdit = (e) => {
    e.preventDefault();
    setCourses(
      courses.map((c) =>
        c.id === editingCourse.id ? { ...c, title: editData.title, students: editData.students, image: editData.image } : c
      )
    );
    setEditingCourse(null); // close modal
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setTab("courses")}
            className={`block w-full text-left px-4 py-2 rounded-lg ${
              tab === "courses" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            Courses
          </button>
          <button
            onClick={() => setTab("users")}
            className={`block w-full text-left px-4 py-2 rounded-lg ${
              tab === "users" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setTab("quizzes")}
            className={`block w-full text-left px-4 py-2 rounded-lg ${
              tab === "quizzes" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            Quizzes
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gray-100">
        {tab === "courses" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Manage Courses</h1>

            {/* Add Course Form */}
            <form onSubmit={handleAddCourse} className="bg-white shadow rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Add New Course</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Course Title"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="border p-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Initial Students"
                  value={newCourse.students}
                  onChange={(e) => setNewCourse({ ...newCourse, students: parseInt(e.target.value) })}
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newCourse.image}
                  onChange={(e) => setNewCourse({ ...newCourse, image: e.target.value })}
                  className="border p-2 rounded col-span-2"
                />
              </div>
              <button
                type="submit"
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Course
              </button>
            </form>

            {/* Course Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white shadow rounded-xl overflow-hidden">
                  <img
                    src={course.image || "https://source.unsplash.com/400x200/?education,course"}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-lg font-semibold">{course.title}</h2>
                    <p className="text-gray-600">{course.students} students</p>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => openEditModal(course)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ✅ Edit Course Modal */}
        {editingCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Course</h2>
              <form onSubmit={handleSaveEdit} className="space-y-4">
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="number"
                  value={editData.students}
                  onChange={(e) => setEditData({ ...editData, students: parseInt(e.target.value) })}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  value={editData.image}
                  onChange={(e) => setEditData({ ...editData, image: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingCourse(null)}
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
