import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import JobDescription from './components/JobDescription';
import PostJob from './components/PostJob';
import Browse from './components/Browse';
import Messaging from './components/Messaging';
import AdminDashboard from './components/admin/AdminDashboard';
import Profile from './components/iconPages/Profile';
import Fav from './components/iconPages/Fav';
import Notification from './components/iconPages/Notification';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs/:id" element={<JobDescription />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/messages" element={<Messaging />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/fav" element={<Fav/>} />
        <Route path="/notification" element={<Notification/>} />
      </Routes>
    </Router>
  );
}

export default App;
