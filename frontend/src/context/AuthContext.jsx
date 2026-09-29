import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const ADMIN_USER = {
  userId: 'admin@ncct.demo',
  email: 'admin@ncct.demo',
  name: 'Dr. Sunil Joshi',
  designation: 'Director of Training & Academics',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  institution: 'NCCT Headquarters - New Delhi',
  state: 'Delhi'
};

const TRAINEE_USER = {
  userId: 'user@ncct.demo',
  email: 'user@ncct.demo',
  name: 'Rahul Sharma',
  designation: 'Cooperative Trainee & Officer Candidate',
  role: 'trainee',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  institution: 'RICM Patna (Regional Institute of Cooperative Management)',
  state: 'Bihar',
  traineeId: 'TRN-2026-081',
  profileCompletion: 88,
  skills: ['Digital Literacy', 'PACS Accounting', 'Cooperative Management', 'Agri-Credit Analysis']
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('ncct_current_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ADMIN_USER; // Default to admin for review or trainee
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    if (user) {
      localStorage.setItem('ncct_current_user', JSON.stringify(user));
    }
  }, [user]);

  const login = (email, password) => {
    if (email === 'admin@ncct.demo' || email.includes('admin')) {
      setUser(ADMIN_USER);
      setIsAuthenticated(true);
      return { success: true, role: 'admin', redirect: '/admin/dashboard' };
    } else {
      setUser(TRAINEE_USER);
      setIsAuthenticated(true);
      return { success: true, role: 'trainee', redirect: '/user/dashboard' };
    }
  };

  const loginAsAdmin = () => {
    setUser(ADMIN_USER);
    setIsAuthenticated(true);
  };

  const loginAsTrainee = () => {
    setUser(TRAINEE_USER);
    setIsAuthenticated(true);
  };

  const switchRole = () => {
    if (user.role === 'admin') {
      setUser(TRAINEE_USER);
      return '/user/dashboard';
    } else {
      setUser(ADMIN_USER);
      return '/admin/dashboard';
    }
  };

  const logout = () => {
    localStorage.removeItem('ncct_current_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (data) => {
    setUser(prev => ({ ...prev, ...data }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin: user?.role === 'admin',
        isTrainee: user?.role === 'trainee',
        login,
        loginAsAdmin,
        loginAsTrainee,
        switchRole,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
