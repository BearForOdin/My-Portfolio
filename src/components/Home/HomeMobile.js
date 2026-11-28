import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TransitionLink, usePageTransition } from "../TransitionContext";
import ProjectVisual from "../Common/ProjectVisual";
import { BullseyeEmblem, SmileyEmblem } from "../Common/Emblems";
import { PROFILE, PROJECTS } from "../../data/portfolioData";
import portraitImg from "../../Assets/profhead.png";
import statueImg from "../../Assets/nkrumah-statue.png";

const MOBILE_DISCIPLINES = [
  { id: "kirulabs", label: "KIRULABS", accent: false },
  { id: "backend", label: "BACKEND", accent: false },
  { id: "frontend", label: "FRONTEND", accent: true },
  { id: "design", label: "DESIGN", accent: false },
];

export default function HomeMobile({ ready = true }) {
  const { copyText } = usePageTransition();
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [ePointed, setEPointed] = useState(false);
  const wordmarkStageRef = useRef(null);

  // Observe the unclipped wordmark stage so the statue always pops out reliably on mobile & tablet
  useEffect(() => {
    const el = wordmarkStageRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setEPointed(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setEPointed(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isGraphicTab = featuredIdx === PROJECTS.length;
  const featuredProject = PROJECTS[isGraphicTab ? 0 : featuredIdx];
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="m-home">
      {/* 01/ HERO — Exact douglus.site Swiss Mobile Composition */}
      <section className="m-sec m-hero">
        <motion.div
          className="m-hero-top"
          initial={{ opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="m-name">
            SELASI
            <br />
            DZEAMESI
          </h2>
          <span className="m-idx">01/</span>
        </motion.div>

        <motion.div
          className="m-hero-photo-wrap"
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={portraitImg}
            alt={PROFILE.fullName}
            className="m-hero-photo"
            draggable={false}
          />
        </motion.div>

        <motion.div
          className="m-hero-bottom"
          initial={{ opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="m-hero-bio">
            <span>ACCRA, GHANA ·</span>
            <span>KIRULABS &amp; ART</span>
          </div>
          <h1 className="m-title">
            CREATIVE
            <br />
            DEVELOPER<span className="accent">.</span>
          </h1>
        </motion.div>
      </section>

      {/* 02/ CAPABILITIES — Exact douglus.site Split & Stack */}
      <section className="m-sec m-craft">
        <div className="m-craft-top">
          <span className="m-idx">02/</span>
          <p className="m-craft-statement">
            I BUILD DIGITAL
            <br />
            PRODUCTS &amp;
            <br />
            VISUAL WORLDS
            <br />
            THAT OWN
            <br />
            THE SPACE.
          </p>
        </div>

        <div className="m-discipline-stack">
          {MOBILE_DISCIPLINES.map((item, idx) => (
            <motion.div
              key={item.id}
              className={`m-discipline-word ${item.accent ? "is-accent" : ""}`}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              {item.label}
            </motion.div>
          ))}
        </div>

        <div className="m-craft-foot">
          <div className="m-emblems">
            <BullseyeEmblem className="m-emblem-svg" />
            <SmileyEmblem className="m-emblem-svg" />
          </div>
          <TransitionLink to="/about" label="ABOUT" className="m-cta">
            MORE ABOUT ME →
          </TransitionLink>
        </div>
      </section>

      {/* 03/ FEATURED WORK — Editorial Stack with Right-Offset Code Card */}
      <section className="m-sec m-work">
        <div className="m-work-switcher">
          <div className="m-work-tabs">
            {PROJECTS.map((proj, idx) => (
              <button
                key={proj.slug}
                type="button"
                className={`m-work-tab ${featuredIdx === idx ? "is-active" : ""}`}
                onClick={() => setFeaturedIdx(idx)}
              >
                <span>{proj.index}</span> {proj.shortTitle}
              </button>
            ))}
            <button
              type="button"
              className={`m-work-tab ${isGraphicTab ? "is-active" : ""}`}
              onClick={() => setFeaturedIdx(PROJECTS.length)}
            >
              <span>04</span> Art
            </button>
          </div>
          <TransitionLink to="/works" label="WORK" className="m-cta">
            ALL →
          </TransitionLink>
        </div>

        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={isGraphicTab ? "graphic" : featuredProject.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <TransitionLink
              to={isGraphicTab ? "/works" : `/works/${featuredProject.slug}`}
              label={isGraphicTab ? "WORK" : featuredProject.title.toUpperCase()}
              className="m-process-image"
            >
              <ProjectVisual
                slug={isGraphicTab ? "graphic-showcase" : featuredProject.slug}
              />
            </TransitionLink>

            <div className="m-process-meta">
              <span className="m-idx">03/</span>
              <span className="m-process-role">
                {isGraphicTab
                  ? "2025–2026 · ART DIRECTION"
                  : `${featuredProject.year} · ${featuredProject.role.toUpperCase()}`}
              </span>
            </div>

            <div className="m-hairline" />

            <h2 className="m-process-title">
              {isGraphicTab ? (
                <>
                  Graphic
                  <br />
                  Design
                </>
              ) : (
                featuredProject.title
              )}
            </h2>

            <p className="m-process-desc">
              {isGraphicTab
                ? "Campaign posters, streetwear jerseys, editorial lookbooks, and halftone print art crafted under KiruLabs & personal explorations."
                : featuredProject.tagline}
            </p>

            <div className="m-process-links">
              <TransitionLink
                to={isGraphicTab ? "/works" : `/works/${featuredProject.slug}`}
                label={isGraphicTab ? "WORK" : featuredProject.title.toUpperCase()}
                className="m-cta"
              >
                {isGraphicTab ? "OPEN GALLERY →" : "CASE STUDY →"}
              </TransitionLink>
              {!isGraphicTab && featuredProject.liveUrl && (
                <a
                  href={featuredProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="m-cta m-cta-accent"
                >
                  LIVE SITE ↗
                </a>
              )}
            </div>

            {/* Right-offset secondary code artifact (douglus.site mobile signature) */}
            <div className="m-secondary-artifact">
              <div className="work-code-card m-code-card">
                <div className="work-code-header">
                  <span className="code-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>
                    {isGraphicTab ? "kirulabs.art" : `${featuredProject.slug}.spec`}
                  </span>
                </div>
                <pre className="work-code-pre">
                  <code>
                    {isGraphicTab
                      ? `const archive = [\n  "KiruLabs — May Day",\n  "ACCA 35° — Poster",\n  "KOKONSAH — Jersey",\n  "Y2K Baddie — Lookbook",\n  "Third Eye — Halftone"\n];`
                      : featuredProject.codePreview}
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* 04/ IDENTITY + HANGING STATUE POINTING AT "E" + ARCHITECTURAL HORIZON SEAM */}
      <section className="m-sec m-identity">
        <div className="m-identity-head">
          <span className="m-idx">04/</span>
          <div className="m-identity-role">
            <strong>Creative Developer</strong>
            <span>+ Visual Artist</span>
          </div>
          <p className="m-identity-sub">
            Crafting expressive,
            <br />
            human-centered
            <br />
            digital products.
          </p>
        </div>

        <div ref={wordmarkStageRef} className="m-wordmark-stage">
          <motion.div
            className="m-statue-wrap"
            initial={{ x: "18%", y: "92%", rotate: 6, scale: 0.86, opacity: 0 }}
            animate={
              ePointed
                ? { x: "0%", y: "44%", rotate: -25, scale: 1, opacity: 1 }
                : { x: "18%", y: "92%", rotate: 6, scale: 0.86, opacity: 0 }
            }
            transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.7 }}
            aria-hidden="true"
          >
            <img src={statueImg} alt="" className="wordmark-statue-img" draggable={false} />
          </motion.div>

          <div className="m-wordmark" aria-label="SELASI">
            {"SELASI".split("").map((letter, idx) => (
              <span
                key={idx}
                className={`m-wordmark-letter ${idx === 1 && ePointed ? "is-pointed" : ""}`}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 05/ DARK OUTRO — Exact douglus.site Kinetic 3-Row "Let's / HAVE / a chat" */}
      <section className="m-outro">
        <div className="m-outro-idx">05/</div>

        <div className="m-outro-display">
          <span className="m-outro-row m-outro-muted m-outro-left">Let&apos;s</span>
          <span className="m-outro-row m-outro-huge m-outro-right">HAVE</span>
          <span className="m-outro-row m-outro-muted m-outro-left">a chat</span>
        </div>

        <div className="m-outro-bottom">
          <div className="m-outro-links">
            <button
              type="button"
              className="m-outro-link"
              onClick={() => copyText(PROFILE.email, "Email copied")}
            >
              {PROFILE.email}
            </button>
            <button
              type="button"
              className="m-outro-link"
              onClick={() => copyText(PROFILE.phone, "Phone copied")}
            >
              {PROFILE.phone}
            </button>
            <TransitionLink to="/resume" label="RESUME" className="m-outro-link">
              Resume / CV ↗
            </TransitionLink>
          </div>

          <button type="button" className="m-outro-back" onClick={scrollToTop}>
            ↑ BACK TO TOP
          </button>
        </div>

        <div className="m-outro-legal">
          <span>© {year} Portfolio</span>
          <span>Design &amp; code by {PROFILE.firstName}</span>
        </div>
      </section>
    </main>
  );
}
