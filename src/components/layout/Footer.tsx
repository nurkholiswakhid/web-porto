import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { socials } from "@/data/socials";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  email: <Mail className="w-4 h-4" />,
  linkedin: <LinkedinIcon className="w-4 h-4" />,
  github: <GithubIcon className="w-4 h-4" />,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative border-t border-border bg-bg-secondary/50"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center whitespace-nowrap">
              <span className="font-display font-black text-lg text-foreground">NUR KHOLIS </span>
              <span className="font-display font-black text-lg text-accent">WAKHID</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              Full Stack Web Developer & SEO Specialist — Building digital solutions.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-mono text-xs text-text-dim uppercase tracking-widest mb-4">
              Navigation
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="grid grid-cols-2 gap-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-accent transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-mono text-xs text-text-dim uppercase tracking-widest mb-4">
              Connect
            </h3>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.kind}
                  href={social.url}
                  target={social.kind === "email" ? undefined : "_blank"}
                  rel={social.kind === "email" ? undefined : "noopener noreferrer"}
                  className="p-2.5 rounded-lg border border-border bg-surface/30 hover:border-accent/40 hover:bg-accent/10 transition-all duration-300 text-text-secondary hover:text-accent"
                  aria-label={social.label}
                >
                  {SOCIAL_ICONS[social.kind] || <Mail className="w-4 h-4" />}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-dim font-mono">
            © {year} Nur Kholis Wakhid
          </p>
          <p className="text-xs text-text-dim font-mono">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
