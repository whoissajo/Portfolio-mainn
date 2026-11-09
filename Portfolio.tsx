"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  site, nav, hero, stats, statsCta, about, work, process as processData, impact,
  content, speaking, journey, contact,
} from "@/content";
import { MotionOffContext } from "./MotionContext";
import { useMotion } from "./useMotion";
import { Arrow, Icon, Lnk, Scramble, Stat, SecHead, Heading, usePanelAnim } from "./ui";
import DitherPortrait from "./DitherPortrait";
import DotField from "./DotField";
import PixelImage from "./PixelImage";

/* ================= small pieces ================= */

/** Browser-window mockup. Shows `image` if given, otherwise a generated wireframe. */
function Mock({ url, href, hue, image, caption }: { url: string; href: string; hue: number; image?: string; caption: string }) {
  return (
    <div className="mock spot" style={{ "--h": hue } as CSSProperties} data-reveal>
      <div className="mock-bar">
        <span className="mock-dots" aria-hidden><i /><i /><i /></span>
        <span className="mock-url mono">{url}</span>
        <a className="mock-open" href={href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${caption} in a new tab`}>
          <Arrow size={9} />
        </a>
      </div>
      <div className="mock-screen">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={caption} loading="lazy" decoding="async" />
        ) : (
          <div className="wire" aria-hidden>
            <div className="wire-nav"><i /><i /><i /><b /></div>
            <div className="wire-hero">
              <span className="wire-pill" />
              <span className="wire-h" /><span className="wire-h short" />
              <span className="wire-p" />
              <span className="wire-btn" />
            </div>
            <div className="wire-cards"><i /><i /><i /></div>
          </div>
        )}
        <a className="mock-go" href={href} target="_blank" rel="noopener noreferrer" aria-label={`View ${caption} live in a new tab`}>
          <Arrow size={14} />
        </a>
      </div>
      <span className="mock-cap mono">{caption}</span>
    </div>
  );
}

/* ================= chrome ================= */

function Nav() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <header className="nav">
      <a href="#top" className="logo serif">{site.name}</a>
      <nav className="nav-links" aria-label="Primary">
        {nav.map((l) => (
          <a key={l.href} href={l.href} className={active === l.href.slice(1) ? "on" : ""}>{l.label}</a>
        ))}
        <a className="nav-cta" href="#contact">Let&apos;s talk <Arrow /></a>
      </nav>
    </header>
  );
}

function MotionToggle({ off, toggle }: { off: boolean; toggle: () => void }) {
  return (
    <button className="motion-toggle mono" onClick={toggle} aria-pressed={off} aria-label="Toggle motion">
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M3 2v8M6 3.5v5M9 2v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
      Motion {off ? "off" : "on"}
    </button>
  );
}

/* ================= sections ================= */

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-top" data-intro>
        <span className="mono badge"><i className="dot" />{hero.badge}</span>
        <span className="mono mute">{hero.location}</span>
      </div>
      <div className="hero-stage">
        <div className="rail wrap-l" data-intro>
          <span className="mono accent">{hero.rail.label}</span>
          <span className="plus" aria-hidden>+</span>
          <ul className="mono mute">{hero.rail.items.map((r) => <li key={r}>{r}</li>)}</ul>
        </div>
        <div className="portrait-wrap" data-parallax="0.08" aria-hidden>
          <DitherPortrait src={hero.portrait} />
        </div>
        <div className="hero-copy">
          <p className="mono kicker" data-intro>{hero.kicker}</p>
          <h1 className="hero-name serif" aria-label={site.name}>{site.first} <em>{site.last}</em></h1>
          <p className="hero-sub" data-intro>{hero.sub[0]}<br />{hero.sub[1]}</p>
          <div className="hero-cta" data-intro>
            <a className="pill-btn" href={hero.primary.href}>{hero.primary.label}<Arrow dir="down" size={14} /></a>
            <Lnk href={hero.secondary.href}>{hero.secondary.label}</Lnk>
          </div>
        </div>
      </div>
      <div className="wrap hero-bar mono mute" data-intro>
        <span className="bar-l"><i className="vline" aria-hidden />{hero.bar.left} <Arrow dir="down" size={10} /></span>
        <span>{hero.bar.center}</span>
        <span className="bar-r">{hero.bar.right} <Arrow size={10} /></span>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <div className="stats-strip">
      <div className="wrap stats-grid">
        {stats.map((s) => (
          <div className="stat-cell" key={s.label} data-reveal>
            <Stat value={s.value} suffix={s.suffix} className="md" />
            <p className="stat-label">{s.label}</p>
          </div>
        ))}
        <a className="stat-cell cta-cell" href={statsCta.href} data-reveal>
          <span className="mono">{statsCta.lines[0]}<br />{statsCta.lines[1]}</span>
          <Arrow size={16} />
        </a>
      </div>
    </div>
  );
}

function About() {
  const [tab, setTab] = useState(0);
  const panel = usePanelAnim(tab);
  const t = about.tabs[tab];
  return (
    <section id="about" className="sec">
      <div className="wrap">
        <SecHead num={about.num} label={about.label} aside={about.aside} />
        <div className="about-grid">
          <div className="about-left">
            <div className="about-meta mono mute"><span>{about.intro}</span><span>0{tab + 1} / 0{about.tabs.length}</span></div>
            <div className="field-wrap" data-reveal>
              <DotField mode={t.mode as "structure" | "ripples" | "connect"} />
              <span className="field-cap mono mute">{t.caption.toUpperCase()}</span>
            </div>
            <div className="tabs3" role="tablist" aria-label="Perspective" data-reveal>
              {about.tabs.map((x, i) => (
                <button key={x.name} role="tab" aria-selected={tab === i} className="tab3" onClick={() => setTab(i)}>
                  {x.name}<Arrow size={10} />
                </button>
              ))}
            </div>
            <div className="tab-panel" ref={panel} role="tabpanel">
              <h3 className="serif panel-title">{t.title}</h3>
              <p className="soft">{t.text}</p>
              <Lnk href={t.href}>{t.link}</Lnk>
              <p className="mono mute tiny">Choose a perspective.</p>
            </div>
          </div>
          <div className="about-right">
            <Heading lines={about.heading} size="md" />
            <p className="lead" data-reveal>{about.lead}</p>
            <p className="soft" data-reveal>{about.body[0]}<b>{about.body[1]}</b></p>
            <div data-reveal><Lnk href={about.link.href} accent>{about.link.label}</Lnk></div>
            <p className="mono mute tiny wide" data-reveal>{about.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ p }: { p: (typeof work.featured)[number] }) {
  return (
    <article className="proj">
      <Mock url={p.url} href={p.href} hue={p.hue} image={p.image} caption={p.caption} />
      <div className="proj-text">
        <span className="mono mute proj-n" data-reveal>{p.n}</span>
        <div>
          <p className="mono mute" data-reveal>{p.cat}</p>
          <h3 className="serif proj-title" data-reveal>{p.title}</h3>
          <p className="soft" data-reveal>{p.text}</p>
          <div data-reveal><Lnk href={p.href} external>{p.link}</Lnk></div>
        </div>
      </div>
    </article>
  );
}

function Work() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="work" className="sec">
      <div className="wrap">
        <SecHead num={work.num} label={work.label} aside={work.aside} />
        <div className="split-head">
          <Heading lines={work.heading} size="xl" />
          <p className="soft side-blurb" data-reveal>{work.blurb[0]}<br />{work.blurb[1]}</p>
        </div>
        {work.featured.map((p) => <ProjectRow key={p.n} p={p} />)}
        <div className="pair">
          {work.pair.map((p) => (
            <article className="pair-item" key={p.n}>
              <Mock url={p.url} href={p.href} hue={p.hue} image={p.image} caption={p.caption} />
              <p className="mono mute pair-cat" data-reveal><span>{p.n}</span> {p.cat}</p>
              <h3 className="serif proj-title sm" data-reveal>{p.title}</h3>
              <p className="soft" data-reveal>{p.text}</p>
              <div data-reveal><Lnk href={p.href} external>{p.link}</Lnk></div>
            </article>
          ))}
        </div>
        <div className="more">
          <p className="mono mute" data-reveal>{work.moreLabel}</p>
          {work.more.map((m, i) => (
            <div className="more-row" key={m.n} data-reveal>
              <a className="more-main" href={m.href}>
                <div>
                  <span className="mono mute">{m.n} / {m.cat}</span>
                  <h3 className="serif more-title">{m.title}{m.badge && <span className="badge-pill mono">{m.badge}</span>}</h3>
                </div>
                <Arrow size={18} />
              </a>
              <button className="more-note soft" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                <span>{m.note}</span><span className="pm" aria-hidden>{open === i ? "−" : "+"}</span>
              </button>
              <div className="collapse" data-open={open === i}><div><p className="soft">{m.detail}</p></div></div>
            </div>
          ))}
          <div className="all-link" data-reveal><a className="lnk" href={work.all.href}><span>{work.all.label}</span><Arrow dir="right" size={14} /></a></div>
        </div>
        <div className="link-row" data-stagger>
          {work.links.map((l) => <Lnk key={l.label} href={l.href}>{l.label}</Lnk>)}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const [open, setOpen] = useState(0);
  const cur = processData.items[open];
  const steps = usePanelAnim(open);
  return (
    <section id="process" className="sec">
      <div className="wrap">
        <SecHead num={processData.num} label={processData.label} aside={processData.aside} />
        <div className="proc-grid">
          <div className="proc-left">
            <Heading lines={processData.heading} size="xl" />
            <p className="soft" data-reveal>{processData.intro}</p>
            <div className="hairline" data-line-x aria-hidden />
            <p className="mono accent tiny">{cur.cat.toUpperCase()}</p>
            <div className="steps" ref={steps} role="list">
              {cur.steps.map((s, i) => (
                <div role="listitem" className="step-li" key={cur.n + s}><span className="step-n mono">0{i + 1}</span><span className="serif step-t">{s}</span></div>
              ))}
            </div>
            <Lnk href={cur.stepLink.href}>{cur.stepLink.label}</Lnk>
          </div>
          <div className="acc" data-stagger>
            {processData.items.map((it, i) => (
              <div className="acc-item" key={it.n} data-open={open === i}>
                <button className="acc-head" onClick={() => setOpen(i)} aria-expanded={open === i}>
                  <span>
                    <span className="mono mute tiny">{it.n} / {it.cat.toUpperCase()}</span>
                    <span className="serif acc-title">{it.title}</span>
                  </span>
                  <span className="pm" aria-hidden>{open === i ? "−" : "+"}</span>
                </button>
                <div className="collapse" data-open={open === i}>
                  <div>
                    <p className="soft">{it.text}</p>
                    <p className="tagline">{it.tags.join(" · ")}</p>
                    <Lnk href={it.link.href} accent>{it.link.label}</Lnk>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Impact() {
  const [tab, setTab] = useState(0);
  const panel = usePanelAnim(tab);
  const t = impact.travels.tabs[tab];
  const b = impact.big;
  return (
    <section id="impact" className="sec">
      <div className="wrap">
        <SecHead num={impact.num} label={impact.label} aside={impact.aside} />
        <div className="split-head">
          <Heading lines={impact.heading} size="xl" />
          <p className="soft side-blurb" data-reveal>{impact.blurb[0]}<br />{impact.blurb[1]}</p>
        </div>
        <div className="big-row">
          <Stat value={b.value} suffix={b.suffix} className="giant" />
          <div className="big-copy">
            <h3 className="serif big-title" data-reveal>{b.title[0]}<br />{b.title[1]}</h3>
            <p className="soft" data-reveal>{b.text[0]}<br />{b.text[1]}</p>
            <div data-reveal><Lnk href={b.link.href} accent>{b.link.label}</Lnk></div>
          </div>
        </div>
        <div className="hairline" data-line-x aria-hidden />
        <div className="trio">
          {impact.small.map((s) => (
            <div className="trio-cell" key={s.label} data-reveal>
              <Stat value={s.value} suffix={s.suffix} className="lg" />
              <h4 className="cell-t">{s.label}</h4>
              <p className="soft small">{s.text}</p>
            </div>
          ))}
          <div className="trio-cell thread" data-reveal>
            <p className="mono mute tiny">{impact.thread.label.toUpperCase()}</p>
            <p className="serif thread-t">{impact.thread.lines[0]}<br />{impact.thread.lines[1]}<br /><em>{impact.thread.italic}</em></p>
          </div>
        </div>

        <div className="story">
          <div className="story-l">
            <p className="mono accent tiny" data-reveal>{impact.story.kicker.toUpperCase()}</p>
            <Heading lines={impact.story.heading} size="lg" />
            <p className="soft" data-reveal>{impact.story.body[0]}<b>{impact.story.body[1]}</b>{impact.story.body[2]}</p>
            <div data-reveal><Lnk href={impact.story.link.href}>{impact.story.link.label}</Lnk></div>
          </div>
          <div className="tl2">
            <span className="tl2-line" data-line-y aria-hidden />
            {impact.story.timeline.map((x) => (
              <div className="tl2-item" key={x.year} data-reveal>
                <span className="tl2-node" aria-hidden />
                <p className="mono accent tiny">{x.year}</p>
                <p className="soft"><b>{x.lead}</b> {x.text}</p>
                {x.link && <Lnk href={x.link.href}>{x.link.label}</Lnk>}
              </div>
            ))}
          </div>
        </div>

        <div className="travels" data-reveal>
          <div className="travels-top mono mute tiny"><span>{impact.travels.label.toUpperCase()}</span><span>0{tab + 1} / 0{impact.travels.tabs.length}</span></div>
          <div className="travels-grid">
            <div>
              <div className="tabs3" role="tablist" aria-label="Impact">
                {impact.travels.tabs.map((x, i) => (
                  <button key={x.name} role="tab" aria-selected={tab === i} className="tab3" onClick={() => setTab(i)}>{x.name}<Arrow size={10} /></button>
                ))}
              </div>
              <div className="tab-panel" ref={panel} role="tabpanel">
                <h3 className="serif panel-title">{t.title}</h3>
                <p className="soft">{t.text}</p>
                <Lnk href={t.href}>{t.link}</Lnk>
                <p className="mono mute tiny">Choose a perspective.</p>
              </div>
            </div>
            <div className="field-wrap ripple-box">
              <DotField mode="ripples" />
              <span className="field-cap mono mute">RIPPLES</span>
            </div>
          </div>
        </div>

        <div className="platform">
          <p className="mono mute tiny">{impact.platform.lines[0].toUpperCase()}<br />{impact.platform.lines[1].toUpperCase()}</p>
          <p className="soft side-text">{impact.platform.text[0]}<br />{impact.platform.text[1]}</p>
          {impact.platform.stats.map((s) => (
            <div key={s.label} data-reveal>
              <Stat value={s.value} suffix={s.suffix} className="lg" />
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="mono mute tiny foot-note">{impact.platform.note}</p>
      </div>
    </section>
  );
}

function Films() {
  const [f, setF] = useState(0);
  const grid = usePanelAnim(f);
  const active = content.filters[f];
  const items = content.films.filter((x) => f === 0 || x.tag === active);
  return (
    <section id="content" className="sec">
      <div className="wrap">
        <SecHead num={content.num} label={content.label} aside={content.aside} />
        <div className="split-head">
          <Heading lines={content.heading} size="xl" italicFrom={1} />
          <div className="side-blurb" data-reveal>
            <p className="soft">{content.blurb[0]}<br />{content.blurb[1]}</p>
            <Lnk href={content.channel.href}>{content.channel.label}</Lnk>
          </div>
        </div>
        <div className="filters" data-reveal>
          <div className="pills" role="tablist" aria-label="Filter films">
            {content.filters.map((n, i) => (
              <button key={n} role="tab" aria-selected={f === i} className="pill" onClick={() => setF(i)}>{n}</button>
            ))}
          </div>
          <span className="mono mute tiny">{String(items.length).padStart(2, "0")} SELECTED FILMS</span>
        </div>
        <div className="hairline" data-line-x aria-hidden />
        <div className="films" ref={grid}>
          {items.map((x, i) => {
            const href = x.youtubeId ? `https://www.youtube.com/watch?v=${x.youtubeId}` : "#";
            return (
              <article className="film" key={x.title + i}>
                <a className="thumb spot" href={href} target={x.youtubeId ? "_blank" : undefined} rel="noreferrer" aria-label={`Watch ${x.title}`}
                  style={{ "--h": (i * 57 + 20) % 360 } as CSSProperties}>
                  {x.youtubeId ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`https://i.ytimg.com/vi/${x.youtubeId}/hqdefault.jpg`} alt="" loading="lazy" />
                  ) : <span className="thumb-art" aria-hidden />}
                  <span className="play" aria-hidden><Icon name="play" /></span>
                  <span className="thumb-tag mono">{x.tag}</span>
                </a>
                <p className="mono mute tiny film-by">{x.by}</p>
                <h3 className="serif film-t">{x.title}</h3>
                <p className="soft small">{x.sub}</p>
                <Lnk href={href} external={!!x.youtubeId}>Watch on YouTube</Lnk>
              </article>
            );
          })}
        </div>

        <div className="social">
          <div className="social-l">
            <p className="mono mute tiny" data-reveal>{content.social.kicker.toUpperCase()}</p>
            <Heading lines={content.social.heading} size="md" italicFrom={1} />
          </div>
          {content.social.cards.map((c) => (
            <a className="social-card" key={c.meta} href={c.href} target="_blank" rel="noreferrer" data-reveal>
              <Icon name={c.icon as "instagram" | "linkedin"} />
              <p className="mono mute tiny">{c.meta.toUpperCase()}</p>
              <h3 className="serif social-t">{c.title[0]}<br /><em>{c.title[1]}</em></h3>
              <p className="soft">{c.text}</p>
              <span className="lnk-row"><span>{c.link}</span><Arrow /></span>
            </a>
          ))}
        </div>
        <a className="more-bar" href={content.social.more.href} data-reveal>
          <span><Icon name="video" /> {content.social.more.label}</span><Arrow size={14} />
        </a>
      </div>
    </section>
  );
}

function Speaking() {
  return (
    <section id="speaking" className="sec">
      <div className="wrap">
        <SecHead num={speaking.num} label={speaking.label} aside={speaking.aside} />
        <div className="stage" data-reveal>
          <PixelImage src={speaking.image} alt={speaking.alt} />
          <div className="stage-shade" aria-hidden />
          <div className="stage-copy">
            <p className="mono tiny kick">{speaking.kicker.toUpperCase()}</p>
            <Heading lines={speaking.heading} size="lg" />
            <a className="pill-btn sm" href={speaking.cta.href}>{speaking.cta.label}<Arrow size={12} /></a>
          </div>
          <span className="stage-cap mono tiny">{speaking.caption.toUpperCase()}</span>
        </div>
        <div className="speak-grid">
          <div>
            <h3 className="sans-t" data-reveal>{speaking.title[0]}<br />{speaking.title[1]}</h3>
            <p className="soft" data-reveal>{speaking.text}</p>
            <p className="mono mute tiny tags" data-reveal>{speaking.tags.join("   ·   ").toUpperCase()}</p>
          </div>
          <div className="series" data-stagger>
            {speaking.series.map((s) => (
              <a className="series-row" href={s.href} key={s.title}>
                <span className="series-ico"><Icon name="play" /></span>
                <span className="series-body">
                  <span className="mono mute tiny">{s.cap.toUpperCase()}</span>
                  <b>{s.title}</b>
                  <span className="soft small">{s.text}</span>
                </span>
                <Arrow size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section id="journey" className="sec">
      <div className="wrap journey-grid">
        <div>
          <p className="mono accent tiny" data-reveal>{journey.kicker.toUpperCase()}</p>
          <Heading lines={journey.heading} size="xl" />
        </div>
        <div className="tl2 tl-wide">
          <span className="tl2-line" data-line-y aria-hidden />
          {journey.items.map((x) => (
            <div className="tl2-item" key={x.n} data-reveal>
              <span className="tl2-node" aria-hidden />
              <p className="mono mute tiny">{x.mark ? <span className="accent">{x.mark.toUpperCase()} · </span> : null}{x.n}</p>
              <h3 className="sans-t sm">{x.title}</h3>
              <p className="soft small">{x.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="sec contact">
      <div className="wrap">
        <SecHead num={contact.num} label={contact.label} aside={contact.aside} />
        <p className="mono tiny badge-line" data-reveal><i className="dot" />{contact.badge.toUpperCase()}</p>
        <h2 className="serif head-giant" aria-label={`${contact.heading.join(" ")} ${contact.italic}`}>
          <span className="ln" aria-hidden><span className="ln-i" data-ln>{contact.heading[0]}</span></span>
          <span className="ln" aria-hidden><span className="ln-i" data-ln>{contact.heading[1]} <em>{contact.italic}</em></span></span>
        </h2>
        <a className="connect serif" href={contact.cta.href} data-reveal>{contact.cta.label}<Arrow size={18} /></a>
        <p className="soft contact-text" data-reveal>{contact.text[0]}<br />{contact.text[1]}</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="hairline" aria-hidden />
        <div className="foot-row">
          <a href="#top" className="serif foot-logo">{site.name}.</a>
          <nav className="foot-links" aria-label="Social">
            {contact.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label} <Arrow size={9} /></a>
            ))}
            <a className="up" href="#top" aria-label="Back to top"><Arrow dir="up" size={14} /></a>
          </nav>
        </div>
        <div className="foot-fine mono mute tiny">
          {contact.fine.map((f) => <span key={f}>{f.toUpperCase()}</span>)}
        </div>
      </div>
    </footer>
  );
}

/* ================= page ================= */

export default function Portfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [motionOff, setMotionOff] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try { if (localStorage.getItem("motion-off") === "1") setMotionOff(true); } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("motion-off", motionOff);
    try { localStorage.setItem("motion-off", motionOff ? "1" : "0"); } catch {}
  }, [motionOff, ready]);

  useMotion(rootRef, motionOff, ready);

  return (
    <MotionOffContext.Provider value={motionOff}>
      <div ref={rootRef} className="app">
        <div className="progress" aria-hidden />
        <a className="skip-link" href="#work">Skip to content</a>
        <Nav />
        <main>
          <Hero />
          <Stats />
          <About />
          <Work />
          <Process />
          <Impact />
          <Films />
          <Speaking />
          <Journey />
          <Contact />
        </main>
        <Footer />
        <MotionToggle off={motionOff} toggle={() => setMotionOff((m) => !m)} />
      </div>
    </MotionOffContext.Provider>
  );
}
