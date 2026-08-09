export type Certificate = {
  id: string;
  title: string;
  /** The actual issuing body. This field used to hold a 60-word essay. */
  issuer: string;
  /** One line, in my own words, on what it covered or why I took it. */
  note: string;
  date: string;
  /** Path under /public, e.g. "/certificates/my-certificate.jpg" */
  image: string;
  /** Verify link. Unset where I don't have one — the card then shows the
   *  scan without pretending there's something to click through to. */
  link?: string;
};

export const certificatesIntro =
  "Course certificates and one timed assessment. The ones carrying a verify link have a real one — click through and check.";

/* Ordered by what's worth seeing first, not by date: the home page shows the
   top three, and five consecutive IBM entries made that row read as one
   repeated card. Interleaving the issuers fixes it without reordering
   anything on the /certificates page in a way that matters. */
export const certificates: Certificate[] = [
  {
    id: "ibm-deep-learning-keras",
    title: "Deep Learning & Neural Networks with Keras",
    issuer: "IBM · Coursera",
    note: "Where forward and backpropagation stopped being a diagram and started being something I could implement.",
    date: "Dec 2025",
    image: "/certificates/ibm-deep-learning-keras.jpg",
    link: "https://coursera.org/share/e5abe261b13af1791325eec55a67b8c4",
  },
  {
    id: "hackerrank-problem-solving",
    title: "Problem Solving (Basic)",
    issuer: "HackerRank",
    note: "A timed algorithmic assessment — useful mostly as calibration for how I actually perform under a clock.",
    date: "Apr 2025",
    image: "/certificates/hackerrank-problem-solving.jpg",
    link: "https://www.hackerrank.com/certificates/iframe/0f662b572d2f",
  },
  {
    id: "ibm-machine-learning-python",
    title: "Machine Learning with Python",
    issuer: "IBM · Coursera",
    note: "The whole loop — preprocessing, feature work, regression, classification, clustering, and how to tell if any of it worked.",
    date: "Dec 2025",
    image: "/certificates/ibm-machine-learning-python.jpg",
    link: "https://coursera.org/share/0ef11c05b1e2e6f343ddf643e059856f",
  },
  {
    id: "ibm-databases-sql",
    title: "Databases and SQL for Data Science",
    issuer: "IBM · Coursera",
    note: "Joins, aggregation and subqueries, driven from Python rather than typed into a console.",
    date: "Jul 2025",
    image: "/certificates/ibm-databases-sql.jpg",
    link: "https://coursera.org/share/c5583f9cca4ee034a5d797c66591771b",
  },
  {
    id: "ibm-python-data-science",
    title: "Python for Data Science, AI & Development",
    issuer: "IBM · Coursera",
    note: "Python from fundamentals through OOP and file handling — the base everything after this sits on.",
    date: "Jul 2025",
    image: "/certificates/ibm-python-data-science.jpg",
    link: "https://coursera.org/share/ddc94b289e6a1eba238b68ddbdcdb536",
  },
  {
    id: "simplilearn-python",
    title: "Python for Beginners",
    issuer: "Simplilearn SkillUp",
    note: "The first structured Python course I finished rather than abandoned halfway.",
    date: "Apr 2025",
    image: "/certificates/simplilearn-python.jpg",
    link: "https://simpli-web.app.link/e/86Fmpi10Z4b",
  },
  {
    id: "great-learning-python",
    title: "Python Fundamentals for Beginners",
    issuer: "Great Learning Academy",
    note: "Loops, functions and data structures. Groundwork.",
    date: "Feb 2025",
    image: "/certificates/great-learning-python.jpg",
    // No verify link available for this one.
  },
  {
    id: "ai-for-all",
    title: "AI For All — AI Aware",
    issuer: "Intel · CBSE · Digital India",
    note: "A national AI-literacy program. Not deep, but it's where the interest actually started.",
    date: "Oct 2024",
    image: "/certificates/ai-for-all.jpg",
  },
];
