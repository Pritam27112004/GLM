import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Login from './pages/Login';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAttendance from './pages/admin/AdminAttendance';
import AdminEmployees from './pages/admin/AdminEmployees';
import AdminCourses from './pages/admin/AdminCourses';
import AdminCourseDetail from './pages/admin/AdminCourseDetail';
import AdminProgrammes from './pages/admin/AdminProgrammes';
import AdminJobs from './pages/admin/AdminJobs';
import AdminCertificates from './pages/admin/AdminCertificates';
import AdminAnalytics from './pages/admin/AdminAnalytics';

// User / Trainee Pages
import UserDashboard from './pages/user/UserDashboard';
import UserCourses from './pages/user/UserCourses';
import UserCourseDetail from './pages/user/UserCourseDetail';
import UserProgrammes from './pages/user/UserProgrammes';
import UserCertificates from './pages/user/UserCertificates';
import UserJobs from './pages/user/UserJobs';
import UserAttendance from './pages/user/UserAttendance';
import UserProfile from './pages/user/UserProfile';
import UserCareerAssistant from './pages/user/UserCareerAssistant';

import { useAuth } from './context/AuthContext';

export const App = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <Routes>
      {/* Public Login Route */}
      <Route path="/login" element={<Login />} />

      {/* Main Authenticated Layout Routes */}
      <Route element={<MainLayout />}>
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/attendance" element={<AdminAttendance />} />
        <Route path="/admin/employees" element={<AdminEmployees />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/courses/:id" element={<AdminCourseDetail />} />
        <Route path="/admin/programmes" element={<AdminProgrammes />} />
        <Route path="/admin/jobs" element={<AdminJobs />} />
        <Route path="/admin/certificates" element={<AdminCertificates />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />

        {/* User / Trainee Routes */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/courses" element={<UserCourses />} />
        <Route path="/user/courses/:id" element={<UserCourseDetail />} />
        <Route path="/user/programmes" element={<UserProgrammes />} />
        <Route path="/user/certificates" element={<UserCertificates />} />
        <Route path="/user/jobs" element={<UserJobs />} />
        <Route path="/user/attendance" element={<UserAttendance />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/career-assistant" element={<UserCareerAssistant />} />
      </Route>

      {/* Root redirect */}
      <Route
        path="/"
        element={
          <Navigate to={isAdmin ? '/admin/dashboard' : '/user/dashboard'} replace />
        }
      />

      {/* 404 Catch-All */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
