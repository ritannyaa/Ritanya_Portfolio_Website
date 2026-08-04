export const siteConfig = {
  name: "Yahesh M",
  title: "Yahesh M - Personal Portfolio",
  email: "yahesh.m2006@gmail.com",
  phone: "+91 96290 26395",
  location: "Erode, Tamil Nadu — Open to work anywhere",
  locationShort: "Coimbatore, Tamil Nadu — Open to work anywhere",
  dob: "December 20, 2006",
  linkedin: "https://www.linkedin.com/in/yahesh-m-078244329",
  github: "https://github.com/yaheshmaheshwaran",
  resumeUrl:
    "https://drive.google.com/file/d/1lRq4DURBk0uSGj-DQ2bSbTGvIulCVm_U/view?usp=share_link",
  emailjs: {
    publicKey: "pOGDSOwUFPiIxrTC1",
    serviceId: "service_chb4oni",
    templateId: "template_tmx3j6h",
  },
} as const;

export const navItems = [
  { label: "Home", href: "/#home-section" },
  { label: "About", href: "/#about-me-extended" },
  { label: "Projects", href: "/#blog-section" },
  { label: "Experience", href: "/#experience-section" },
  { label: "Certificates", href: "/#certificates-section" },
  { label: "Skills", href: "/#skills-section" },
  { label: "Resume", href: "/#hireme-section" },
  { label: "Contact", href: "/#contact-section" },
] as const;

export const heroContent = {
  greeting: "HELLO!",
  name: "Yahesh M",
  subtitle: "B.Tech Student in",
  title: "Artificial Intelligence & Data Science",
  availability:
    "Open to Internships & Full-Time Opportunities",
} as const;

export const academicsContent = {
  intro:
    "Passionate about transforming data into actionable insights and building scalable solutions",
  paragraphs: [
    "I am currently pursuing a B.Tech in Artificial Intelligence & Data Science at KPR Institute of Engineering and Technology, Coimbatore. As a 3rd-year (prefinal-year) student, I have built a strong foundation in machine learning, deep learning, data structures, databases, cloud computing, and software engineering, with a strong focus on developing intelligent systems for real-world applications.",
    "Alongside academics, I actively apply my learning through projects such as SentinelIQ, where I work on AI workflows, backend systems, cloud infrastructure, and security-focused engineering, helping me develop practical industry-ready skills."
  ],
highlights: [
  "<strong>AI & Data Science:</strong> Strong foundation in AI, Machine Learning, Deep Learning, and Data Science.",
  "<strong>Backend & Cloud:</strong> Hands-on experience with backend development, APIs, databases, and cloud technologies.",
  "<strong>Production Engineering:</strong> Focus on production-grade engineering and real-world AI applications.",
  "<strong>Continuous Growth:</strong> Continuously strengthening industry-ready skills through practical projects and problem-solving."
],
  education: {
    degree: "B.Tech in AI & Data Science",
    institution: "KPR Institute of Engineering and Technology",
    year: "3rd-year (prefinal-year), Coimbatore, Tamil Nadu, India ( location flexible  )",
  },
} as const;

export const statsContent = [
  { value: 4, label: "Projects" },
  { value: 100, label: "Problem Solving-QUS" },
  { value: 20, label: "DSA" },
  { value: 5, label: "Tools" },
] as const;

export const resumeCtaContent = {
  title: "I'm Available for Internship or Job",
  description:
    "Seeking opportunities to apply my skills in AI & Data Science, build impactful solutions, and gain hands-on industry experience.",
} as const;

export const footerContent = {
  about:
    "I am a B.Tech student specializing in AI & Data Science, passionate about building data-driven solutions and practical projects. I focus on creating scalable, efficient, and innovative applications that solve real-world problems.",
  roles: [
    "Python Development & Automation",
    "Data Analysis & Visualization",
    "SQL & Database Management",
    "AI & Machine Learning Projects",
    "Backend Development",
  ],
  credit: "Thank You for visiting site | This Portfolio is made by Yahesh M",
} as const;
