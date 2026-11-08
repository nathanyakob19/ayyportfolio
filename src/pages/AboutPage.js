export default function AboutPage() {
  return (
    <section className="about-section page-enter" aria-labelledby="about-title">
      <div className="about-card-column">
        <div className="about-photo-card cursor-target">
          <img src="/logo512.png" alt="Abhinav Pillai" />
          <div className="photo-glow" />
        </div>
      </div>
      <div className="about-copy">
        <p className="eyebrow">About</p>
    
        <p>Since childhood, I&apos;ve been fascinated by art and the magic behind how it&apos;s created. Whether in movies, games, or other forms of entertainment, I was captivated by the way drawings and models could move and make us feel connected to them. Animated films like Studio Ghibli&apos;s <em>My Neighbor Totoro</em> and <em>Kiki&apos;s Delivery Service</em> sparked my love for drawing, while story-driven games such as Telltale&apos;s <em>The Wolf Among Us</em> and <em>The Walking Dead</em> showed me how powerful storytelling and immersive mechanics can be when combined.</p>
        <p>These experiences inspired me to create my own characters and weave stories around them. Later, LEGO building became another outlet for my imagination, pushing me to envision worlds beyond the bricks. That curiosity eventually led me to Blender and Unreal Engine, where I began transforming my passion into 3D art and design.</p>
        <p>Today, my contributions to games may be small—like crafting props and background assets—but each step brings me closer to my dream: to merge technical precision with creative storytelling and craft characters and worlds that truly come alive.</p>
      </div>
    </section>
  );
}
