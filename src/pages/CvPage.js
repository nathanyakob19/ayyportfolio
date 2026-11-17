export default function CvPage() {
  const resumeUrl = '/Abhinav%20Pillai%20-%20Resume.pdf';

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
        <iframe title="Abhinav Pillai CV preview" src={resumeUrl} />
      </div>
    </section>
  );
}
