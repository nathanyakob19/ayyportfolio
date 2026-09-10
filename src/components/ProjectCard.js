import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  const videoRef = useRef(null);
  const playPreview = () => videoRef.current?.play().catch(() => {});
  const stopPreview = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link className={`project-card ${project.accent} cursor-target`} to={`/projects/${project.slug}`} onMouseEnter={playPreview} onMouseLeave={stopPreview} onFocus={playPreview} onBlur={stopPreview}>
      <div className="project-preview">
        {project.video ? <video ref={videoRef} muted loop playsInline preload="metadata" poster={project.coverImage} aria-hidden="true"><source src={project.video} type={project.videoType || 'video/mp4'} /></video> : <img src={project.coverImage} alt="" aria-hidden="true" />}
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
