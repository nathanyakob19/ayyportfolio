import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

export default function ProjectDetailLayout({ project }) {
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const coverImages = project.coverImages?.length ? project.coverImages : [project.coverImage];

  useEffect(() => {
    if (coverImages.length < 2 || project.video) return undefined;
    const timer = window.setInterval(() => {
      setHeroImageIndex((index) => (index + 1) % coverImages.length);
    }, 1800);
    return () => window.clearInterval(timer);
  }, [coverImages.length, project.video]);

  useEffect(() => {
    setActiveImageIndex(null);
  }, [project.slug]);

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

  const mediaPath = project.mediaPath || `/${project.slug}`;
  const storySections = [
    { key: 'overview', label: 'About project', heading: project.slug === 'battle-blaster' ? 'A world with a story in every detail.' : undefined, copy: project.overview },
    { key: 'challenge', label: 'Challenges', copy: project.challenge },
    { key: 'takeaway', label: 'Takeaways', copy: project.takeaway },
    { key: 'outcome', label: 'Outcome', copy: project.outcome },
  ].filter((section) => section.copy);

  return (
    <article className={`project-detail page-enter ${project.slug}-detail`}>
      <Link className="project-back cursor-target" to="/projects">← All projects</Link>

      {/* ── Hero banner ── */}
      <div className={`project-detail-hero project-detail-hero-media ${project.accent}`}>
        {/* Background media — video preferred, image fallback */}
        {project.video ? (
          <video
            className="hero-media-bg"
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            poster={project.coverImage || undefined}
          />
        ) : project.coverImage ? (
          <img
            className="hero-media-bg"
            src={coverImages[heroImageIndex]}
            alt={project.title}
          />
        ) : null}

        {/* Colour accent glow */}
        <div className="project-detail-hero-accent" />

        {/* Dark gradient overlay for readability */}
        <div className="hero-media-shade" />

        {/* Title */}
        <div className="project-detail-title">
          <p className="eyebrow">{project.discipline}</p>
          <h1 className={project.slug === 'japanese-street' ? 'electroharmonix-title' : undefined}>
            {project.title}
          </h1>
        </div>
      </div>


      {/* ── Project metadata bar ── */}
      <aside className="project-facts" aria-label="Project details">
        {project.status && <div><span>Project status</span><strong>{project.status}</strong></div>}
        <span> | Tools</span><strong>{project.tools.join(' · ')}</strong>
      </aside>

      {/* ── Story sections ── */}
      <div className="project-detail-content">
        <div className="project-story">
          {storySections.map((section, sectionIndex) => {
            const sectionImages = project.sectionImages?.[section.key];
            const imageFiles = Array.isArray(sectionImages) ? sectionImages : sectionImages ? [sectionImages] : [];
            const sectionVideos = project.sectionVideos?.[section.key];
            const videoFiles = Array.isArray(sectionVideos) ? sectionVideos : sectionVideos ? [sectionVideos] : [];
            const mediaCount = imageFiles.length + videoFiles.length;

            return (
              <section
                className={`project-story-section section-${section.key}${imageFiles.length === 1 ? ' has-single-image' : ''}${sectionIndex > 0 ? ' story-section-divided' : ''}`}
                key={section.key}
              >
                {/* Text column */}
                <div className="story-text-col">
                  <p className="eyebrow">{section.label}</p>
                  {section.heading && <h2>{section.heading}</h2>}
                  <p className="project-body-copy">{section.copy}</p>
                  {section.key === 'overview' && project.overviewContinuation && project.slug !== 'battle-blaster' && (
                    <p className="project-body-copy">{project.overviewContinuation}</p>
                  )}
                </div>

                {/* Image column */}
                {mediaCount > 0 && (
                  <div className={`project-story-images${mediaCount > 1 ? ' multiple' : ''}`}>
                    {imageFiles.map((imageFile) => (
                      <button
                        className="project-story-image cursor-target"
                        key={imageFile}
                        type="button"
                        onClick={() => setActiveImageIndex(project.images.indexOf(imageFile))}
                        aria-label={`Open ${section.label.toLowerCase()} image`}
                      >
                        <img
                          src={`${mediaPath}/${imageFile}`}
                          alt={`${project.title} — ${section.label.toLowerCase()}`}
                          loading="lazy"
                        />
                      </button>
                    ))}
                    {videoFiles.map((video) => {
                      const videoSrc = typeof video === 'string' ? `${mediaPath}/${video}` : video.src;
                      const videoType = typeof video === 'string' ? 'video/mp4' : video.type;
                      return (
                        <video className="project-story-video" controls key={videoSrc} preload="metadata">
                          <source src={videoSrc} type={videoType} />
                          Your browser does not support embedded video.
                        </video>
                      );
                    })}
                  </div>
                )}
                {section.key === 'overview' && project.overviewContinuation && project.slug === 'battle-blaster' && (
                  <p className="project-body-copy">{project.overviewContinuation}</p>
                )}
              </section>
            );
          })}
        </div>
      </div>

      {/* ── Gallery ── */}
      {(project.images?.length > 0 || project.videos?.length > 0) && (
        <section className="project-gallery" aria-labelledby="gallery-title">
          <div className="project-gallery-heading">
            <p className="eyebrow">Gallery</p>
            <h2 id="gallery-title">{project.title}</h2>
          </div>
          <div className="project-gallery-grid">
            {project.images?.map((image, index) => (
              <figure key={image} className="project-gallery-item">
                <button
                  className="project-gallery-open cursor-target"
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`Open image ${index + 1} of ${project.images.length}`}
                >
                  <img
                    src={`${mediaPath}/${image}`}
                    alt={`${project.title} screenshot ${index + 1}`}
                    loading="lazy"
                  />
                </button>
              </figure>
            ))}
            {project.videos?.map((video) => {
              const videoSrc = typeof video === 'string' ? `${mediaPath}/${video}` : video.src;
              const videoType = typeof video === 'string' ? 'video/mp4' : video.type;
              return (
                <figure key={videoSrc} className="project-gallery-item project-gallery-video">
                  <video controls preload="metadata">
                    <source src={videoSrc} type={videoType} />
                    Your browser does not support embedded video.
                  </video>
                </figure>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Lightbox ── */}
      {activeImageIndex !== null && createPortal(
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`${project.title} image viewer`}>
          <button className="gallery-lightbox-close cursor-target" type="button" onClick={() => setActiveImageIndex(null)} aria-label="Close image viewer">✕</button>
          <button className="gallery-lightbox-nav gallery-lightbox-prev cursor-target" type="button" onClick={() => setActiveImageIndex((index) => (index - 1 + project.images.length) % project.images.length)} aria-label="Previous image">‹</button>
          <img src={`${mediaPath}/${project.images[activeImageIndex]}`} alt={`${project.title} screenshot ${activeImageIndex + 1}`} />
          <button className="gallery-lightbox-nav gallery-lightbox-next cursor-target" type="button" onClick={() => setActiveImageIndex((index) => (index + 1) % project.images.length)} aria-label="Next image">›</button>
          <p className="gallery-lightbox-count">{activeImageIndex + 1} / {project.images.length}</p>
        </div>,
        document.body
      )}
    </article>
  );
}
