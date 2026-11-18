import { Fragment, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useParams } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL || '';
const postDate = (post) => post.createdAt ? new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(post.createdAt * 1000)) : '';
const media = (url) => url?.startsWith('/api/') ? `${API}${url}` : url;

function BlogContent({ body, images, onImageClick }) {
  const paragraphs = (body || '').split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);
  const postImages = Array.isArray(images) ? images.filter(Boolean) : [];
  // Each image begins a paragraph group; the following paragraph can use any
  // remaining space beside that image before the next image is introduced.
  const rowCount = Math.max(paragraphs.length, postImages.length * 2);

  if (!rowCount) return null;

  return <div className="blog-detail-body">{Array.from({ length: rowCount }, (_, index) => {
    const imageIndex = Math.floor(index / 2);
    const image = index % 2 === 0 ? postImages[imageIndex] : null;
    const paragraph = paragraphs[index];
    return <Fragment key={`${image || 'text'}-${index}`}>
      {image && <button className={`blog-content-image image-${imageIndex % 2 ? 'right' : 'left'}`} type="button" onClick={() => onImageClick({ index: imageIndex, url: media(image) })} aria-label={`Open blog image ${imageIndex + 1}`}><img src={media(image)} alt="" /></button>}
      {paragraph && <p>{paragraph}</p>}
    </Fragment>;
  })}</div>;
}

export default function BlogDetailPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);

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

  return <article className="page-section page-enter blog-detail"><Link className="blog-back" to="/blog">← Back to blog</Link><p className="eyebrow">Blog post</p><h1>{post.title}</h1>{postDate(post) && <time className="blog-date" dateTime={new Date(post.createdAt * 1000).toISOString()}>Posted {postDate(post)}</time>}{post.excerpt && <p className="page-lead">{post.excerpt}</p>}<BlogContent body={post.body} images={post.images} onImageClick={setActiveImage} />{activeImage && createPortal(<div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`Blog attachment ${activeImage.index + 1}`}><button className="gallery-lightbox-close cursor-target" type="button" onClick={() => setActiveImage(null)} aria-label="Close image viewer">×</button><img src={activeImage.url} alt={`Blog attachment ${activeImage.index + 1}`} /></div>, document.body)}</article>;
}
