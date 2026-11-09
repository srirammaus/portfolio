/**
 * Integration categories. Purpose, concepts and considerations only —
 * no endpoints, credentials, clients or proprietary specifications.
 */
export const integrations = [
  {
    id: "microsoft-oauth",
    label: "Microsoft OAuth",
    node: "Identity",
    position: { left: "20%", top: "27%" },
    category: "Identity & access",
    involvement: "Integration Development",
    purpose:
      "Connecting user accounts to Microsoft services so an application can sign users in and act on their behalf within an approved scope.",
    concepts: ["OAuth 2.0 authorization flow", "Scopes and consent", "Access and refresh tokens", "Redirect URI handling"],
    considerations: [
      "Keeping requested scopes to the minimum the feature needs",
      "Storing and refreshing tokens without exposing them to the client",
      "Validating state and allow-listing redirect targets",
      "Handling revoked or expired consent gracefully",
    ],
  },
  {
    id: "payments",
    label: "Payment gateways",
    node: "Payments",
    position: { left: "72%", top: "20%" },
    category: "Payments · Razorpay, AFS, BenefitPay",
    involvement: "API Integration Work",
    purpose:
      "Payment integration work involving Razorpay, AFS, and BenefitPay, connecting application workflows with external payment services.",
    concepts: ["Server-side order creation", "Callback and webhook handling", "Signature verification", "Idempotent settlement"],
    considerations: [
      "Never trusting client-supplied amounts or status values",
      "Verifying signatures before acting on a payment event",
      "Making capture and refund handling idempotent",
      "Reconciling gateway reports against internal records",
    ],
  },
  {
    id: "google-apis",
    label: "Google APIs",
    node: "Platform",
    position: { left: "86%", top: "52%" },
    category: "Platform services",
    involvement: "Integration Development",
    purpose:
      "Connecting application workflows to Google services and account-scoped data using OAuth-based access.",
    concepts: ["OAuth consent and token exchange", "API quotas and backoff", "Pagination", "Scope minimisation"],
    considerations: [
      "Respecting quota and rate limits with retries and backoff",
      "Handling paginated result sets safely",
      "Separating per-user credentials from application credentials",
    ],
  },
  {
    id: "diamond-erp",
    label: "Diamond ERP",
    node: "Enterprise",
    position: { left: "30%", top: "74%" },
    category: "Enterprise systems",
    involvement: "Worked on Integration",
    purpose:
      "Exchanging business data between an application and an ERP system so operational records stay consistent.",
    concepts: ["Data mapping and validation", "Scheduled synchronisation", "Error and retry handling", "Stable contracts"],
    considerations: [
      "Mapping fields carefully where the two schemas disagree",
      "Designing for partial failure rather than all-or-nothing runs",
      "Keeping synchronisation idempotent and observable",
    ],
  },
  {
    id: "sms-gateways",
    label: "SMS gateways",
    node: "Messaging",
    position: { left: "60%", top: "80%" },
    category: "Messaging · Fast2SMS, Mobishastra",
    involvement: "API Integration Work",
    purpose:
      "Integrating Fast2SMS and Mobishastra into application workflows for programmatic SMS delivery.",
    concepts: ["Provider REST APIs", "Templated messages", "Delivery reporting", "Provider failover"],
    considerations: [
      "Handling provider-specific response shapes behind one internal interface",
      "Retrying transient failures without duplicating messages",
      "Keeping message content controlled by the application, not the visitor",
    ],
  },
];