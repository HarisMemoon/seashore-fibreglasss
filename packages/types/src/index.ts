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
