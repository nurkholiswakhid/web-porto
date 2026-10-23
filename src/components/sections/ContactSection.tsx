"use client";

import { useRef } from "react";
import { Mail, MessageCircle, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { socials } from "@/data/socials";
import { profile } from "@/data/profile";
import { assetPath } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";
import MarqueeText from "@/components/effects/MarqueeText";

const ICON_MAP: Record<string, React.ReactNode> = {
  email: <Mail className="w-6 h-6" />,
  linkedin: <LinkedinIcon className="w-6 h-6" />,
  github: <GithubIcon className="w-6 h-6" />,
  whatsapp: <MessageCircle className="w-6 h-6" />,
};

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative"
      aria-label="Contact"
    >
      {/* Big CTA marquee */}
      <div className="marquee-divider">
        <MarqueeText
          lines={[
            {
              text: "LET'S CONNECT LET'S BUILD LET'S INNOVATE",
              accentWords: ["CONNECT", "BUILD", "INNOVATE"],
            },
          ]}
          speed={25}
        />
      </div>

      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="reveal">
            <div className="section-label mx-auto w-fit">
              <span className="w-1.5 h-1.5 bg-accent rounded-full" />
              Contact
            </div>
            <h2 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-foreground text-center">
              LET&apos;S{" "}
              <span className="text-accent italic">CONNECT</span>
            </h2>
            <p className="section-subtitle mx-auto text-center mt-4 mb-10">
              Ready to build something great? Reach out through any channel.
            </p>
          </div>

          {/* Social links grid */}
          <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {socials.map((social) => (
              <a
                key={social.kind}
                href={social.url}
                target={social.kind === "email" ? undefined : "_blank"}
                rel={social.kind === "email" ? undefined : "noopener noreferrer"}
                className="cosmic-card flex flex-col items-center gap-3 py-6 group cursor-pointer hover:border-accent/30"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-accent bg-accent/10 border border-accent/20 group-hover:scale-110 transition-transform">
                  {ICON_MAP[social.kind]}
                </div>
                <span className="text-sm font-medium text-foreground">
                  {social.label}
                </span>
                <span className="text-xs text-text-dim font-mono truncate max-w-full px-2">
                  {social.kind === "email"
                    ? social.url.replace("mailto:", "")
                    : social.kind === "whatsapp"
                    ? "+62 857-4589-7297"
                    : social.kind.charAt(0).toUpperCase() + social.kind.slice(1)}
                </span>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="reveal">
            <a
              href={assetPath(profile.cvPath)}
              download
              className="btn-primary mx-auto"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
