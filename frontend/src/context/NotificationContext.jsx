import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

const initialNotifications = [
  {
    id: 'n1',
    title: 'New Training Programme Open for Registration',
    message: 'Digital Cooperative Management at RICM Patna starts on 01 Oct 2026. 15 seats remaining.',
    type: 'programme',
    link: '/user/programmes',
    read: false,
    timestamp: '10 mins ago'
  },
  {
    id: 'n2',
    title: 'Certificate Verified & Issued',
    message: 'Your certificate for PACS Digital Operations (NCCT-CERT-2026-00125) is now officially sealed.',
    type: 'certificate',
    link: '/user/certificates',
    read: false,
    timestamp: '2 hours ago'
  },
  {
    id: 'n3',
    title: 'New Job Opportunity Posted',
    message: 'West Bengal State Apex Cooperative Society is hiring a Cooperative Field Officer.',
    type: 'job',
    link: '/user/jobs',
    read: false,
    timestamp: '5 hours ago'
  },
  {
    id: 'n4',
    title: 'Attendance Logged (Simulated Edge Node)',
    message: 'Raspberry Pi 5 + Camera marked Present at 09:12 AM (98.6% confidence).',
    type: 'attendance',
    link: '/user/attendance',
    read: true,
    timestamp: '1 day ago'
  }
];

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [toasts, setToasts] = useState([]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addToast = ({ title, message, type = 'success', duration = 4000 }) => {
    const id = Date.now().toString();
    const newToast = { id, title, message, type };
    setToasts(prev => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
