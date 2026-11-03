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
  "Course certificates from IBM and MongoDB. Every one carries a verify link — click through and check.";

/* Ordered by what's worth seeing first, not by date: the home page shows the
   top three, and four consecutive IBM entries would make that row read as one
   repeated card. MongoDB sits second to break it up.

   If this list is ever emptied, the home section, its nav link, the
   /certificates page (and its sitemap entry) and the Certifications stat all
   hide themselves. Scans go in public/certificates/ — see the README there. */
export const certificates: Certificate[] = [
  {
    id: "ibm-deep-learning-keras",
    title: "Introduction to Deep Learning & Neural Networks with Keras",
    issuer: "IBM · Coursera",
    note: "Where forward and backpropagation stopped being a diagram and started being something I could implement.",
    date: "Jan 2026",
    image: "/certificates/ibm-deep-learning-keras-vez0kzf2fcdb.jpg",
    link: "https://coursera.org/verify/VEZ0KZF2FCDB",
  },
  {
    id: "mongodb-basics",
    title: "MongoDB Basics for Students",
    issuer: "MongoDB",
    note: "Documents, collections and CRUD — the non-relational side of the data layer, next to the SQL course below.",
    date: "Jul 2026",
    image: "/certificates/mongodb-basics-f3b4f76a.jpg",
    link: "https://www.credly.com/badges/f3b4f76a-c0d5-4333-9b0a-1b4413ace6f4",
  },
  {
    id: "ibm-machine-learning-python",
    title: "Machine Learning with Python",
    issuer: "IBM · Coursera",
    note: "The whole loop — preprocessing, feature work, regression, classification, clustering, and how to tell if any of it worked.",
    date: "Dec 2025",
    image: "/certificates/ibm-machine-learning-python-r0bm3d588789.jpg",
    link: "https://coursera.org/verify/R0BM3D588789",
  },
  {
    id: "ibm-databases-sql",
    title: "Databases and SQL for Data Science with Python",
    issuer: "IBM · Coursera",
    note: "Joins, aggregation and subqueries, driven from Python rather than typed into a console.",
    date: "Jul 2025",
    image: "/certificates/ibm-databases-sql-bmadmegp8t54.jpg",
    link: "https://coursera.org/verify/BMADMEGP8T54",
  },
  {
    id: "ibm-python-data-science",
    title: "Python for Data Science, AI & Development",
    issuer: "IBM · Coursera",
    note: "Python from fundamentals through OOP and file handling — the base everything after this sits on.",
    date: "Jul 2025",
    image: "/certificates/ibm-python-data-science-po7km5f5iuqa.jpg",
    link: "https://coursera.org/verify/PO7KM5F5IUQA",
  },
];
