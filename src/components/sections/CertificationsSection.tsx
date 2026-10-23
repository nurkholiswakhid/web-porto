"use client";

import { useRef } from "react";
import { Award, ExternalLink, Calendar } from "lucide-react";
import { certifications } from "@/data/certifications";
import { formatDate } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";

export default function CertificationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  if (certifications.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative"
      aria-label="Certifications"
    >
      <div className="section-container">
        <div className="reveal">
          <div className="section-label">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            Credentials
          </div>
          <h2 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-foreground">
            <span className="text-accent italic">CERTIFICATIONS</span>
          </h2>
          <p className="section-subtitle mt-4 mb-12">
            Verified credentials from the journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={`${cert.name}-${cert.issued}`}
              className="reveal"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="cosmic-card h-full group">
                <div className="flex items-start gap-3 mb-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground leading-tight mb-1">
                      {cert.name}
                    </h3>
                    <p className="text-xs text-text-secondary">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-text-dim font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(cert.issued)}
                  </span>
                  {cert.expires && (
                    <span>Expires: {formatDate(cert.expires)}</span>
                  )}
                </div>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs text-accent hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View Credential
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
