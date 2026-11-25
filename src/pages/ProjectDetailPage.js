import React from "react";
import { useParams } from "react-router-dom";
import { TransitionLink } from "../components/TransitionContext";
import MagneticButton from "../components/Common/MagneticButton";
import DarkOutro from "../components/Common/DarkOutro";
import ProjectVisual from "../components/Common/ProjectVisual";
import { PROJECTS } from "../data/portfolioData";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const currentIdx = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[currentIdx >= 0 ? currentIdx : 0];
  const nextProject = PROJECTS[(currentIdx + 1) % PROJECTS.length];

  return (
    <main className="ed-page">
      <div className="ed-container ed-page-top">
        {/* Centered Case Study Hero */}
        <div className="case-hero">
          <div className="case-eyebrow">
            {project.index} / {project.category.toUpperCase()}
          </div>
          <h1 className="case-title">{project.title}</h1>
          <div className="case-scroll-hint">( SCROLL )</div>
        </div>

        {/* Showcase Visual + Code Pair */}
        <div className="case-showcase-grid">
          <div className="case-visual-main">
            <ProjectVisual slug={project.slug} />
          </div>
          <div className="case-code-panel">
            <div className="work-code-header">
              <span className="code-dots">
                <i />
                <i />
                <i />
              </span>
              <span>architecture.snippet</span>
            </div>
            <pre className="work-code-pre">
              <code>{project.codePreview}</code>
            </pre>
            <div className="case-metrics-row">
              {project.metrics.map((m) => (
                <div key={m.label} className="case-metric">
                  <span className="case-metric-label">{m.label}</span>
                  <strong className="case-metric-value">{m.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Structured 4-Column Meta Grid */}
        <div className="case-meta-grid">
          <div className="case-meta-cell">
            <span className="ed-eyebrow">CLIENT / CONTEXT</span>
            <strong>{project.client.toUpperCase()}</strong>
          </div>
          <div className="case-meta-cell">
            <span className="ed-eyebrow">ROLE</span>
            <strong>{project.role.toUpperCase()}</strong>
          </div>
          <div className="case-meta-cell">
            <span className="ed-eyebrow">YEAR</span>
            <strong>{project.year}</strong>
          </div>
          <div className="case-meta-cell">
            <span className="ed-eyebrow">STACK</span>
            <strong>{project.stack.join(" · ")}</strong>
          </div>
        </div>

        {/* Overview & Repo Link */}
        <div className="ed-overview-grid case-overview">
          <div className="ed-eyebrow">OVERVIEW</div>
          <div className="ed-overview-right">
            <p className="ed-lead-copy">{project.overview}</p>
            <div className="case-cta-row">
              {project.liveUrl && (
                <MagneticButton
                  href={project.liveUrl}
                  target="_blank"
                  className="ed-asymmetric-cta"
                >
                  Visit Live Site ↗
                </MagneticButton>
              )}
              {project.github && (
                <MagneticButton
                  href={project.github}
                  target="_blank"
                  className={`ed-asymmetric-cta ${project.liveUrl ? "ed-cta-subtle" : ""}`}
                >
                  Inspect Source on GitHub ↗
                </MagneticButton>
              )}
            </div>
          </div>
        </div>

        {/* Engineering Highlights */}
        <div className="case-highlights">
          <div className="ed-eyebrow">KEY ENGINEERING HIGHLIGHTS</div>
          <div className="case-highlights-grid">
            {project.highlights.map((item) => (
              <div key={item.num} className="case-highlight-card">
                <span className="case-highlight-num">{item.num}/</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Project Band */}
        <div className="case-next-band">
          <div>
            <span className="ed-eyebrow">NEXT PROJECT</span>
            <TransitionLink
              to={`/works/${nextProject.slug}`}
              label={nextProject.title.toUpperCase()}
              className="case-next-link"
            >
              {nextProject.title.toUpperCase()} →
            </TransitionLink>
          </div>
          <MagneticButton to="/works" label="WORKS" className="ed-asymmetric-cta">
            View All Projects (0{PROJECTS.length})
          </MagneticButton>
        </div>
      </div>

      <DarkOutro />
    </main>
  );
}
