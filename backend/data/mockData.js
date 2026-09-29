const mockUsers = [
  {
    userId: 'admin@ncct.demo',
    name: 'Dr. Sunil Joshi',
    email: 'admin@ncct.demo',
    phone: '+91 98112 34567',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    institution: 'NCCT Headquarters - New Delhi',
    state: 'Delhi',
    joiningDate: '10 Aug 2021',
    profileCompletion: 100,
    skills: ['Institutional Governance', 'LMS Supervision', 'Cooperative Policy', 'Training Analytics'],
    enrolledCourses: [],
    registeredProgrammes: [],
    appliedJobs: []
  },
  {
    userId: 'user@ncct.demo',
    name: 'Rahul Sharma',
    email: 'user@ncct.demo',
    phone: '+91 98765 43210',
    role: 'trainee',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    institution: 'RICM Patna (Regional Institute of Cooperative Management)',
    state: 'Bihar',
    joiningDate: '15 Jan 2026',
    profileCompletion: 88,
    skills: ['Digital Literacy', 'PACS Accounting', 'Cooperative Management', 'Agri-Credit Analysis'],
    enrolledCourses: [
      {
        courseId: 'c1',
        enrolledDate: '10 Feb 2026',
        progress: 72,
        completedLessons: ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8'],
        assessmentScore: 88,
        status: 'in_progress'
      },
      {
        courseId: 'c2',
        enrolledDate: '18 Feb 2026',
        progress: 45,
        completedLessons: ['l1', 'l2', 'l3', 'l4'],
        assessmentScore: null,
        status: 'in_progress'
      },
      {
        courseId: 'c3',
        enrolledDate: '01 Mar 2026',
        progress: 100,
        completedLessons: ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8', 'l9', 'l10', 'l11', 'l12'],
        assessmentScore: 92,
        status: 'completed'
      },
      {
        courseId: 'c4',
        enrolledDate: '12 Mar 2026',
        progress: 100,
        completedLessons: ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8', 'l9', 'l10'],
        assessmentScore: 85,
        status: 'completed'
      }
    ],
    registeredProgrammes: [
      {
        programmeId: 'p1',
        registrationDate: '15 Sep 2026',
        status: 'Confirmed'
      }
    ],
    appliedJobs: [
      {
        jobId: 'j1',
        appliedDate: '22 Sep 2026',
        status: 'Application Shortlisted'
      }
    ]
  },
  {
    userId: 'ananya@ncct.demo',
    name: 'Ananya Das',
    email: 'ananya.das@ricm.ac.in',
    phone: '+91 94331 12345',
    role: 'trainee',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    institution: 'RICM Kalyani (West Bengal)',
    state: 'West Bengal',
    joiningDate: '01 Feb 2026',
    profileCompletion: 92,
    skills: ['Dairy Cooperative Management', 'Milk Union Operations', 'Cold Chain Logistics'],
    enrolledCourses: [
      {
        courseId: 'c2',
        enrolledDate: '05 Feb 2026',
        progress: 100,
        completedLessons: ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8', 'l9', 'l10'],
        assessmentScore: 85,
        status: 'completed'
      }
    ],
    registeredProgrammes: [],
    appliedJobs: []
  },
  {
    userId: 'amit@ncct.demo',
    name: 'Amit Kumar',
    email: 'amit.kumar@icm.ac.in',
    phone: '+91 98220 54321',
    role: 'trainee',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    institution: 'ICM Lucknow (Uttar Pradesh)',
    state: 'Uttar Pradesh',
    joiningDate: '20 Jan 2026',
    profileCompletion: 75,
    skills: ['Financial Literacy', 'Cooperative Banking', 'Auditing'],
    enrolledCourses: [],
    registeredProgrammes: [],
    appliedJobs: []
  },
  {
    userId: 'priya@ncct.demo',
    name: 'Priya Singh',
    email: 'priya.singh@vamnicom.gov.in',
    phone: '+91 99887 76655',
    role: 'trainee',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    institution: 'VAMNICOM Pune (Maharashtra)',
    state: 'Maharashtra',
    joiningDate: '05 Jan 2026',
    profileCompletion: 95,
    skills: ['Agricultural Entrepreneurship', 'FPO Management', 'Organic Farming Markets'],
    enrolledCourses: [],
    registeredProgrammes: [],
    appliedJobs: []
  },
  {
    userId: 'sourav@ncct.demo',
    name: 'Sourav Roy',
    email: 'sourav.roy@ricm.ac.in',
    phone: '+91 91234 56789',
    role: 'trainee',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    institution: 'ICM Guwahati (Assam)',
    state: 'Assam',
    joiningDate: '12 Feb 2026',
    profileCompletion: 80,
    skills: ['PACS Digital Transformation', 'Fintech In Cooperatives', 'Credit Operations'],
    enrolledCourses: [],
    registeredProgrammes: [],
    appliedJobs: []
  }
];

const mockEmployees = [
  {
    employeeId: 'EMP001',
    name: 'Rahul Sharma',
    designation: 'Training Officer',
    department: 'Administration',
    email: 'rahul.sharma@ncct.gov.in',
    phone: '+91 98765 43210',
    joiningDate: '12 Jan 2023',
    attendanceRate: 94.2,
    todayStatus: 'Present',
    checkIn: '09:12 AM',
    checkOut: '05:32 PM',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  },
  {
    employeeId: 'EMP002',
    name: 'Ananya Das',
    designation: 'Programme Coordinator',
    department: 'Training',
    email: 'ananya.das@ncct.gov.in',
    phone: '+91 94331 12345',
    joiningDate: '18 Jul 2022',
    attendanceRate: 96.5,
    todayStatus: 'Present',
    checkIn: '09:21 AM',
    checkOut: '05:41 PM',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    employeeId: 'EMP003',
    name: 'Amit Kumar',
    designation: 'Accounts Officer',
    department: 'Finance',
    email: 'amit.kumar@ncct.gov.in',
    phone: '+91 98220 54321',
    joiningDate: '05 Mar 2024',
    attendanceRate: 82.0,
    todayStatus: 'Absent',
    checkIn: '--',
    checkOut: '--',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    employeeId: 'EMP004',
    name: 'Priya Singh',
    designation: 'LMS Administrator',
    department: 'IT & Systems',
    email: 'priya.singh@ncct.gov.in',
    phone: '+91 99887 76655',
    joiningDate: '10 Nov 2021',
    attendanceRate: 95.0,
    todayStatus: 'Present',
    checkIn: '08:58 AM',
    checkOut: '05:15 PM',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  },
  {
    employeeId: 'EMP005',
    name: 'Sourav Roy',
    designation: 'Technical Assistant',
    department: 'Field Operations',
    email: 'sourav.roy@ncct.gov.in',
    phone: '+91 91234 56789',
    joiningDate: '01 Feb 2025',
    attendanceRate: 91.0,
    todayStatus: 'Late',
    checkIn: '09:42 AM',
    checkOut: '05:30 PM',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    employeeId: 'EMP006',
    name: 'Kavita Menon',
    designation: 'Research Associate',
    department: 'Training',
    email: 'kavita.menon@vamnicom.gov.in',
    phone: '+91 98123 99881',
    joiningDate: '14 May 2023',
    attendanceRate: 98.0,
    todayStatus: 'Present',
    checkIn: '09:05 AM',
    checkOut: '05:25 PM',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  },
  {
    employeeId: 'EMP007',
    name: 'Rajesh Patel',
    designation: 'Rural Cooperative Specialist',
    department: 'Field Operations',
    email: 'rajesh.patel@ricm.ac.in',
    phone: '+91 94230 44556',
    joiningDate: '03 Aug 2022',
    attendanceRate: 89.5,
    todayStatus: 'On Leave',
    checkIn: '--',
    checkOut: '--',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
  },
  {
    employeeId: 'EMP008',
    name: 'Sunita Meena',
    designation: 'Quality Assurance Lead',
    department: 'Administration',
    email: 'sunita.meena@ncct.gov.in',
    phone: '+91 97110 88223',
    joiningDate: '22 Jan 2024',
    attendanceRate: 93.0,
    todayStatus: 'Present',
    checkIn: '09:10 AM',
    checkOut: '05:20 PM',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80'
  }
];

const mockCourses = [
  {
    courseId: 'c1',
    title: 'Digital Literacy for Cooperative Personnel',
    description: 'Master essential digital tools, cloud spreadsheets, cyber-security basics, and cooperative management software for PACS and cooperative branches.',
    category: 'Digital Literacy',
    trainer: 'Prof. Ramesh Kulkarni (VAMNICOM)',
    duration: '4 Weeks (24 Hours)',
    language: 'Hindi & English',
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    status: 'Active',
    enrolledStudents: 320,
    completionRate: 82,
    averageRating: 4.9,
    totalLessons: 12,
    offlineSupported: true,
    modules: [
      {
        moduleId: 'm1',
        title: 'Module 1: Introduction to Digital Cooperative Ecosystem',
        lessons: [
          { lessonId: 'l1', title: '1.1 Overview of NCCT & Ministry Digital Mandates', duration: '18 mins', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', summary: 'Understanding the digitalization roadmap for cooperative banks and societies.', offlineAvailable: true },
          { lessonId: 'l2', title: '1.2 Computer Fundamentals & Secure Operating Systems', duration: '22 mins', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', summary: 'Best practices for workstations in rural cooperative offices.', offlineAvailable: true },
          { lessonId: 'l3', title: '1.3 Internet Basics, Email Protocol & Digital Registry', duration: '15 mins', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', summary: 'Official communication and archiving procedures.', offlineAvailable: true }
        ]
      },
      {
        moduleId: 'm2',
        title: 'Module 2: Cloud Tools & Data Management for PACS',
        lessons: [
          { lessonId: 'l4', title: '2.1 Electronic Spreadsheets for Daily Ledger', duration: '25 mins', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', summary: 'Formulas, pivot tables, and balance reconciliation.', offlineAvailable: true },
          { lessonId: 'l5', title: '2.2 Cloud Backup & Disaster Recovery Protocols', duration: '20 mins', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', summary: 'Protecting shareholder data against hardware failure.', offlineAvailable: true },
          { lessonId: 'l6', title: '2.3 Digitizing Member Records & KYC Uploads', duration: '18 mins', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4', summary: 'Scanning, optical verification, and document indexing.', offlineAvailable: true }
        ]
      },
      {
        moduleId: 'm3',
        title: 'Module 3: Cyber Security & Financial Fraud Prevention',
        lessons: [
          { lessonId: 'l7', title: '3.1 Recognizing Phishing, OTP Scams & Social Engineering', duration: '24 mins', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', summary: 'Securing farmer accounts against fraud vectors.', offlineAvailable: true },
          { lessonId: 'l8', title: '3.2 Two-Factor Authentication & Biometric Gateways', duration: '16 mins', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', summary: 'Implementing RPi / Jetson biometric verification.', offlineAvailable: true },
          { lessonId: 'l9', title: '3.3 Incident Reporting to NCCT CERT-In Desk', duration: '14 mins', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4', summary: 'Standard operating procedure for breach reporting.', offlineAvailable: true }
        ]
      },
      {
        moduleId: 'm4',
        title: 'Module 4: Practical Applications & Comprehensive Assessment',
        lessons: [
          { lessonId: 'l10', title: '4.1 Case Study: 100% Digitized PACS in Gujarat & Kerala', duration: '30 mins', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', summary: 'Lessons from model digitized primary societies.', offlineAvailable: true },
          { lessonId: 'l11', title: '4.2 End-to-End Simulation: Member Registration to Loan Disbursal', duration: '28 mins', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', summary: 'Live workflow simulation on the NCCT portal.', offlineAvailable: true },
          { lessonId: 'l12', title: '4.3 Final Assessment & Skill Certification Exam', duration: '45 mins', videoUrl: '', summary: 'Qualifying exam for NCCT Digital Competency Certificate.', offlineAvailable: false }
        ]
      }
    ],
    assessmentQuestions: [
      {
        id: 1,
        question: 'What is the primary role of PACS computerization under the Ministry of Cooperation mandate?',
        options: [
          'Replace all local bank branches with corporate offices',
          'Standardize accounting, improve transparency, and connect PACS to DCCBs and NABARD',
          'Eliminate manual cooperative committee meetings',
          'Privatize primary agricultural credit societies'
        ],
        correctAnswer: 1,
        explanation: 'PACS computerization brings ERP standardization, transparent accounting, and direct linkage with District Central Cooperative Banks and NABARD.'
      },
      {
        id: 2,
        question: 'Which cybersecurity measure is essential for preventing unauthorized ledger modifications in PACS software?',
        options: [
          'Sharing one common admin password with all clerks',
          'Role-based access control (RBAC) with dual-authorization and daily cryptographic backups',
          'Disabling internet firewalls for higher speed',
          'Storing unencrypted passwords in a paper notebook'
        ],
        correctAnswer: 1,
        explanation: 'Role-based access control with dual authorization ensures no single user can alter financial ledgers without managerial sign-off.'
      },
      {
        id: 3,
        question: 'What does ERP stand for in the context of cooperative software solutions?',
        options: [
          'Enterprise Resource Planning',
          'Electronic Rural Payment',
          'Emergency Relief Protocol',
          'Executive Report Portal'
        ],
        correctAnswer: 0,
        explanation: 'Enterprise Resource Planning integrates all core accounting, membership, inventory, and loan modules into one database.'
      }
    ]
  },
  {
    courseId: 'c2',
    title: 'Dairy Cooperative Management',
    description: 'Comprehensive operational guide covering milk procurement, cold chain preservation, quality testing, payment automation, and Anand pattern governance.',
    category: 'Dairy',
    trainer: 'Dr. Meenakshi Sunderam (RICM Bengaluru)',
    duration: '3 Weeks (18 Hours)',
    language: 'Hindi, English & Regional',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=600&auto=format&fit=crop&q=80',
    status: 'Active',
    enrolledStudents: 250,
    completionRate: 79,
    averageRating: 4.8,
    totalLessons: 10,
    offlineSupported: true,
    modules: [
      {
        moduleId: 'm1',
        title: 'Module 1: Dairy Cooperative Principles & Structure',
        lessons: [
          { lessonId: 'l1', title: '1.1 The Anand 3-Tier Pattern & Village Milk Societies', duration: '20 mins', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', summary: 'Village society, district milk union, and state federation.', offlineAvailable: true },
          { lessonId: 'l2', title: '1.2 Producer Member Rights, Voting & Profit Sharing', duration: '18 mins', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', summary: 'Democracy and patronage dividend calculation.', offlineAvailable: true }
        ]
      },
      {
        moduleId: 'm2',
        title: 'Module 2: Milk Testing, Quality & Automated Collection',
        lessons: [
          { lessonId: 'l3', title: '2.1 Fat and SNF Testing with Automatic Milk Analyzers', duration: '22 mins', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', summary: 'Ensuring fair pricing based on milk composition.', offlineAvailable: true },
          { lessonId: 'l4', title: '2.2 Direct Benefit Transfer (DBT) for Dairy Farmers', duration: '19 mins', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', summary: 'Linking AMCU with bank accounts for daily milk payments.', offlineAvailable: true }
        ]
      },
      {
        moduleId: 'm3',
        title: 'Module 3: Cold Chain & Bulk Milk Coolers (BMC)',
        lessons: [
          { lessonId: 'l5', title: '3.1 Bulk Milk Cooler Operations & Maintenance', duration: '25 mins', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', summary: 'Preventing bacterial growth with 4°C chilling protocols.', offlineAvailable: true }
        ]
      },
      {
        moduleId: 'm4',
        title: 'Module 4: Value Added Products & Assessment',
        lessons: [
          { lessonId: 'l6', title: '4.1 Paneer, Ghee & Curd Processing Units', duration: '24 mins', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', summary: 'Increasing profit margins for cooperative unions.', offlineAvailable: true },
          { lessonId: 'l7', title: '4.2 Certification Assessment', duration: '30 mins', videoUrl: '', summary: 'Qualifying assessment for Dairy Cooperative Executive.', offlineAvailable: false }
        ]
      }
    ],
    assessmentQuestions: [
      {
        id: 1,
        question: 'What are the two key parameters measured by Automatic Milk Collection Units (AMCU)?',
        options: [
          'Viscosity and Boiling Point',
          'Fat percentage and Solid-Not-Fat (SNF) percentage',
          'Lactose and Carbon Dioxide levels',
          'Temperature and Water Hardness'
        ],
        correctAnswer: 1,
        explanation: 'Fat and SNF determine milk quality grading and the automated payout rate to farmers.'
      }
    ]
  },
  {
    courseId: 'c3',
    title: 'PACS Digital Operations',
    description: 'Detailed training on Primary Agricultural Credit Society (PACS) ERP, credit disbursement, crop loan sanctioning, and Kisan Credit Card reconciliation.',
    category: 'Cooperative Management',
    trainer: 'Er. Alok Ranjan (ICM Lucknow)',
    duration: '5 Weeks (30 Hours)',
    language: 'Hindi & English',
    level: 'Advanced',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    status: 'Active',
    enrolledStudents: 180,
    completionRate: 84,
    averageRating: 4.9,
    totalLessons: 14,
    offlineSupported: true,
    modules: [
      {
        moduleId: 'm1',
        title: 'Module 1: National PACS Common Software Architecture',
        lessons: [
          { lessonId: 'l1', title: '1.1 Standardized Chart of Accounts (CoA)', duration: '25 mins', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', summary: 'Uniform accounting head structures across India.', offlineAvailable: true },
          { lessonId: 'l2', title: '1.2 Multi-Service PACS Business Diversification', duration: '20 mins', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', summary: 'Running fertilizer depots, CSC centers, and petrol pumps through PACS.', offlineAvailable: true }
        ]
      }
    ],
    assessmentQuestions: [
      {
        id: 1,
        question: 'Under the model PACS bye-laws, PACS are authorized to operate which of the following services?',
        options: [
          'Only short-term seasonal crop loans',
          'Common Service Centers (CSC), fertilizer depots, grain storage, and retail fuel pumps',
          'Only long-term mortgage banking',
          'Only dairy marketing'
        ],
        correctAnswer: 1,
        explanation: 'Model bye-laws enable PACS to function as vibrant multi-purpose economic hubs in rural villages.'
      }
    ]
  },
  {
    courseId: 'c4',
    title: 'Agricultural Entrepreneurship',
    description: 'Empowering farmer producer organizations (FPOs) and youth with agribusiness planning, market linkages, export standards, and government subsidies.',
    category: 'Agriculture',
    trainer: 'Dr. Arindam Sen (RICM Patna)',
    duration: '4 Weeks (20 Hours)',
    language: 'Hindi & English',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80',
    status: 'Active',
    enrolledStudents: 210,
    completionRate: 76,
    averageRating: 4.7,
    totalLessons: 12,
    offlineSupported: true,
    modules: [
      {
        moduleId: 'm1',
        title: 'Module 1: Fundamentals of Agribusiness & FPO Incubation',
        lessons: [
          { lessonId: 'l1', title: '1.1 Forming and Registering a Farmer Producer Company', duration: '20 mins', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', summary: 'Company Act provisions and equity grant schemes.', offlineAvailable: true }
        ]
      }
    ],
    assessmentQuestions: [
      {
        id: 1,
        question: 'What is the minimum member farmer requirement to form an FPO with equity grant support?',
        options: ['10 members', '300 to 500 members in plains (100 in hills)', '5000 members', '10000 members'],
        correctAnswer: 1,
        explanation: 'Under Central Sector Scheme, 300 members in plain areas and 100 in Northeast/Hilly regions are required.'
      }
    ]
  },
  {
    courseId: 'c5',
    title: 'Financial Literacy & Cooperative Accounting',
    description: 'Double-entry bookkeeping, audit preparation, statutory compliance, non-performing asset (NPA) recovery strategies, and balance sheet auditing.',
    category: 'Finance',
    trainer: 'CA Vandana Deshpande (VAMNICOM)',
    duration: '3 Weeks (15 Hours)',
    language: 'English & Hindi',
    level: 'Beginner to Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
    status: 'Active',
    enrolledStudents: 195,
    completionRate: 82,
    averageRating: 4.8,
    totalLessons: 10,
    offlineSupported: true,
    modules: [
      {
        moduleId: 'm1',
        title: 'Module 1: Principles of Cooperative Bookkeeping',
        lessons: [
          { lessonId: 'l1', title: '1.1 Double Entry System for Cooperative Societies', duration: '25 mins', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', summary: 'Debits, credits, journal entries and trial balance.', offlineAvailable: true }
        ]
      }
    ],
    assessmentQuestions: [
      {
        id: 1,
        question: 'When is a loan classified as a Non-Performing Asset (NPA) in cooperative banks?',
        options: ['Overdue for 15 days', 'Overdue for 90 days or more', 'Overdue for 365 days', 'Never'],
        correctAnswer: 1,
        explanation: 'As per RBI norms, an account is classified as NPA when interest or principal remains overdue for 90 days.'
      }
    ]
  },
  {
    courseId: 'c6',
    title: 'Cooperative Society Management & Governance',
    description: 'Legal framework, multi-state cooperative act, board committee protocols, democratic member participation, and conflict resolution.',
    category: 'Governance',
    trainer: 'Prof. S. N. Mukherjee (ICM Dehradun)',
    duration: '4 Weeks (22 Hours)',
    language: 'Hindi & English',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
    status: 'Active',
    enrolledStudents: 160,
    completionRate: 79,
    averageRating: 4.6,
    totalLessons: 12,
    offlineSupported: true,
    modules: [
      {
        moduleId: 'm1',
        title: 'Module 1: Multi-State Cooperative Societies Act & Governance',
        lessons: [
          { lessonId: 'l1', title: '1.1 Cooperative Identity, Values & Principles', duration: '22 mins', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', summary: 'ICA 7 Principles and statutory obligations.', offlineAvailable: true }
        ]
      }
    ],
    assessmentQuestions: [
      {
        id: 1,
        question: 'Which constitutional amendment added Part IXB for cooperative societies?',
        options: ['73rd Amendment', '97th Constitutional Amendment Act', '42nd Amendment', '101st Amendment'],
        correctAnswer: 1,
        explanation: 'The 97th Amendment introduced provisions regarding incorporation, regulation, and democratic functioning of cooperative societies.'
      }
    ]
  }
];

const mockProgrammes = [
  {
    programmeId: 'p1',
    title: 'Digital Cooperative Management Training Programme',
    description: 'Comprehensive 15-day intensive residential and virtual programme for cooperative executives and PACS secretaries to master ERP software, cybersecurity, and digital transactions.',
    institution: 'RICM Patna (Regional Institute of Cooperative Management)',
    trainer: 'Prof. Ramesh Kulkarni & Dr. Arindam Sen',
    startDate: '01 Oct 2026',
    endDate: '15 Oct 2026',
    duration: '15 Days',
    mode: 'Hybrid',
    language: 'Hindi & English',
    totalSeats: 60,
    registeredParticipants: 45,
    status: 'Upcoming',
    targetAudience: 'PACS Secretaries, Cooperative Auditors, Branch In-charges',
    venue: 'Main Auditorium, RICM Patna Campus & NCCT Virtual LMS'
  },
  {
    programmeId: 'p2',
    title: 'Dairy Cooperative Entrepreneurship & Value Chain',
    description: 'Hands-on executive course on setting up modern dairy collection centers, milk cold chain monitoring, FSSAI compliance, and value addition.',
    institution: 'VAMNICOM Pune (Vaikunth Mehta National Institute)',
    trainer: 'Dr. Meenakshi Sunderam & National Dairy Experts',
    startDate: '10 Oct 2026',
    endDate: '25 Oct 2026',
    duration: '15 Days',
    mode: 'Residential',
    language: 'English & Hindi',
    totalSeats: 60,
    registeredParticipants: 52,
    status: 'Upcoming',
    targetAudience: 'Dairy Union Managers, FPO Promoters, Livestock Officers',
    venue: 'VAMNICOM Campus, University Road, Pune'
  },
  {
    programmeId: 'p3',
    title: 'PACS Digital Transformation & Cloud ERP Masterclass',
    description: 'Specialized national capacity building programme focused on implementing the standardized PACS ERP software, data migration, and daily balancing.',
    institution: 'ICM Lucknow (Institute of Cooperative Management)',
    trainer: 'Er. Alok Ranjan & Technical IT Team',
    startDate: '18 Oct 2026',
    endDate: '30 Oct 2026',
    duration: '12 Days',
    mode: 'Online',
    language: 'Hindi',
    totalSeats: 100,
    registeredParticipants: 78,
    status: 'Upcoming',
    targetAudience: 'PACS Clerks, Data Entry Operators, District Tech Supervisors',
    venue: 'Online Virtual Classroom via NCCT Live Stream'
  },
  {
    programmeId: 'p4',
    title: 'Rural Entrepreneurship & FPO Leadership Development',
    description: 'Developing next-generation leadership for Farmer Producer Organizations, credit risk mitigation, and international organic trade linkages.',
    institution: 'RICM Bengaluru (Regional Institute of Cooperative Management)',
    trainer: 'Dr. K. Srinivas & Agro-Logistics Advisors',
    startDate: '05 Nov 2026',
    endDate: '20 Nov 2026',
    duration: '15 Days',
    mode: 'Hybrid',
    language: 'English, Kannada & Hindi',
    totalSeats: 50,
    registeredParticipants: 28,
    status: 'Upcoming',
    targetAudience: 'FPO Directors, Rural Entrepreneurs, Agri-Graduates',
    venue: 'RICM Campus, 67 Padmanabhanagar, Bengaluru'
  },
  {
    programmeId: 'p5',
    title: 'Cooperative Banking Audit & Regulatory Compliance',
    description: 'In-depth statutory audit framework, RBI inspection guidelines, NPA provisioning, and computerized audit trail analysis for State & District Cooperative Banks.',
    institution: 'ICM Dehradun (Institute of Cooperative Management)',
    trainer: 'CA Vandana Deshpande & Senior RBI Nominees',
    startDate: '15 Nov 2026',
    endDate: '28 Nov 2026',
    duration: '14 Days',
    mode: 'Residential',
    language: 'Hindi & English',
    totalSeats: 40,
    registeredParticipants: 35,
    status: 'Upcoming',
    targetAudience: 'Cooperative Bank Inspectors, Chartered Accountants, Regulators',
    venue: 'ICM Dehradun Campus, Uttarakhand'
  }
];

const mockJobs = [
  {
    jobId: 'j1',
    title: 'Cooperative Field Officer',
    organization: 'West Bengal State Apex Cooperative Society Ltd.',
    location: 'Kolkata / Siliguri, West Bengal',
    employmentType: 'Full Time',
    salaryRange: '₹28,000 - ₹42,000 / month',
    requiredSkills: ['PACS Operations', 'Digital Literacy', 'Field Audit', 'Bengali & Hindi'],
    description: 'Responsible for supervising village-level PACS accounts, monitoring fertilizer distribution depots, assisting farmers with KCC loan digitizations, and reporting to district managers.',
    postedDate: '24 Sep 2026',
    applicationDeadline: '20 Oct 2026',
    totalApplications: 46,
    status: 'Active',
    contactEmail: 'recruitment@wbapexcoop.gov.in'
  },
  {
    jobId: 'j2',
    title: 'Digital Operations Assistant',
    organization: 'Kolkata Central Cooperative Bank (KCCB)',
    location: 'Kolkata, West Bengal',
    employmentType: 'Full Time',
    salaryRange: '₹24,000 - ₹34,000 / month',
    requiredSkills: ['Digital Literacy', 'Cloud Data Management', 'KYC Verification', 'ERP Operations'],
    description: 'Execute daily electronic batch transactions, assist rural account holders with micro-ATM transactions, maintain cloud server logs, and conduct customer onboarding.',
    postedDate: '26 Sep 2026',
    applicationDeadline: '25 Oct 2026',
    totalApplications: 32,
    status: 'Active',
    contactEmail: 'hr@kolkatacoopbank.org'
  },
  {
    jobId: 'j3',
    title: 'Dairy Cooperative Coordinator',
    organization: 'National Dairy Development Cooperative Federation',
    location: 'Anand, Gujarat / Regional Hubs',
    employmentType: 'Full Time',
    salaryRange: '₹35,000 - ₹50,000 / month',
    requiredSkills: ['Dairy Management', 'Cold Chain Logistics', 'Quality Testing', 'AMCU Setup'],
    description: 'Coordinate collection schedules across 45 village milk societies, supervise bulk milk cooling units, verify fat/SNF automated testing calibration, and oversee DBT disbursements.',
    postedDate: '22 Sep 2026',
    applicationDeadline: '15 Oct 2026',
    totalApplications: 58,
    status: 'Active',
    contactEmail: 'careers@dairycoopfederation.in'
  },
  {
    jobId: 'j4',
    title: 'Rural Development Executive (FPO)',
    organization: 'Bihar State Cooperative Marketing Union Ltd (BISCOMAUN)',
    location: 'Patna / Muzaffarpur, Bihar',
    employmentType: 'Full Time',
    salaryRange: '₹30,000 - ₹45,000 / month',
    requiredSkills: ['Agricultural Entrepreneurship', 'FPO Management', 'Agri-Credit Analysis'],
    description: 'Mobilize smallholder farmer groups into viable Farmer Producer Organizations, structure backward-forward market linkages, and facilitate central grant applications.',
    postedDate: '20 Sep 2026',
    applicationDeadline: '18 Oct 2026',
    totalApplications: 29,
    status: 'Active',
    contactEmail: 'jobs@biscomaun.coop'
  },
  {
    jobId: 'j5',
    title: 'PACS Accounts & Systems Auditor',
    organization: 'Uttar Pradesh Cooperative Institutional Service Board',
    location: 'Lucknow, Uttar Pradesh',
    employmentType: 'Contractual',
    salaryRange: '₹32,000 - ₹46,000 / month',
    requiredSkills: ['Cooperative Accounting', 'Statutory Audit', 'PACS Software', 'NPA Recovery'],
    description: 'Perform computerized statutory audits of primary agricultural credit societies, detect anomalies in scale of finance allocations, and prepare executive board reports.',
    postedDate: '27 Sep 2026',
    applicationDeadline: '30 Oct 2026',
    totalApplications: 21,
    status: 'Active',
    contactEmail: 'examinations@upcoopboard.in'
  }
];

const mockCertificates = [
  {
    certificateId: 'NCCT-CERT-2026-00124',
    traineeId: 'user@ncct.demo',
    traineeName: 'Rahul Sharma',
    courseId: 'c1',
    courseTitle: 'Digital Literacy for Cooperative Personnel',
    institution: 'National Council for Cooperative Training (NCCT)',
    regionalInstitute: 'RICM Patna (Regional Institute of Cooperative Management)',
    issueDate: '29 Aug 2026',
    completionScore: 88,
    status: 'Verified',
    qrPayload: 'https://ncct.gov.in/verify?cert=NCCT-CERT-2026-00124&hash=8f29e1c4b72',
    signerName: 'Dr. Alok Verma, Director General, NCCT',
    skillsAccredited: ['PACS Cloud ERP', 'Cyber Hygiene', 'Spreadsheet Auditing', 'Digital Member KYC']
  },
  {
    certificateId: 'NCCT-CERT-2026-00125',
    traineeId: 'user@ncct.demo',
    traineeName: 'Rahul Sharma',
    courseId: 'c3',
    courseTitle: 'PACS Digital Operations & Accounting Masterclass',
    institution: 'National Council for Cooperative Training (NCCT)',
    regionalInstitute: 'RICM Patna (Regional Institute of Cooperative Management)',
    issueDate: '14 Sep 2026',
    completionScore: 92,
    status: 'Verified',
    qrPayload: 'https://ncct.gov.in/verify?cert=NCCT-CERT-2026-00125&hash=93ad44c80e1',
    signerName: 'Dr. Alok Verma, Director General, NCCT',
    skillsAccredited: ['National CoA Framework', 'Scale of Finance Calculation', 'KCC Digitization', 'Multi-Purpose PACS Business']
  },
  {
    certificateId: 'NCCT-CERT-2026-00126',
    traineeId: 'ananya@ncct.demo',
    traineeName: 'Ananya Das',
    courseId: 'c2',
    courseTitle: 'Dairy Cooperative Management & Cold Chain Operations',
    institution: 'National Council for Cooperative Training (NCCT)',
    regionalInstitute: 'RICM Kalyani (West Bengal)',
    issueDate: '20 Sep 2026',
    completionScore: 85,
    status: 'Verified',
    qrPayload: 'https://ncct.gov.in/verify?cert=NCCT-CERT-2026-00126&hash=71bd93f28a',
    signerName: 'Dr. Alok Verma, Director General, NCCT',
    skillsAccredited: ['AMCU Calibration', 'Fat/SNF Payout Automation', 'BMC Maintenance', 'FSSAI Standards']
  },
  {
    certificateId: 'NCCT-CERT-2026-00127',
    traineeId: 'priya@ncct.demo',
    traineeName: 'Priya Singh',
    courseId: 'c4',
    courseTitle: 'Agricultural Entrepreneurship & FPO Incubation',
    institution: 'National Council for Cooperative Training (NCCT)',
    regionalInstitute: 'VAMNICOM Pune (Maharashtra)',
    issueDate: '24 Sep 2026',
    completionScore: 90,
    status: 'Verified',
    qrPayload: 'https://ncct.gov.in/verify?cert=NCCT-CERT-2026-00127&hash=55ea12d09c',
    signerName: 'Dr. Alok Verma, Director General, NCCT',
    skillsAccredited: ['FPO Incorporation', 'Agribusiness Financing', 'Export Linkages', 'NABARD Schemes']
  },
  {
    certificateId: 'NCCT-CERT-2026-00128',
    traineeId: 'amit@ncct.demo',
    traineeName: 'Amit Kumar',
    courseId: 'c5',
    courseTitle: 'Financial Literacy & Statutory Cooperative Audit',
    institution: 'National Council for Cooperative Training (NCCT)',
    regionalInstitute: 'ICM Lucknow (Uttar Pradesh)',
    issueDate: '26 Sep 2026',
    completionScore: 79,
    status: 'Pending',
    qrPayload: 'https://ncct.gov.in/verify?cert=NCCT-CERT-2026-00128&hash=pending_verification',
    signerName: 'Dr. Alok Verma, Director General, NCCT',
    skillsAccredited: ['Double-Entry Ledger', 'NPA Recovery Audit', 'Statutory Compliance']
  }
];

const mockAttendance = [
  {
    attendanceId: 'ATT-2026-0929-01',
    personId: 'EMP001',
    personName: 'Rahul Sharma',
    personType: 'Employee',
    departmentOrBatch: 'Administration',
    date: '29 Sep 2026',
    checkIn: '09:12 AM',
    checkOut: '05:32 PM',
    status: 'Present',
    capturedVia: 'Raspberry Pi 5 + Camera (Simulation Active)',
    confidenceScore: 98.6,
    deviceLocation: 'Main Admin Gate 1'
  },
  {
    attendanceId: 'ATT-2026-0929-02',
    personId: 'EMP002',
    personName: 'Ananya Das',
    personType: 'Employee',
    departmentOrBatch: 'Training',
    date: '29 Sep 2026',
    checkIn: '09:21 AM',
    checkOut: '05:41 PM',
    status: 'Present',
    capturedVia: 'Raspberry Pi 5 + Camera (Simulation Active)',
    confidenceScore: 97.8,
    deviceLocation: 'Academic Block Entrance'
  },
  {
    attendanceId: 'ATT-2026-0929-03',
    personId: 'EMP003',
    personName: 'Amit Kumar',
    personType: 'Employee',
    departmentOrBatch: 'Finance',
    date: '29 Sep 2026',
    checkIn: '--',
    checkOut: '--',
    status: 'Absent',
    capturedVia: 'System Automated Absence Log',
    confidenceScore: 0,
    deviceLocation: 'Finance Wing'
  },
  {
    attendanceId: 'ATT-2026-0929-04',
    personId: 'EMP004',
    personName: 'Priya Singh',
    personType: 'Employee',
    departmentOrBatch: 'IT & Systems',
    date: '29 Sep 2026',
    checkIn: '08:58 AM',
    checkOut: '05:15 PM',
    status: 'Present',
    capturedVia: 'Raspberry Pi 5 + Camera (Simulation Active)',
    confidenceScore: 99.1,
    deviceLocation: 'Computer Lab 1'
  },
  {
    attendanceId: 'ATT-2026-0929-05',
    personId: 'EMP005',
    personName: 'Sourav Roy',
    personType: 'Employee',
    departmentOrBatch: 'Field Operations',
    date: '29 Sep 2026',
    checkIn: '09:42 AM',
    checkOut: '05:30 PM',
    status: 'Late',
    capturedVia: 'Raspberry Pi 5 + Camera (Simulation Active)',
    confidenceScore: 96.4,
    deviceLocation: 'Field Outreach Wing'
  },
  {
    attendanceId: 'ATT-2026-0929-06',
    personId: 'EMP006',
    personName: 'Kavita Menon',
    personType: 'Employee',
    departmentOrBatch: 'Training',
    date: '29 Sep 2026',
    checkIn: '09:05 AM',
    checkOut: '05:25 PM',
    status: 'Present',
    capturedVia: 'Raspberry Pi 5 + Camera (Simulation Active)',
    confidenceScore: 98.9,
    deviceLocation: 'Research Wing'
  },
  {
    attendanceId: 'ATT-2026-0929-07',
    personId: 'EMP007',
    personName: 'Rajesh Patel',
    personType: 'Employee',
    departmentOrBatch: 'Field Operations',
    date: '29 Sep 2026',
    checkIn: '--',
    checkOut: '--',
    status: 'On Leave',
    capturedVia: 'Approved Leave Portal',
    confidenceScore: 100,
    deviceLocation: 'RICM Bengaluru Office'
  },
  {
    attendanceId: 'ATT-2026-0929-08',
    personId: 'EMP008',
    personName: 'Sunita Meena',
    personType: 'Employee',
    departmentOrBatch: 'Administration',
    date: '29 Sep 2026',
    checkIn: '09:10 AM',
    checkOut: '05:20 PM',
    status: 'Present',
    capturedVia: 'Raspberry Pi 5 + Camera (Simulation Active)',
    confidenceScore: 97.9,
    deviceLocation: 'Main Admin Gate 1'
  },
  // Trainee records
  {
    attendanceId: 'ATT-2026-0929-101',
    personId: 'user@ncct.demo',
    personName: 'Rahul Sharma',
    personType: 'Trainee',
    departmentOrBatch: 'Digital Literacy Batch 4',
    date: '29 Sep 2026',
    checkIn: '09:02 AM',
    checkOut: '04:45 PM',
    status: 'Present',
    capturedVia: 'Raspberry Pi 5 + Camera (Simulation Active)',
    confidenceScore: 98.7,
    deviceLocation: 'RICM Patna Training Hall A'
  },
  {
    attendanceId: 'ATT-2026-0928-101',
    personId: 'user@ncct.demo',
    personName: 'Rahul Sharma',
    personType: 'Trainee',
    departmentOrBatch: 'Digital Literacy Batch 4',
    date: '28 Sep 2026',
    checkIn: '09:08 AM',
    checkOut: '05:00 PM',
    status: 'Present',
    capturedVia: 'Raspberry Pi 5 + Camera (Simulation Active)',
    confidenceScore: 99.0,
    deviceLocation: 'RICM Patna Training Hall A'
  },
  {
    attendanceId: 'ATT-2026-0927-101',
    personId: 'user@ncct.demo',
    personName: 'Rahul Sharma',
    personType: 'Trainee',
    departmentOrBatch: 'Digital Literacy Batch 4',
    date: '27 Sep 2026',
    checkIn: '09:35 AM',
    checkOut: '04:50 PM',
    status: 'Late',
    capturedVia: 'Raspberry Pi 5 + Camera (Simulation Active)',
    confidenceScore: 96.8,
    deviceLocation: 'RICM Patna Training Hall A'
  },
  {
    attendanceId: 'ATT-2026-0926-101',
    personId: 'user@ncct.demo',
    personName: 'Rahul Sharma',
    personType: 'Trainee',
    departmentOrBatch: 'Digital Literacy Batch 4',
    date: '26 Sep 2026',
    checkIn: '09:00 AM',
    checkOut: '05:10 PM',
    status: 'Present',
    capturedVia: 'Raspberry Pi 5 + Camera (Simulation Active)',
    confidenceScore: 98.4,
    deviceLocation: 'RICM Patna Training Hall A'
  },
  {
    attendanceId: 'ATT-2026-0925-101',
    personId: 'user@ncct.demo',
    personName: 'Rahul Sharma',
    personType: 'Trainee',
    departmentOrBatch: 'Digital Literacy Batch 4',
    date: '25 Sep 2026',
    checkIn: '08:55 AM',
    checkOut: '05:05 PM',
    status: 'Present',
    capturedVia: 'Raspberry Pi 5 + Camera (Simulation Active)',
    confidenceScore: 99.2,
    deviceLocation: 'RICM Patna Training Hall A'
  },
  {
    attendanceId: 'ATT-2026-0924-101',
    personId: 'user@ncct.demo',
    personName: 'Rahul Sharma',
    personType: 'Trainee',
    departmentOrBatch: 'Digital Literacy Batch 4',
    date: '24 Sep 2026',
    checkIn: '--',
    checkOut: '--',
    status: 'Absent',
    capturedVia: 'System Automated Absence Log',
    confidenceScore: 0,
    deviceLocation: 'RICM Patna Training Hall A'
  }
];

const mockNotifications = [
  {
    notificationId: 'N1',
    targetRole: 'all',
    userId: 'user@ncct.demo',
    title: 'New Training Programme Open for Registration',
    message: 'Digital Cooperative Management Training Programme at RICM Patna starts on 01 Oct 2026. Limited seats available.',
    type: 'programme',
    link: '/user/programmes',
    read: false,
    timestamp: '10 minutes ago'
  },
  {
    notificationId: 'N2',
    targetRole: 'trainee',
    userId: 'user@ncct.demo',
    title: 'Certificate Verified & Issued',
    message: 'Your certificate for PACS Digital Operations (NCCT-CERT-2026-00125) has been officially digitally signed and verified.',
    type: 'certificate',
    link: '/user/certificates',
    read: false,
    timestamp: '2 hours ago'
  },
  {
    notificationId: 'N3',
    targetRole: 'all',
    userId: 'user@ncct.demo',
    title: 'New Cooperative Job Opening Posted',
    message: 'West Bengal State Apex Cooperative Society is hiring a Cooperative Field Officer. Apply before 20 Oct 2026.',
    type: 'job',
    link: '/user/jobs',
    read: false,
    timestamp: '5 hours ago'
  },
  {
    notificationId: 'N4',
    targetRole: 'admin',
    userId: 'admin@ncct.demo',
    title: 'Raspberry Pi Attendance Sync Successful',
    message: 'All 8 RICM & ICM camera edge nodes reported 100% heartbeat and synced 1,248 attendance logs.',
    type: 'attendance',
    link: '/admin/attendance',
    read: true,
    timestamp: '1 day ago'
  }
];

const mockAnalytics = {
  kpis: {
    totalEmployees: 128,
    activeTrainees: 1248,
    activeProgrammes: 24,
    certificatesIssued: 892,
    averageAttendance: 87.4,
    courseCompletionRate: 78.6,
    totalJobsPosted: 42,
    placedTrainees: 418
  },
  weeklyAttendance: [
    { day: 'Mon', present: 120, absent: 5, late: 3, attendanceRate: 93.8 },
    { day: 'Tue', present: 118, absent: 6, late: 4, attendanceRate: 92.2 },
    { day: 'Wed', present: 122, absent: 4, late: 2, attendanceRate: 95.3 },
    { day: 'Thu', present: 114, absent: 8, late: 6, attendanceRate: 89.1 },
    { day: 'Fri', present: 119, absent: 5, late: 4, attendanceRate: 93.0 },
    { day: 'Sat', present: 105, absent: 15, late: 8, attendanceRate: 82.0 }
  ],
  departmentAttendance: [
    { department: 'Administration', presentRate: 94.2, totalStaff: 28 },
    { department: 'Training Faculty', presentRate: 96.5, totalStaff: 42 },
    { department: 'IT & Systems', presentRate: 95.0, totalStaff: 18 },
    { department: 'Finance & Accounts', presentRate: 88.0, totalStaff: 16 },
    { department: 'Field Operations', presentRate: 90.5, totalStaff: 24 }
  ],
  presentVsAbsent: [
    { name: 'Present On Time', value: 108, color: '#2E9D59' },
    { name: 'Late Arrivals', value: 12, color: '#F28C28' },
    { name: 'Approved Leave', value: 5, color: '#19A7CE' },
    { name: 'Unexcused Absent', value: 3, color: '#E53E3E' }
  ],
  lateArrivalsByHour: [
    { time: '09:00 - 09:15 AM', count: 18 },
    { time: '09:16 - 09:30 AM', count: 9 },
    { time: '09:31 - 09:45 AM', count: 6 },
    { time: '09:46 - 10:00 AM', count: 3 }
  ],
  monthlyAttendanceTrend: [
    { month: 'Apr 2026', rate: 84.2 },
    { month: 'May 2026', rate: 85.8 },
    { month: 'Jun 2026', rate: 86.4 },
    { month: 'Jul 2026', rate: 88.1 },
    { month: 'Aug 2026', rate: 87.0 },
    { month: 'Sep 2026', rate: 87.4 }
  ],
  trainingEnrollmentTrend: [
    { month: 'Apr', enrollments: 180, completions: 140 },
    { month: 'May', enrollments: 220, completions: 175 },
    { month: 'Jun', enrollments: 310, completions: 240 },
    { month: 'Jul', enrollments: 410, completions: 320 },
    { month: 'Aug', enrollments: 490, completions: 385 },
    { month: 'Sep', enrollments: 560, completions: 440 }
  ],
  programmeWiseEnrollment: [
    { name: 'VAMNICOM Pune', count: 380 },
    { name: 'RICM Patna', count: 290 },
    { name: 'RICM Bengaluru', count: 240 },
    { name: 'ICM Lucknow', count: 210 },
    { name: 'ICM Dehradun', count: 180 },
    { name: 'ICM Guwahati', count: 160 }
  ],
  trainingOutcomeOverview: [
    {
      course: 'Digital Literacy for Cooperative Personnel',
      category: 'Digital Literacy',
      enrolled: 320,
      completed: 278,
      avgScore: 82,
      attendance: 89,
      placementRate: 74
    },
    {
      course: 'Dairy Cooperative Management',
      category: 'Dairy',
      enrolled: 250,
      completed: 201,
      avgScore: 79,
      attendance: 85,
      placementRate: 68
    },
    {
      course: 'PACS Digital Operations',
      category: 'Cooperative Management',
      enrolled: 180,
      completed: 151,
      avgScore: 84,
      attendance: 91,
      placementRate: 82
    },
    {
      course: 'Agricultural Entrepreneurship',
      category: 'Agriculture',
      enrolled: 210,
      completed: 160,
      avgScore: 76,
      attendance: 84,
      placementRate: 65
    },
    {
      course: 'Financial Literacy & Cooperative Accounting',
      category: 'Finance',
      enrolled: 195,
      completed: 160,
      avgScore: 81,
      attendance: 88,
      placementRate: 71
    },
    {
      course: 'Cooperative Society Governance',
      category: 'Governance',
      enrolled: 160,
      completed: 126,
      avgScore: 80,
      attendance: 86,
      placementRate: 69
    }
  ]
};

module.exports = {
  mockUsers,
  mockEmployees,
  mockCourses,
  mockProgrammes,
  mockJobs,
  mockCertificates,
  mockAttendance,
  mockNotifications,
  mockAnalytics
};
