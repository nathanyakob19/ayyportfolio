import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  useEffect(() => {
    setActiveImageIndex(null);
  }, [slug]);

  useEffect(() => {
    if (activeImageIndex === null || !project?.images?.length) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActiveImageIndex(null);
      if (event.key === 'ArrowLeft') setActiveImageIndex((index) => (index - 1 + project.images.length) % project.images.length);
      if (event.key === 'ArrowRight') setActiveImageIndex((index) => (index + 1) % project.images.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, project]);

  useEffect(() => {
    if (activeImageIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [activeImageIndex]);

  if (!project) {
    return <section className="page-section page-enter"><p className="eyebrow">Not found</p><h1>Project unavailable.</h1><Link className="hero-action cursor-target" to="/projects">Back to projects</Link></section>;
  }

  const mediaPath = project.mediaPath || `/${project.slug}`;
  const storySections = [
    { key: 'overview', label: 'About project', heading: project.slug === 'battle-blaster' ? 'A world with a story in every detail.' : undefined, copy: project.overview },
    { key: 'challenge', label: 'Challenges', copy: project.challenge },
    { key: 'takeaway', label: 'Takeaways', copy: project.takeaway },
    { key: 'outcome', label: 'Outcome', copy: project.outcome },
  ].filter((section) => section.copy);

  return (
    <article className="project-detail page-enter">
      <Link className="project-back cursor-target" to="/projects">← All projects</Link>
      <div className={`project-detail-hero ${project.accent}`}>
        {project.video ? <video autoPlay muted loop playsInline preload="auto" poster={project.coverImage || ''} onCanPlay={(event) => event.currentTarget.play().catch(() => {})}><source src={project.video} type={project.videoType || 'video/mp4'} /></video> : project.coverImage && <img src={project.coverImage} alt="" />}
        <div className="project-detail-shade" />
        <div className="project-detail-title">
          <h1 className={project.slug === 'japanese-street' ? 'electroharmonix-title' : undefined}>{project.title}</h1>
        </div>
      </div>
       <aside className="project-facts" aria-label="Project details">
          {project.status && <div><span>Project status</span><strong>{project.status}</strong></div>}
          <span> | Tools</span><strong>{project.tools.join(' · ')}</strong>
        </aside>
      <div className="project-detail-content">
        
       
        <div className="project-story">
          {storySections.map((section) => {
            const sectionImages = project.sectionImages?.[section.key];
            const imageFiles = Array.isArray(sectionImages) ? sectionImages : sectionImages ? [sectionImages] : [];
            return <section className={`project-story-section${imageFiles.length === 1 ? ' has-single-image' : ''}`} key={section.key}><div><p className="eyebrow">{section.label}</p>{section.heading && <h2>{section.heading}</h2>}<p className="project-body-copy">{section.copy}</p></div>{imageFiles.length > 0 && <div className={`project-story-images${imageFiles.length > 1 ? ' multiple' : ''}`}>{imageFiles.map((imageFile) => <button className="project-story-image cursor-target" key={imageFile} type="button" onClick={() => setActiveImageIndex(project.images.indexOf(imageFile))} aria-label={`Open ${section.label.toLowerCase()} image`}><img src={`${mediaPath}/${imageFile}`} alt={`${project.title} — ${section.label.toLowerCase()}`} loading="lazy" /></button>)}</div>}{section.key === 'overview' && project.overviewContinuation && <p className="project-body-copy">{project.overviewContinuation}</p>}</section>;
          })}
        </div>
      </div>
      {project.images?.length > 0 && (
        <section className="project-gallery" aria-labelledby="gallery-title">
          <div className="project-gallery-heading"><p className="eyebrow">Gallery</p><h2 id="gallery-title">{project.title}</h2></div>
          <div className="project-gallery-grid">
            {project.images.map((image, index) => (
              <figure key={image} className="project-gallery-item">
                <button className="project-gallery-open cursor-target" type="button" onClick={() => setActiveImageIndex(index)} aria-label={`Open image ${index + 1} of ${project.images.length}`}><img src={`${mediaPath}/${image}`} alt={`${project.title} environment screenshot ${index + 1}`} loading="lazy" /></button>
              </figure>
            ))}
          </div>
        </section>
      )}
      {activeImageIndex !== null && createPortal((
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`${project.title} image viewer`}>
          <button className="gallery-lightbox-close cursor-target" type="button" onClick={() => setActiveImageIndex(null)} aria-label="Close image viewer">X</button>
          <button className="gallery-lightbox-nav gallery-lightbox-prev cursor-target" type="button" onClick={() => setActiveImageIndex((index) => (index - 1 + project.images.length) % project.images.length)} aria-label="Previous image">‹</button>
          <img src={`${mediaPath}/${project.images[activeImageIndex]}`} alt={`${project.title} environment screenshot ${activeImageIndex + 1}`} />
          <button className="gallery-lightbox-nav gallery-lightbox-next cursor-target" type="button" onClick={() => setActiveImageIndex((index) => (index + 1) % project.images.length)} aria-label="Next image">›</button>
          <p className="gallery-lightbox-count">{activeImageIndex + 1} / {project.images.length}</p>
        </div>
      ), document.body)}
    </article>
  );
}
