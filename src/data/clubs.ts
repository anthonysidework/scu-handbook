export interface Club {
  id: string;
  name: string;
  category: string;
  description: string;
  meetingInfo?: string;
  instagram?: string;
  email?: string;
}

export const clubCategories = [
  "Academic",
  "Cultural",
  "Service",
  "Sports & Recreation",
  "Arts & Media",
  "Faith & Spirituality",
  "Professional",
  "Political & Social",
  "Technology",
] as const;

export const clubs: Club[] = [
  // Academic
  {
    id: "model-un",
    name: "Model United Nations",
    category: "Academic",
    description: "Simulate UN committees and debate global issues.",
    meetingInfo: "Thursdays 7 PM, Kenna 212",
    instagram: "@scumun",
  },
  {
    id: "pre-law",
    name: "Pre-Law Society",
    category: "Academic",
    description: "Resources, mentorship, and networking for aspiring lawyers.",
    meetingInfo: "Bi-weekly, Lucas Hall",
    email: "prelaw@scu.edu",
  },
  {
    id: "debate",
    name: "SCU Debate Club",
    category: "Academic",
    description: "Competitive parliamentary and policy debate.",
    meetingInfo: "Tuesdays 6 PM, Kenna Hall",
  },

  // Cultural
  {
    id: "asian-pacific-club",
    name: "Asian Pacific Club",
    category: "Cultural",
    description: "Celebrating Asian Pacific Islander culture and community.",
    meetingInfo: "Wednesdays 7 PM, Benson",
    instagram: "@scuapc",
  },
  {
    id: "black-student-union",
    name: "Black Student Union",
    category: "Cultural",
    description: "Promoting the culture and interests of Black students at SCU.",
    instagram: "@scubsu",
    email: "bsu@scu.edu",
  },
  {
    id: "latin-student-assoc",
    name: "Latin Student Association",
    category: "Cultural",
    description: "Celebrating Latin culture through events and community.",
    meetingInfo: "Mondays 6 PM, Casa Italiana",
    instagram: "@sculsa",
  },
  {
    id: "south-asian-assoc",
    name: "South Asian Student Association",
    category: "Cultural",
    description: "Connecting South Asian students through culture and community.",
    instagram: "@scusasa",
  },
  {
    id: "vietnamese-student-assoc",
    name: "Vietnamese Student Association",
    category: "Cultural",
    description: "Celebrating Vietnamese culture with events throughout the year.",
    instagram: "@scuvsa",
  },

  // Service
  {
    id: "habitat",
    name: "Habitat for Humanity",
    category: "Service",
    description: "Building homes and communities locally and globally.",
    meetingInfo: "Fridays 12 PM, Benson",
    email: "habitat@scu.edu",
  },
  {
    id: "key-club",
    name: "Circle K International",
    category: "Service",
    description: "Collegiate service organization focused on community impact.",
    meetingInfo: "Wednesdays 8 PM, Kenna 110",
  },
  {
    id: "best-buddies",
    name: "Best Buddies",
    category: "Service",
    description: "Friendship programs for people with intellectual disabilities.",
    instagram: "@scubestbuddies",
  },

  // Sports & Recreation
  {
    id: "club-soccer",
    name: "Club Soccer",
    category: "Sports & Recreation",
    description: "Competitive and recreational soccer for all skill levels.",
    meetingInfo: "Practice Mon/Wed/Fri, Bellomy Field",
    instagram: "@scuclubsoccer",
  },
  {
    id: "ultimate-frisbee",
    name: "Ultimate Frisbee",
    category: "Sports & Recreation",
    description: "Competitive club ultimate frisbee team.",
    meetingInfo: "Tuesdays & Thursdays, East Field",
  },
  {
    id: "climbing-club",
    name: "Rock Climbing Club",
    category: "Sports & Recreation",
    description: "Indoor and outdoor climbing trips for all levels.",
    instagram: "@scuclimbing",
  },
  {
    id: "surf-club",
    name: "Surf Club",
    category: "Sports & Recreation",
    description: "Weekend surf trips to Santa Cruz and Half Moon Bay.",
    instagram: "@scusurfclub",
  },
  {
    id: "volleyball",
    name: "Club Volleyball",
    category: "Sports & Recreation",
    description: "Competitive volleyball at the collegiate club level.",
    meetingInfo: "Tuesdays & Thursdays, Malley Gym",
  },

  // Arts & Media
  {
    id: "the-santa-clara",
    name: "The Santa Clara (Newspaper)",
    category: "Arts & Media",
    description: "SCU's award-winning independent student newspaper.",
    email: "editor@thesantaclara.com",
    instagram: "@thesantaclara",
  },
  {
    id: "kscu",
    name: "KSCU Radio",
    category: "Arts & Media",
    description: "Student-run radio station broadcasting at 103.3 FM.",
    instagram: "@kscu1033",
    email: "kscu@scu.edu",
  },
  {
    id: "improv",
    name: "Improv Club",
    category: "Arts & Media",
    description: "Comedic improv performances and workshops.",
    meetingInfo: "Thursdays 8 PM, Mayer Theatre",
    instagram: "@scuimprov",
  },
  {
    id: "film-club",
    name: "Film Club",
    category: "Arts & Media",
    description: "Screenings, discussions, and student film productions.",
    meetingInfo: "Fridays 7 PM, Sobrato",
  },

  // Faith & Spirituality
  {
    id: "ignatian-community",
    name: "Ignatian Community",
    category: "Faith & Spirituality",
    description: "Jesuit-inspired spirituality, service, and community.",
    email: "ignatian@scu.edu",
  },
  {
    id: "newman-club",
    name: "Newman Catholic Club",
    category: "Faith & Spirituality",
    description: "Catholic student community with Masses and social events.",
    meetingInfo: "Sundays 7 PM, St. Clare's",
  },
  {
    id: "hillel",
    name: "Hillel at SCU",
    category: "Faith & Spirituality",
    description: "Jewish student life, culture, and community.",
    instagram: "@scuhillel",
  },

  // Professional
  {
    id: "finance-club",
    name: "Finance Club",
    category: "Professional",
    description: "Networking, career prep, and finance industry insights.",
    meetingInfo: "Tuesdays 7 PM, Lucas Hall",
    instagram: "@scufinanceclub",
  },
  {
    id: "consulting-club",
    name: "Consulting Club",
    category: "Professional",
    description: "Case prep, networking, and consulting career guidance.",
    email: "consulting@scu.edu",
  },
  {
    id: "entrepreneurship",
    name: "Entrepreneurs Association",
    category: "Professional",
    description: "Building a startup community at SCU.",
    instagram: "@scuea",
  },

  // Political & Social
  {
    id: "young-democrats",
    name: "Young Democrats",
    category: "Political & Social",
    description: "Progressive politics, voter registration, and advocacy.",
    instagram: "@scudemocrats",
  },
  {
    id: "young-republicans",
    name: "College Republicans",
    category: "Political & Social",
    description: "Conservative politics, policy debates, and civic engagement.",
  },
  {
    id: "environmentalism",
    name: "SCU Environmental Club",
    category: "Political & Social",
    description: "Sustainability initiatives and environmental advocacy.",
    instagram: "@scuenvironment",
  },

  // Technology
  {
    id: "acm",
    name: "ACM (Computer Science Club)",
    category: "Technology",
    description: "Hackathons, projects, and tech career prep.",
    meetingInfo: "Fridays 5 PM, Engineering Building",
    email: "acm@scu.edu",
  },
  {
    id: "robotics",
    name: "Robotics Club",
    category: "Technology",
    description: "Building robots and competing in regional competitions.",
    meetingInfo: "Wednesdays 6 PM, Engineering Lab",
  },
  {
    id: "ai-club",
    name: "AI & Machine Learning Club",
    category: "Technology",
    description: "Exploring AI through projects, talks, and competitions.",
    instagram: "@scuaiclub",
  },
];
