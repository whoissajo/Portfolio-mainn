# M Umar — Portfolio (v3)

Next.js 15 (App Router) · React 19 · GSAP + ScrollTrigger · Lenis · self-hosted fonts.

## Run
```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## WebMCP support

This portfolio exposes its visible content and navigation to WebMCP-compatible browser agents. The app uses the Chrome-maintained React integration, `use-webmcp-tool`, so tool registration follows the component lifecycle and safely becomes a no-op in browsers that do not implement WebMCP.

### Available agent tools

- `get_portfolio_overview` — profile, introduction, disciplines, website, and visible sections.
- `search_portfolio_projects` — search visible projects by words or discipline.
- `get_portfolio_project_details` — retrieve the full stored details for a visible project.
- `get_portfolio_services_and_skills` — disciplines, skills, and working steps.
- `get_portfolio_impact_and_timeline` — impact figures and career timeline, with placeholder warnings.
- `navigate_portfolio_section` — scroll to a named section on the page.
- `get_portfolio_contact_options` — contact methods and whether the supplied links are configured.

Tools are registered from `components/PortfolioWebMCP.tsx` and mounted by `components/Portfolio.tsx`. The tool schemas constrain project IDs and section names to known values. Read operations are annotated read-only; section navigation is an in-page action only. No emails, messages or external submissions are sent.

**Content accuracy:** The portfolio's `content.ts` currently contains TODO values such as `you@example.com`, generic social profile URLs, sample project names and placeholder metrics. WebMCP results intentionally mark these entries as unconfigured or unverified rather than implying that they are real credentials, clients, or measured outcomes. Update `content.ts` before relying on the data publicly.

### Test locally

1. Install and start the site:

```bash
npm ci
npm run dev
```

2. In a Chromium build that supports WebMCP, enable the local testing flag at `chrome://flags/#enable-webmcp-testing` and relaunch. WebMCP also requires a secure context; `localhost` is treated as secure.
3. Open the portfolio and inspect the registered tools:

```js
const tools = await document.modelContext.getTools();
console.table(tools.map(({ name, description }) => ({ name, description })));
```

4. Exercise a read tool and a navigation tool:

```js
const tools = await document.modelContext.getTools();

const search = tools.find((tool) => tool.name === "search_portfolio_projects");
await document.modelContext.executeTool(search, { query: "design" });

const navigate = tools.find((tool) => tool.name === "navigate_portfolio_section");
await document.modelContext.executeTool(navigate, { section: "work" });
```

WebMCP is an evolving web-platform capability and is not available in every browser. See the [WebMCP specification](https://webmachinelearning.github.io/webmcp/), [Chrome's implementation guide](https://developer.chrome.com/docs/modern-web-guidance/guides/webmcp/agentic-javascript-tools), and the [React integration](https://github.com/GoogleChromeLabs/use-webmcp-tool).

## Edit your content
Everything (copy, numbers, links, handles, YouTube IDs) lives in **`content.ts`**. Search for `TODO`.
Replace images in `public/images/`: `portrait.png` (hero, head & shoulders, ~900x1100) and `speaking.png` (wide stage/crowd photo).

## Structure
- `components/Portfolio.tsx` – all sections
- `components/useMotion.ts` – Lenis smooth scroll, GSAP reveals, hero intro
- `components/DitherPortrait.tsx`, `DotField.tsx`, `PixelImage.tsx` – canvas effects
- `app/globals.css` – design tokens and styles

The "Motion On/Off" button (bottom right) disables all animation; `prefers-reduced-motion` is respected.

## Vercel note
The folder must be named `components` (lowercase) in git:
`git mv Components components_tmp && git mv components_tmp components`
