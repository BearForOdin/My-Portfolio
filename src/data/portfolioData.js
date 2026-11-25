import y2kBaddieImg from "../Assets/GraphicDesign/y2k-baddie-editorial.jpg";
import kokonsahJerseyImg from "../Assets/GraphicDesign/kokonsah-jersey.jpg";
import accaPosterImg from "../Assets/GraphicDesign/acca-35-poster.jpg";
import halftoneAlienImg from "../Assets/GraphicDesign/halftone-alien-art.jpg";
import kirulabsMayDayImg from "../Assets/GraphicDesign/kirulabs-mayday-poster.jpg";

export const PROFILE = {
  firstName: "Selasi",
  lastName: "Dzeamesi",
  fullName: "Selasi Dzeamesi",
  title: "Creative Developer.",
  roleLine: "Founder & CEO of KiruLabs · Software Developer · Artist",
  subtitle: "CEO, Software Developer & Artist",
  location: "Accra, Ghana",
  locationShort: "Accra, GH",
  timezone: "Africa/Accra",
  email: "selasidzeamesi82@gmail.com",
  phone: "+233 547 601 618",
  availability: "AVAILABLE FOR WORK · 2026",
  socials: {
    github: "https://github.com/icybearfvreal",
    githubAlt: "https://github.com/BearForOdin",
    linkedin: "https://www.linkedin.com/in/selasi-dzeamesi-818206251/",
    medium: "https://medium.com/@selasidzeamesi82",
    twitter: "https://x.com/icybearfvr",
    instagram: "https://www.instagram.com/apparelmess",
  },
};

export const DISCIPLINES = [
  {
    id: "design",
    label: "DESIGN",
    caption: "Graphic design, brand posters, streetwear apparel direction & UI/UX systems.",
  },
  {
    id: "frontend",
    label: "FRONTEND",
    featured: true,
    caption: "React, React Native, TypeScript, Tailwind CSS & tactile web interfaces.",
  },
  {
    id: "backend",
    label: "BACKEND",
    caption: "Python, Django, Django REST Framework, Flask, SQL & scalable REST APIs.",
  },
  {
    id: "leadership",
    label: "KIRULABS",
    caption: "Founder & CEO — leading technology initiatives & shipping digital products.",
  },
];

export const PROJECTS = [
  {
    slug: "siesie-marketplace",
    index: "01",
    title: "Siesie",
    shortTitle: "Siesie",
    category: "Marketplace / MVP",
    filter: "Web",
    year: "2026",
    role: "Product & Frontend Dev",
    client: "Siesie Ghana",
    stack: ["React", "Tailwind CSS", "UI/UX Design", "Marketplace"],
    tagline:
      "Digital service-booking marketplace connecting customers with trusted, reliable service providers across Ghana.",
    overview:
      "Contributed to the development and product advancement of Siesie — spanning product planning, application development, feature coordination, and user experience design. Built to simplify service discovery and booking, elevate customer-provider communication, and bring trust and accessibility to Ghana's service industry as it approaches MVP launch.",
    liveUrl: "https://siesie-marketplace.vercel.app/",
    github: "https://github.com/icybearfvreal",
    accent: "#FF5D1F",
    metrics: [
      { label: "Product", value: "Service Marketplace" },
      { label: "Market", value: "Across Ghana" },
      { label: "Status", value: "Live MVP" },
    ],
    highlights: [
      {
        num: "01",
        title: "Service Discovery & Profiles",
        body: "Intuitive category browsing and detailed worker profiles help customers compare reliable providers with confidence.",
      },
      {
        num: "02",
        title: "End-to-End Booking Flow",
        body: "Streamlined user registration, authentication, service booking, and booking management built for effortless mobile use.",
      },
      {
        num: "03",
        title: "Trust-Centered UX",
        body: "Clear customer-provider communication channels and responsive Tailwind CSS layouts engineered for everyday accessibility.",
      },
    ],
    codePreview: `// Siesie Service Booking Flow
const bookService = async ({ providerId, category, slot }) => {
  return marketplace.bookings.create({
    region: "Accra, GH",
    providerId,
    category,
    scheduledAt: slot,
    verified: true,
  });
};`,
  },
  {
    slug: "wcc-website",
    index: "02",
    title: "WCC Website",
    shortTitle: "WCC Site",
    category: "Community Web",
    filter: "Web",
    year: "2025",
    role: "Web Developer",
    client: "World Community Church",
    stack: ["HTML5", "CSS3", "JavaScript", "Responsive UI"],
    tagline:
      "Welcoming digital home for World Community Church designed to strengthen community connection and simplify access across devices.",
    overview:
      "Designed and built a live production website for World Community Church to support community building and bring people together. Focused on fast load performance, secure architecture, clear navigation, and a sleek mobile experience for members and first-time visitors alike.",
    liveUrl: "https://worldcommunitychurch.com/",
    github: "https://github.com/icybearfvreal",
    accent: "#FF5D1F",
    metrics: [
      { label: "Domain", value: "Live Production" },
      { label: "Stack", value: "HTML · CSS · JS" },
      { label: "Focus", value: "Community UX" },
    ],
    highlights: [
      {
        num: "01",
        title: "Clear, Effortless Navigation",
        body: "Structured information architecture makes events, gatherings, and church resources immediately accessible to every age group.",
      },
      {
        num: "02",
        title: "Sleek Mobile-First Experience",
        body: "Crafted responsive layouts that feel crisp and welcoming on smartphones where most community members browse.",
      },
      {
        num: "03",
        title: "Lightweight & Dependable",
        body: "Zero unnecessary framework overhead — fast semantic HTML5, modern CSS3, and focused vanilla JavaScript.",
      },
    ],
    codePreview: `<!-- World Community Church -->
<section class="wcc-hero" data-theme="welcome">
  <h1>Building Community Together</h1>
  <nav aria-label="Church Quick Links">
    <a href="#services">Join Sunday Service</a>
    <a href="#community">Connect With Us</a>
  </nav>
</section>`,
  },
  {
    slug: "secret-notes",
    index: "03",
    title: "Secret Notes",
    shortTitle: "Secret Notes",
    category: "Web3 / Blockchain",
    filter: "Web3",
    year: "2025",
    role: "Full-Stack Web3 Dev",
    client: "Personal Lab",
    stack: ["React", "Rust", "ICP Ninja", "Blockchain"],
    tagline:
      "Decentralized on-chain note vault built on Internet Computer (ICP) with a Rust canister backend and clean React interface.",
    overview:
      "My first Web3 application built on ICP Ninja for storing notes directly on the blockchain. Combines a Rust canister backend with a crisp React frontend to explore decentralized storage, cryptographic ownership, and smooth client-canister interactions.",
    github: "https://github.com/BearForOdin/Secret-Notes",
    accent: "#FF5D1F",
    metrics: [
      { label: "Backend", value: "Rust Canister" },
      { label: "Network", value: "ICP Blockchain" },
      { label: "Frontend", value: "React" },
    ],
    highlights: [
      {
        num: "01",
        title: "On-Chain Persistence",
        body: "Notes live directly inside an Internet Computer canister written in Rust, eliminating centralized database silos.",
      },
      {
        num: "02",
        title: "Minimalist Vault UX",
        body: "Clean typography and immediate UI feedback make decentralized storage feel as effortless as a native notes app.",
      },
      {
        num: "03",
        title: "Typed Canister Bridge",
        body: "Clear separation between React UI state and asynchronous canister calls with resilient loading states.",
      },
    ],
    codePreview: `#[ic_cdk::update]
fn save_secret_note(id: String, body: String) -> Result<(), String> {
  VAULT.with(|vault| {
    vault.borrow_mut().insert(id, Note::encrypted(body));
    Ok(())
  })
}`,
  },
];

export const GRAPHIC_WORKS = [
  {
    id: "kirulabs-mayday",
    index: "01",
    title: "KiruLabs — May Day Campaign",
    category: "Campaign Poster · Art Direction",
    year: "2026",
    client: "KiruLabs",
    image: kirulabsMayDayImg,
    description:
      "Mixed-media editorial poster created for KiruLabs celebrating workers across professions — blending archival protest collage textures with bold contemporary portrait compositing.",
  },
  {
    id: "acca-35",
    index: "02",
    title: "ACCA 35° — Anniversary Poster",
    category: "Editorial Poster · Collage",
    year: "2025",
    client: "ACCA 35 Years",
    image: accaPosterImg,
    description:
      "High-impact vermilion poster collage celebrating 35 years of banking — featuring monumental rotated typography, architectural projection, and playful editorial copy.",
  },
  {
    id: "kokonsah-jersey",
    index: "03",
    title: "KOKONSAH — Streetwear Jersey",
    category: "Apparel Design · Custom Type",
    year: "2025",
    client: "Apparel Direction",
    image: kokonsahJerseyImg,
    description:
      "Custom streetwear football jersey concept pairing hand-rendered chrome-tooth lettering, crimson flame sleeve motifs, and high-contrast halftone paneling.",
  },
  {
    id: "y2k-baddie",
    index: "04",
    title: "Y2K Baddie — Lookbook Editorial",
    category: "Fashion Art Direction · Branding",
    year: "2025",
    client: "Editorial Shoot",
    image: y2kBaddieImg,
    description:
      "Y2K-inspired dual-frame fashion editorial and custom chest-print typography direction balancing stark white studio negative space with neon pink and burnt-orange accents.",
  },
  {
    id: "third-eye-halftone",
    index: "05",
    title: "Third Eye — Halftone Pop Art",
    category: "Illustration · Graphic Print",
    year: "2025",
    client: "Personal Studio",
    image: halftoneAlienImg,
    description:
      "Acid-yellow and violet screen-print halftone illustration exploring geometric symmetry, custom iconography, and tactile risograph grain.",
  },
];

export const CAPABILITIES = [
  {
    title: "Frontend & Mobile",
    items: [
      "HTML5, CSS3, JavaScript (ES6+)",
      "TypeScript & Component Architecture",
      "React & React Native",
      "Tailwind CSS & Bootstrap",
      "Responsive Web Design",
      "State Management & Micro-interactions",
    ],
  },
  {
    title: "Backend & APIs",
    items: [
      "Python & SQL",
      "Django & Django REST Framework",
      "Flask Backend Services",
      "RESTful API Development",
      "Database Management",
      "Rust & ICP Web3 Canisters",
    ],
  },
  {
    title: "Design & Art Direction",
    items: [
      "UI/UX Design & Figma",
      "Graphic Design & Poster Art",
      "Streetwear & Apparel Graphics",
      "Brand Identity & Campaigns",
      "Mixed-Media Collage & Print",
      "Visual Storytelling",
    ],
  },
  {
    title: "Leadership & Delivery",
    items: [
      "Founder & CEO — KiruLabs",
      "Product Planning & Coordination",
      "Git, GitHub & Version Control",
      "API Integration & QA",
      "Technical Problem-Solving",
      "Cross-Team Collaboration",
    ],
  },
];

export const EDUCATION = [
  {
    period: "2025 — 2026",
    title: "ALX Backend Development Certificate",
    org: "ALX Africa",
    detail:
      "Intensive backend engineering training covering Python, Django, REST APIs, database architecture, and production deployment.",
  },
  {
    period: "2025",
    title: "ALX Professional Foundations Certificate",
    org: "ALX Africa",
    detail:
      "Leadership, communication, product thinking, and modern collaborative engineering workflows.",
  },
  {
    period: "2025",
    title: "Creative Entrepreneurs Forum (CEF) Mentorship",
    org: "CEF Ghana (Completed)",
    detail:
      "Mentorship bridging creative practice, visual direction, and technology entrepreneurship.",
  },
  {
    period: "2022 — 2024",
    title: "ATHE Level 4 & 5 Diploma in Information Technology",
    org: "Central University — Ghana",
    detail:
      "Core software engineering, IT solutions, systems design, and web application development.",
  },
  {
    period: "2024",
    title: "Cybersecurity Certificate",
    org: "HP Life",
    detail:
      "Security fundamentals, threat awareness, and resilient web engineering practices.",
  },
];

export const INTERESTS = [
  {
    index: "01",
    title: "GRAPHIC DESIGN & BRANDING",
    body: "From bold vermilion campaign posters for KiruLabs to custom streetwear jerseys and Y2K lookbooks, graphic art is my visual playground and shapes every digital interface I craft.",
  },
  {
    index: "02",
    title: "FOUNDING & BUILDING AT KIRULABS",
    body: "As Founder & CEO of KiruLabs, I lead technology initiatives, coordinate product teams, and translate ambitious ideas into practical, user-focused digital products.",
  },
  {
    index: "03",
    title: "WRITING & OPEN SOURCE",
    body: "Sharing lessons on software engineering, design craft, and entrepreneurship on Medium while contributing to community-driven and open-source projects.",
    link: {
      label: "Read on Medium ↗",
      href: "https://medium.com/@selasidzeamesi82",
    },
  },
];
