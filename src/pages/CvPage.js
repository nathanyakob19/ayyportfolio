import { useState } from 'react';

export default function CvPage() {
  const resumeUrl = '/Abhinav%20Pillai%20-%20Resume.pdf';
  const totalPages = 2;
  const [page, setPage] = useState(1);
  const previewUrl = `${resumeUrl}#page=${page}&toolbar=0&navpanes=0&scrollbar=0&view=FitH`;

  return (
    <section className="page-section cv-page page-enter" aria-labelledby="cv-title">
      <p className="eyebrow">Curriculum vitae</p>
      <h1 id="cv-title">Abhinav Pillai</h1>
      <p className="page-lead">Game developer, artist, and designer creating immersive interactive experiences.</p>
      <div className="cv-actions">
        <a className="hero-action cursor-target" href={resumeUrl} target="_blank" rel="noreferrer">View CV</a>
        <a className="cv-download cursor-target" href={resumeUrl} download="Abhinav Pillai - Resume.pdf">Download CV</a>
      </div>
      <div className="cv-preview">
        <iframe key={page} title={`Abhinav Pillai CV, page ${page}`} src={previewUrl} scrolling="no" />
        <div className="cv-page-navigation" aria-label="CV pages">
          <button className="cursor-target" type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} aria-label="Previous CV page">‹</button>
          <span>Page {page} of {totalPages}</span>
          <button className="cursor-target" type="button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages} aria-label="Next CV page">›</button>
        </div>
      </div>
    </section>
  );
}
