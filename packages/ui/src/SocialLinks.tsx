import { SOCIAL_LINKS } from "@seashore/content";

export type SocialPlatform = {
  key: string;
  label: string;
  href: string;
  description: string;
  icon: React.ReactNode;
};

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    key: "facebook",
    label: "Facebook",
    href: SOCIAL_LINKS.facebook,
    description: "Follow our latest projects and coastal deck tips",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden>
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    key: "instagram",
    label: "Instagram",
    href: SOCIAL_LINKS.instagram,
    description: "Watch real deck transformations from across the Shore",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-full w-full" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    key: "tiktok",
    label: "TikTok",
    href: SOCIAL_LINKS.tiktok,
    description: "Behind-the-scenes Shore fiberglass work",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden>
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.29 6.29 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.77a8.17 8.17 0 004.78 1.52V6.84a4.86 4.86 0 01-1.01-.15z" />
      </svg>
    ),
  },
  {
    key: "youtube",
    label: "YouTube",
    href: SOCIAL_LINKS.youtube,
    description: "In-depth fiberglass tutorials and project walkthroughs",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20.05 12 20.05 12 20.05s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12z"
        />
      </svg>
    ),
  },
  {
    key: "gbp",
    label: "Google Reviews",
    href: SOCIAL_LINKS.gbp,
    description: "Read our 50+ verified 5-star Google reviews",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden>
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    ),
  },
  {
    key: "yelp",
    label: "Yelp",
    href: SOCIAL_LINKS.yelp,
    description: "Independent homeowner ratings and reviews",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden>
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ),
  },
];

type SocialIconBarProps = {
  variant?: "light" | "dark";
  size?: "sm" | "md";
  className?: string;
};

export function SocialIconBar({ variant = "light", size = "md", className = "" }: SocialIconBarProps) {
  const btnSize = size === "sm" ? "h-7 w-7" : "h-8 w-8";
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const btnStyle =
    variant === "light"
      ? "text-white/55 hover:text-white hover:bg-white/10"
      : "text-slate-500 hover:text-navy hover:bg-navy/[0.06]";

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {SOCIAL_PLATFORMS.map((p) => (
        <a
          key={p.key}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${p.label} — Seashore Fiberglass`}
          className={`inline-flex items-center justify-center rounded-lg transition-all duration-200 ${btnSize} ${btnStyle}`}
        >
          <span className={iconSize}>{p.icon}</span>
        </a>
      ))}
    </div>
  );
}
