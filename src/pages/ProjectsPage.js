function ProjectCard({ title, description }) {
  return <article className="future-card cursor-target"><span>Coming soon</span><h2>{title}</h2><p>{description}</p></article>;
}

export default function ProjectsPage() {
  return (
    <section className="page-section page-enter" aria-labelledby="projects-title">
      <p className="eyebrow">Selected work</p>
      <h1 id="projects-title">Projects</h1>
      <p className="page-lead">Project details will be added soon.<br />Stay tuned.</p>
      <div className="future-grid"><ProjectCard title="Next project" description="A new game-world case study is being prepared." /></div>
    </section>
  );
}
