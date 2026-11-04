"use client";

import { useWebMCP } from "use-webmcp-tool";
import {
  site,
  hero,
  stats,
  about,
  work,
  process as processData,
  impact,
  journey,
  contact,
} from "@/content";

const projects = [...work.featured, ...work.pair].map((project) => ({
  id: project.n,
  title: project.title,
  category: project.cat,
  description: project.text,
  previewUrl: project.url,
  image: project.image || null,
  linkLabel: project.link,
  href: project.href,
}));

const projectIds = projects.map((project) => project.id);
const portfolioSections = [
  "top",
  "about",
  "work",
  "process",
  "impact",
  "journey",
  "contact",
] as const;

type ProjectSearchInput = {
  query?: string;
  category?: string;
};

type ProjectDetailsInput = {
  projectId: string;
};

type NavigateInput = {
  section: (typeof portfolioSections)[number];
};

const emptySchema = {
  type: "object",
  properties: {},
  additionalProperties: false,
} as const;

function isConfiguredEmail(value: string | undefined) {
  return Boolean(value && !/you@example\.com|example\.com|TODO/i.test(value));
}

function isConfiguredProfileUrl(value: string) {
  try {
    const url = new URL(value);
    return url.pathname !== "/" && url.pathname !== "";
  } catch {
    return false;
  }
}

function searchMatches(query: string, fields: Array<string | null | undefined>) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return true;
  const haystack = fields.filter(Boolean).join(" ").toLowerCase();
  return terms.every((term) => haystack.includes(term));
}

export default function PortfolioWebMCP() {
  useWebMCP<Record<string, never>, Record<string, unknown>>({
    name: "get_portfolio_overview",
    description:
      "Get the portfolio owner's public profile, role, introduction, location text, website, and visible site sections.",
    inputSchema: emptySchema,
    annotations: { readOnlyHint: true, untrustedContentHint: false },
    execute: () => ({
      name: site.name,
      role: "Web Developer & UI/UX Designer",
      website: site.url,
      description: site.description,
      introduction: hero.sub.join(" "),
      locationText: hero.location,
      specialties: processData.items.map((item) => item.cat),
      visibleSections: [...portfolioSections],
      contactEmailConfigured: isConfiguredEmail(site.email),
      note:
        "Profile copy and some contact information are editable placeholders in content.ts. Verify details before treating them as confirmed credentials.",
    }),
  });

  useWebMCP<ProjectSearchInput, Record<string, unknown>>({
    name: "search_portfolio_projects",
    description:
      "Find visible portfolio projects by title, category, description, or related words. Use this when someone asks about the owner's work or examples.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Words describing the work or project to find.",
        },
        category: {
          type: "string",
          enum: [...new Set(projects.map((project) => project.category))],
          description: "Project discipline to filter by.",
        },
      },
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, untrustedContentHint: false },
    execute: ({ query = "", category }) => {
      const matches = projects.filter((project) => {
        if (category && project.category !== category) return false;
        return searchMatches(query, [
          project.id,
          project.title,
          project.category,
          project.description,
          project.previewUrl,
        ]);
      });

      return {
        count: matches.length,
        projects: matches.map((project) => ({
          ...project,
          linkConfigured:
            typeof project.href === "string" &&
            /^https?:\/\//i.test(project.href),
          href: /^https?:\/\//i.test(project.href) ? project.href : null,
        })),
        contentNote:
          "The current project titles and descriptions are starter copy marked for replacement in content.ts. Several project URLs are placeholders, not verified live case studies.",
      };
    },
  });

  useWebMCP<ProjectDetailsInput, Record<string, unknown>>({
    name: "get_portfolio_project_details",
    description:
      "Return the stored description, discipline, preview label, image, and link status for one visible project in the portfolio.",
    inputSchema: {
      type: "object",
      properties: {
        projectId: {
          type: "string",
          enum: projectIds,
          description: "Project number displayed beside the project in the work section.",
        },
      },
      required: ["projectId"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, untrustedContentHint: false },
    execute: ({ projectId }) => {
      const project = projects.find((item) => item.id === projectId);
      if (!project) {
        return {
          error: "Project not found.",
          availableProjectIds: projectIds,
        };
      }

      const linkConfigured =
        typeof project.href === "string" &&
        /^https?:\/\//i.test(project.href);

      return {
        ...project,
        linkConfigured,
        href: linkConfigured ? project.href : null,
        contentStatus: /project (one|two|three|four)|placeholder|one or two sentences/i.test(
          project.title + " " + project.description,
        )
          ? "starter placeholder copy"
          : "portfolio content",
      };
    },
  });

  useWebMCP<Record<string, never>, Record<string, unknown>>({
    name: "get_portfolio_services_and_skills",
    description:
      "Summarize the disciplines, skills, tools, and working steps described in the portfolio's process section.",
    inputSchema: emptySchema,
    annotations: { readOnlyHint: true, untrustedContentHint: false },
    execute: () => ({
      disciplines: processData.items.map((item) => ({
        category: item.cat,
        title: item.title,
        description: item.text,
        skills: [...item.tags],
        workflow: [...item.steps],
        section: "process",
      })),
      approach: about.note,
    }),
  });

  useWebMCP<Record<string, never>, Record<string, unknown>>({
    name: "get_portfolio_impact_and_timeline",
    description:
      "Read the portfolio's published impact metrics and career-story timeline, including a warning where the content marks a figure as a placeholder.",
    inputSchema: emptySchema,
    annotations: { readOnlyHint: true, untrustedContentHint: false },
    execute: () => ({
      headlineStats: stats.map((item) => ({
        label: item.label,
        value: item.value + item.suffix,
        status: "unverified starter metric — content.ts marks the stats for replacement",
      })),
      impact: {
        headline: impact.big.value + impact.big.suffix,
        description: impact.big.text.join(" "),
        additionalMetrics: impact.small.map((item) => ({
          label: item.label,
          value: item.value + item.suffix,
          description: item.text,
        })),
        platformMetrics: impact.platform.stats.map((item) => ({
          label: item.label,
          value: item.value + item.suffix,
        })),
        note: impact.platform.note,
      },
      timeline: [
        ...impact.story.timeline.map((item) => ({
          date: item.year,
          title: item.lead,
          description: item.text,
        })),
        ...journey.items.map((item) => ({
          date: item.mark || item.n,
          title: item.title,
          description: item.text,
        })),
      ],
      dataQuality:
        "The source content explicitly marks the main impact numbers and some timeline entries as TODO or placeholder content. Do not present them as independently verified results.",
    }),
  });

  useWebMCP<NavigateInput, Record<string, unknown>>({
    name: "navigate_portfolio_section",
    description:
      "Scroll the visible portfolio page to a named section so the visitor and agent can inspect it together.",
    inputSchema: {
      type: "object",
      properties: {
        section: {
          type: "string",
          enum: [...portfolioSections],
          description: "Section to bring into view.",
        },
      },
      required: ["section"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute: ({ section }) => {
      const target = document.getElementById(section);
      if (!target) {
        return {
          status: "not_found",
          section,
          availableSections: [...portfolioSections],
        };
      }

      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });

      return { status: "navigated", section };
    },
  });

  useWebMCP<Record<string, never>, Record<string, unknown>>({
    name: "get_portfolio_contact_options",
    description:
      "Return the contact methods shown on the portfolio and identify entries that still point to generic placeholder URLs or email addresses.",
    inputSchema: emptySchema,
    annotations: { readOnlyHint: true, untrustedContentHint: false },
    execute: () => {
      const emailConfigured = isConfiguredEmail(site.email);
      return {
        email: emailConfigured ? site.email : null,
        emailConfigured,
        socialLinks: contact.links.map((item) => ({
          label: item.label,
          url: isConfiguredProfileUrl(item.href) ? item.href : null,
          configured: isConfiguredProfileUrl(item.href),
        })),
        contactSection: "#contact",
        notes: [
          !emailConfigured
            ? "The email address is still the you@example.com starter value. Replace it in content.ts before publishing an email link."
            : null,
          "Social URLs that point only to a platform homepage are treated as placeholders; add the owner's actual profile URL in content.ts.",
        ].filter(Boolean),
      };
    },
  });

  return null;
}
