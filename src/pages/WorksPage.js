import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { TransitionLink, usePageTransition } from "../components/TransitionContext";
import DarkOutro from "../components/Common/DarkOutro";
import ProjectVisual from "../components/Common/ProjectVisual";
import { PROJECTS, GRAPHIC_WORKS } from "../data/portfolioData";

const FILTERS = ["All", "Web", "Web3", "Graphic Design"];

export default function WorksPage() {
  const { setCursorVariant } = usePageTransition();
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredSlug, setHoveredSlug] = useState(null);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const previewX = useMotionValue(0);
  const previewY = useMotionValue(0);
  const springPreviewX = useSpring(previewX, { stiffness: 320, damping: 28 });
  const springPreviewY = useSpring(previewY, { stiffness: 320, damping: 28 });

  const showSoftware = activeFilter !== "Graphic Design";
  const showDesign = activeFilter === "All" || activeFilter === "Graphic Design";

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.filter === activeFilter);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowRight") {
        setLightboxIdx((i) => (i + 1) % GRAPHIC_WORKS.length);
      }
      if (e.key === "ArrowLeft") {
        setLightboxIdx((i) => (i - 1 + GRAPHIC_WORKS.length) % GRAPHIC_WORKS.length);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIdx]);

  const handleMouseMove = (e) => {
    previewX.set(e.clientX + 28);
    previewY.set(e.clientY - 110);
  };

  const activeArtwork = lightboxIdx !== null ? GRAPHIC_WORKS[lightboxIdx] : null;

  return (
    <main className="ed-page" onMouseMove={handleMouseMove}>
      <div className="ed-container ed-page-top">
        {/* Header */}
        <motion.div
          className="ed-section-head"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-index">01/</div>
          <div className="ed-title-with-count">
            <h1 className="ed-page-title">PROJECTS</h1>
            <sup className="ed-count">0{PROJECTS.length + GRAPHIC_WORKS.length}</sup>
          </div>
        </motion.div>

        <div className="ed-overview-grid">
          <div className="ed-eyebrow">OVERVIEW</div>
          <div className="ed-overview-right">
            <p className="ed-lead-copy">
              Selected software products, Web3 experiments, and graphic design works — built with
              clarity, restraint, and visual craft.
            </p>
            <div className="ed-filter-row" role="tablist" aria-label="Filter works">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === f}
                  className={`ed-filter-minimal ${activeFilter === f ? "is-active" : ""}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 01/ SOFTWARE PROJECTS */}
        {showSoftware && (
          <div className="works-index-list">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <TransitionLink
                  to={`/works/${project.slug}`}
                  label={project.title.toUpperCase()}
                  className="works-row"
                  onMouseEnter={() => {
                    setHoveredSlug(project.slug);
                    setCursorVariant({ mode: "media", text: "VIEW" });
                  }}
                  onMouseLeave={() => {
                    setHoveredSlug(null);
                    setCursorVariant({ mode: "default", text: "" });
                  }}
                >
                  <div className="works-row-index">
                    {project.index} / 0{PROJECTS.length}
                  </div>
                  <div className="works-row-main">
                    <h2 className="works-row-title">{project.title}</h2>
                    <p className="works-row-tagline">{project.tagline}</p>
                  </div>
                  <div className="works-row-meta">
                    <span className="works-row-plain">{project.category}</span>
                    <span className="works-row-year">{project.year}</span>
                    <span className="works-row-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                </TransitionLink>
              </motion.div>
            ))}
          </div>
        )}

        {/* 02/ GRAPHIC DESIGN & ART DIRECTION (RAW BORDERLESS PLATES) */}
        {showDesign && (
          <section id="design" className="design-showcase-section">
            <div className="ed-section-head ed-section-head-spaced">
              <div className="section-index">02/</div>
              <div className="ed-title-with-count">
                <h2 className="ed-page-title ed-page-title-sm">GRAPHIC DESIGN</h2>
                <sup className="ed-count">0{GRAPHIC_WORKS.length}</sup>
              </div>
            </div>

            <div className="ed-overview-grid">
              <div className="ed-eyebrow">VISUAL STUDIO</div>
              <p className="ed-lead-copy">
                Posters, streetwear apparel, fashion lookbooks, and halftone illustrations crafted
                under KiruLabs &amp; personal explorations.
              </p>
            </div>

            <div className="design-gallery-grid">
              {GRAPHIC_WORKS.map((art, idx) => (
                <motion.button
                  key={art.id}
                  type="button"
                  className={`design-art-plate ${idx === 0 || idx === 1 ? "is-featured" : ""}`}
                  onClick={() => setLightboxIdx(idx)}
                  onMouseEnter={() => setCursorVariant({ mode: "media", text: "OPEN" })}
                  onMouseLeave={() => setCursorVariant({ mode: "default", text: "" })}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: (idx % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="design-art-media">
                    <img src={art.image} alt={art.title} loading="lazy" />
                  </div>
                  <div className="design-art-meta">
                    <div className="design-art-head">
                      <span className="design-art-idx">
                        {art.index} / 0{GRAPHIC_WORKS.length}
                      </span>
                      <span className="design-art-year">{art.year}</span>
                    </div>
                    <h3 className="design-art-title">{art.title}</h3>
                    <span className="design-art-cat">{art.category}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Framer Motion Spring Floating Preview */}
      <AnimatePresence>
        {hoveredSlug && (
          <motion.div
            className="works-floating-preview"
            style={{ x: springPreviewX, y: springPreviewY }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          >
            <ProjectVisual slug={hoveredSlug} compact />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Framer Motion Fullscreen Lightbox */}
      <AnimatePresence>
        {activeArtwork && (
          <motion.div
            className="art-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={activeArtwork.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={() => setLightboxIdx(null)}
          >
            <motion.div
              className="art-lightbox-panel"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="art-lightbox-topbar">
                <span className="art-lightbox-idx">
                  {activeArtwork.index} / 0{GRAPHIC_WORKS.length} — {activeArtwork.category.toUpperCase()}
                </span>
                <button
                  type="button"
                  className="art-lightbox-close"
                  onClick={() => setLightboxIdx(null)}
                >
                  CLOSE [ESC]
                </button>
              </div>

              <div className="art-lightbox-body">
                <div className="art-lightbox-img-wrap">
                  <motion.img
                    key={activeArtwork.id}
                    src={activeArtwork.image}
                    alt={activeArtwork.title}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="art-lightbox-info">
                  <span className="art-lightbox-client">
                    {activeArtwork.client} · {activeArtwork.year}
                  </span>
                  <h3>{activeArtwork.title}</h3>
                  <p>{activeArtwork.description}</p>
                  <div className="art-lightbox-nav">
                    <button
                      type="button"
                      className="ed-dark-pill ed-pill-compact"
                      onClick={() =>
                        setLightboxIdx((i) => (i - 1 + GRAPHIC_WORKS.length) % GRAPHIC_WORKS.length)
                      }
                    >
                      ← Prev
                    </button>
                    <button
                      type="button"
                      className="ed-dark-pill ed-pill-compact"
                      onClick={() =>
                        setLightboxIdx((i) => (i + 1) % GRAPHIC_WORKS.length)
                      }
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <DarkOutro />
    </main>
  );
}
