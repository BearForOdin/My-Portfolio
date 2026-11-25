import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TransitionLink, usePageTransition } from "../components/TransitionContext";
import MagneticButton from "../components/Common/MagneticButton";
import DarkOutro from "../components/Common/DarkOutro";
import ProjectVisual from "../components/Common/ProjectVisual";
import { BullseyeEmblem, SmileyEmblem, NodeEmblem } from "../components/Common/Emblems";
import { PROFILE, DISCIPLINES, PROJECTS } from "../data/portfolioData";
import portraitImg from "../Assets/profhead.png";
import statueImg from "../Assets/nkrumah-statue.png";

const TRAIL_COUNT = 8;

function MaskedLine({ children, ready, delay = 0 }) {
  return (
    <span className="fm-line-mask">
      <motion.span
        className="fm-line-inner"
        initial={{ y: "110%" }}
        animate={ready ? { y: "0%" } : { y: "110%" }}
        transition={{
          duration: 0.78,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function DraggablePortrait() {
  const { setCursorVariant } = usePageTransition();
  const [dragging, setDragging] = useState(false);
  const targetRef = useRef({ x: 0, y: 0 });
  const startRef = useRef({ x: 0, y: 0 });
  const trailRefs = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 }))
  );
  const nodeRefs = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const animateTrail = () => {
      const nodes = trailRefs.current;
      nodes[0].x += (targetRef.current.x - nodes[0].x) * 0.22;
      nodes[0].y += (targetRef.current.y - nodes[0].y) * 0.22;

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

      rafRef.current = requestAnimationFrame(animateTrail);
    };

    rafRef.current = requestAnimationFrame(animateTrail);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    startRef.current = {
      x: e.clientX - targetRef.current.x,
      y: e.clientY - targetRef.current.y,
    };
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    const dx = Math.max(-240, Math.min(240, e.clientX - startRef.current.x));
    const dy = Math.max(-150, Math.min(150, e.clientY - startRef.current.y));
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
      </div>

      <div
        className={`hero-portrait-stage ${dragging ? "is-dragging" : ""}`}
        onMouseEnter={() => setCursorVariant({ mode: "media", text: "DRAG" })}
        onMouseLeave={() => setCursorVariant({ mode: "default", text: "" })}
      >
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
                opacity: i === 0 ? 1 : Math.max(0.08, 0.52 - i * 0.065),
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
            </div>
          ))}
      </div>
    </div>
  );
}

export default function HomePage({ ready = true, onProgressChange, registerJumpHandler }) {
  const { setCursorVariant } = usePageTransition();
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
  const [ePointed, setEPointed] = useState(false);

  // Scroll-driven motion value for Panel 04 statue pop-out (0 = tucked, 1 = hanging halfway pointing dead-on at E)
  const panel4Raw = useMotionValue(0);
  const panel4Spring = useSpring(panel4Raw, { stiffness: 135, damping: 20, mass: 0.7 });
  const statueY = useTransform(panel4Spring, [0, 1], ["92%", "42%"]);
  const statueX = useTransform(panel4Spring, [0, 1], ["16%", "0%"]);
  const statueRotate = useTransform(panel4Spring, [0, 1], [6, -25]);
  const statueScale = useTransform(panel4Spring, [0, 1], [0.86, 1]);
  const statueOpacity = useTransform(panel4Spring, [0, 0.25, 1], [0, 0.75, 1]);

  const panel4Ref = useRef(null);

  const isGraphicTab = featuredIdx === PROJECTS.length;
  const featuredProject = PROJECTS[isGraphicTab ? 0 : featuredIdx];

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

  // Silky Lenis-like horizontal smooth scroll on desktop
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
        Math.min(maxScrollRef.current, targetX.current + delta * 1.1)
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
      currentX.current += (targetX.current - currentX.current) * 0.088;
      if (Math.abs(targetX.current - currentX.current) < 0.2) {
        currentX.current = targetX.current;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-currentX.current}px, 0, 0)`;

        const max = maxScrollRef.current || 1;
        const progress = currentX.current / max;

        // Drive Panel 04 statue pop-out smoothly as Page 04 enters viewport
        if (panel4Ref.current) {
          const p4Left = panel4Ref.current.offsetLeft;
          const vw = window.innerWidth || 1;
          const enterStart = p4Left - vw * 0.85;
          const enterEnd = p4Left - vw * 0.04;
          const p4Progress = Math.max(
            0,
            Math.min(1, (currentX.current - enterStart) / Math.max(1, enterEnd - enterStart))
          );
          panel4Raw.set(p4Progress);
          const pointedNow = p4Progress > 0.78;
          setEPointed((prev) => (prev === pointedNow ? prev : pointedNow));
        }

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
  }, [isDesktop, onProgressChange, panel4Raw]);

  const activeDisciplineObj =
    DISCIPLINES.find((d) => d.id === activeDiscipline) || DISCIPLINES[1];

  return (
    <main className={`home-viewport ${isDesktop ? "is-horizontal" : "is-vertical"}`}>
      <div ref={trackRef} className="home-track">
        {/* PANEL 01 — RADICAL SIMPLICITY HERO */}
        <section className="home-panel panel-intro" data-chapter="0">
          <motion.div
            className="panel-intro-grid"
            initial={{ scale: 1.025 }}
            animate={ready ? { scale: 1 } : { scale: 1.025 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="intro-top-left"
              initial={{ opacity: 0, y: 14 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="section-index">01/</div>
              <div className="intro-origin">
                <strong>From Accra with Love</strong>
              </div>
            </motion.div>

            {/* Title stays "Creative Developer." */}
            <div className="intro-top-right">
              <h1 className="hero-display hero-display-right">
                <MaskedLine ready={ready} delay={0.1}>
                  CREATIVE
                </MaskedLine>
                <MaskedLine ready={ready} delay={0.17}>
                  DEVELOPER<span className="accent">.</span>
                </MaskedLine>
              </h1>
            </div>

            <div className="intro-bottom-left">
              <div className="hero-display hero-display-left" aria-label={PROFILE.fullName}>
                <MaskedLine ready={ready} delay={0.2}>
                  SELASI
                </MaskedLine>
                <MaskedLine ready={ready} delay={0.27}>
                  DZEAMESI
                </MaskedLine>
              </div>
            </div>

            <motion.div
              className="intro-bottom-right"
              initial={{ opacity: 0, y: 24 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.72, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <DraggablePortrait />
              <div className="intro-bio-row">
                <span className="intro-arrow" aria-hidden="true">
                  →
                </span>
                <p className="intro-bio-text">
                  FOUNDER &amp; CEO OF KIRULABS, BASED IN ACCRA — PASSIONATE IN SOFTWARE &amp; VISUAL ART.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* PANEL 02 — CAPABILITIES & DISCIPLINES */}
        <section className="home-panel panel-craft" data-chapter="1">
          <div className="panel-craft-grid">
            <div className="craft-left">
              <div className="section-index">02/</div>
              <p className="craft-statement">
                I BUILD DIGITAL PRODUCTS{" "}
                <span className="craft-rule" aria-hidden="true" />{" "}
                &amp; VISUAL WORLDS THAT OWN THE SPACE.
              </p>
              <div className="craft-emblems">
                <BullseyeEmblem />
                <motion.div
                  whileHover={{ rotate: 38, scale: 1.07 }}
                  transition={{ type: "spring", stiffness: 220, damping: 14 }}
                >
                  <SmileyEmblem />
                </motion.div>
              </div>
            </div>

            <div className="craft-right">
              <div className="discipline-stack" role="list">
                {DISCIPLINES.map((d) => (
                  <motion.div
                    key={d.id}
                    role="listitem"
                    className={`discipline-word ${
                      activeDiscipline === d.id ? "is-highlighted" : ""
                    }`}
                    onMouseEnter={() => setActiveDiscipline(d.id)}
                    animate={{
                      x: activeDiscipline === d.id ? -14 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  >
                    {d.label}
                  </motion.div>
                ))}
              </div>

              <div className="craft-footer-row">
                <AnimatePresence exitBeforeEnter>
                  <motion.p
                    key={activeDisciplineObj.id}
                    className="discipline-caption"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                  >
                    {activeDisciplineObj.caption}
                  </motion.p>
                </AnimatePresence>

                <MagneticButton
                  to="/about"
                  label="ABOUT"
                  className="ed-asymmetric-cta"
                  onMouseEnter={() => setCursorVariant({ mode: "link", text: "" })}
                  onMouseLeave={() => setCursorVariant({ mode: "default", text: "" })}
                >
                  More About Me
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>

        {/* PANEL 03 — FEATURED WORK SHOWCASE (ULTRA-CLEAN) */}
        <section className="home-panel panel-work" data-chapter="2">
          <div className="panel-work-layout">
            <div className="work-left-emblem">
              <NodeEmblem />
            </div>

            <div className="work-stage">
              {/* Minimalist hairline text tabs (no bulky pill boxes) */}
              <div className="work-switch-bar">
                <div className="work-switch-tabs">
                  {PROJECTS.map((proj, idx) => (
                    <button
                      key={proj.slug}
                      type="button"
                      className={`work-switch-minimal ${featuredIdx === idx ? "is-active" : ""}`}
                      onClick={() => setFeaturedIdx(idx)}
                      onMouseEnter={() => setCursorVariant({ mode: "link", text: "" })}
                      onMouseLeave={() => setCursorVariant({ mode: "default", text: "" })}
                    >
                      <span className="wsm-num">{proj.index}</span>
                      <span>{proj.shortTitle}</span>
                    </button>
                  ))}
                  <button
                    type="button"
                    className={`work-switch-minimal ${isGraphicTab ? "is-active" : ""}`}
                    onClick={() => setFeaturedIdx(PROJECTS.length)}
                    onMouseEnter={() => setCursorVariant({ mode: "link", text: "" })}
                    onMouseLeave={() => setCursorVariant({ mode: "default", text: "" })}
                  >
                    <span className="wsm-num">04</span>
                    <span>Graphic Art</span>
                  </button>
                </div>

                <TransitionLink
                  to="/works"
                  label="WORK"
                  className="work-all-link"
                  onMouseEnter={() => setCursorVariant({ mode: "link", text: "" })}
                  onMouseLeave={() => setCursorVariant({ mode: "default", text: "" })}
                >
                  All Works →
                </TransitionLink>
              </div>

              {/* Animated Showcase Transition */}
              <AnimatePresence exitBeforeEnter>
                <motion.div
                  key={isGraphicTab ? "graphic" : featuredProject.slug}
                  className="work-animated-wrap"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="work-cards-row">
                    <TransitionLink
                      to={isGraphicTab ? "/works" : `/works/${featuredProject.slug}`}
                      label={isGraphicTab ? "WORK" : featuredProject.title.toUpperCase()}
                      className="work-primary-card"
                      onMouseEnter={() => setCursorVariant({ mode: "media", text: "VIEW" })}
                      onMouseLeave={() => setCursorVariant({ mode: "default", text: "" })}
                    >
                      <ProjectVisual
                        slug={isGraphicTab ? "graphic-showcase" : featuredProject.slug}
                      />
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
                            ? `// KiruLabs Visual Studio\nconst archive = [\n  "KiruLabs — May Day",\n  "ACCA 35° — Poster",\n  "KOKONSAH — Jersey",\n  "Y2K Baddie — Lookbook",\n  "Third Eye — Halftone"\n];`
                            : featuredProject.codePreview}
                        </code>
                      </pre>
                    </div>
                  </div>

                  <div className="work-meta-strip">
                    <span className="work-meta-muted">
                      — {isGraphicTab ? "Visual Direction & Posters · 05 Pieces" : featuredProject.category}
                    </span>
                    <span className="work-meta-strong">
                      {isGraphicTab
                        ? "2025–2026    Art Direction"
                        : `${featuredProject.year}    ${featuredProject.role}`}
                    </span>
                  </div>

                  <div className="work-editorial-bottom">
                    <div className="section-index section-index-lg">03/</div>
                    <div className="work-editorial-title">
                      <h3>{isGraphicTab ? "Graphic Design" : featuredProject.title}</h3>
                      <div className="work-case-links">
                        <TransitionLink
                          to={isGraphicTab ? "/works" : `/works/${featuredProject.slug}`}
                          label={isGraphicTab ? "WORK" : featuredProject.title.toUpperCase()}
                          className="work-case-link"
                        >
                          {isGraphicTab ? "Open Gallery ↗" : "Case Study ↗"}
                        </TransitionLink>
                        {!isGraphicTab && featuredProject.liveUrl && (
                          <a
                            href={featuredProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="work-live-link"
                          >
                            Live ↗
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="work-editorial-desc">
                      <span className="desc-arrow">( → )</span>{" "}
                      {isGraphicTab
                        ? "Campaign posters, streetwear jerseys, editorial lookbooks, and halftone print art crafted in Accra."
                        : featuredProject.tagline}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* PANEL 04 — EXTREME WHITESPACE KINETIC WORDMARK + POP-OUT STATUE POINTING AT "E" */}
        <section ref={panel4Ref} className="home-panel panel-wordmark" data-chapter="3">
          <div className="wordmark-inner">
            <div className="wordmark-top-row">
              <div className="section-index">04/</div>
              <div className="wordmark-cols">
                <div>
                  <strong>Creative Developer</strong>
                  <span>+ Visual Artist</span>
                </div>
                <p className="wordmark-note">
                  Crafting expressive, human-centered solutions to real-world problems.
                </p>
              </div>
            </div>

            <div className="kinetic-wordmark-stage">
              {/* Statue hanging halfway out, popping out on scroll to point at the E of SELASI */}
              {isDesktop ? (
                <motion.div
                  className="wordmark-statue-wrap"
                  style={{
                    x: statueX,
                    y: statueY,
                    rotate: statueRotate,
                    scale: statueScale,
                    opacity: statueOpacity,
                  }}
                  aria-hidden="true"
                >
                  <img
                    src={statueImg}
                    alt=""
                    className="wordmark-statue-img"
                    draggable={false}
                  />
                </motion.div>
              ) : (
                <motion.div
                  className="wordmark-statue-wrap"
                  initial={{ x: "18%", y: "92%", rotate: 6, scale: 0.86, opacity: 0 }}
                  whileInView={{ x: "0%", y: "44%", rotate: -25, scale: 1, opacity: 1 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.7 }}
                  onViewportEnter={() => setEPointed(true)}
                  onViewportLeave={() => setEPointed(false)}
                  aria-hidden="true"
                >
                  <img
                    src={statueImg}
                    alt=""
                    className="wordmark-statue-img"
                    draggable={false}
                  />
                </motion.div>
              )}

              <div className="kinetic-wordmark" aria-label="SELASI">
                {"SELASI".split("").map((letter, idx) => (
                  <motion.span
                    key={idx}
                    className={`kinetic-letter ${idx === 1 && ePointed ? "is-pointed" : ""}`}
                    whileHover={{ y: -26, rotate: idx % 2 === 0 ? -3 : 3, color: "#ff5d1f" }}
                    transition={{ type: "spring", stiffness: 280, damping: 16 }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PANEL 05 — ATMOSPHERIC GRADIENT BRIDGE */}
        <section className="home-panel panel-gradient" aria-hidden="true" />

        {/* PANEL 06 — PITCH-BLACK OUTRO */}
        <div className="home-panel panel-outro-wrap" data-chapter="4">
          <DarkOutro isHorizontal={isDesktop} onBack={() => jumpToChapter(0)} />
        </div>
      </div>
    </main>
  );
}
