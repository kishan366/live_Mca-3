import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ✅ Import Custom Cursor
import CustomCursor from "./components/CustomCursor";

// Pages
import Home from "./pages/Home";
import RefreshPage from "./pages/RefreshPage";
// import Login from "./pages/auth/Login";
// import Signup from "./pages/auth/Signup";
// import ForgotPassword from "./pages/auth/ForgotPassword";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CourseVideos from "./pages/CourseVideos";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import Assistant from "./pages/Assistant";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ReelsPage from "./pages/ReelsPage";
import auth from "./pages/auth";

export default function App() {
  return (
    <>
      {/* 🔥 Neon Cursor will be visible across whole project */}
      <CustomCursor />

      <Navbar />

      {/* अगर Navbar fixed है तो नीचे का content overlap न हो इसलिए pt-16 */}
      <main className="min-h-screen pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/refresh" element={<RefreshPage />} />

          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          <Route path="/auth" element={auth()} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/courses/:id/videos" element={<CourseVideos />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/reels" element={<ReelsPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
