import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  const videoRef = useRef(null);
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const [previewImageIndex, setPreviewImageIndex] = useState(0);
  const coverImages = project.coverImages?.length ? project.coverImages : [project.coverImage];

  useEffect(() => {
    if (!isPreviewActive || coverImages.length < 2 || project.video) return undefined;
    const timer = window.setInterval(() => {
      setPreviewImageIndex((index) => (index + 1) % coverImages.length);
    }, 1200);
    return () => window.clearInterval(timer);
  }, [isPreviewActive, coverImages.length, project.video]);
  const playPreview = () => {
    setIsPreviewActive(true);
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => {});
    });
  };
  const stopPreview = () => {
    setIsPreviewActive(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link className={`project-card ${project.accent} cursor-target`} to={`/projects/${project.slug}`} onMouseEnter={playPreview} onMouseLeave={stopPreview} onFocus={playPreview} onBlur={stopPreview}>
      <div className="project-preview">
        {project.video && isPreviewActive ? (
          <video ref={videoRef} autoPlay muted loop playsInline preload="metadata" poster={project.coverImage} aria-hidden="true" onCanPlay={(event) => event.currentTarget.play().catch(() => {})}>
            <source src={project.video} type={project.videoType || 'video/mp4'} />
          </video>
        ) : (
          project.coverImage && <img src={isPreviewActive ? coverImages[previewImageIndex] : project.coverImage} alt="" aria-hidden="true" />
        )}
        <div className="project-preview-fallback" aria-hidden="true" />
      </div>
      <div className="project-card-info">
        <div className="project-meta">
          {project.status && <span className="project-status">● {project.status}</span>}
          <span>⌁ {project.engine}</span>
        </div>
        <h2>{project.title} <span aria-hidden="true">↗</span></h2>
        <p>{project.description}</p>{project.progressNote && <span className="project-progress-note">{project.progressNote}</span>}
      </div>
    </Link>
  );
}
