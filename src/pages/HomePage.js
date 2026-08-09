import { Link } from 'react-router-dom';
import TypingRoles from '../components/TypingRoles';

const skills = [
  ['◈', 'Blender'],
  ['✦', 'Substance Painter'],
  ['◉', 'Unity'],
  ['#', 'C#'],
  ['U', 'Unreal Engine'],
];

export default function HomePage() {
  return (
    <div id="home">
      <section className="hero-section page-enter" aria-labelledby="hero-title">
        <div className="hero-content">
          <div className="hero-introduction">
            <p className="eyebrow">Game development portfolio</p>
            <h1 id="hero-title">Hello, I&apos;m <span>Abhinav</span></h1>
            <p className="hero-copy">Digital creator blending precision with imagination.</p>
          </div>
          <div className="hero-role" aria-labelledby="role-title">
            <p className="eyebrow">What I do</p>
            <h2 id="role-title">Game Developer</h2>
            <p className="hero-copy">I create engaging interactive experiences, game systems, and polished digital worlds.</p>
            <TypingRoles />
          </div>
        </div>
      </section>

      <section className="home-section skills-section" aria-labelledby="skills-title">
        <div className="section-heading">
          <p className="eyebrow">Skills / Tools I Work With</p>
          <h2 id="skills-title">Tools I create with.</h2>
        </div>
        <div className="skills-card" aria-label="Core skills">
          <div className="skills-grid" role="list">
            {skills.map(([icon, skill]) => <div className="skill-item" role="listitem" key={skill}><span aria-hidden="true">{icon}</span>{skill}</div>)}
          </div>
        </div>
      </section>

      <section className="home-section home-about-section" aria-labelledby="home-about-title">
        <div className="home-about-copy">
          <p className="eyebrow">About me</p>
          <h2 id="home-about-title">Creating worlds worth exploring.</h2>
          <p>I am a game developer and digital creator who blends gameplay, design, and high-quality assets to make immersive interactive experiences.</p>
          <Link className="hero-action cursor-target" to="/about">More About Me</Link>
        </div>
      </section>
    </div>
  );
}
