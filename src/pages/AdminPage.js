import { useEffect, useMemo, useState } from 'react';
import { projects as starterProjects } from '../data/projects';

const API = process.env.REACT_APP_API_URL || '';
const emptyProject = { title: '', slug: '', description: '', discipline: '', engine: '', role: '', status: 'Draft', tools: [], overview: '', challenge: '', takeaway: '', outcome: '', coverImage: '', images: [], videos: [], accent: 'cyan' };
const emptyBlog = { title: '', slug: '', excerpt: '', body: '', coverImage: '', published: false };

function fieldValue(value) { return Array.isArray(value) ? value.join(', ') : value || ''; }

export default function AdminPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem('portfolio-admin-token') || '');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [kind, setKind] = useState('projects');
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);

  const editor = useMemo(() => selected || (kind === 'projects' ? emptyProject : emptyBlog), [kind, selected]);
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const request = async (path, options = {}) => {
    const response = await fetch(`${API}${path}`, { ...options, headers: { ...authHeaders, ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }), ...options.headers } });
    const data = response.status === 204 ? null : await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || 'Request failed');
    return data;
  };

  const load = async () => {
    if (!token) return;
    try {
      setBusy(true);
      setItems(await request(`/api/admin/${kind}`));
      setSelected(null);
    } catch (error) { setNotice(error.message); }
    finally { setBusy(false); }
  };

  useEffect(() => { load(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, token]);

  const signIn = async (event) => {
    event.preventDefault();
    try {
      setBusy(true);
      const response = await fetch(`${API}/api/admin/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(credentials) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to sign in');
      sessionStorage.setItem('portfolio-admin-token', data.token);
      setToken(data.token);
      setNotice('Signed in.');
    } catch (error) { setNotice(error.message); }
    finally { setBusy(false); }
  };

  const update = (name, value) => setSelected((current) => ({ ...(current || (kind === 'projects' ? emptyProject : emptyBlog)), [name]: value }));
  const save = async (event) => {
    event.preventDefault();
    try {
      setBusy(true);
      const payload = { ...editor, tools: typeof editor.tools === 'string' ? editor.tools.split(',').map((item) => item.trim()).filter(Boolean) : editor.tools, images: typeof editor.images === 'string' ? editor.images.split('\n').map((item) => item.trim()).filter(Boolean) : editor.images, videos: typeof editor.videos === 'string' ? editor.videos.split('\n').map((item) => item.trim()).filter(Boolean) : editor.videos };
      const saved = await request(`/api/admin/${kind}${editor.id ? `/${editor.id}` : ''}`, { method: editor.id ? 'PUT' : 'POST', body: JSON.stringify(payload) });
      setItems((current) => editor.id ? current.map((item) => item.id === saved.id ? saved : item) : [saved, ...current]);
      setSelected(saved);
      setNotice('Saved successfully.');
    } catch (error) { setNotice(error.message); }
    finally { setBusy(false); }
  };

  const upload = async (event, target) => {
    const files = [...event.target.files];
    if (!files.length) return;
    try {
      setBusy(true);
      const urls = [];
      for (const file of files) { const formData = new FormData(); formData.append('file', file); urls.push((await request('/api/admin/uploads', { method: 'POST', body: formData })).url); }
      update(target, target === 'coverImage' ? urls[0] : [...(Array.isArray(editor.images) ? editor.images : []), ...urls]);
      setNotice('Upload complete. Save the project to publish the change.');
    } catch (error) { setNotice(error.message); }
    finally { setBusy(false); }
  };

  const remove = async () => {
    if (!editor.id || !window.confirm(`Delete “${editor.title}”?`)) return;
    try { await request(`/api/admin/${kind}/${editor.id}`, { method: 'DELETE' }); setItems((current) => current.filter((item) => item.id !== editor.id)); setSelected(null); setNotice('Deleted.'); } catch (error) { setNotice(error.message); }
  };

  if (!token) return <section className="admin-page page-enter"><form className="admin-login" onSubmit={signIn}><p className="eyebrow">Owner access</p><h1>Portfolio admin</h1><p>Sign in to manage projects, blog posts, text, and media.</p><label>Username<input required value={credentials.username} onChange={(event) => setCredentials({ ...credentials, username: event.target.value })} /></label><label>Password<input required type="password" value={credentials.password} onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} /></label>{notice && <p className="admin-notice">{notice}</p>}<button className="hero-action" disabled={busy} type="submit">{busy ? 'Signing in…' : 'Sign in'}</button></form></section>;

  return <section className="admin-page page-enter"><div className="admin-heading"><div><p className="eyebrow">Owner access</p><h1>Content studio</h1><p>Draft, edit, upload, and publish your portfolio content.</p></div><button className="admin-text-button" onClick={() => { sessionStorage.removeItem('portfolio-admin-token'); setToken(''); }}>Sign out</button></div><div className="admin-tabs"><button className={kind === 'projects' ? 'is-active' : ''} onClick={() => setKind('projects')}>Projects</button><button className={kind === 'blogs' ? 'is-active' : ''} onClick={() => setKind('blogs')}>Blog posts</button><button onClick={() => setSelected({ ...(kind === 'projects' ? emptyProject : emptyBlog) })}>+ New {kind === 'projects' ? 'project' : 'post'}</button></div>{notice && <p className="admin-notice">{notice}</p>}<div className="admin-layout"><aside className="admin-list"><h2>{kind === 'projects' ? 'Projects' : 'Posts'}</h2>{kind === 'projects' && !items.length && <button onClick={() => setItems(starterProjects.map((project) => ({ ...project })))}>Load current projects to edit</button>}{items.map((item) => <button className={editor.id === item.id ? 'is-selected' : ''} key={item.id || item.slug} onClick={() => setSelected({ ...item, tools: fieldValue(item.tools), images: fieldValue(item.images), videos: fieldValue(item.videos) })}><strong>{item.title}</strong><span>{item.status || (item.published ? 'Published' : 'Draft')}</span></button>)}</aside><form className="admin-editor" onSubmit={save}><div className="admin-editor-heading"><h2>{editor.id ? `Edit ${kind.slice(0, -1)}` : `New ${kind.slice(0, -1)}`}</h2>{editor.id && <button className="admin-delete" type="button" onClick={remove}>Delete</button>}</div><label>Title<input required value={editor.title || ''} onChange={(event) => update('title', event.target.value)} /></label><label>Slug<input value={editor.slug || ''} onChange={(event) => update('slug', event.target.value)} placeholder="my-project" /></label>{kind === 'projects' ? <><label>Short description<textarea value={editor.description || ''} onChange={(event) => update('description', event.target.value)} /></label><div className="admin-two-col"><label>Discipline<input value={editor.discipline || ''} onChange={(event) => update('discipline', event.target.value)} /></label><label>Status<input value={editor.status || ''} onChange={(event) => update('status', event.target.value)} /></label><label>Role<input value={editor.role || ''} onChange={(event) => update('role', event.target.value)} /></label><label>Tools (comma-separated)<input value={fieldValue(editor.tools)} onChange={(event) => update('tools', event.target.value)} /></label></div>{['overview', 'challenge', 'takeaway', 'outcome'].map((name) => <label key={name}>{name}<textarea value={editor[name] || ''} onChange={(event) => update(name, event.target.value)} /></label>)}<label>Cover image<input type="file" accept="image/*" onChange={(event) => upload(event, 'coverImage')} /></label>{editor.coverImage && <img className="admin-preview" src={`${API}${editor.coverImage}`} alt="Cover preview" />}<label>Gallery images<input type="file" accept="image/*" multiple onChange={(event) => upload(event, 'images')} /></label><label>Gallery image URLs (one per line)<textarea value={fieldValue(editor.images).replace(/, /g, '\n')} onChange={(event) => update('images', event.target.value)} /></label></> : <><label>Excerpt<textarea value={editor.excerpt || ''} onChange={(event) => update('excerpt', event.target.value)} /></label><label>Post body<textarea className="admin-body" value={editor.body || ''} onChange={(event) => update('body', event.target.value)} /></label><label className="admin-check"><input type="checkbox" checked={Boolean(editor.published)} onChange={(event) => update('published', event.target.checked)} /> Published</label></>}<button className="hero-action" disabled={busy} type="submit">{busy ? 'Saving…' : 'Save changes'}</button></form></div></section>;
}
