import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import MagneticButton from "../components/Common/MagneticButton";
import DarkOutro from "../components/Common/DarkOutro";
import resumePdf from "../Assets/Selasi_Dzeamesi_Resume.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function ResumePage() {
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(820);

  useEffect(() => {
    const updateWidth = () => {
      const vw = window.innerWidth;
      if (vw < 640) setPageWidth(vw - 40);
      else if (vw < 1024) setPageWidth(vw - 96);
      else setPageWidth(840);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <main className="ed-page">
      <div className="ed-container ed-page-top">
        <div className="ed-section-head">
          <div className="section-index">01/</div>
          <div className="ed-title-with-count">
            <h1 className="ed-page-title">RESUME</h1>
            {numPages && <sup className="ed-count">0{numPages}</sup>}
          </div>
        </div>

        <div className="ed-overview-grid">
          <div className="ed-eyebrow">CURRICULUM VITAE</div>
          <div className="ed-overview-right resume-intro-bar">
            <p className="ed-lead-copy">
              Full summary of my technical skills, projects, education, and certifications.
            </p>
            <MagneticButton
              href={resumePdf}
              target="_blank"
              className="ed-asymmetric-cta"
            >
              Download PDF ↗
            </MagneticButton>
          </div>
        </div>

        <div className="resume-viewer-wrap">
          <Document
            file={resumePdf}
            onLoadSuccess={({ numPages: count }) => setNumPages(count)}
            loading={<div className="resume-loading">Loading Curriculum Vitae…</div>}
            error={
              <div className="resume-loading">
                Unable to render inline preview.{" "}
                <a href={resumePdf} target="_blank" rel="noopener noreferrer" className="accent">
                  Open PDF directly ↗
                </a>
              </div>
            }
            className="resume-doc"
          >
            {Array.from(new Array(numPages || 1), (_, idx) => (
              <div key={`page_${idx + 1}`} className="resume-page-card">
                <div className="resume-page-label">
                  PAGE 0{idx + 1} / 0{numPages || 1}
                </div>
                <Page
                  pageNumber={idx + 1}
                  width={pageWidth}
                  renderTextLayer={false}
                />
              </div>
            ))}
          </Document>
        </div>
      </div>

      <DarkOutro />
    </main>
  );
}
