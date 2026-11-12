import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL || '';
const postDate = (post) => post.createdAt ? new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(post.createdAt * 1000)) : '';

function BlogCard({ post }) {
  const identifier = post.slug || post.id;
  return <article className="blog-card cursor-target"><div className="blog-card-content"><span>Blog post</span><h2><Link to={`/blog/${identifier}`}>{post.title}</Link></h2>{postDate(post) && <time dateTime={new Date(post.createdAt * 1000).toISOString()}>{postDate(post)}</time>}</div></article>;
}

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch(`${API}/api/blogs`).then((response) => response.ok ? response.json() : Promise.reject()).then((items) => { if (active) setPosts(items.filter((post) => post.published)); }).catch(() => { if (active) setPosts([]); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return <section className="page-section page-enter" aria-labelledby="blog-title"><p className="eyebrow">Notes & process</p><h1 id="blog-title">Blog</h1><p className="page-lead">Choose a post to read the full story.</p>{loading ? <p className="blog-status">Loading posts...</p> : posts.length ? <div className="blog-grid">{posts.map((post) => <BlogCard key={post.id} post={post} />)}</div> : <div className="future-grid"><article className="future-card"><span>Coming soon</span><h2>No published posts yet</h2><p>New notes and process updates will appear here.</p></article></div>}</section>;
}
