// Shared types for Seashore Fiberglass
export interface Service {
  slug: string;
  title: string;
  description: string;
  icon?: string;
}

export interface Review {
  name: string;
  city: string;
  stars: number;
  quote: string;
  reviewDate?: string;
  photoCount?: number;
  images?: readonly string[];
}

export type FaqCategoryId = "general" | "repair" | "technical" | "working";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: FaqCategoryId;
  label: string;
  items: readonly FaqItem[];
}

/** Gallery project — before/after copy and image alt text (Website Brief) */
export interface GalleryItem {
  id: string;
  slug: string;
  title: string;
  /** Short label for badges, e.g. "Reglass", "New construction" */
  category: string;
  /** Town/city where the project was completed */
  location: string;
  beforeDescription: string;
  afterDescription: string;
  beforeImageAlt: string;
  afterImageAlt: string;
  /** Path to before image relative to /public, e.g. "/gallery/B1.jpeg" */
  beforeImage?: string;
  /** Path to after image relative to /public, e.g. "/gallery/A1.jpeg" */
  afterImage?: string;
}

/** Contact / lead form submission (home + contact page) */
export interface ContactSubmission {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  service?: string;
  bestTime?: string;
  message?: string;
  wantsFreeInspection?: boolean;
  source: "home" | "contact" | "chatbot";
}

export type ChatbotIntent =
  | "faq"
  | "service-routing"
  | "service-area-routing"
  | "quote-request"
  | "contact-handoff"
  | "general"
  | "fallback";

export type ChatbotConfidence = "high" | "medium" | "low";

export interface ChatbotLink {
  label: string;
  href: string;
  kind: "service" | "service-area" | "contact" | "faq" | "phone";
}

export interface ChatbotMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatbotLeadDraft {
  issueType?: string;
  serviceSlug?: string;
  city?: string;
  urgency?: string;
  preferredContactMethod?: "Call" | "Text" | "Email";
  summary?: string;
}

export interface ChatbotRequest {
  message: string;
  history?: readonly ChatbotMessage[];
  pagePath?: string;
  leadDraft?: ChatbotLeadDraft;
}

export interface ChatbotLeadCapturePrompt {
  prompt: string;
  suggestedIssueType?: string;
  suggestedServiceSlug?: string;
  suggestedCity?: string;
}

export interface ChatbotResponse {
  answer: string;
  intent: ChatbotIntent;
  confidence: ChatbotConfidence;
  recommendedLinks: readonly ChatbotLink[];
  quickReplies: readonly string[];
  leadCapture?: ChatbotLeadCapturePrompt;
  requiresHumanFollowup?: boolean;
}

/** Single step in a numbered process (service detail pages) */
export interface ServiceProcessStep {
  title: string;
  description: string;
}

/** Title + body pair for lists (common problems, etc.) */
export interface ServiceDetailItem {
  title: string;
  description: string;
}

/** Per-service summary block for service area landing pages */
export interface ServiceSummary {
  serviceName: string;
  description: string;
}

/** Service area landing page — town-specific copy (Website Brief / PROJECT_CONTEXT.md) */
export interface ServiceAreaDetail {
  slug: string;
  townName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: readonly string[];
  localChallengeTitle: string;
  localChallengeBody: readonly string[];
  /**
   * Home page "coverage explorer" — short chip under town name, hero line + common services panel.
   */
  homepageCoverage: {
    /** Short label for grid card (shown uppercase in UI) */
    gridTagline: string;
    /** One-line hook under the town name in the detail card header */
    cardLead: string;
    /** Bullets under "Common services in this area" */
    commonServices: readonly string[];
  };
  /** 6 city-specific service summaries rendered on the service area landing page */
  serviceSummaries?: readonly ServiceSummary[];
}

/** Structured body for blog posts (Website Brief) */
export type BlogArticleBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: readonly string[] }
  | { type: "ol"; items: readonly string[] };

/** Blog post — index + `/blog/[slug]` (Website Brief) */
export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** ISO date string */
  publishedAt: string;
  excerpt: string;
  readTimeMinutes: number;
  /** Internal links to `/services/[slug]` */
  relatedServiceSlugs?: readonly string[];
  /** Blog category label for filter UI */
  category?: string;
  /** Cover image filename (client-provided) */
  image?: string;
  blocks: readonly BlogArticleBlock[];
}

/** Full service detail page — source: Website Brief / PROJECT_CONTEXT.md */
export interface ServiceDetail {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: readonly string[];
  commonProblems?: readonly ServiceDetailItem[];
  diagnosticApproach?: readonly string[];
  repairLevels?: readonly ServiceDetailItem[];
  processSteps?: readonly ServiceProcessStep[];
  /** New construction numbered system (1..n) */
  constructionComponents?: readonly ServiceProcessStep[];
  whenRight?: readonly string[];
  distinctionNote?: readonly string[];
  maintenanceIntervals?: readonly string[];
  compositeSections?: readonly { title: string; body: readonly string[] }[];
  vinylSections?: readonly { title: string; body: readonly string[] }[];
  timeline?: string;
}
