import { useEffect, useState } from 'react';

const API = process.env.REACT_APP_API_URL || '';

function BlogCard({ post }) {
  return <article className="blog-card cursor-target">{post.coverImage && <img src={`${API}${post.coverImage}`} alt="" />}<div className="blog-card-content"><span>Blog post</span><h2>{post.title}</h2>{post.excerpt && <p>{post.excerpt}</p>}{post.body && <div className="blog-body">{post.body}</div>}</div></article>;
}

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch(`${API}/api/blogs`).then((response) => response.ok ? response.json() : Promise.reject()).then((items) => { if (active) setPosts(items.filter((post) => post.published)); }).catch(() => { if (active) setPosts([]); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return <section className="page-section page-enter" aria-labelledby="blog-title"><p className="eyebrow">Notes & process</p><h1 id="blog-title">Blog</h1><p className="page-lead">Development notes, game-art explorations, and project insights.</p>{loading ? <p className="blog-status">Loading posts…</p> : posts.length ? <div className="blog-grid">{posts.map((post) => <BlogCard key={post.id} post={post} />)}</div> : <div className="future-grid"><article className="future-card"><span>Coming soon</span><h2>No published posts yet</h2><p>New notes and process updates will appear here.</p></article></div>}</section>;
}
