const express = require('express');
const router = express.Router();

// Knowledge-driven response mapping for the NCCT AI Career Assistant Simulator
const generateAIResponse = (query, userContext = {}) => {
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

  // Default intelligent assistant response
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

// POST /api/career-assistant/chat
router.post('/chat', (req, res) => {
  try {
    const { message, userContext } = req.body;
    const response = generateAIResponse(message, userContext);
    res.json({
      success: true,
      data: {
        reply: response.message,
        suggestedActions: response.suggestedActions,
        engine: 'Simulated Local AI (Planned: NVIDIA Jetson Nano edge container with DeepSeek/Llama-3 quantized models)',
        status: 'Prototype Mode'
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
