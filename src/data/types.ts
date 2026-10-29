export interface Profile {
  name: string;
  headline: string;
  subtitle: string;
  summary: string;
  currentFocus?: string;
  avatarUrl?: string;
  location?: string;
  email?: string;
  phone?: string;
  cvPath: string; // "documents/cv.pdf", tanpa slash awal
}

export interface Publication {
  title: string;
  venue: string; // "IEEE" | "SINTA 4"
  year: number;
  description: string;
  url?: string;
}

export interface Achievement {
  title: string;
  event: string;
  organizer: string;
  year: number;
  highlight?: string;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  start: string; // "YYYY-MM"
  end?: string; // kosong = masih berjalan
  summary: string[];
  tools: string[];
  achievements?: string[]; // hanya yang terverifikasi
}

export type ProjectCategory = "seo" | "web" | "mobile" | "edtech" | "ai";

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  seo: "Technical SEO",
  web: "Web Development",
  mobile: "Mobile Development",
  edtech: "Education Technology",
  ai: "AI & Automation",
};

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: number;
  summary: string;
  role: string;
  problem: string;
  outcome: string;
  tech: string[];
  thumbnail: string;
  thumbnailAlt: string;
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
}

export interface SkillCategory {
  category: string;
  icon: string; // lucide icon name
  items: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  issued: string; // "YYYY-MM"
  expires?: string;
  credentialUrl?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  start: string;
  end?: string;
  achievements?: string[];
}

export interface Social {
  label: string;
  url: string;
  kind: "email" | "linkedin" | "github" | "whatsapp";
}

export interface NavItem {
  label: string;
  href: string;
}
