import React, { useState, useEffect } from "react";
import { TransitionLink } from "../components/TransitionContext";
import DarkOutro from "../components/Common/DarkOutro";
import ProjectVisual from "../components/Common/ProjectVisual";
import { PROJECTS, GRAPHIC_WORKS } from "../data/portfolioData";

const FILTERS = ["All", "Web", "Web3", "Graphic Design"];

export default function WorksPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredSlug, setHoveredSlug] = useState(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [lightboxIdx, setLightboxIdx] = useState(null);

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
    setCursor({ x: e.clientX, y: e.clientY });
  };

  const activeArtwork = lightboxIdx !== null ? GRAPHIC_WORKS[lightboxIdx] : null;

  return (
    <main className="ed-page" onMouseMove={handleMouseMove}>
      <div className="ed-container ed-page-top">
        {/* Header */}
        <div className="ed-section-head">
          <div className="section-index">01/</div>
          <div className="ed-title-with-count">
            <h1 className="ed-page-title">SELECTED WORKS</h1>
            <sup className="ed-count">0{PROJECTS.length + GRAPHIC_WORKS.length}</sup>
          </div>
        </div>

        <div className="ed-overview-grid">
          <div className="ed-eyebrow">OVERVIEW</div>
          <div className="ed-overview-right">
            <p className="ed-lead-copy">
              Production web applications, decentralized Web3 builds, and bold graphic design &amp;
              art direction — bridging engineering precision with visual culture.
            </p>
            <div className="ed-filter-row" role="tablist" aria-label="Filter works">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === f}
                  className={`ed-filter-pill ${activeFilter === f ? "is-active" : ""}`}
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
          <>
            <div className="works-index-list">
              {filteredProjects.map((project) => (
                <TransitionLink
                  key={project.slug}
                  to={`/works/${project.slug}`}
                  label={project.title.toUpperCase()}
                  className="works-row"
                  onMouseEnter={() => setHoveredSlug(project.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                >
                  <div className="works-row-index">
                    {project.index} / 0{PROJECTS.length}
                  </div>
                  <div className="works-row-main">
                    <h2 className="works-row-title">{project.title}</h2>
                    <p className="works-row-tagline">{project.tagline}</p>
                  </div>
                  <div className="works-row-meta">
                    {project.liveUrl && (
                      <span className="works-live-badge">● LIVE</span>
                    )}
                    <span className="works-row-cat">{project.category}</span>
                    <span className="works-row-year">{project.year}</span>
                    <span className="works-row-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                </TransitionLink>
              ))}
            </div>
          </>
        )}

        {/* 02/ GRAPHIC DESIGN & ART DIRECTION */}
        {showDesign && (
          <section id="design" className="design-showcase-section">
            <div className="ed-section-head ed-section-head-spaced">
              <div className="section-index">02/</div>
              <div className="ed-title-with-count">
                <h2 className="ed-page-title ed-page-title-sm">GRAPHIC DESIGN &amp; ART</h2>
                <sup className="ed-count">0{GRAPHIC_WORKS.length}</sup>
              </div>
            </div>

            <div className="ed-overview-grid">
              <div className="ed-eyebrow">VISUAL STUDIO</div>
              <p className="ed-lead-copy">
                Posters, streetwear apparel direction, editorial lookbooks, and halftone illustrations
                crafted under KiruLabs &amp; personal visual explorations. Click any piece to inspect
                full-screen.
              </p>
            </div>

            <div className="design-gallery-grid">
              {GRAPHIC_WORKS.map((art, idx) => (
                <button
                  key={art.id}
                  type="button"
                  className={`design-art-card ${idx === 0 || idx === 1 ? "is-featured" : ""}`}
                  onClick={() => setLightboxIdx(idx)}
                >
                  <div className="design-art-media">
                    <img src={art.image} alt={art.title} loading="lazy" />
                    <div className="design-art-hover">
                      <span>VIEW FULLSCREEN ↗</span>
                    </div>
                  </div>
                  <div className="design-art-meta">
                    <div className="design-art-head">
                      <span className="design-art-idx">{art.index} / 0{GRAPHIC_WORKS.length}</span>
                      <span className="design-art-year">{art.year}</span>
                    </div>
                    <h3 className="design-art-title">{art.title}</h3>
                    <span className="design-art-cat">{art.category}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Floating Hover Preview (Desktop Software Rows) */}
      {hoveredSlug && (
        <div
          className="works-floating-preview"
          style={{
            transform: `translate3d(${cursor.x + 28}px, ${cursor.y - 110}px, 0)`,
          }}
          aria-hidden="true"
        >
          <ProjectVisual slug={hoveredSlug} compact />
        </div>
      )}

      {/* Fullscreen Lightbox Modal for Graphic Design Works */}
      {activeArtwork && (
        <div
          className="art-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeArtwork.title}
          onClick={() => setLightboxIdx(null)}
        >
          <div className="art-lightbox-panel" onClick={(e) => e.stopPropagation()}>
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
                <img src={activeArtwork.image} alt={activeArtwork.title} />
              </div>
              <div className="art-lightbox-info">
                <span className="art-lightbox-client">{activeArtwork.client} · {activeArtwork.year}</span>
                <h3>{activeArtwork.title}</h3>
                <p>{activeArtwork.description}</p>
                <div className="art-lightbox-nav">
                  <button
                    type="button"
                    className="ed-dark-pill"
                    onClick={() =>
                      setLightboxIdx((i) => (i - 1 + GRAPHIC_WORKS.length) % GRAPHIC_WORKS.length)
                    }
                  >
                    ← Prev
                  </button>
                  <button
                    type="button"
                    className="ed-dark-pill"
                    onClick={() =>
                      setLightboxIdx((i) => (i + 1) % GRAPHIC_WORKS.length)
                    }
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <DarkOutro />
    </main>
  );
}
