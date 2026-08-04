export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  /** Path under /public, e.g. "/certificates/my-certificate.jpg" */
  image: string;
  /** External link to view/verify the certificate */
  link: string;
};

export const certificatesIntro =
  "Courses, workshops, and credentials I've completed — click any certificate to view or verify it.";

export const certificates: Certificate[] = [
  {
    id: "placeholder-certificate",
    title: "IBM-Deep learning(Coursera)",
    issuer: "Completed IBM’s Introduction to Deep Learning & Neural Networks with Keras course, building a strong understanding of artificial neural networks and modern deep learning techniques. The course introduced TensorFlow, Keras, activation functions, forward and backpropagation, optimization algorithms, and neural network architectures. By implementing and training deep learning models on practical datasets, I developed the skills required to create intelligent AI solutions for computer vision and predictive analytics.",
    date: "29/Dec/2025",
    image: "/certificates/placeholder-certificate.jpg",
    link: "https://coursera.org/share/e5abe261b13af1791325eec55a67b8c4",
  },
  {
    id: "placeholder-certificate-2",
    title: "HakerRank-Problem Solving",
    issuer: "Successfully earned the HackerRank Problem Solving (Basic) Skill Certification by demonstrating proficiency in solving algorithmic and programming challenges through a standardized technical assessment. The certification validated my ability to apply fundamental computer science concepts, logical reasoning, and efficient coding techniques to solve real-world problems. It strengthened my analytical thinking, debugging capabilities, and approach to writing optimized, maintainable code under practical coding environments.",
    date: "05/Apr/2025",
    image: "/certificates/placeholder-certificate-2.jpg",
    link: "https://www.hackerrank.com/certificates/iframe/0f662b572d2f",
  },
  {
    id: "placeholder-certificate-3",
    title: "IBM-Machine Learning with python ",
    issuer: "Successfully completed IBM’s Machine Learning with Python course, where I explored the complete machine learning workflow using Python and Scikit-learn. The course focused on data preprocessing, feature engineering, regression, classification, clustering, model evaluation, and performance optimization. Through practical labs and real-world datasets, I gained valuable experience in building predictive models, interpreting results, and applying machine learning techniques to solve business and data-driven problems.",
    date: "26/Dec/2025",
    image: "/certificates/placeholder-certificate-3.jpg",
    link: "https://coursera.org/share/0ef11c05b1e2e6f343ddf643e059856f",
  },
  {
    id: "placeholder-certificate-4",
    title: "Python for Data Science, AI & Development",
    issuer: "Successfully completed IBM’s Python for Data Science, AI & Development course, gaining practical experience in Python programming for modern software development and AI applications. The course covered Python fundamentals, data structures, functions, object-oriented programming, file handling, and the use of industry-standard libraries. Through hands-on coding exercises and real-world examples, I strengthened my problem-solving abilities and built a solid programming foundation for data science, machine learning, and intelligent application development.",
    date: "01/Jul/2025",
    image: "/certificates/placeholder-certificate-4.jpg",
    link: "https://coursera.org/share/ddc94b289e6a1eba238b68ddbdcdb536",
  },
  {
    id: "placeholder-certificate-5",
    title: "Databases and SQL for Data Science with Python",
    issuer:  "Completed IBM’s Databases and SQL for Data Science with Python course to develop a comprehensive understanding of relational database systems and SQL programming. Learned to design efficient database queries, perform joins, filtering, aggregation, subqueries, and data manipulation while integrating SQL with Python. Hands-on projects strengthened my ability to manage structured data efficiently and build database-driven applications commonly used in backend development, analytics, and machine learning workflows.",
    date: " 19/Jul/2025",
    image: "/certificates/placeholder-certificate-5.jpg",
    link: "https://coursera.org/share/c5583f9cca4ee034a5d797c66591771b",
  },
  {
    id: "placeholder-certificate-6",
    title: "Al For All program",
    issuer: "Successfully completed the AI For All – AI Aware program, a national initiative by Intel, CBSE, and Digital India designed to introduce the fundamentals of Artificial Intelligence and its real-world applications. The program provided a comprehensive understanding of AI concepts, machine learning fundamentals, responsible AI practices, and the growing impact of intelligent technologies across industries. This certification strengthened my foundational knowledge of AI while encouraging innovation, analytical thinking, and problem-solving through technology.",
    date: "23/Oct/2024",
    image: "/certificates/placeholder-certificate-6.jpg",
    link: "https://example.com/replace-with-certificate-link",
  },
  {
    id: "placeholder-certificate-7",
    title: "Python for Beginners",
    issuer: "Successfully completed Python for Beginners by Simplilearn SkillUp, building a strong foundation in Python programming. The course covered core programming concepts including variables, data types, operators, conditional statements, loops, functions, and basic object-oriented programming. Through hands-on coding exercises, I developed problem-solving skills and gained practical experience writing clean, structured, and reusable Python code.",
    date: "12/Apr/2025",
    image: "/certificates/placeholder-certificate-7.jpg",
    link: "https://simpli-web.app.link/e/86Fmpi10Z4b",
  },
  {
    id: "placeholder-certificate-8",
    title: "Python Fundamentals for Beginners",
    issuer: "Completed Python Fundamentals for Beginners from Great Learning Academy to strengthen my understanding of Python programming fundamentals. The course emphasized writing efficient code using variables, operators, loops, functions, data structures, and logical problem-solving techniques. It provided hands-on practice that established the programming skills required for software development, automation, and data science",
    date: "February/2025",
    image: "/certificates/placeholder-certificate-8.jpg",
    link: "https://example.com/replace-with-certificate-link",
  },
];
