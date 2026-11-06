"use client";

import { useMemo, useRef, useState } from "react";
import {
  Award,
  BrainCircuit,
  CalendarDays,
  ChartNoAxesCombined,
  Cloud,
  CodeXml,
  ExternalLink,
  Network,
  Search,
  X,
  type LucideIcon,
} from "lucide-react";
import { certifications } from "@/data/certifications";
import type { Certification } from "@/data/types";
import { formatDate } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";

type TrackFilter = "all" | Certification["track"];

const trackDetails: Partial<
  Record<Certification["track"], { description: string; icon: LucideIcon }>
> = {
  "Analytics & Search": {
    description: "Analytics, SEO, search ads",
    icon: ChartNoAxesCombined,
  },
  "Android & Applied AI": {
    description: "Android, Kotlin, machine learning",
    icon: BrainCircuit,
  },
  "Programming Fundamentals": {
    description: "Programming logic and software basics",
    icon: CodeXml,
  },
  "Cloud & Security": {
    description: "Cloud platforms and cybersecurity",
    icon: Cloud,
  },
  "IT Support & Networking": {
    description: "Technical support and networking",
    icon: Network,
  },
};

export default function CertificationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [query, setQuery] = useState("");
  const [activeTrack, setActiveTrack] = useState<TrackFilter>("all");
  const [activeProvider, setActiveProvider] = useState("all");
  useReveal(sectionRef);

  const tracks = useMemo(
    () => Array.from(new Set(certifications.map((certification) => certification.track))),
    [],
  );
  const providers = useMemo(
    () =>
      Array.from(
        new Set(certifications.map((certification) => certification.credentialLabel)),
      ).sort(),
    [],
  );
  const directCredentialCount = useMemo(
    () =>
      certifications.filter(
        (certification) => certification.linkType === "credential",
      ).length,
    [],
  );
  const archiveYears = useMemo(
    () =>
      Array.from(
        new Set(certifications.map((certification) => certification.issued.slice(0, 4))),
      ).sort((a, b) => b.localeCompare(a)),
    [],
  );

  const filteredCertifications = useMemo(() => {
    const searchTerm = query.trim().toLocaleLowerCase();

    return certifications
      .filter((certification) => {
        const matchesTrack =
          activeTrack === "all" || certification.track === activeTrack;
        const matchesProvider =
          activeProvider === "all" ||
          certification.credentialLabel === activeProvider;
        const searchableText = [
          certification.name,
          certification.issuer,
          certification.topic,
          certification.track,
          certification.focus,
          certification.credentialLabel,
        ]
          .join(" ")
          .toLocaleLowerCase();

        return (
          matchesTrack &&
          matchesProvider &&
          (!searchTerm || searchableText.includes(searchTerm))
        );
      })
      .sort((a, b) => {
        const dateOrder = b.issued.localeCompare(a.issued);
        return dateOrder || a.name.localeCompare(b.name);
      });
  }, [activeProvider, activeTrack, query]);

  const certificationsByYear = filteredCertifications.reduce<
    Record<string, Certification[]>
  >((groups, certification) => {
    const year = certification.issued.slice(0, 4);
    (groups[year] ??= []).push(certification);
    return groups;
  }, {});
  const years = Object.keys(certificationsByYear).sort((a, b) => b.localeCompare(a));

  if (certifications.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative"
      aria-label="Certifications"
    >
      <div className="section-container">
        <div className="reveal mb-10 grid gap-8 border-b border-border pb-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="section-label">
              <span className="w-1.5 h-1.5 bg-accent rounded-full" />
              Learning & credentials
            </div>
            <h2 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-foreground">
              CERTIFICATIONS
            </h2>
            <p className="section-subtitle mt-4">
              A record of continued learning across search, software, cloud, and IT.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end">
            <div>
              <p className="font-display text-2xl font-bold text-accent">
                {String(certifications.length).padStart(2, "0")}
              </p>
              <p className="text-xs text-text-secondary">certificates</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-foreground">
                {String(providers.length).padStart(2, "0")}
              </p>
              <p className="text-xs text-text-secondary">credential sources</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-foreground">
                {archiveYears.length > 0
                  ? `${archiveYears[archiveYears.length - 1]}–${archiveYears[0]}`
                  : "—"}
              </p>
              <p className="text-xs text-text-secondary">years represented</p>
            </div>
          </div>
        </div>

        <div className="reveal mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-border py-3 text-xs text-text-secondary">
          <span>
            <strong className="font-semibold text-accent">
              {directCredentialCount}
            </strong>{" "}
            direct credential pages
          </span>
          <span aria-hidden="true" className="text-border">
            |
          </span>
          <span>
            <strong className="font-semibold text-foreground">
              {certifications.length - directCredentialCount}
            </strong>{" "}
            provider portals
          </span>
          <span className="text-text-dim">
            Direct pages point to an individual credential; portals lead to the
            provider&apos;s main site.
          </span>
        </div>

        <div className="reveal mb-6">
          <div className="mb-3 flex items-baseline justify-between gap-4">
            <h3 className="font-display text-sm font-bold text-foreground">
              Certification mix
            </h3>
            <button
              type="button"
              onClick={() => setActiveTrack("all")}
              className="min-h-11 text-xs text-text-secondary transition-colors hover:text-accent"
              aria-pressed={activeTrack === "all"}
            >
              All areas
            </button>
          </div>
          <div
            className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5"
            role="group"
            aria-label="Filter certifications by learning area"
          >
            {tracks.map((track) => {
              const details = trackDetails[track];
              const Icon = details?.icon ?? Award;
              const count = certifications.filter(
                (certification) => certification.track === track,
              ).length;
              const share = Math.round((count / certifications.length) * 100);

              return (
                <button
                  key={track}
                  type="button"
                  onClick={() =>
                    setActiveTrack(activeTrack === track ? "all" : track)
                  }
                  aria-pressed={activeTrack === track}
                  className={`min-h-[8.75rem] rounded-xl border p-3 text-left transition-colors ${
                    activeTrack === track
                      ? "border-accent/60 bg-accent/10"
                      : "border-border bg-surface/40 hover:border-accent/35"
                  }`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <Icon
                      aria-hidden="true"
                      className={`h-4 w-4 ${
                        activeTrack === track ? "text-accent" : "text-text-secondary"
                      }`}
                    />
                    <span className="font-mono text-xs text-text-dim">
                      {String(count).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="mt-3 block text-xs font-semibold leading-snug text-foreground">
                    {track}
                  </span>
                  <span className="mt-1 block text-[11px] leading-snug text-text-secondary">
                    {details?.description ??
                      Array.from(
                        new Set(
                          certifications
                            .filter((certification) => certification.track === track)
                            .map((certification) => certification.focus),
                        ),
                      ).join(", ")}
                  </span>
                  <span className="mt-3 flex items-center gap-2">
                    <span
                      role="progressbar"
                      aria-label={`${track} share of certificates`}
                      aria-valuemin={0}
                      aria-valuemax={certifications.length}
                      aria-valuenow={count}
                      aria-valuetext={`${count} of ${certifications.length} certificates, ${share}%`}
                      className="h-1 flex-1 overflow-hidden rounded-full bg-border"
                    >
                      <span
                        aria-hidden="true"
                        className="block h-full rounded-full bg-accent"
                        style={{ width: `${share}%` }}
                      />
                    </span>
                    <span className="w-8 text-right font-mono text-[10px] text-text-dim">
                      {share}%
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="reveal mb-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
          <label className="relative block">
            <span className="sr-only">Search certificates</span>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-dim"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, provider, or subject"
              className="h-12 w-full rounded-xl border border-border bg-surface/50 pl-11 pr-11 text-sm text-foreground outline-none transition-colors placeholder:text-text-dim focus:border-accent/60"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear certificate search"
                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface-hover hover:text-foreground"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            )}
          </label>
          <label className="flex h-12 items-center gap-3 rounded-xl border border-border bg-surface/50 px-4 text-sm">
            <span className="shrink-0 text-text-secondary">Source</span>
            <select
              value={activeProvider}
              onChange={(event) => {
                const { value } = event.target;
                setActiveProvider(
                  value === "all" || providers.includes(value) ? value : "all",
                );
              }}
              aria-label="Filter certifications by credential source"
              className="min-w-0 flex-1 cursor-pointer bg-transparent text-foreground outline-none"
            >
              <option value="all" className="bg-surface text-foreground">
                All sources
              </option>
              {providers.map((provider) => (
                <option
                  key={provider}
                  value={provider}
                  className="bg-surface text-foreground"
                >
                  {provider}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p
          className="reveal mb-4 text-xs text-text-secondary"
          aria-live="polite"
          aria-atomic="true"
        >
          Showing {filteredCertifications.length} of {certifications.length}{" "}
          {certifications.length === 1 ? "certificate" : "certificates"}
          {activeTrack !== "all" && ` in ${activeTrack}`}
          {activeProvider !== "all" && ` from ${activeProvider}`}
        </p>

        {filteredCertifications.length > 0 ? (
          <div className="reveal space-y-8">
            {years.map((year) => (
              <section key={year} aria-label={`${year} certificates`}>
                <div className="grid gap-3 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-6">
                  <div className="flex items-center gap-3 md:block md:pt-5">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-accent">
                      {year}
                    </h3>
                    <span className="text-xs text-text-dim md:mt-1 md:block">
                      {certificationsByYear[year].length}{" "}
                      {certificationsByYear[year].length === 1
                        ? "certificate"
                        : "certificates"}
                    </span>
                  </div>

                  <ul className="divide-y divide-border border-y border-border">
                    {certificationsByYear[year].map((certification) => (
                      <li
                        key={`${certification.name}-${certification.issued}`}
                        className="grid gap-3 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
                      >
                        <div className="min-w-0">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-accent/20 bg-accent/5 px-2.5 py-1 text-[11px] font-medium text-accent">
                              {certification.topic}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs text-text-dim">
                              <CalendarDays
                                aria-hidden="true"
                                className="h-3.5 w-3.5"
                              />
                              {formatDate(certification.issued)}
                            </span>
                          </div>
                          <h4 className="font-medium leading-snug text-foreground">
                            {certification.name}
                          </h4>
                          <p className="mt-1 text-sm text-text-secondary">
                            {certification.issuer}
                            <span className="text-text-dim"> / </span>
                            {certification.focus}
                          </p>
                        </div>

                        {certification.credentialUrl && (
                          <a
                            href={certification.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${certification.credentialLabel} for ${certification.name}`}
                            className="inline-flex min-h-11 w-fit items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-foreground focus-visible:text-foreground"
                          >
                            <span>
                              {certification.linkType === "credential"
                                ? "View credential"
                                : `Visit ${certification.credentialLabel}`}
                            </span>
                            <ExternalLink
                              aria-hidden="true"
                              className="h-3.5 w-3.5"
                            />
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-surface/40 px-6 py-10 text-center">
            <Award
              aria-hidden="true"
              className="mx-auto mb-3 h-6 w-6 text-accent"
            />
            <h3 className="font-display text-lg font-bold text-foreground">
              No matching certificates
            </h3>
            <p className="mt-2 text-sm text-text-secondary">
              Try another subject or search term.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveTrack("all");
                  setActiveProvider("all");
                }}
              className="mt-4 inline-flex min-h-11 items-center rounded-full border border-accent/40 px-4 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
            >
              Clear filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
