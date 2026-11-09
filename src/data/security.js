export const securityFraming =
  "All security work happens in authorised environments: owned applications, consented systems and intentionally vulnerable training labs. Nothing presented here is a claimed vulnerability, CVE, bounty result, certification or disclosure.";

export const securityAreas = [
  {
    index: "01",
    title: "Web application security",
    note: "Input handling, session behaviour and the failure modes behind common web weaknesses.",
  },
  {
    index: "02",
    title: "API security & access control",
    note: "Object-level authorisation, token scope and abuse resistance on exposed endpoints.",
  },
  {
    index: "03",
    title: "Authentication & authorization",
    note: "Identity flows, session design and the boundary between who you are and what you may do.",
  },
  {
    index: "04",
    title: "OAuth implementation & security",
    note: "Consent flows, redirect handling, token storage and scope minimisation in practice.",
  },
  {
    index: "05",
    title: "Secure backend development",
    note: "Secrets handling, dependency hygiene, validation and least privilege by default.",
  },
  {
    index: "06",
    title: "Cloud & container security",
    note: "Image hygiene, runtime isolation and configuration review across deployments.",
  },
  {
    index: "07",
    title: "Vulnerability analysis",
    note: "Reading findings, reproducing issues and reasoning about real impact.",
  },
  {
    index: "08",
    title: "Responsible disclosure",
    note: "Scoped testing, clear reporting and coordinated timelines with maintainers.",
  },
];

export const labLines = [
  { key: "scope", value: "owned applications · training labs" },
  { key: "areas", value: "web · api · oauth · containers" },
  { key: "mode", value: "learning notes, not findings" },
  { key: "status", value: "in progress" },
];