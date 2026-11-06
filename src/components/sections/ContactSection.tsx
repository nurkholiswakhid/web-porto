"use client";

import { useRef } from "react";
import {
  ArrowUpRight,
  Download,
  Mail,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { socials } from "@/data/socials";
import { profile } from "@/data/profile";
import type { Social } from "@/data/types";
import { assetPath } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";

const SOCIAL_ICONS: Record<
  Exclude<Social["kind"], "email">,
  LucideIcon | typeof GithubIcon | typeof LinkedinIcon
> = {
  linkedin: LinkedinIcon,
  github: GithubIcon,
};

const SOCIAL_DETAILS: Record<Exclude<Social["kind"], "email">, string> = {
  linkedin: "Professional profile",
  github: "Code and project work",
};

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  const email = socials.find((social) => social.kind === "email");
  const externalProfiles = socials.filter(
    (social): social is Social & { kind: "linkedin" | "github" } =>
      social.kind !== "email",
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative"
      aria-labelledby="contact-heading"
    >
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="reveal">
            <div className="section-label">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Contact information
            </div>
            <h2
              id="contact-heading"
              className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[0.98] tracking-tight text-foreground"
            >
              LET&apos;S
              <br />
              CONNECT
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-text-secondary">
              Have a project, role, or collaboration in mind? Send me an email
              and tell me what you&apos;re working on.
            </p>

            {profile.location && (
              <p className="mt-6 inline-flex items-center gap-2 text-sm text-text-dim">
                <MapPin aria-hidden="true" className="h-4 w-4 text-accent" />
                {profile.location}
              </p>
            )}

            <div className="mt-8">
              <a
                href={assetPath(profile.cvPath)}
                download
                className="btn-secondary min-h-11"
              >
                <Download aria-hidden="true" className="h-4 w-4" />
                <span>Download CV</span>
              </a>
            </div>
          </div>

          <div className="reveal space-y-3">
            {email && (
              <a
                href={email.url}
                className="group relative flex min-h-36 items-center justify-between gap-5 overflow-hidden rounded-2xl border border-accent/35 bg-accent/[0.07] p-6 transition-colors hover:border-accent/70 hover:bg-accent/[0.11] sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full border border-accent/10"
                />
                <span className="relative flex min-w-0 items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                    <Mail aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-text-secondary">
                      Best way to reach me
                    </span>
                    <span className="mt-1 block break-all text-base font-semibold text-foreground sm:text-lg">
                      {email.url.replace("mailto:", "")}
                    </span>
                    <span className="mt-2 block text-sm font-medium text-accent">
                      Send an email
                    </span>
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="relative h-5 w-5 shrink-0 text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              {externalProfiles.map((social) => {
                const Icon = SOCIAL_ICONS[social.kind];

                return (
                  <a
                    key={social.kind}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-24 items-center justify-between gap-3 rounded-xl border border-border bg-surface/40 p-5 transition-colors hover:border-accent/35 hover:bg-surface/70"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-secondary text-text-secondary transition-colors group-hover:border-accent/25 group-hover:text-accent">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-semibold text-foreground">
                          {social.label}
                        </span>
                        <span className="mt-1 block text-xs text-text-dim">
                          {SOCIAL_DETAILS[social.kind]}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-text-dim transition-colors group-hover:text-accent"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
