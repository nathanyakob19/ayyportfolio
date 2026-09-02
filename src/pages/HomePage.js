import { useState } from 'react';
import { Link } from 'react-router-dom';
import TypingRoles from '../components/TypingRoles';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

const skills = [
  ['◈', 'Blender'],
  ['✦', 'Substance Painter'],
  ['◉', 'Unity'],
  ['#', 'C#'],
  ['U', 'Unreal Engine'],
];

export default function HomePage() {
  const [selectedTool, setSelectedTool] = useState(null);
  const matchingProjects = selectedTool
    ? projects.filter((project) => project.tools.some((tool) => tool.toLowerCase().includes(selectedTool.toLowerCase())))
    : [];

  return (
    <div id="home">
      <section className="hero-section page-enter" aria-labelledby="hero-title">
        <div className="hero-content">
          <div className="hero-introduction">
            <h1 id="hero-title">Hello, I&apos;m <span>Abhinav</span></h1>
            <p className="hero-copy">Digital creator blending precision with imagination.</p>
          </div>
          <div className="hero-role" aria-labelledby="role-title">
            <p className="eyebrow">I am a</p>
            <TypingRoles />
            <p className="hero-copy">I work with Blender, Unreal Engine, and Substance Painter to create these high-quality assets that bring games to life.</p>
          </div>
        </div>
      </section>

      <section className="home-section skills-section" aria-labelledby="skills-title">
        <div className="section-heading">
          <h2 id="skills-title">Tools I create with.</h2>
        </div>
        <div className="skills-card" aria-label="Core skills">
          <div className="skills-grid" role="list">
            {skills.map(([icon, skill]) => (
              <div role="listitem" key={skill}>
                <button className={`skill-item cursor-target ${selectedTool === skill ? 'is-selected' : ''}`} type="button" onClick={() => setSelectedTool(selectedTool === skill ? null : skill)} aria-pressed={selectedTool === skill}>
                  <span aria-hidden="true">{icon}</span>{skill}
                </button>
              </div>
            ))}
          </div>
          {selectedTool && (
            <div className="skill-filter-results" aria-live="polite">
              <p className="skill-filter-title">Projects made with {selectedTool}</p>
              {matchingProjects.length ? <div className="projects-grid skills-projects-grid">{matchingProjects.map((project) => <ProjectCard project={project} key={project.slug} />)}</div> : <p className="skill-filter-empty">No projects added for this tool yet.</p>}
            </div>
          )}
        </div>
      </section>

      <section className="home-section home-about-section" aria-labelledby="home-about-title">
        <div className="home-about-copy">
          <p className="eyebrow">About me</p>
          <h2 id="home-about-title">Creating worlds worth exploring.</h2>
          <p>I have Fun designing immersive game elements- from gameplay  systems to character design, while also creating high quality assets that bring those worlds to life.</p>
          <Link className="hero-action cursor-target" to="/about">More About Me</Link>
        </div>
      </section>
    </div>
  );
}
