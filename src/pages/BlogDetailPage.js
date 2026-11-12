import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL || '';
const postDate = (post) => post.createdAt ? new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(post.createdAt * 1000)) : '';

export default function BlogDetailPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch(`${API}/api/blogs`).then((response) => response.ok ? response.json() : Promise.reject()).then((items) => {
      const found = items.find((item) => item.id === postId || item.slug === postId);
      if (active) setPost(found || null);
    }).catch(() => { if (active) setPost(null); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [postId]);

  if (loading) return <section className="page-section page-enter"><p className="blog-status">Loading post...</p></section>;
  if (!post) return <section className="page-section page-enter"><p className="eyebrow">Blog</p><h1>Post not found</h1><Link className="hero-action" to="/blog">Back to blog</Link></section>;

  return <article className="page-section page-enter blog-detail"><Link className="blog-back" to="/blog">← Back to blog</Link><p className="eyebrow">Blog post</p><h1>{post.title}</h1>{postDate(post) && <time className="blog-date" dateTime={new Date(post.createdAt * 1000).toISOString()}>Posted {postDate(post)}</time>}{post.excerpt && <p className="page-lead">{post.excerpt}</p>}{post.body && <div className="blog-detail-body">{post.body}</div>}</article>;
}
