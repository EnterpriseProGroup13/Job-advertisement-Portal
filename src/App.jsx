import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import PostJob from './components/PostJob'; // Updated to be accessible by all users
import Applicants from './components/shared/Applicants'; // Review applicants page
import ProtectedRoute from './components/ProtectedRoute'; // To check if user is logged in
import UserRoute from './components/UserRoute'; // Wrapper to check if user is logged in

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  // Accessible by all users
  {
      path: "/PostJob",
      element: <PostJob />
  },
  // Applicants review page accessible only to the user who posted the job
  {
    path: "/jobs/:id/applicants",
    element: <UserRoute><Applicants /></UserRoute>
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
