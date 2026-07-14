function BlogCard({ title, description }) {
  return <article className="future-card cursor-target"><span>In progress</span><h2>{title}</h2><p>{description}</p></article>;
}

export default function BlogPage() {
  return (
    <section className="page-section page-enter" aria-labelledby="blog-title">
      <p className="eyebrow">Notes & process</p>
      <h1 id="blog-title">Blog</h1>
      <p className="page-lead">Stay tuned for future blogs.<br />No blog posts yet.</p>
      <div className="future-grid"><BlogCard title="First post soon" description="Process notes, game-art explorations, and development insights will live here." /></div>
    </section>
  );
}
