import { Mentor, Author } from "@/lib/types";

const mentors: Mentor[] = [
  {
    id:1,
    fullName: "Rahul Verma",
    title: "Tech Mentor",
    company: "Google",
    companies: ["Microsoft", "Google", "Amazon", "Facebook"],
    experience: 4,
    bio: "I help students grow in tech careers using structured mentorship and interview guidance.",
    rating: 4.5,
    price: 10,
    skills: ["Career Guidance", "System Design", "Mock Interviews"],
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    active:true
  },
  {
    id:2,
    fullName: "Shruti Singh",
    title: "SDE",
    company: "Microsoft",
    companies: ["Microsoft", "Amazon", "Flipkart"],
    experience: 3,
    bio: "Helping future developers get clarity on coding fundamentals and career paths.",
    rating: 4.6,
    price: 12,
    skills: ["DSA", "Career Guidance", "Resume Review"],
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    active:false
  },

  // 48 More 👇👇👇
  {
    id:3,
    fullName: "Arjun Mehta",
    title: "Backend Engineer",
    company: "Amazon",
    companies: ["Amazon", "Swiggy"],
    experience: 5,
    bio: "Specializing in scalable backend systems and architecture.",
    rating: 4.7,
    price: 14,
    skills: ["Node.js", "Microservices", "System Design"],
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    active:true

  },
  {
    id:4,
    fullName: "Neha Gupta",
    title: "Product Designer",
    company: "Spotify",
    companies: ["Spotify", "Zomato"],
    experience: 4,
    bio: "Designing experiences that humans love and understand easily.",
    rating: 4.8,
    price: 18,
    skills: ["UI/UX", "Design Systems", "Portfolio Review"],
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    active:false

  },
  {
    id:5,
    fullName: "Aditya Sharma",
    title: "AI Researcher",
    company: "OpenAI",
    companies: ["OpenAI", "DeepMind"],
    experience: 6,
    bio: "Advancing AI safety and deep learning innovation.",
    rating: 4.9,
    price: 25,
    skills: ["Machine Learning", "NLP", "Research"],
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    active:false
  },
  {
    id:6,
    fullName: "Priya Nair",
    title: "Data Scientist",
    company: "IBM",
    companies: ["IBM", "TCS"],
    experience: 4,
    bio: "Turning raw data into actionable insights.",
    rating: 4.4,
    price: 11,
    skills: ["Python", "Data Analytics", "ML Models"],
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    active:true
  },
  {
    id:7,
    fullName: "Kabir Khan",
    title: "DevOps Engineer",
    company: "Netflix",
    companies: ["Netflix", "Oracle"],
    experience: 7,
    bio: "Automation lover and infrastructure scaling expert.",
    rating: 4.7,
    price: 20,
    skills: ["AWS", "Docker", "Kubernetes"],
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    active:false
  },
  {
    id:8,
    fullName: "Ananya Das",
    title: "Frontend Developer",
    company: "Meta",
    companies: ["Meta", "Udaan"],
    experience: 3,
    bio: "UI wizard creating seamless web experiences.",
    rating: 4.5,
    price: 15,
    skills: ["React", "Next.js", "UI Engineering"],
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    active:false
  },
  {
    id:9,
    fullName: "Rohan Gupta",
    title: "Mobile App Engineer",
    company: "Swiggy",
    companies: ["Swiggy", "PhonePe"],
    experience: 4,
    bio: "Building super-fast Flutter & Android apps.",
    rating: 4.3,
    price: 10,
    skills: ["Android", "Flutter", "Firebase"],
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    active:true
  },
  {
    id:10,
    fullName: "Simran Kaur",
    title: "Cyber Security Analyst",
    company: "Cisco",
    companies: ["Cisco", "Infosys"],
    experience: 5,
    bio: "Helping systems stay secure in a hacker world!",
    rating: 4.6,
    price: 22,
    skills: ["Network Security", "Risk Assessment", "Pentesting"],
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    active:false
  },
  {
    id:11,
    fullName: "Aman Chowdhury",
    title: "Cloud Engineer",
    company: "Google",
    companies: ["Google", "Nutanix"],
    experience: 4,
    bio: "Cloud automation and distributed systems mentor.",
    rating: 4.7,
    price: 17,
    skills: ["GCP", "Terraform", "DevOps"],
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    active:false
  },
  {
    id:12,
    fullName: "Tanvi Patel",
    title: "AR/VR Developer",
    company: "Apple",
    companies: ["Apple"],
    experience: 3,
    bio: "Creating immersive virtual worlds.",
    rating: 4.4,
    price: 19,
    skills: ["Unity", "C#", "ARKit"],
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    active:true
  }
];


const authors: Author[] = [
  {
    fullName: "Amit Sharma",
    avatar: "https://randomuser.me/api/portraits/men/28.jpg",
    role: "Data Scientist",
    online: true,
  },
  {
    fullName: "Neha Gupta",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    role: "AI Mentor",
    online: false,
  },
  {
    fullName: "Neha Gupta",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    role: "AI Mentor",
    online: false,
  },
  {
    fullName: "Neha Gupta",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    role: "AI Mentor",
    online: true,
  },
  {
    fullName: "Neha Gupta",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    role: "AI Mentor",
    online: false,
  },
];

const trending: string[] = [
  "Mock Interviews",
  "Resume Review",
  "Career Guidance",
  "Salary Negotiation",
  "Coding Tutoring",
  "Personal Branding",
];


export {
    mentors, 
    authors, 
    trending
};