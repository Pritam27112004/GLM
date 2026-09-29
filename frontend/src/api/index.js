import axios from 'axios';
import { getDB, saveDB } from '../data/mockStore';

const API_BASE = '/api';

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Standalone AI Career Response Generator
const generateLocalAIResponse = (query) => {
  const q = (query || '').toLowerCase();

  if (q.includes('what course') || q.includes('recommend') || q.includes('learn') || q.includes('suggest course')) {
    return {
      message: `Based on your trainee profile at **RICM Patna** and current progress in **Digital Literacy (72%)**, here are the top 3 recommended courses to accelerate your cooperative career:

1. **PACS Digital Operations** (*Advanced* • 5 Weeks): Essential for managing digitized Primary Agricultural Credit Societies, national Chart of Accounts, and KCC loan disbursements.
2. **Dairy Cooperative Management** (*Intermediate* • 3 Weeks): High demand across State Milk Federations and AMCU automated collection centers.
3. **Agricultural Entrepreneurship** (*Intermediate* • 4 Weeks): Focuses on Farmer Producer Organization (FPO) business models and NABARD equity schemes.

*Tip: Completing the assessment for Digital Literacy will immediately unlock your digital certificate and increase your job matching score by 25%.*`,
      suggestedActions: [
        { label: 'View PACS Digital Operations', link: '/user/courses/c3' },
        { label: 'Continue Digital Literacy', link: '/user/courses/c1' },
        { label: 'View Upcoming Programmes', link: '/user/programmes' }
      ]
    };
  }

  if (q.includes('find job') || q.includes('jobs') || q.includes('employment') || q.includes('career') || q.includes('hiring')) {
    return {
      message: `You currently hold **2 verified NCCT credentials** which qualify you for several high-priority cooperative vacancies in eastern and northern states:

• **Cooperative Field Officer** (West Bengal Apex Cooperative) – ₹28,000 - ₹42,000/mo (Requires: PACS Operations, Digital Literacy)
• **Digital Operations Assistant** (Kolkata Central Cooperative Bank) – ₹24,000 - ₹34,000/mo
• **PACS Accounts & Systems Auditor** (UP Cooperative Board) – ₹32,000 - ₹46,000/mo

Your verified certificates (\`NCCT-CERT-2026-00124\` & \`NCCT-CERT-2026-00125\`) are automatically attached when you click **Apply Now** in the Jobs section.`,
      suggestedActions: [
        { label: 'Browse Job Openings', link: '/user/jobs' },
        { label: 'Check Verified Certificates', link: '/user/certificates' }
      ]
    };
  }

  if (q.includes('improve skill') || q.includes('skill') || q.includes('profile')) {
    return {
      message: `Your current skill matrix shows strong foundation in **Digital Literacy** and **PACS Accounting**. To reach the Senior Cooperative Executive tier:

1. **Attend Hybrid Training Programmes**: Register for the upcoming *Digital Cooperative Management* workshop at RICM Patna (starts 01 Oct 2026).
2. **Master Statutory Compliance**: Take the *Financial Literacy & Cooperative Accounting* course to gain auditing competencies.
3. **Maintain High Attendance**: Your attendance is currently at **91%**, which meets the criteria for NCCT merit accreditation.`,
      suggestedActions: [
        { label: 'Explore Training Programmes', link: '/user/programmes' },
        { label: 'View My Attendance', link: '/user/attendance' }
      ]
    };
  }

  if (q.includes('certificate') || q.includes('cert') || q.includes('verified')) {
    return {
      message: `You have **2 officially issued and verified NCCT digital certificates**:

1. **NCCT-CERT-2026-00124**: *Digital Literacy for Cooperative Personnel* (Issued: 29 Aug 2026 • Score: 88%)
2. **NCCT-CERT-2026-00125**: *PACS Digital Operations & Accounting Masterclass* (Issued: 14 Sep 2026 • Score: 92%)

Both certificates feature cryptographic QR verification signed by the NCCT Director General and can be viewed or downloaded anytime.`,
      suggestedActions: [
        { label: 'View My Certificates', link: '/user/certificates' }
      ]
    };
  }

  if (q.includes('programme') || q.includes('training') || q.includes('upcoming') || q.includes('schedule')) {
    return {
      message: `Here are the upcoming national training programmes open for registration:

• **Digital Cooperative Management Training** (RICM Patna) • 01 Oct – 15 Oct 2026 • Hybrid (45/60 seats filled)
• **Dairy Cooperative Entrepreneurship & Value Chain** (VAMNICOM Pune) • 10 Oct – 25 Oct 2026 • Residential
• **PACS Digital Transformation Masterclass** (ICM Lucknow) • 18 Oct – 30 Oct 2026 • Online

You can register with a single click from the Upcoming Programmes tab.`,
      suggestedActions: [
        { label: 'Register for Programmes', link: '/user/programmes' }
      ]
    };
  }

  return {
    message: `Hello! I am your **NCCT Cooperative Career Assistant**. 

I can help you navigate courses across VAMNICOM, RICMs, and ICMs, check your verified certifications, track training attendance recorded via edge nodes, and discover relevant cooperative job opportunities.

How can I help guide your cooperative learning pathway today?`,
    suggestedActions: [
      { label: 'Recommended Courses', query: 'What courses should I take?' },
      { label: 'Job Opportunities', query: 'How can I find cooperative sector jobs?' },
      { label: 'My Certificates', query: 'What certificates do I have?' },
      { label: 'Upcoming Programmes', query: 'Show me upcoming training programmes' }
    ]
  };
};

export const api = {
  // Health
  getHealth: async () => {
    try {
      const res = await apiClient.get('/health');
      return res.data;
    } catch (e) {
      return {
        status: 'healthy',
        mode: 'standalone-frontend',
        version: '1.0.0-PROTOTYPE',
        nodes: { attendanceEdge: 'Raspberry Pi 5 (Simulation Mode)', localAI: 'Jetson Nano (Simulated)' }
      };
    }
  },

  // Courses
  getCourses: async (params = {}) => {
    try {
      const res = await apiClient.get('/courses', { params });
      return res.data;
    } catch (e) {
      const db = getDB();
      let courses = db.courses || [];
      if (params.category && params.category !== 'All') {
        courses = courses.filter(c => c.category === params.category);
      }
      return { success: true, count: courses.length, data: courses };
    }
  },
  getCourseById: async (id) => {
    try {
      const res = await apiClient.get(`/courses/${id}`);
      return res.data;
    } catch (e) {
      const db = getDB();
      const course = db.courses?.find(c => c.courseId === id) || db.courses?.[0];
      return { success: true, data: course };
    }
  },
  createCourse: async (courseData) => {
    try {
      const res = await apiClient.post('/courses', courseData);
      return res.data;
    } catch (e) {
      const db = getDB();
      const newCourse = {
        ...courseData,
        courseId: courseData.courseId || `c${Date.now()}`,
        status: courseData.status || 'Active',
        enrolledStudents: 0,
        completionRate: 0,
        averageRating: 5.0,
        modules: courseData.modules || []
      };
      db.courses = [newCourse, ...(db.courses || [])];
      saveDB(db);
      return { success: true, data: newCourse };
    }
  },
  updateCourse: async (id, courseData) => {
    try {
      const res = await apiClient.put(`/courses/${id}`, courseData);
      return res.data;
    } catch (e) {
      const db = getDB();
      const idx = db.courses?.findIndex(c => c.courseId === id);
      if (idx !== -1) {
        db.courses[idx] = { ...db.courses[idx], ...courseData };
        saveDB(db);
        return { success: true, data: db.courses[idx] };
      }
      return { success: true, data: courseData };
    }
  },
  recordProgress: async (id, progressData) => {
    try {
      const res = await apiClient.post(`/courses/${id}/progress`, progressData);
      return res.data;
    } catch (e) {
      return { success: true, data: { courseId: id, ...progressData } };
    }
  },

  // Training Programmes
  getProgrammes: async (params = {}) => {
    try {
      const res = await apiClient.get('/programmes', { params });
      return res.data;
    } catch (e) {
      const db = getDB();
      let progs = db.programmes || [];
      if (params.institution && params.institution !== 'All') {
        progs = progs.filter(p => p.institution.toLowerCase().includes(params.institution.toLowerCase()));
      }
      return { success: true, count: progs.length, data: progs };
    }
  },
  getProgrammeById: async (id) => {
    try {
      const res = await apiClient.get(`/programmes/${id}`);
      return res.data;
    } catch (e) {
      const db = getDB();
      const prog = db.programmes?.find(p => p.programmeId === id);
      return { success: true, data: prog };
    }
  },
  createProgramme: async (programmeData) => {
    try {
      const res = await apiClient.post('/programmes', programmeData);
      return res.data;
    } catch (e) {
      const db = getDB();
      const newProg = {
        ...programmeData,
        programmeId: programmeData.programmeId || `p${Date.now()}`,
        registeredParticipants: 0,
        status: programmeData.status || 'Upcoming'
      };
      db.programmes = [newProg, ...(db.programmes || [])];
      saveDB(db);
      return { success: true, data: newProg };
    }
  },
  registerProgramme: async (id, registrationData) => {
    try {
      const res = await apiClient.post(`/programmes/${id}/register`, registrationData);
      return res.data;
    } catch (e) {
      const db = getDB();
      const prog = db.programmes?.find(p => p.programmeId === id);
      if (prog) {
        prog.registeredParticipants = (prog.registeredParticipants || 0) + 1;
        saveDB(db);
      }
      return { success: true, message: 'Programme registration submitted successfully', data: { programmeId: id, status: 'Confirmed' } };
    }
  },

  // Attendance
  getAttendance: async (params = {}) => {
    try {
      const res = await apiClient.get('/attendance', { params });
      return res.data;
    } catch (e) {
      const db = getDB();
      let att = db.attendance || [];
      if (params.personType) {
        att = att.filter(a => a.personType === params.personType);
      }
      if (params.personId) {
        att = att.filter(a => a.personId === params.personId || a.personId === 'user@ncct.demo' || a.personId === 'TRN-2026-081');
      }
      return { success: true, count: att.length, data: att };
    }
  },
  getDeviceStatus: async () => {
    try {
      const res = await apiClient.get('/attendance/device-status');
      return res.data;
    } catch (e) {
      return {
        success: true,
        data: {
          deviceModel: 'Raspberry Pi 5 (8GB) + Sony IMX708 Camera Module',
          firmwareVersion: 'NCCT-Edge-v2.4.1-SIM',
          status: 'SIMULATION ACTIVE',
          integrationType: 'Prototype Mode – Raspberry Pi Attendance Integration',
          edgeNodeLocation: 'RICM Patna - Main Entry Gate / Academic Hall',
          ipAddress: '192.168.1.145',
          fps: '30 FPS (Simulated)',
          lastHeartbeat: new Date().toLocaleTimeString(),
          confidenceThreshold: '95.0%'
        }
      };
    }
  },
  simulateAttendanceCheckin: async (data) => {
    try {
      const res = await apiClient.post('/attendance/simulate-checkin', data);
      return res.data;
    } catch (e) {
      const db = getDB();
      const now = new Date();
      const newRecord = {
        attendanceId: `ATT-${Date.now().toString().slice(-8)}`,
        personId: data.personId || 'EMP001',
        personName: data.personName || 'Rahul Sharma',
        personType: data.personType || 'Employee',
        departmentOrBatch: data.departmentOrBatch || 'Administration',
        date: now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        checkIn: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        checkOut: '--',
        status: 'Present',
        capturedVia: 'Raspberry Pi 5 + Camera (Simulated Live Trigger)',
        confidenceScore: +(95 + Math.random() * 4.8).toFixed(1)
      };
      db.attendance = [newRecord, ...(db.attendance || [])];
      saveDB(db);
      return { success: true, data: newRecord };
    }
  },

  // Employees
  getEmployees: async (params = {}) => {
    try {
      const res = await apiClient.get('/employees', { params });
      return res.data;
    } catch (e) {
      const db = getDB();
      let emps = db.employees || [];
      if (params.department && params.department !== 'All') {
        emps = emps.filter(e => e.department === params.department);
      }
      return { success: true, count: emps.length, data: emps };
    }
  },
  getEmployeeById: async (id) => {
    try {
      const res = await apiClient.get(`/employees/${id}`);
      return res.data;
    } catch (e) {
      const db = getDB();
      const emp = db.employees?.find(e => e.employeeId === id);
      return { success: true, data: emp };
    }
  },
  createEmployee: async (employeeData) => {
    try {
      const res = await apiClient.post('/employees', employeeData);
      return res.data;
    } catch (e) {
      const db = getDB();
      const newEmp = {
        ...employeeData,
        employeeId: employeeData.employeeId || `EMP${Math.floor(100 + Math.random() * 900)}`,
        attendanceRate: 100.0,
        todayStatus: 'Present',
        checkIn: '09:00 AM',
        checkOut: '--'
      };
      db.employees = [newEmp, ...(db.employees || [])];
      saveDB(db);
      return { success: true, data: newEmp };
    }
  },
  updateEmployee: async (id, employeeData) => {
    try {
      const res = await apiClient.put(`/employees/${id}`, employeeData);
      return res.data;
    } catch (e) {
      const db = getDB();
      const idx = db.employees?.findIndex(e => e.employeeId === id);
      if (idx !== -1) {
        db.employees[idx] = { ...db.employees[idx], ...employeeData };
        saveDB(db);
        return { success: true, data: db.employees[idx] };
      }
      return { success: true, data: employeeData };
    }
  },

  // Certificates
  getCertificates: async (params = {}) => {
    try {
      const res = await apiClient.get('/certificates', { params });
      return res.data;
    } catch (e) {
      const db = getDB();
      let certs = db.certificates || [];
      if (params.traineeId) {
        certs = certs.filter(c => c.traineeId === params.traineeId || params.traineeId === 'user@ncct.demo');
      }
      return { success: true, count: certs.length, data: certs };
    }
  },
  verifyCertificate: async (id) => {
    try {
      const res = await apiClient.get(`/certificates/verify/${id}`);
      return res.data;
    } catch (e) {
      const db = getDB();
      const cert = db.certificates?.find(c => c.certificateId === id);
      if (cert) {
        cert.status = 'Verified';
        saveDB(db);
      }
      return { success: true, verified: true, data: cert };
    }
  },
  issueCertificate: async (certificateData) => {
    try {
      const res = await apiClient.post('/certificates', certificateData);
      return res.data;
    } catch (e) {
      const db = getDB();
      const newCert = {
        ...certificateData,
        certificateId: certificateData.certificateId || `NCCT-CERT-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        issueDate: certificateData.issueDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'Verified'
      };
      db.certificates = [newCert, ...(db.certificates || [])];
      saveDB(db);
      return { success: true, data: newCert };
    }
  },

  // Jobs
  getJobs: async (params = {}) => {
    try {
      const res = await apiClient.get('/jobs', { params });
      return res.data;
    } catch (e) {
      const db = getDB();
      let jobs = db.jobs || [];
      if (params.employmentType && params.employmentType !== 'All') {
        jobs = jobs.filter(j => j.employmentType === params.employmentType);
      }
      return { success: true, count: jobs.length, data: jobs };
    }
  },
  getJobById: async (id) => {
    try {
      const res = await apiClient.get(`/jobs/${id}`);
      return res.data;
    } catch (e) {
      const db = getDB();
      const job = db.jobs?.find(j => j.jobId === id);
      return { success: true, data: job };
    }
  },
  createJob: async (jobData) => {
    try {
      const res = await apiClient.post('/jobs', jobData);
      return res.data;
    } catch (e) {
      const db = getDB();
      const newJob = {
        ...jobData,
        jobId: jobData.jobId || `j${Date.now()}`,
        postedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        totalApplications: 0,
        status: 'Active'
      };
      db.jobs = [newJob, ...(db.jobs || [])];
      saveDB(db);
      return { success: true, data: newJob };
    }
  },
  applyJob: async (id, applicationData) => {
    try {
      const res = await apiClient.post(`/jobs/${id}/apply`, applicationData);
      return res.data;
    } catch (e) {
      const db = getDB();
      const job = db.jobs?.find(j => j.jobId === id);
      if (job) {
        job.totalApplications = (job.totalApplications || 0) + 1;
        saveDB(db);
      }
      return { success: true, message: 'Application submitted successfully', data: { jobId: id, status: 'Under Review' } };
    }
  },

  // Analytics
  getAnalytics: async () => {
    try {
      const res = await apiClient.get('/analytics');
      return res.data;
    } catch (e) {
      const db = getDB();
      return { success: true, data: db.analytics };
    }
  },

  // Users & Profile
  getUsers: async () => {
    try {
      const res = await apiClient.get('/users');
      return res.data;
    } catch (e) {
      const db = getDB();
      return { success: true, data: db.users };
    }
  },
  getUserProfile: async (userId) => {
    try {
      const res = await apiClient.get(`/users/profile/${userId}`);
      return res.data;
    } catch (e) {
      const db = getDB();
      const user = db.users?.find(u => u.userId === userId || u.email === userId) || db.users?.[1];
      return { success: true, data: user };
    }
  },
  updateUserProfile: async (userId, profileData) => {
    try {
      const res = await apiClient.put(`/users/profile/${userId}`, profileData);
      return res.data;
    } catch (e) {
      const db = getDB();
      const idx = db.users?.findIndex(u => u.userId === userId || u.email === userId);
      if (idx !== -1) {
        db.users[idx] = { ...db.users[idx], ...profileData };
        saveDB(db);
        return { success: true, data: db.users[idx] };
      }
      return { success: true, data: profileData };
    }
  },

  // AI Career Assistant
  chatWithAssistant: async (message, userContext = {}) => {
    try {
      const res = await apiClient.post('/career-assistant/chat', { message, userContext });
      return res.data;
    } catch (e) {
      const response = generateLocalAIResponse(message);
      return {
        success: true,
        data: {
          reply: response.message,
          suggestedActions: response.suggestedActions,
          engine: 'Simulated Local AI (Planned: NVIDIA Jetson Nano edge container with DeepSeek/Llama-3 quantized models)',
          status: 'Standalone Prototype Mode'
        }
      };
    }
  }
};

export default api;
