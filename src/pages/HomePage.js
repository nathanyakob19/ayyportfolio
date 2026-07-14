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
    <section className="hero-section" id="home" aria-labelledby="hero-title">
      <div className="hero-content page-enter">
        <p className="eyebrow">Game development portfolio</p>
        <h1 id="hero-title">Hello, I&apos;m <span>Abhinav</span></h1>
        <p className="hero-copy">Digital creator blending precision with imagination.</p>
        <TypingRoles />
        <div className="skills-card" aria-label="Core skills">
          <p className="skills-card-label">Tools I create with</p>
          <div className="skills-grid">
            {skills.map(([icon, skill]) => <div className="skill-item cursor-target" key={skill}><span aria-hidden="true">{icon}</span>{skill}</div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
