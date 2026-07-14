export default function ContactPage() {
  return (
    <section className="contact-page page-enter" aria-labelledby="contact-title">
      <div className="contact-intro"><p className="eyebrow">Let&apos;s create</p><h1 id="contact-title">Bring the next world to life.</h1><p className="page-lead">Have a project, a collaboration, or an idea in mind? Let&apos;s talk.</p></div>
      <div className="contact-layout">
        <form className="contact-form" action="mailto:hello@example.com" method="post" encType="text/plain">
          <label>Name<input type="text" name="name" placeholder="Your name" /></label>
          <label>Email<input type="email" name="email" placeholder="you@example.com" /></label>
          <label>Message<textarea name="message" rows="5" placeholder="Tell me about your project" /></label>
          <button className="hero-action cursor-target" type="submit">Send message</button>
        </form>
        <aside className="contact-details"><div><span>Email</span><a className="cursor-target" href="mailto:hello@example.com">hello@example.com</a></div><div><span>Location</span><p>India · Available remotely</p></div><div><span>Social</span><div className="social-links"><a className="cursor-target" href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a><a className="cursor-target" href="https://www.artstation.com" target="_blank" rel="noreferrer">ArtStation</a></div></div></aside>
      </div>
    </section>
  );
}
