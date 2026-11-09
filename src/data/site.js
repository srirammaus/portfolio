/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT YOUR IDENTITY HERE
 *  Anything left empty is treated as "not provided yet" and the
 *  interface never invents a value for it.
 * ─────────────────────────────────────────────────────────────
 */
export const identity = {
  name: "Sriram Mariappan",
  role: "Backend Engineering · Integrations · Security",
  tagline:
    "Backend engineering, integrations, AI-powered applications, and secure digital experiences.",
  email: "srirmmaus@gmail.com",
  linkedin: "https://www.linkedin.com/in/sriram-mariappan-061a51201/",
  github: "https://github.com/srirammaus",
  instagram: "https://www.instagram.com/hebzxzy?exln=MXRnZWk5OTEwYjd0Ng==",
  youtube: "https://www.youtube.com/@HouseOfTechiesYT",
  resume: "",
};

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "integrations", label: "Integrations" },
  { id: "security", label: "Security" },
  { id: "journal", label: "Journal" },
  { id: "contact", label: "Contact" },
];

/** Interactive points floating over the opening scene. */
export const hotspots = [
  { id: "projects", label: "Projects", hint: "2 personal · 5 professional", left: "72%", top: "34%" },
  { id: "integrations", label: "Integrations", hint: "OAuth · payments · ERP · SMS", left: "85%", top: "24%" },
  { id: "skills", label: "Skills", hint: "6 engineering domains", left: "78%", top: "58%" },
  { id: "security", label: "Security", hint: "Research & lab notes", left: "62%", top: "70%" },
];

/** The six layers the transition scene maps to. */
export const systemLayers = [
  { index: "01", title: "Backend services", note: "Request handling, business logic, background work" },
  { index: "02", title: "APIs & integrations", note: "Third-party platforms, OAuth flows, webhooks" },
  { index: "03", title: "Databases", note: "Relational, document and cache layers" },
  { index: "04", title: "Cloud infrastructure", note: "Containers, reverse proxies, edge routing" },
  { index: "05", title: "AI systems", note: "LLM applications, retrieval, tool use" },
  { index: "06", title: "Application interfaces", note: "Web and mobile clients" },
];

export const about = {
  intro:
    "I'm a software developer interested in building practical applications and solving engineering challenges across backend systems, integrations, databases, and modern application architectures. I enjoy understanding how systems communicate, how data flows between services, and how applications can be designed to remain secure, maintainable, and reliable.",
  blocks: [
    {
      label: "Professional background",
      body: "My work and independent projects span e-commerce, billing, club membership systems, CRM, ERP integrations, payment gateways, authentication, messaging services, and AI-driven applications.",
    },
    {
      label: "Technical interests",
      body: "Backend development and API engineering, database design, payment and platform integrations, OAuth, AI and LLM applications, cloud infrastructure, and DevOps.",
    },
    {
      label: "Current learning goals",
      body: "I'm building my application security knowledge through controlled practice, studying web and API security, identity, secure backend development, cloud and container security, and responsible disclosure.",
    },
  ],
};

export const sectionMeta = {
  about: { index: "01", label: "About" },
  services: { index: "02", label: "Freelance Services" },
  skills: { index: "03", label: "Skills" },
  projects: { index: "04", label: "Projects" },
  integrations: { index: "05", label: "Connecting Systems" },
  security: { index: "06", label: "Security Research" },
  journal: { index: "07", label: "Journal" },
  contact: { index: "08", label: "Contact" },
};
