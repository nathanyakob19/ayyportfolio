import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

export default function ProjectsPage() {
  return (
    <section className="page-section page-enter" aria-labelledby="projects-title">
      <p className="eyebrow">Selected work</p>
      <h1 id="projects-title">Projects</h1>
      <p className="page-lead">A selection of game worlds, environments, and assets. Hover over a project to watch a preview, then open it for the full case study.</p>
      <div className="projects-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
    </section>
  );
}
