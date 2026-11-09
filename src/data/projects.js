import { media } from "@/data/media";

/**
 * Personal projects. Only implemented scope is described; anything not yet
 * confirmed is intentionally left out rather than guessed.
 */
export const personalProjects = [
  {
    id: "cloudlink",
    name: "CloudLink",
    kind: "Personal project",
    category: "IoT · Environmental data · Conversational access",
    status: "In Progress",
    image: media.cloudlink,
    summary:
      "An independent project exploring environmental sensor readings, weather APIs, backend data processing, and a Python chatbot.",
    description:
      "CloudLink explores how environmental sensor readings and weather data can be gathered, processed by a backend API, and then reached through conversational access. It is an ongoing experiment in connecting physical data sources to an interface that answers questions in plain language.",
    involvement: "Personal project — concept, backend and interface work.",
    focus: [
      "Environmental sensor readings",
      "Weather data integration",
      "Backend API processing",
      "Python chatbot functionality",
    ],
    note:
      "In progress. No coverage, accuracy or performance claims are published while the project is being built.",
    links: [],
  },
  {
    id: "filly-ai",
    name: "Filly AI",
    kind: "Personal project",
    category: "AI · Retrieval · External integrations",
    status: "In Progress",
    image: media.filly,
    summary:
      "An AI-focused platform exploring LLM workflows, retrieval-augmented generation, MCP integrations, and connections to external services.",
    description:
      "Filly AI explores LLM application architecture, retrieval-augmented generation, vector search, MCP-based tool integrations, OAuth authorization, and backend application workflows.",
    involvement: "Personal project — architecture, backend services and integration work.",
    focus: [
      "LLM application architecture",
      "RAG and vector search",
      "MCP tool integrations",
      "OAuth authorization",
      "Backend APIs and workflows",
    ],
    note:
      "Features are described only once they are implemented. Planned capabilities stay off this page until they are confirmed.",
    links: [],
  },
];

/**
 * Professional projects — developed in a company context. Descriptions stay
 * intentionally generic and no client, metric or repository detail is exposed.
 */
export const professionalProjects = [
  {
    id: "dukkanak",
    name: "Dukkanak",
    kind: "Professional project",
    category: "E-commerce platform",
    status: "Completed",
    summary:
      "Contributed to an e-commerce platform, working on application features and technical functionality.",
    description:
      "Participated in the development of an e-commerce platform, contributing to application features and technical functionality.",
    involvement: "Integration development and application engineering within a company team.",
    focus: [
      "E-commerce application",
      "Application features",
      "Technical functionality",
    ],
    note: "Company context. Only generic details approved for public display are shown.",
    links: [],
  },
  {
    id: "mrithu-pharmacy",
    name: "Mrithu Pharmacy",
    kind: "Professional project",
    category: "E-commerce · Web and mobile",
    status: "Nearing Completion",
    summary:
      "A pharmacy e-commerce solution for web and mobile that is nearing completion.",
    description:
      "Involved in developing a pharmacy e-commerce solution across web and mobile platforms, supporting application functionality and related integrations.",
    involvement: "Application and integration work across web and mobile.",
    focus: ["Multi-platform commerce", "Web application", "Mobile applications", "Backend integration"],
    note: "Still underway. Only confirmed functionality is described.",
    links: [],
  },
  {
    id: "indiaclub",
    name: "IndiaClub",
    kind: "Professional project",
    category: "Membership platform · Mobile and web",
    status: "Nearing Completion",
    summary:
      "A club membership application covering mobile functionality and a web application that remains under development.",
    description:
      "Working on a club membership application. The web application remains in progress.",
    involvement: "Application and integration work on the mobile application and supporting services.",
    focus: ["Membership platform", "Mobile application", "Web application (in progress)"],
    note: "Web application remains in progress; status is shown as reported.",
    links: [],
  },
  {
    id: "billfics",
    name: "Billfics",
    kind: "Professional project",
    category: "Billing application",
    status: "Nearing Completion",
    summary:
      "A billing application nearing completion.",
    description:
      "Participating in the development of a billing application, supporting its ongoing implementation and functionality.",
    involvement: "Application engineering on billing workflows.",
    focus: ["Billing workflows", "Application engineering"],
    note: "Only confirmed features are described. No customer or revenue data is published.",
    links: [],
  },
  {
    id: "crm-platform",
    name: "CRM Platform",
    kind: "Professional project",
    category: "Customer relationship management",
    status: "In Progress",
    summary: "A CRM solution in progress, with assigned application functionality and technical implementation.",
    description:
      "Currently involved in developing a CRM solution, working on assigned application functionality and related technical implementation.",
    involvement: "Application and integration work in an ongoing project.",
    focus: ["CRM platform (in development)"],
    note: "Actively in progress. Nothing beyond the stated scope is claimed.",
    links: [],
  },
];

export const STATUS_ORDER = ["Completed", "Nearing Completion", "In Progress"];
