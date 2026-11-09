export const skillGroups = [
  {
    id: "backend", index: "01", title: "Programming & backend", note: "Server applications and APIs",
    items: ["JavaScript", "Node.js", "Express.js", "PHP", "Python", "Flask", "FastAPI", "REST APIs"],
  },
  {
    id: "frontend", index: "02", title: "Frontend & mobile", note: "Web and mobile interfaces",
    items: ["HTML", "CSS", "React", "Next.js", "Flutter"],
  },
  {
    id: "data", index: "03", title: "Databases & ORM", note: "Data storage and access",
    items: ["PostgreSQL", "MySQL", "MariaDB", "MongoDB", "Redis", "Prisma ORM", "PGVector"],
  },
  {
    id: "infra", index: "04", title: "Infrastructure & tools", note: "Containers, messaging, and development environment",
    items: ["Docker", "Docker Compose", "Apache Kafka", "Git", "Linux", "Cloudflare", "VirtualBox"],
  },
  {
    id: "ai", index: "05", title: "Integrations & AI", note: "External services and model-powered workflows",
    items: ["REST APIs", "OAuth 2.0", "Payment gateways", "SMS gateways", "Google APIs", "ERP integrations", "LLM integrations", "RAG", "MCP"],
  },
  {
    id: "security", index: "06", title: "Security topics under study", note: "Ongoing learning in authorized settings",
    items: ["Web application security", "Authentication & authorization", "Session management", "API security", "Input validation", "Secrets management", "Secure deployment", "Authorized vulnerability assessment", "Security logging"],
  },
];

export const skillMatrix = [
  { skill: "Authentication and identity", example: "Microsoft OAuth sign-in integration", experience: "Integration engineering" },
  { skill: "Payments and messaging", example: "Payment gateway work; Fast2SMS and Mobishastra", experience: "Integration engineering" },
  { skill: "Business system integration", example: "Diamond ERP and Google API integrations", experience: "Integration engineering" },
  { skill: "Business application development", example: "IndiaClub membership and Billfics billing workflows", experience: "Professional project work" },
  { skill: "AI and tool integration", example: "Filly AI LLM workflows and MCP exploration", experience: "Personal project in progress" },
  { skill: "IoT data integration", example: "CloudLink sensor and weather data exploration", experience: "Personal project in progress" },
  { skill: "Application security", example: "Web/API security and authentication study", experience: "Ongoing learning" },
];

export const aiDevelopmentTools = ["Codex", "Claude", "Google Antigravity"];

export const skillsNote =
  "This is an initial inventory of technologies and topics. It reflects a mix of project experience and ongoing learning, not equal proficiency in every item.";
