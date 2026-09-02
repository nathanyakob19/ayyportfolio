import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <section className="page-section page-enter"><p className="eyebrow">Not found</p><h1>Project unavailable.</h1><Link className="hero-action cursor-target" to="/projects">Back to projects</Link></section>;
  }

  return (
    <article className="project-detail page-enter">
      <Link className="project-back cursor-target" to="/projects">← All projects</Link>
      <div className={`project-detail-hero ${project.accent}`}>
        <video autoPlay muted loop playsInline poster="">
          <source src={project.video} type={project.videoType || 'video/mp4'} />
        </video>
        <div className="project-detail-shade" />
        <div className="project-detail-title">
          <p className="eyebrow">Selected project</p>
          <h1>{project.title}</h1>
          <p>{project.discipline}</p>
        </div>
      </div>
      <div className="project-detail-content">
        <div className="project-story">
          <section><p className="eyebrow">About project</p><h2>A world with a story in every detail.</h2><p className="project-body-copy">{project.overview}</p></section>
          {project.challenge && <section><p className="eyebrow">Challenges</p><p className="project-body-copy">{project.challenge}</p></section>}
          {project.takeaway && <section><p className="eyebrow">Takeaways</p><p className="project-body-copy">{project.takeaway}</p></section>}
          {project.outcome && <section><p className="eyebrow">Outcome</p><p className="project-body-copy">{project.outcome}</p></section>}
        </div>
        <aside className="project-facts" aria-label="Project details">
          <div><span>Tools</span><strong>{project.tools.join(' · ')}</strong></div>
        </aside>
      </div>
      {project.images?.length > 0 && (
        <section className="project-gallery" aria-labelledby="gallery-title">
          <div className="project-gallery-heading"><p className="eyebrow">Gallery</p><h2 id="gallery-title">{project.title}</h2></div>
          <div className="project-gallery-grid">
            {project.images.map((image, index) => (
              <figure key={image} className="project-gallery-item cursor-target">
                <img src={`/japanese-street/${image}`} alt={`${project.title} environment screenshot ${index + 1}`} loading="lazy" />
              </figure>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
