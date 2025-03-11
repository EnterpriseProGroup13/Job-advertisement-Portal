import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import PostJob from "./components/PostJob"; // Accessible by all users
import Applicants from "./components/shared/Applicants"; // Review applicants page
import ProtectedRoute from "./components/ProtectedRoute"; // Ensures only admins can access
import UserRoute from "./components/UserRoute"; // Ensures only logged-in users can access

// Admin Pages (Using available components)
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminJobsTable from "./components/admin/AdminJobsTable";
import AdminUsersTable from "./components/admin/AdminUsersTable";
import ReportsAnalytics from "./components/admin/ReportsAnalytics";

const appRouter = createBrowserRouter([
  // Public Routes
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/description/:id", element: <JobDescription /> },
  { path: "/browse", element: <Browse /> },
  { path: "/profile", element: <Profile /> },

  // Job Posting (Accessible by all users)
  { path: "/post-job", element: <PostJob /> },

  // User-Protected Routes
  {
    path: "/jobs/:id/applicants",
    element: <UserRoute><Applicants /></UserRoute>,
  },

  // Admin Routes (Protected)
  {
    path: "/admin/dashboard",
    element: <ProtectedRoute><AdminDashboard /></ProtectedRoute>,
  },
  {
    path: "/admin/users",
    element: <ProtectedRoute><AdminUsersTable /></ProtectedRoute>,
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobsTable /></ProtectedRoute>,
  },
  {
    path: "/admin/reports",
    element: <ProtectedRoute><ReportsAnalytics /></ProtectedRoute>,
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
