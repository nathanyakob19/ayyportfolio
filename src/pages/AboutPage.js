import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <section className="about-section page-enter" aria-labelledby="about-title">
      <div className="about-card-column">
        <div className="about-photo-card cursor-target">
          <img src="/logo512.png" alt="Abhinav Pillai" />
          <div className="photo-glow" />
        </div>
        <Link className="hero-action cursor-target" to="/contact">More About Me</Link>
      </div>
      <div className="about-copy">
        <p className="eyebrow">About</p>
        <h1 id="about-title">Creating worlds worth exploring.</h1>
        <p>I have fun designing immersive game elements—from gameplay systems to character design—while also creating high-quality assets that bring those worlds to life.</p>
        <p>I work with Blender, Unreal Engine, and Substance Painter to create these high-quality assets that bring games to life.</p>
      </div>
    </section>
  );
}
