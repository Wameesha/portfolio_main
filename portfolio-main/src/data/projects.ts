export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: string;
  liveUrl: string;
  githubUrl: string;
  features: string[];
  featured: boolean;
  teamSize: number;
  duration: string;
  status: 'completed' | 'in-progress' | 'planning';
  achievements?: string[];
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "UniQuest",
    description: "A web application designed to help university students discover part-time jobs, internships, and industry opportunities.",
    longDescription: "UniQuest is a comprehensive web application that connects university students with companies and enables profile management, job applications, communication, and feedback — all in one platform. The system supports role-based access for students, companies, admins, and a verification team, streamlining the process of finding and applying for opportunities.",
    image: "/images/projects/project1-hero.jpg",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    category: "Full Stack",
    featured: true,
    liveUrl: "https://github.com/sakunasanka/UniQuest.git",
    githubUrl: "https://github.com/sakunasanka/UniQuest.git",
    teamSize: 4,
    duration: "Jul 2024 - Apr 2025",
    status: "completed",
    features: [
      "Student profile management",
      "Job and internship discovery",
      "Application tracking system",
      "Company-student communication",
      "Role-based access control",
      "Feedback and rating system",
      "Industry opportunity listings",
      "Verification team management"
    ],
    achievements: [
      "Connecting students with industry opportunities",
      "Streamlined application process",
      "Multi-role platform architecture"
    ]
  },
  {
    id: "project-2",
    title: "ArtAura",
    description: "A full-featured digital platform connecting artists, buyers, shop owners, moderators, and admins in a unified art ecosystem.",
    longDescription: "ArtAura is a comprehensive digital platform designed to connect various stakeholders in the art community. It enables portfolio showcasing, artwork sales, exhibition management, and features a dedicated marketplace for art supplies. The platform fosters collaboration and streamlines commerce within the art community through modern web technologies.",
    image: "/images/projects/project2-hero.jpg",
    technologies: ["React", "Java", "Spring Boot", "Tailwind CSS", "MySQL"],
    category: "Full Stack",
    featured: true,
    liveUrl: "https://github.com/msnvaz/ArtAura.git",
    githubUrl: "https://github.com/msnvaz/ArtAura.git",
    teamSize: 5,
    duration: "Jun 2025 - Present",
    status: "in-progress",
    features: [
      "Artist portfolio showcasing",
      "Artwork sales platform",
      "Exhibition management",
      "Art supplies marketplace",
      "Shop module with product listings",
      "Order management system",
      "Sales analytics dashboard",
      "Multi-role user management"
    ],
    achievements: [
      "Unified art ecosystem platform",
      "Modern React frontend with Spring Boot backend",
      "Comprehensive shop module development"
    ]
  },
  {
    id: "project-3",
    title: "Calliera",
    description: "A full-stack social app featuring real-time chat, video calling, friend management, and theme customization.",
    longDescription: "Calliera is a sophisticated social application built to deliver secure, interactive, and personalized user experiences with a scalable backend architecture. The app features real-time communication capabilities, comprehensive user management, and modern UI/UX design patterns for seamless social interactions.",
    image: "/images/projects/project2-hero.jpg",
    technologies: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "TanStack Query"],
    category: "Full Stack",
    featured: true,
    liveUrl: "https://github.com/Wameesha/MERN-project.git",
    githubUrl: "https://github.com/Wameesha/MERN-project.git",
    teamSize: 1,
    duration: "Jun 2025 - Jul 2025",
    status: "completed",
    features: [
      "Real-time chat messaging",
      "Video calling functionality",
      "Friend management system",
      "User onboarding flow",
      "Theme customization",
      "Authentication system",
      "Dynamic UI components",
      "Scalable backend architecture"
    ],
    achievements: [
      "Complete full-stack social application",
      "Real-time communication implementation",
      "Modern tech stack with MERN architecture"
    ]
  }
];

export const categories = [
  "All",
  "Full Stack",
  "Web App",
  "Frontend",
  "Backend"
];
