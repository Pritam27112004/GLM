import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  Award,
  Briefcase,
  BarChart3,
  User,
  Sparkles,
  Users,
  Calendar,
  Layers,
  CheckSquare,
  Cpu,
  X,
  ChevronRight
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  const adminNav = [
    {
      group: 'Overview',
      items: [
        { label: 'Admin Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Central Analytics', path: '/admin/analytics', icon: BarChart3 }
      ]
    },
    {
      group: 'Core Systems',
      items: [
        { label: 'Attendance & Edge Nodes', path: '/admin/attendance', icon: CalendarCheck, badge: 'RPi 5' },
        { label: 'LMS Course Catalog', path: '/admin/courses', icon: BookOpen },
        { label: 'Training Programmes', path: '/admin/programmes', icon: Calendar },
        { label: 'Certificate Registry', path: '/admin/certificates', icon: Award },
        { label: 'Job Opportunities', path: '/admin/jobs', icon: Briefcase }
      ]
    },
    {
      group: 'Personnel & Faculty',
      items: [
        { label: 'Employee Directory', path: '/admin/employees', icon: Users }
      ]
    }
  ];

  const traineeNav = [
    {
      group: 'My Workspace',
      items: [
        { label: 'Trainee Dashboard', path: '/user/dashboard', icon: LayoutDashboard },
        { label: 'AI Career Assistant', path: '/user/career-assistant', icon: Sparkles, highlight: true }
      ]
    },
    {
      group: 'Learning & Certification',
      items: [
        { label: 'LMS Courses', path: '/user/courses', icon: BookOpen },
        { label: 'Upcoming Programmes', path: '/user/programmes', icon: Calendar },
        { label: 'My Certificates', path: '/user/certificates', icon: Award }
      ]
    },
    {
      group: 'Attendance & Career',
      items: [
        { label: 'My Attendance', path: '/user/attendance', icon: CalendarCheck },
        { label: 'Job Opportunities', path: '/user/jobs', icon: Briefcase },
        { label: 'My Profile', path: '/user/profile', icon: User }
      ]
    }
  ];

  const navSections = isAdmin ? adminNav : traineeNav;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#071A2E]/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#0B2A4A] text-slate-200 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header inside Sidebar */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1976D2] to-[#19A7CE] text-white font-extrabold text-xs flex items-center justify-center shadow-md">
              NCCT
            </div>
            <div>
              <span className="font-extrabold text-sm text-white tracking-wide block">
                COOPERATIVE
              </span>
              <span className="text-[10px] text-cyan-300 font-medium tracking-wider uppercase block">
                Training Intelligence
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navSections.map((section, sIdx) => (
            <div key={sIdx}>
              <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                {section.group}
              </p>
              <nav className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path || (item.path !== '/admin/dashboard' && item.path !== '/user/dashboard' && location.pathname.startsWith(item.path));

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                        isActive
                          ? 'bg-[#1976D2] text-white font-bold shadow-md shadow-[#1976D2]/30'
                          : item.highlight
                          ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/10 text-amber-300 hover:bg-white/10 border border-amber-500/30'
                          : 'text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-amber-400' : 'text-slate-400 group-hover:text-cyan-300'}`} />
                        <span>{item.label}</span>
                      </div>

                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#19A7CE]/20 text-[#19A7CE] border border-[#19A7CE]/30">
                          {item.badge}
                        </span>
                      )}
                      {item.highlight && !isActive && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#F28C28] text-white">
                          AI
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom User Snapshot */}
        <div className="p-3 border-t border-white/10 bg-[#071A2E]">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/10">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
              alt={user?.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-[#19A7CE]"
            />
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-white block truncate leading-tight">
                {user?.name || 'Rahul Sharma'}
              </span>
              <span className="text-[10px] text-cyan-300 font-semibold block truncate">
                {user?.institution || 'RICM Patna'}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
