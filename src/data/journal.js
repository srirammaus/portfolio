import { media } from "@/data/media";

export const journalImage = media.journal;

export const journalCategories = [
  "All",
  "Application Security",
  "API Integrations",
  "Backend Engineering",
  "System Design",
  "Databases",
  "DevOps and Cloud",
  "AI and LLM Engineering",
];

/**
 * Drafts only. Each entry is an outline — nothing here is published research,
 * and no finding, CVE or benchmark is claimed.
 */
export const journalPosts = [
  {
    slug: "common-api-security-weaknesses",
    title: "Understanding common API security weaknesses",
    category: "Application Security",
    status: "Draft",
    date: null,
    readingTime: "6 min read",
    tags: ["API", "Access control", "OWASP"],
    excerpt:
      "A working outline on the object-level authorisation and access-control failures that show up most often when reading through an API.",
    outline: [
      "Why authorisation, not authentication, is usually where APIs break",
      "Object-level checks: the same request, a different identifier",
      "Rate limiting and abuse signals worth logging",
      "What to verify by hand in a lab before writing anything down",
    ],
    related: ["authentication-vs-authorization", "practice-from-vulnerable-labs"],
  },
  {
    slug: "authentication-vs-authorization",
    title: "Authentication versus authorization",
    category: "Application Security",
    status: "Draft",
    date: null,
    readingTime: "5 min read",
    tags: ["Identity", "Access control", "Sessions"],
    excerpt:
      "A note separating two ideas that are often collapsed into one flow, and why the distinction changes how you design a permission check.",
    outline: [
      "Authenticating a caller: what that actually proves",
      "Authorising an action: deciding on the resource and the operation",
      "Where session state and token claims each belong",
      "Design patterns that keep the two layers independent",
    ],
    related: ["common-api-security-weaknesses", "oauth-implementation-mistakes"],
  },
  {
    slug: "oauth-implementation-mistakes",
    title: "Common mistakes in OAuth implementations",
    category: "API Integrations",
    status: "Draft",
    date: null,
    readingTime: "7 min read",
    tags: ["OAuth", "Integrations", "Tokens"],
    excerpt:
      "An outline of the implementation details that quietly weaken an otherwise correct OAuth flow.",
    outline: [
      "Redirect URI handling and the cost of being permissive",
      "Missing or unvalidated state parameters",
      "Over-broad scopes and long-lived tokens",
      "Storing refresh tokens where the browser can reach them",
    ],
    related: ["authentication-vs-authorization", "environment-variables"],
  },
  {
    slug: "environment-variables",
    title: "Secure handling of environment variables",
    category: "DevOps and Cloud",
    status: "Draft",
    date: null,
    readingTime: "4 min read",
    tags: ["Secrets", "Configuration", "Deployment"],
    excerpt:
      "Practical notes on keeping configuration out of source control and out of anything that ships to a client.",
    outline: [
      "What belongs in configuration versus code",
      "Why the client bundle is a public artefact",
      "Rotation and per-environment separation",
      "Detecting accidental commits early",
    ],
    related: ["oauth-implementation-mistakes", "docker-security-fundamentals"],
    snippet: {
      language: "bash",
      label: "Illustrative example — never commit the real file",
      code: `# .env.example (committed)\nDATABASE_URL=\nPAYMENT_PROVIDER_KEY=\n\n# .env (ignored by version control)\nDATABASE_URL=postgres://localhost:5432/app`,
    },
  },
  {
    slug: "docker-security-fundamentals",
    title: "Docker security fundamentals",
    category: "DevOps and Cloud",
    status: "Draft",
    date: null,
    readingTime: "6 min read",
    tags: ["Docker", "Containers", "Least privilege"],
    excerpt:
      "A lab-note outline on image hygiene, runtime permissions and the defaults worth questioning in a container setup.",
    outline: [
      "Base images: size, provenance and updates",
      "Running as a non-root user by default",
      "What a container still shares with its host",
      "Reviewing exposed ports and mounted volumes",
    ],
    related: ["environment-variables"],
  },
  {
    slug: "practice-from-vulnerable-labs",
    title: "Practical lessons from intentionally vulnerable security labs",
    category: "Application Security",
    status: "Draft",
    date: null,
    readingTime: "5 min read",
    tags: ["Lab notes", "Practice", "Method"],
    excerpt:
      "Notes from working through deliberately vulnerable applications, focused on method rather than outcomes.",
    outline: [
      "Setting a scope before touching anything",
      "Reading an application's shape before testing a path",
      "Recording a reproducible observation instead of a guess",
      "Turning a lab exercise into a defensive habit",
    ],
    related: ["common-api-security-weaknesses", "authentication-vs-authorization"],
  },
];

export function getPost(slug) {
  return journalPosts.find((post) => post.slug === slug);
}