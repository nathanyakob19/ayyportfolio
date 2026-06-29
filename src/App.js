import './App.css';
import GooeyNav from './components/GooeyNav';
import ProfileCard from './components/ProfileCard';
import Shuffle from './components/Shuffle';
import SoftAurora from './components/SoftAurora';
import TargetCursor from './components/TargetCursor';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

function App() {
  return (
    <div className="portfolio-shell">
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        cursorColor="#ffffff"
        cursorColorOnTarget="#ffd166"
      />
      <div className="app-aurora" aria-hidden="true">
        <SoftAurora
          speed={0.45}
          scale={1.35}
          brightness={0.9}
          color1="#4ecdc4"
          color2="#ffd166"
          noiseFrequency={2.1}
          noiseAmplitude={0.9}
          bandHeight={0.46}
          bandSpread={0.8}
          octaveDecay={0.18}
          layerOffset={0.9}
          colorSpeed={0.7}
          enableMouseInteraction={false}
        />
      </div>
      <header className="site-header" id="home">
        <a className="brand-mark cursor-target" href="#home" aria-label="Abhinav portfolio home">
          AP
        </a>
        <GooeyNav
          items={navItems}
          particleCount={15}
          particleDistances={[80, 12]}
          particleR={90}
          initialActiveIndex={0}
          animationTime={600}
          timeVariance={260}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </header>

      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-content">
            <Shuffle
              text="Abhinav's Portfolio"
              className="hero-name cursor-target"
              tag="h1"
              shuffleDirection="right"
              duration={0.45}
              animationMode="evenodd"
              shuffleTimes={2}
              ease="power3.out"
              stagger={0.035}
              threshold={0.1}
              triggerOnce
              triggerOnHover
              respectReducedMotion
              colorFrom="#4ecdc4"
              colorTo="#f8f5ee"
              id="hero-title"
            />
            <p className="hero-copy">
              A focused React portfolio shell with animated React Bits components ready
              for real project details, case studies, and contact links.
            </p>
            <a className="hero-action cursor-target" href="#work">
              View Work
            </a>
          </div>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="about-card-column">
            <ProfileCard
              className="cursor-target"
              name="Abhinav Pillai"
              title="Frontend Developer"
              handle="abhinavpillai"
              status="Available"
              contactText="Say Hello"
              avatarUrl="/logo512.png"
              miniAvatarUrl="/logo192.png"
              showUserInfo
              enableTilt
              enableMobileTilt={false}
              behindGlowEnabled
              innerGradient="linear-gradient(145deg, rgba(78, 205, 196, 0.35) 0%, rgba(255, 209, 102, 0.18) 48%, rgba(255, 107, 107, 0.22) 100%)"
              onContactClick={() => {
                window.location.href = 'mailto:hello@example.com';
              }}
            />
          </div>
          <div className="about-copy">
            <p className="eyebrow">About</p>
            <h2 id="about-title">Design-minded frontend work with a sharp eye for motion.</h2>
            <p>
              Abhinav Pillai creates polished web experiences that feel direct, responsive,
              and memorable. The focus is on clean React interfaces, thoughtful interaction,
              and layouts that make content easy to scan.
            </p>
            <p>
              This portfolio now pairs React Bits motion components with a simple structure:
              a strong hero, an about section, selected work, skills, and a contact path.
            </p>
          </div>
        </section>

        <section className="content-band" id="work" aria-labelledby="work-title">
          <p className="eyebrow">Selected Work</p>
          <h2 id="work-title">Interfaces with motion, structure, and polish.</h2>
          <div className="project-grid">
            <article className="cursor-target">
              <span>01</span>
              <h3>Product Dashboards</h3>
              <p>Clear metrics, compact workflows, and responsive layouts for daily use.</p>
            </article>
            <article className="cursor-target">
              <span>02</span>
              <h3>Brand Sites</h3>
              <p>Fast, elegant web pages that make the first viewport count.</p>
            </article>
            <article className="cursor-target">
              <span>03</span>
              <h3>Interactive UI</h3>
              <p>Micro-interactions and animation systems that support the experience.</p>
            </article>
          </div>
        </section>

        <section className="split-band" id="skills" aria-labelledby="skills-title">
          <div>
            <p className="eyebrow">Skills</p>
            <h2 id="skills-title">React, CSS architecture, responsive UI, and frontend polish.</h2>
          </div>
          <p>
            The new navigation component is isolated in its own files, so it can be reused
            or restyled without pulling page layout concerns into the animation code.
          </p>
        </section>

        <section className="contact-band" id="contact" aria-labelledby="contact-title">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Ready for your real contact CTA.</h2>
          <a className="cursor-target" href="mailto:hello@example.com">hello@example.com</a>
        </section>
      </main>
    </div>
  );
}

export default App;
