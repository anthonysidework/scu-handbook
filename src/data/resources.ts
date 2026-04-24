export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  emoji: string;
}

export const resourceCategories = [
  "Academic",
  "Student Life",
  "Health & Wellness",
  "Career",
  "Tech & IT",
  "Finance",
] as const;

export const resources: Resource[] = [
  // Academic
  {
    id: "banner",
    title: "Banner (Course Registration)",
    description: "Register for classes, view grades, and manage your schedule.",
    url: "https://www.scu.edu/banner",
    category: "Academic",
    emoji: "📚",
  },
  {
    id: "camino",
    title: "Camino (Canvas LMS)",
    description: "Access course materials, assignments, and grades.",
    url: "https://camino.scu.edu",
    category: "Academic",
    emoji: "🎓",
  },
  {
    id: "orradre",
    title: "Orradre Library",
    description: "Book reservations, research databases, and study room booking.",
    url: "https://www.scu.edu/library",
    category: "Academic",
    emoji: "📖",
  },
  {
    id: "registrar",
    title: "Registrar",
    description: "Transcripts, enrollment verification, and academic calendars.",
    url: "https://www.scu.edu/registrar",
    category: "Academic",
    emoji: "📋",
  },
  {
    id: "writing-center",
    title: "Writing Center",
    description: "Free tutoring and feedback on papers and writing assignments.",
    url: "https://www.scu.edu/provost/wc",
    category: "Academic",
    emoji: "✏️",
  },
  {
    id: "math-learning",
    title: "Math Learning Center",
    description: "Free drop-in tutoring for math and statistics courses.",
    url: "https://www.scu.edu/cas/mathcs/mlc",
    category: "Academic",
    emoji: "🔢",
  },

  // Student Life
  {
    id: "involved",
    title: "SCU Involved (Clubs Portal)",
    description: "Official directory of all registered student organizations.",
    url: "https://www.scu.edu/involved",
    category: "Student Life",
    emoji: "🏛️",
  },
  {
    id: "housing",
    title: "Housing & Residence Life",
    description: "Housing applications, room changes, and residence info.",
    url: "https://www.scu.edu/housing",
    category: "Student Life",
    emoji: "🏠",
  },
  {
    id: "dining-official",
    title: "SCU Dining Services",
    description: "Official menus, meal plan management, and dining locations.",
    url: "https://dining.scu.edu",
    category: "Student Life",
    emoji: "🍽️",
  },
  {
    id: "student-government",
    title: "ASSCU (Student Government)",
    description: "Student government association, events, and advocacy.",
    url: "https://www.scu.edu/asscu",
    category: "Student Life",
    emoji: "🗳️",
  },

  // Health & Wellness
  {
    id: "cowell",
    title: "Cowell Health Center",
    description: "Primary care, counseling, and health services for students.",
    url: "https://www.scu.edu/cowell",
    category: "Health & Wellness",
    emoji: "🏥",
  },
  {
    id: "counseling",
    title: "Counseling & Psychological Services",
    description: "Mental health support, therapy, and crisis resources.",
    url: "https://www.scu.edu/cowell/caps",
    category: "Health & Wellness",
    emoji: "💙",
  },
  {
    id: "leavey-rec",
    title: "Leavey Recreation Center",
    description: "Fitness center, group classes, intramurals, and recreation.",
    url: "https://www.scu.edu/recreation",
    category: "Health & Wellness",
    emoji: "🏋️",
  },
  {
    id: "wellbeing",
    title: "Student Wellbeing",
    description: "Wellness coaching, stress management, and prevention programs.",
    url: "https://www.scu.edu/cowell/wellbeing",
    category: "Health & Wellness",
    emoji: "🌿",
  },

  // Career
  {
    id: "career-center",
    title: "Career Center",
    description: "Internships, full-time jobs, resume reviews, and recruiting.",
    url: "https://www.scu.edu/careercenter",
    category: "Career",
    emoji: "💼",
  },
  {
    id: "handshake",
    title: "Handshake",
    description: "Job and internship platform for SCU students.",
    url: "https://scu.joinhandshake.com",
    category: "Career",
    emoji: "🤝",
  },
  {
    id: "linkedin-learning",
    title: "LinkedIn Learning",
    description: "Free access to thousands of courses via SCU SSO.",
    url: "https://www.linkedin.com/learning",
    category: "Career",
    emoji: "🎬",
  },

  // Tech & IT
  {
    id: "its",
    title: "IT Services",
    description: "Tech support, WiFi setup, and software downloads.",
    url: "https://www.scu.edu/its",
    category: "Tech & IT",
    emoji: "💻",
  },
  {
    id: "bronco-express",
    title: "BroncoExpress (SCU Email/Portal)",
    description: "Student email, Office 365, and SCU portal access.",
    url: "https://broncoexpress.scu.edu",
    category: "Tech & IT",
    emoji: "📧",
  },
  {
    id: "vpn",
    title: "SCU VPN",
    description: "Secure VPN access to campus resources off-campus.",
    url: "https://www.scu.edu/its/network/vpn",
    category: "Tech & IT",
    emoji: "🔒",
  },

  // Finance
  {
    id: "bursar",
    title: "Bursar's Office",
    description: "Tuition payments, billing, and financial account management.",
    url: "https://www.scu.edu/bursar",
    category: "Finance",
    emoji: "💳",
  },
  {
    id: "financial-aid",
    title: "Financial Aid",
    description: "Scholarships, grants, loans, and aid applications.",
    url: "https://www.scu.edu/financialaid",
    category: "Finance",
    emoji: "💰",
  },
  {
    id: "student-employment",
    title: "Student Employment",
    description: "On-campus job listings and work-study opportunities.",
    url: "https://www.scu.edu/bursar/student-employment",
    category: "Finance",
    emoji: "📌",
  },
];
