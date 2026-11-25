import React, { useEffect, useRef, useState, useCallback } from "react";
import { TransitionLink } from "../components/TransitionContext";
import MagneticButton from "../components/Common/MagneticButton";
import DarkOutro from "../components/Common/DarkOutro";
import ProjectVisual from "../components/Common/ProjectVisual";
import { BullseyeEmblem, SmileyEmblem, NodeEmblem } from "../components/Common/Emblems";
import { PROFILE, DISCIPLINES, PROJECTS } from "../data/portfolioData";
import portraitImg from "../Assets/profhead.png";

const TRAIL_COUNT = 8;

function DraggablePortrait() {
  const [dragging, setDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const targetRef = useRef({ x: 0, y: 0 });
  const startRef = useRef({ x: 0, y: 0 });
  const trailRefs = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 }))
  );
  const nodeRefs = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      const nodes = trailRefs.current;
      // Head eases toward target
      nodes[0].x += (targetRef.current.x - nodes[0].x) * 0.24;
      nodes[0].y += (targetRef.current.y - nodes[0].y) * 0.24;

      // Trailing clones chase previous clone
      for (let i = 1; i < TRAIL_COUNT; i++) {
        nodes[i].x += (nodes[i - 1].x - nodes[i].x) * 0.28;
        nodes[i].y += (nodes[i - 1].y - nodes[i].y) * 0.28;
      }

      for (let i = 0; i < TRAIL_COUNT; i++) {
        const el = nodeRefs.current[i];
        if (el) {
          const scale = 1 - i * 0.012;
          el.style.transform = `translate3d(${nodes[i].x}px, ${nodes[i].y}px, 0) scale(${scale})`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    setHasDragged(true);
    startRef.current = {
      x: e.clientX - targetRef.current.x,
      y: e.clientY - targetRef.current.y,
    };
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    const dx = Math.max(-220, Math.min(220, e.clientX - startRef.current.x));
    const dy = Math.max(-140, Math.min(140, e.clientY - startRef.current.y));
    targetRef.current = { x: dx, y: dy };
  };

  const handlePointerUp = () => {
    setDragging(false);
    targetRef.current = { x: 0, y: 0 };
  };

  return (
    <div className="hero-portrait-wrap">
      <div className="hero-drag-label">
        DR<span className="accent">A</span>G ME
        {!hasDragged && <span className="hero-drag-hint"> · HOLD &amp; PULL</span>}
      </div>

      <div className={`hero-portrait-stage ${dragging ? "is-dragging" : ""}`}>
        {Array.from({ length: TRAIL_COUNT })
          .map((_, idx) => TRAIL_COUNT - 1 - idx)
          .map((i) => (
            <div
              key={i}
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              className={`hero-portrait-card ${i === 0 ? "is-lead" : "is-trail"}`}
              style={{
                opacity: i === 0 ? 1 : Math.max(0.08, 0.55 - i * 0.07),
                zIndex: TRAIL_COUNT - i,
              }}
              onPointerDown={i === 0 ? handlePointerDown : undefined}
              onPointerMove={i === 0 ? handlePointerMove : undefined}
              onPointerUp={i === 0 ? handlePointerUp : undefined}
              onPointerCancel={i === 0 ? handlePointerUp : undefined}
            >
              <img
                src={portraitImg}
                alt="Selasi Dzeamesi"
                draggable={false}
                className="hero-portrait-img"
              />
              {i === 0 && (
                <div className="hero-portrait-caption">
                  <span>SELASI // ACCRA</span>
                  <span>ART + CODE</span>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

function useAccraClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-GB", {
          timeZone: PROFILE.timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date());
        setTime(`${formatted} GMT`);
      } catch {
        setTime("GMT");
      }
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function HomePage({ onProgressChange, registerJumpHandler }) {
  const trackRef = useRef(null);
  const currentX = useRef(0);
  const targetX = useRef(0);
  const maxScrollRef = useRef(0);
  const rafRef = useRef(null);

  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );
  const [activeDiscipline, setActiveDiscipline] = useState("frontend");
  const [featuredIdx, setFeaturedIdx] = useState(0);

  const accraTime = useAccraClock();
  const isGraphicTab = featuredIdx === PROJECTS.length;
  const featuredProject = PROJECTS[isGraphicTab ? 0 : featuredIdx];

  // Resize listener for desktop horizontal vs mobile vertical mode
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop && trackRef.current) {
        maxScrollRef.current = Math.max(
          0,
          trackRef.current.scrollWidth - window.innerWidth
        );
        targetX.current = Math.min(targetX.current, maxScrollRef.current);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const jumpToChapter = useCallback(
    (chapterIndex) => {
      if (!isDesktop || !trackRef.current) {
        const el = document.querySelector(`[data-chapter="${chapterIndex}"]`);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        return;
      }
      maxScrollRef.current = Math.max(
        0,
        trackRef.current.scrollWidth - window.innerWidth
      );
      const panel = trackRef.current.querySelector(`[data-chapter="${chapterIndex}"]`);
      if (panel) {
        targetX.current = Math.max(0, Math.min(panel.offsetLeft, maxScrollRef.current));
      }
    },
    [isDesktop]
  );

  useEffect(() => {
    if (registerJumpHandler) {
      registerJumpHandler(jumpToChapter);
    }
  }, [registerJumpHandler, jumpToChapter]);

  // Smooth wheel-to-horizontal scroll loop on desktop
  useEffect(() => {
    if (!isDesktop) {
      if (onProgressChange) onProgressChange(0, 0);
      return;
    }

    const computeMax = () => {
      if (trackRef.current) {
        maxScrollRef.current = Math.max(
          0,
          trackRef.current.scrollWidth - window.innerWidth
        );
      }
    };
    computeMax();
    const timer = setTimeout(computeMax, 300);

    const handleWheel = (e) => {
      e.preventDefault();
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      targetX.current = Math.max(
        0,
        Math.min(maxScrollRef.current, targetX.current + delta * 1.15)
      );
    };

    const handleKeyDown = (e) => {
      const step = window.innerWidth * 0.65;
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        targetX.current = Math.min(maxScrollRef.current, targetX.current + step);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        targetX.current = Math.max(0, targetX.current - step);
      } else if (e.key === "Home") {
        targetX.current = 0;
      } else if (e.key === "End") {
        targetX.current = maxScrollRef.current;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    let lastReported = -1;
    let lastChapter = -1;

    const tick = () => {
      currentX.current += (targetX.current - currentX.current) * 0.095;
      if (Math.abs(targetX.current - currentX.current) < 0.2) {
        currentX.current = targetX.current;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-currentX.current}px, 0, 0)`;

        const max = maxScrollRef.current || 1;
        const progress = currentX.current / max;

        // Determine active chapter (0..4)
        const chapter =
          progress < 0.16
            ? 0
            : progress < 0.38
            ? 1
            : progress < 0.64
            ? 2
            : progress < 0.84
            ? 3
            : 4;

        if (
          onProgressChange &&
          (Math.abs(progress - lastReported) > 0.002 || chapter !== lastChapter)
        ) {
          lastReported = progress;
          lastChapter = chapter;
          onProgressChange(progress, chapter);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isDesktop, onProgressChange]);

  const activeDisciplineObj =
    DISCIPLINES.find((d) => d.id === activeDiscipline) || DISCIPLINES[1];

  return (
    <main className={`home-viewport ${isDesktop ? "is-horizontal" : "is-vertical"}`}>
      <div ref={trackRef} className="home-track">
        {/* PANEL 01 — INTRO HERO */}
        <section className="home-panel panel-intro" data-chapter="0">
          <div className="panel-intro-grid">
            {/* Top Left */}
            <div className="intro-top-left">
              <div className="section-index">01/</div>
              <div className="intro-origin">
                <strong>From Accra with Love</strong>
                <span className="intro-clock">ACC · {accraTime}</span>
              </div>
            </div>

            {/* Top Right — Title stays "Creative Developer." */}
            <div className="intro-top-right">
              <h1 className="hero-display hero-display-right">
                <span>CREATIVE</span>
                <span>
                  DEVELOPER<span className="accent">.</span>
                </span>
              </h1>
            </div>

            {/* Bottom Left — Monumental Name */}
            <div className="intro-bottom-left">
              <div className="hero-display hero-display-left" aria-label={PROFILE.fullName}>
                <span>SELASI</span>
                <span>DZEAMESI</span>
              </div>
            </div>

            {/* Mid/Bottom Right — Draggable Portrait Trail + Bio */}
            <div className="intro-bottom-right">
              <DraggablePortrait />
              <div className="intro-bio-row">
                <span className="intro-arrow" aria-hidden="true">
                  →
                </span>
                <p className="intro-bio-text">
                  FOUNDER &amp; CEO OF KIRULABS — BASED IN ACCRA, GHANA. BLENDING SOFTWARE ENGINEERING, GRAPHIC ART &amp; LEADERSHIP.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PANEL 02 — CAPABILITIES & DISCIPLINES */}
        <section className="home-panel panel-craft" data-chapter="1">
          <div className="panel-craft-grid">
            <div className="craft-left">
              <div className="section-index">02/</div>
              <p className="craft-statement">
                I CRAFT INTERFACES &amp; SYSTEMS{" "}
                <span className="craft-rule" aria-hidden="true" />{" "}
                WHERE VISUAL ART MEETS ENGINEERING.
              </p>
              <div className="craft-emblems">
                <BullseyeEmblem />
                <SmileyEmblem />
              </div>
            </div>

            <div className="craft-right">
              <div className="discipline-stack" role="list">
                {DISCIPLINES.map((d) => (
                  <div
                    key={d.id}
                    role="listitem"
                    className={`discipline-word ${
                      activeDiscipline === d.id ? "is-highlighted" : ""
                    }`}
                    onMouseEnter={() => setActiveDiscipline(d.id)}
                  >
                    {d.label}
                  </div>
                ))}
              </div>

              <div className="craft-footer-row">
                <p className="discipline-caption">{activeDisciplineObj.caption}</p>
                <MagneticButton to="/about" label="ABOUT" className="ed-asymmetric-cta">
                  More About Me →
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>

        {/* PANEL 03 — FEATURED WORK SHOWCASE */}
        <section className="home-panel panel-work" data-chapter="2">
          <div className="panel-work-layout">
            <div className="work-left-emblem">
              <NodeEmblem />
            </div>

            <div className="work-stage">
              {/* Quick switch between featured software & graphic design */}
              <div className="work-switch-bar">
                <div className="work-switch-tabs">
                  {PROJECTS.map((proj, idx) => (
                    <button
                      key={proj.slug}
                      type="button"
                      className={`work-switch-pill ${featuredIdx === idx ? "is-active" : ""}`}
                      onClick={() => setFeaturedIdx(idx)}
                    >
                      <span>{proj.index}</span> {proj.shortTitle}
                    </button>
                  ))}
                  <button
                    type="button"
                    className={`work-switch-pill ${isGraphicTab ? "is-active" : ""}`}
                    onClick={() => setFeaturedIdx(PROJECTS.length)}
                  >
                    <span>04</span> Graphic Art
                  </button>
                </div>
                <TransitionLink to="/works" label="WORKS" className="work-all-link">
                  View All Works →
                </TransitionLink>
              </div>

              {/* Dual visual cards (UI preview + Code snippet / Art Direction card) */}
              <div className="work-cards-row">
                <TransitionLink
                  to={isGraphicTab ? "/works" : `/works/${featuredProject.slug}`}
                  label={isGraphicTab ? "GRAPHIC DESIGN" : featuredProject.title.toUpperCase()}
                  className="work-primary-card"
                >
                  <ProjectVisual slug={isGraphicTab ? "graphic-showcase" : featuredProject.slug} />
                </TransitionLink>

                <div className="work-code-card">
                  <div className="work-code-header">
                    <span className="code-dots">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span>
                      {isGraphicTab ? "kirulabs-studio.art" : `${featuredProject.slug}.spec`}
                    </span>
                  </div>
                  <pre className="work-code-pre">
                    <code>
                      {isGraphicTab
                        ? `// Visual Art & Graphic Design\nconst archive = {\n  studio: "KiruLabs",\n  works: [\n    "KiruLabs — May Day Campaign",\n    "ACCA 35° — Anniversary Poster",\n    "KOKONSAH — Streetwear Jersey",\n    "Y2K Baddie — Editorial",\n    "Third Eye — Halftone Print"\n  ]\n};`
                        : featuredProject.codePreview}
                    </code>
                  </pre>
                  <div className="work-code-tags">
                    {(isGraphicTab
                      ? ["Posters", "Apparel", "Lookbooks", "Print"]
                      : featuredProject.stack
                    ).map((tech) => (
                      <span key={tech} className="work-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Metadata caption bar */}
              <div className="work-meta-strip">
                <span className="work-meta-muted">
                  — {isGraphicTab ? "Visual Direction & Posters · 05 Pieces" : `${featuredProject.category} · Built by Selasi Dzeamesi`}
                </span>
                <span className="work-meta-strong">
                  {isGraphicTab
                    ? "2025–2026    Art Director & Designer"
                    : `${featuredProject.year}    ${featuredProject.role}`}
                </span>
              </div>

              {/* Bottom Editorial Row */}
              <div className="work-editorial-bottom">
                <div className="section-index section-index-lg">03/</div>
                <div className="work-editorial-title">
                  <h3>{isGraphicTab ? "Graphic Design Archive" : featuredProject.title}</h3>
                  <div className="work-case-links">
                    <TransitionLink
                      to={isGraphicTab ? "/works" : `/works/${featuredProject.slug}`}
                      label={isGraphicTab ? "WORKS" : featuredProject.title.toUpperCase()}
                      className="work-case-link"
                    >
                      {isGraphicTab ? "Explore Gallery ↗" : "Open Case Study ↗"}
                    </TransitionLink>
                    {!isGraphicTab && featuredProject.liveUrl && (
                      <a
                        href={featuredProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work-live-link"
                      >
                        Live Site ↗
                      </a>
                    )}
                  </div>
                </div>
                <p className="work-editorial-desc">
                  <span className="desc-arrow">( → )</span>{" "}
                  {isGraphicTab
                    ? "Selected campaign posters, streetwear jersey graphics, fashion lookbooks, and halftone illustrations crafted in Accra."
                    : featuredProject.tagline}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PANEL 04 — KINETIC WORDMARK TRANSITION */}
        <section className="home-panel panel-wordmark" data-chapter="3">
          <div className="wordmark-inner">
            <div className="wordmark-top-row">
              <div>
                <div className="section-index">04/</div>
                <p className="wordmark-eyebrow">Creative Developer + Visual Artist</p>
              </div>
              <p className="wordmark-note">
                Crafting expressive, human-centered digital products from concept to production.
              </p>
            </div>

            <div className="kinetic-wordmark" aria-label="SELASI">
              {"SELASI".split("").map((letter, idx) => (
                <span key={idx} className="kinetic-letter">
                  {letter}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* PANEL 05 — CREAM TO BLACK GRADIENT BRIDGE */}
        <section className="home-panel panel-gradient" aria-hidden="true" />

        {/* PANEL 06 — PITCH-BLACK OUTRO */}
        <div className="home-panel panel-outro-wrap" data-chapter="4">
          <DarkOutro
            isHorizontal={isDesktop}
            onBack={() => jumpToChapter(0)}
          />
        </div>
      </div>
    </main>
  );
}
