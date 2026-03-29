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
  beforeDescription: string;
  afterDescription: string;
  beforeImageAlt: string;
  afterImageAlt: string;
}

/** Contact / lead form submission (home + contact page) */
export interface ContactSubmission {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  bestTime?: string;
  message?: string;
  wantsFreeInspection?: boolean;
  source: "home" | "contact";
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
