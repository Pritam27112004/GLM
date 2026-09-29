import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import {
  Shield,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  Award,
  BookOpen,
  CalendarCheck,
  Briefcase
} from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('admin@ncct.demo');
  const [password, setPassword] = useState('admin123');
  const [selectedRole, setSelectedRole] = useState('admin');
  const { login, loginAsAdmin, loginAsTrainee } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (role === 'admin') {
      setEmail('admin@ncct.demo');
      setPassword('admin123');
    } else {
      setEmail('user@ncct.demo');
      setPassword('user123');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    addToast({
      title: `Logged in as ${result.role === 'admin' ? 'NCCT Administrator' : 'Trainee'}`,
      message: `Welcome to NCCT Cooperative Training Intelligence Platform.`,
      type: 'success'
    });
    navigate(result.redirect);
  };

  const handleQuickAdmin = () => {
    loginAsAdmin();
    addToast({
      title: 'Administrator Session Started',
      message: 'Accessing NCCT central management dashboard.',
      type: 'success'
    });
    navigate('/admin/dashboard');
  };

  const handleQuickTrainee = () => {
    loginAsTrainee();
    addToast({
      title: 'Trainee Session Started',
      message: 'Welcome back, Rahul Sharma (RICM Patna).',
      type: 'success'
    });
    navigate('/user/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B2A4A] via-[#0D3B66] to-[#071A2E] flex flex-col justify-between p-4 sm:p-6 lg:p-8 text-slate-100">
      {/* Top Institutional Header */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1976D2] to-[#19A7CE] text-white font-black text-lg flex items-center justify-center shadow-lg border border-white/20">
            NCCT
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-widest font-extrabold text-amber-400 block">
              Ministry of Cooperation • Govt of India
            </span>
            <h1 className="text-lg sm:text-xl font-black text-white tracking-wide">
              COOPERATIVE TRAINING INTELLIGENCE
            </h1>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 text-xs text-slate-300">
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
            VAMNICOM • RICMs • ICMs
          </span>
        </div>
      </div>

      {/* Main Login Card and Platform Highlights */}
      <div className="max-w-6xl mx-auto w-full my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Information & Continuous Pipeline */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#19A7CE]/20 text-[#19A7CE] border border-[#19A7CE]/40">
              Integrated Digital Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              A Unified Platform for Training, Skill Certification & Rural Employment
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              Digitizing cooperative education across India. Connecting Primary Agricultural Credit Societies (PACS), Dairy Federations, and rural youth into a structured pipeline.
            </p>
          </div>

          {/* Continuous Pipeline Flow */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
              Continuous Training-to-Employment Pipeline
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-semibold">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <BookOpen className="w-5 h-5 mx-auto text-[#19A7CE] mb-1" />
                <span>1. Training</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <CalendarCheck className="w-5 h-5 mx-auto text-[#2E9D59] mb-1" />
                <span>2. Attendance</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <BookOpen className="w-5 h-5 mx-auto text-amber-400 mb-1" />
                <span>3. LMS Modules</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <Award className="w-5 h-5 mx-auto text-purple-400 mb-1" />
                <span>4. Certification</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                <Briefcase className="w-5 h-5 mx-auto text-rose-400 mb-1" />
                <span>5. Employment</span>
              </div>
            </div>
          </div>

          {/* Hardware & Edge Prototype Accents */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-white/5 border border-cyan-500/20">
              <span className="text-cyan-300 font-bold block mb-1">📷 Raspberry Pi 5 Edge Node</span>
              <p className="text-[11px] text-slate-300">Biometric & QR automated attendance capture simulation.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-amber-500/20">
              <span className="text-amber-300 font-bold block mb-1">🤖 Jetson Nano Local AI</span>
              <p className="text-[11px] text-slate-300">Edge offline career advisory and skill gap evaluation.</p>
            </div>
          </div>
        </div>

        {/* Right: Login Form & Quick Demo Buttons */}
        <div className="lg:col-span-5">
          <div className="bg-white text-[#172033] rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden">
            <div className="mb-6 text-center">
              <h3 className="text-xl font-black text-[#0B2A4A] tracking-tight">
                Portal Authentication
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Select your demonstration profile to proceed
              </p>
            </div>

            {/* Quick Demo Switcher Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-xl mb-5">
              <button
                type="button"
                onClick={() => handleRoleSelect('admin')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === 'admin'
                    ? 'bg-[#0B2A4A] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>ADMIN</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('trainee')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === 'trainee'
                    ? 'bg-[#1976D2] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>USER / TRAINEE</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official ID / Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#19A7CE] focus:outline-none font-medium text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#19A7CE] focus:outline-none font-medium text-slate-800"
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-500 space-y-0.5">
                <span className="font-bold text-slate-700 block">Prototype Credentials:</span>
                <div>Admin: <code className="text-[#0B2A4A] font-mono font-bold">admin@ncct.demo</code> / <code className="font-mono">admin123</code></div>
                <div>User: <code className="text-[#1976D2] font-mono font-bold">user@ncct.demo</code> / <code className="font-mono">user123</code></div>
              </div>

              <button
                type="submit"
                className="w-full btn-primary py-3 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <span>Enter {selectedRole === 'admin' ? 'Admin Dashboard' : 'Trainee Portal'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Instant 1-Click Demo Buttons */}
            <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
              <span className="text-[11px] uppercase font-bold text-slate-400 text-center block tracking-wider">
                Instant Demo Quick Login
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleQuickAdmin}
                  className="w-full py-2 px-3 rounded-xl border border-[#0B2A4A]/20 bg-[#EAF5FB] hover:bg-[#D4EDFA] text-[#0B2A4A] font-bold text-xs transition-colors"
                >
                  ⚡ Enter as Admin
                </button>
                <button
                  type="button"
                  onClick={handleQuickTrainee}
                  className="w-full py-2 px-3 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition-colors"
                >
                  ⚡ Enter as Trainee
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto w-full pt-4 border-t border-white/10 text-center text-xs text-slate-400">
        NCCT Cooperative Training Intelligence Prototype • National Council for Cooperative Training • Ministry of Cooperation, New Delhi
      </div>
    </div>
  );
};

export default Login;
