const mentors = [
  {
    id:1,
    name: "Rahul Verma",
    title: "Tech Mentor",
    company: "Google",
    companies: ["Microsoft", "Google", "Amazon", "Facebook"],
    experience: 4,
    bio: "I help students grow in tech careers using structured mentorship and interview guidance.",
    rating: 4.5,
    price: 10,
    skills: ["Career Guidance", "System Design", "Mock Interviews"],
    img: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id:2,
    name: "Shruti Singh",
    title: "SDE",
    company: "Microsoft",
    companies: ["Microsoft", "Amazon", "Flipkart"],
    experience: 3,
    bio: "Helping future developers get clarity on coding fundamentals and career paths.",
    rating: 4.6,
    price: 12,
    skills: ["DSA", "Career Guidance", "Resume Review"],
    img: "https://randomuser.me/api/portraits/women/2.jpg"
  },

  // 48 More 👇👇👇
  {
    id:3,
    name: "Arjun Mehta",
    title: "Backend Engineer",
    company: "Amazon",
    companies: ["Amazon", "Swiggy"],
    experience: 5,
    bio: "Specializing in scalable backend systems and architecture.",
    rating: 4.7,
    price: 14,
    skills: ["Node.js", "Microservices", "System Design"],
    img: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    id:4,
    name: "Neha Gupta",
    title: "Product Designer",
    company: "Spotify",
    companies: ["Spotify", "Zomato"],
    experience: 4,
    bio: "Designing experiences that humans love and understand easily.",
    rating: 4.8,
    price: 18,
    skills: ["UI/UX", "Design Systems", "Portfolio Review"],
    img: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    id:5,
    name: "Aditya Sharma",
    title: "AI Researcher",
    company: "OpenAI",
    companies: ["OpenAI", "DeepMind"],
    experience: 6,
    bio: "Advancing AI safety and deep learning innovation.",
    rating: 4.9,
    price: 25,
    skills: ["Machine Learning", "NLP", "Research"],
    img: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  {
    id:6,
    name: "Priya Nair",
    title: "Data Scientist",
    company: "IBM",
    companies: ["IBM", "TCS"],
    experience: 4,
    bio: "Turning raw data into actionable insights.",
    rating: 4.4,
    price: 11,
    skills: ["Python", "Data Analytics", "ML Models"],
    img: "https://randomuser.me/api/portraits/women/6.jpg"
  },
  {
    id:7,
    name: "Kabir Khan",
    title: "DevOps Engineer",
    company: "Netflix",
    companies: ["Netflix", "Oracle"],
    experience: 7,
    bio: "Automation lover and infrastructure scaling expert.",
    rating: 4.7,
    price: 20,
    skills: ["AWS", "Docker", "Kubernetes"],
    img: "https://randomuser.me/api/portraits/men/7.jpg"
  },
  {
    id:8,
    name: "Ananya Das",
    title: "Frontend Developer",
    company: "Meta",
    companies: ["Meta", "Udaan"],
    experience: 3,
    bio: "UI wizard creating seamless web experiences.",
    rating: 4.5,
    price: 15,
    skills: ["React", "Next.js", "UI Engineering"],
    img: "https://randomuser.me/api/portraits/women/8.jpg"
  },
  {
    id:9,
    name: "Rohan Gupta",
    title: "Mobile App Engineer",
    company: "Swiggy",
    companies: ["Swiggy", "PhonePe"],
    experience: 4,
    bio: "Building super-fast Flutter & Android apps.",
    rating: 4.3,
    price: 10,
    skills: ["Android", "Flutter", "Firebase"],
    img: "https://randomuser.me/api/portraits/men/9.jpg"
  },
  {
    id:10,
    name: "Simran Kaur",
    title: "Cyber Security Analyst",
    company: "Cisco",
    companies: ["Cisco", "Infosys"],
    experience: 5,
    bio: "Helping systems stay secure in a hacker world!",
    rating: 4.6,
    price: 22,
    skills: ["Network Security", "Risk Assessment", "Pentesting"],
    img: "https://randomuser.me/api/portraits/women/10.jpg"
  },
  {
    id:11,
    name: "Aman Chowdhury",
    title: "Cloud Engineer",
    company: "Google",
    companies: ["Google", "Nutanix"],
    experience: 4,
    bio: "Cloud automation and distributed systems mentor.",
    rating: 4.7,
    price: 17,
    skills: ["GCP", "Terraform", "DevOps"],
    img: "https://randomuser.me/api/portraits/men/11.jpg"
  },
  {
    id:12,
    name: "Tanvi Patel",
    title: "AR/VR Developer",
    company: "Apple",
    companies: ["Apple"],
    experience: 3,
    bio: "Creating immersive virtual worlds.",
    rating: 4.4,
    price: 19,
    skills: ["Unity", "C#", "ARKit"],
    img: "https://randomuser.me/api/portraits/women/12.jpg"
  }
];


const authors = [
  {
    name: "Amit Sharma",
    img: "https://randomuser.me/api/portraits/men/28.jpg",
    role: "Data Scientist",
    online: true,
  },
  {
    name: "Neha Gupta",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
    role: "AI Mentor",
    online: false,
  },
  {
    name: "Neha Gupta",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
    role: "AI Mentor",
    online: false,
  },
  {
    name: "Neha Gupta",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
    role: "AI Mentor",
    online: false,
  },
  {
    name: "Neha Gupta",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
    role: "AI Mentor",
    online: false,
  },
];

const trending = [
  "Mock Interviews",
  "Resume Review",
  "Career Guidance",
  "Salary Negotiation",
  "Coding Tutoring",
  "Personal Branding",
];


export {mentors, authors, trending};