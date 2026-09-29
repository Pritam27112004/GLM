import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import LowBandwidthToggle from '../Common/LowBandwidthToggle';
import {
  Bell,
  Menu,
  X,
  User,
  LogOut,
  Shield,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export const Navbar = ({ onToggleSidebar }) => {
  const { user, isAdmin, switchRole, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotification();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleSwitch = () => {
    const nextRoute = switchRole();
    navigate(nextRoute);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-subtle">
      {/* Top Institutional Bar */}
      <div className="bg-[#0B2A4A] text-white px-4 py-1 text-[11px] flex justify-between items-center tracking-wide font-medium">
        <div className="flex items-center gap-2 truncate">
          <span className="bg-amber-500 text-[#0B2A4A] px-1.5 py-0.2 rounded font-extrabold text-[10px]">GOVT OF INDIA</span>
          <span className="truncate">Ministry of Cooperation • National Council for Cooperative Training (NCCT)</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-slate-300">
          <span>VAMNICOM • 5 RICMs • 14 ICMs Network</span>
          <span className="text-amber-400 font-bold">• 100% Digital Prototype</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Hamburger & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-slate-600 hover:text-[#0B2A4A] hover:bg-slate-100 lg:hidden"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to={isAdmin ? '/admin/dashboard' : '/user/dashboard'} className="flex items-center gap-3 group">
            {/* Logo Emblem */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B2A4A] to-[#1976D2] text-white flex items-center justify-center shadow-sm font-black text-sm tracking-tighter border border-white/20">
              NCCT
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base text-[#0B2A4A] tracking-tight leading-none group-hover:text-[#1976D2] transition-colors">
                  NCCT INTELLIGENCE
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase block mt-0.5">
                Cooperative Training Platform
              </span>
            </div>
          </Link>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Low Bandwidth Selector */}
          <div className="hidden lg:block">
            <LowBandwidthToggle />
          </div>

          {/* Role Switcher Demo Button */}
          <button
            onClick={handleRoleSwitch}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 shadow-xs ${
              isAdmin
                ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                : 'bg-blue-50 text-blue-900 border-blue-300 hover:bg-blue-100'
            }`}
            title="Toggle between Admin view and Trainee view"
          >
            {isAdmin ? (
              <>
                <GraduationCap className="w-4 h-4 text-amber-700" />
                <span className="hidden sm:inline">Switch to Trainee View</span>
                <span className="sm:hidden">Trainee</span>
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 text-blue-700" />
                <span className="hidden sm:inline">Switch to Admin View</span>
                <span className="sm:hidden">Admin</span>
              </>
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg text-slate-600 hover:text-[#0B2A4A] hover:bg-slate-100 relative transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#F28C28] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-fade-in">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#0B2A4A] uppercase tracking-wider">Notifications</h4>
                    <p className="text-[11px] text-slate-500">{unreadCount} unread updates</p>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-[11px] text-[#1976D2] hover:underline font-semibold"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markAsRead(notif.id);
                        if (notif.link) {
                          navigate(notif.link);
                          setShowNotifications(false);
                        }
                      }}
                      className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors ${
                        !notif.read ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="text-xs font-bold text-[#0B2A4A] leading-snug">{notif.title}</h5>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-[#19A7CE] flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
                      <span className="text-[10px] text-slate-400 mt-1.5 block">{notif.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                alt={user?.name || 'User'}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#0B2A4A]/20"
              />
              <div className="hidden md:block text-left">
                <span className="text-xs font-bold text-[#0B2A4A] block leading-tight truncate max-w-[120px]">
                  {user?.name || 'Rahul Sharma'}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">
                  {user?.role === 'admin' ? 'NCCT Admin' : 'Trainee'}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50 animate-fade-in">
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <p className="text-xs font-bold text-[#0B2A4A]">{user?.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                  <span className="mt-1 inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#EAF5FB] text-[#1976D2]">
                    {user?.institution || 'RICM Patna'}
                  </span>
                </div>

                <div className="py-1 text-xs text-slate-700">
                  <Link
                    to="/user/profile"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>View Profile</span>
                  </Link>
                  <Link
                    to="/user/career-assistant"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-[#1976D2] font-semibold"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>AI Career Assistant</span>
                  </Link>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={() => {
                      logout();
                      navigate('/login');
                    }}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
