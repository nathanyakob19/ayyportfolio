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
        <video ref={videoRef} muted loop playsInline preload="metadata" aria-hidden="true"><source src={project.video} type={project.videoType || 'video/mp4'} /></video>
        <div className="project-preview-fallback" aria-hidden="true" />
        <span className="preview-play" aria-hidden="true">▶</span>
        <span className="preview-hint">Hover to preview</span>
      </div>
      <div className="project-card-info">
        <div className="project-meta"><span>✦ {project.duration}</span><span>⌁ {project.engine}</span></div>
        <h2>{project.title} <span aria-hidden="true">↗</span></h2>
        <h3>{project.discipline}</h3>
        <p>{project.description}</p>
      </div>
    </Link>
  );
}
