import React from "react";
import { GRAPHIC_WORKS } from "../../data/portfolioData";

export default function ProjectVisual({ slug, compact = false }) {
  if (slug === "siesie-marketplace") {
    return (
      <div className={`pv-frame pv-siesie ${compact ? "is-compact" : ""}`}>
        <div className="pv-topbar">
          <span className="pv-brand">SIESIE // GHANA MARKETPLACE</span>
          <span className="pv-pill pv-pill-live">● LIVE MVP</span>
        </div>

        <div className="pv-siesie-stage">
          <div className="pv-siesie-search">
            <span>Find trusted pros in Accra…</span>
            <span className="pv-siesie-btn">BOOK NOW</span>
          </div>
          <div className="pv-siesie-grid">
            <div className="pv-siesie-card">
              <span className="pv-snip-tag">VERIFIED PRO</span>
              <strong>Electrical &amp; Solar</strong>
              <span className="pv-mono-dim">4.9 ★ · East Legon</span>
            </div>
            <div className="pv-siesie-card pv-snip-chip-accent">
              <span className="pv-snip-tag">INSTANT BOOK</span>
              <strong>Home &amp; Plumbing</strong>
              <span className="pv-mono-dim">4.8 ★ · Osu / Cantonments</span>
            </div>
          </div>
        </div>

        {!compact && (
          <div className="pv-bottom-strip">
            <span>SIESIE-MARKETPLACE.VERCEL.APP</span>
            <span>REACT · TAILWIND CSS</span>
            <span>GHANA</span>
          </div>
        )}
      </div>
    );
  }

  if (slug === "wcc-website") {
    return (
      <div className={`pv-frame pv-wcc ${compact ? "is-compact" : ""}`}>
        <div className="pv-topbar">
          <span className="pv-brand">WORLD COMMUNITY CHURCH</span>
          <span className="pv-pill pv-pill-live">● LIVE SITE</span>
        </div>

        <div className="pv-tesla-stage">
          <div className="pv-wcc-kicker">COMMUNITY · FAITH · CONNECTION</div>
          <div className="pv-wcc-title">Bringing People Together.</div>
          <div className="pv-tesla-ctas">
            <span className="pv-t-btn pv-t-dark">VISIT WCC</span>
            <span className="pv-t-btn pv-t-light">MOBILE-FIRST UI</span>
          </div>
        </div>

        {!compact && (
          <div className="pv-bottom-strip">
            <span>WORLDCOMMUNITYCHURCH.COM</span>
            <span>HTML · CSS · JS</span>
            <span>SECURED</span>
          </div>
        )}
      </div>
    );
  }

  if (slug === "graphic-showcase") {
    return (
      <div className={`pv-frame pv-graphic-montage ${compact ? "is-compact" : ""}`}>
        <div className="pv-topbar">
          <span className="pv-brand">VISUAL ART // GRAPHIC DESIGN</span>
          <span className="pv-pill">05 SELECTED WORKS</span>
        </div>
        <div className="pv-montage-grid">
          {GRAPHIC_WORKS.slice(0, 3).map((art) => (
            <div key={art.id} className="pv-montage-tile">
              <img src={art.image} alt={art.title} />
            </div>
          ))}
        </div>
        {!compact && (
          <div className="pv-bottom-strip">
            <span>POSTERS · APPAREL · LOOKBOOKS</span>
            <span>KIRULABS STUDIO</span>
            <span>2025 — 2026</span>
          </div>
        )}
      </div>
    );
  }

  // secret-notes
  return (
    <div className={`pv-frame pv-secret ${compact ? "is-compact" : ""}`}>
      <div className="pv-topbar">
        <span className="pv-brand">SECRET NOTES // ICP CANISTER</span>
        <span className="pv-pill">RUST · ON-CHAIN</span>
      </div>
      <div className="pv-vault-body">
        <div className="pv-vault-card">
          <div className="pv-vault-row">
            <span className="pv-mono-dim">CANISTER_ID</span>
            <span className="pv-mono-accent">rrkah-fqaaa-aaaaa-aaaaq-cai</span>
          </div>
          <div className="pv-vault-row">
            <span className="pv-mono-dim">STATUS</span>
            <span className="pv-mono-ok">SEALED · IMMUTABLE</span>
          </div>
          <div className="pv-vault-note">
            &ldquo;Decentralized private notes persisted directly on the Internet Computer.&rdquo;
          </div>
        </div>
      </div>
      {!compact && (
        <div className="pv-bottom-strip">
          <span>WEB3 VAULT</span>
          <span>REACT + RUST</span>
          <span>ICP NINJA</span>
        </div>
      )}
    </div>
  );
}
