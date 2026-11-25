import React from "react";
import { motion } from "framer-motion";
import MagneticButton from "../components/Common/MagneticButton";
import DarkOutro from "../components/Common/DarkOutro";
import { BullseyeEmblem, SmileyEmblem } from "../components/Common/Emblems";
import { PROFILE, CAPABILITIES, EDUCATION, INTERESTS } from "../data/portfolioData";
import portraitImg from "../Assets/profhead.png";

export default function AboutPage() {
  return (
    <main className="ed-page">
      <div className="ed-container ed-page-top">
        {/* 01/ INTRO */}
        <section className="about-hero-section">
          <div className="section-index">01/</div>
          <h1 className="about-giant-name">
            <span className="fm-line-mask">
              <motion.span
                className="fm-line-inner"
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
              >
                SELASI
              </motion.span>
            </span>
            <span className="fm-line-mask">
              <motion.span
                className="fm-line-inner"
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.72, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                DZEAMESI
              </motion.span>
            </span>
          </h1>

          <div className="about-bio-grid">
            <motion.div
              className="about-bio-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="ed-eyebrow">HI THERE</div>
              <p className="about-bio-lead">
                I&apos;m <strong>Selasi Dzeamesi</strong> — <strong>Founder &amp; CEO of KiruLabs</strong>,
                Creative Developer, and visual artist based in{" "}
                <span className="accent">Accra, Ghana</span>.
              </p>
              <p className="about-bio-body">
                I bridge software engineering, visual art, and leadership. On the technical side, I
                build full-stack digital products with JavaScript, TypeScript, React, React Native,
                Python, Django, Flask, and REST APIs — from Ghana&apos;s Siesie service-booking
                marketplace to community platforms and on-chain Rust canisters.
              </p>
              <p className="about-bio-body">
                On the creative side, I design bold campaign posters, streetwear apparel graphics,
                and editorial lookbooks. Leading technology initiatives at KiruLabs lets me bring
                both worlds together to turn ambitious ideas into practical, user-focused products.
              </p>

              <div className="about-cta-row">
                <MagneticButton to="/resume" label="RESUME" className="ed-asymmetric-cta">
                  View Resume / CV
                </MagneticButton>
              </div>
            </motion.div>

            <motion.div
              className="about-bio-right"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="about-portrait-frame">
                <img src={portraitImg} alt={PROFILE.fullName} className="about-portrait-img" />
                <div className="about-portrait-emblems">
                  <BullseyeEmblem className="emblem-sm" />
                  <SmileyEmblem className="emblem-sm" />
                </div>
              </div>
              <div className="about-photo-caption">
                <span>Accra, Ghana</span>
                <span>&ldquo;Code. Commit. Everyday.&rdquo;</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 02/ CAPABILITIES */}
        <section className="about-section-block">
          <div className="ed-section-head">
            <div className="section-index">02/</div>
            <h2 className="ed-page-title ed-page-title-sm">CAPABILITIES</h2>
          </div>

          <div className="capabilities-grid">
            {CAPABILITIES.map((group, idx) => (
              <motion.div
                key={group.title}
                className="capability-col"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="capability-heading">{group.title}</h3>
                <ul className="capability-list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 03/ EDUCATION & CERTIFICATIONS */}
        <section className="about-section-block">
          <div className="ed-section-head">
            <div className="section-index">03/</div>
            <h2 className="ed-page-title ed-page-title-sm">EDUCATION &amp; CERTS</h2>
          </div>

          <div className="edu-table">
            {EDUCATION.map((item, idx) => (
              <motion.div
                key={item.title}
                className="edu-row"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="edu-period">{item.period}</div>
                <div className="edu-main">
                  <h3>{item.title}</h3>
                  <span className="edu-org">{item.org}</span>
                </div>
                <p className="edu-detail">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 04/ INTERESTS (CLEAN BORDERLESS SWISS COLUMNS) */}
        <section className="about-section-block">
          <div className="ed-section-head">
            <div className="section-index">04/</div>
            <h2 className="ed-page-title ed-page-title-sm">INTERESTS</h2>
          </div>

          <div className="interests-grid">
            {INTERESTS.map((interest, idx) => (
              <motion.div
                key={interest.index}
                className="interest-col"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="interest-idx">{interest.index}/</span>
                <h3>{interest.title}</h3>
                <p>{interest.body}</p>
                {interest.link && (
                  <a
                    href={interest.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interest-link"
                  >
                    {interest.link.label}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <DarkOutro />
    </main>
  );
}
