import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import GooeyNav from './components/GooeyNav';
import SoftAurora from './components/SoftAurora';
import TargetCursor from './components/TargetCursor';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CvPage = lazy(() => import('./pages/CvPage'));

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'CV', href: '/cv' },
];

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function SiteLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeIndex = navItems.findIndex((item) => item.href === location.pathname || (item.href === '/projects' && location.pathname.startsWith('/projects/')));

  const goToPage = ({ href }) => {
    if (href === location.pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }
    navigate(href);
  };

  return (
    <div className="portfolio-shell">
      <TargetCursor spinDuration={2} hideDefaultCursor parallaxOn cursorColor="#ffffff" cursorColorOnTarget="#ffd166" />
      <div className="app-aurora" aria-hidden="true">
        <SoftAurora speed={0.45} scale={1.35} brightness={0.9} color1="#4ecdc4" color2="#ffd166" noiseFrequency={2.1} noiseAmplitude={0.9} bandHeight={0.46} bandSpread={0.8} octaveDecay={0.18} layerOffset={0.9} colorSpeed={0.7} enableMouseInteraction={false} />
      </div>
      <header className="site-header">
        <a className="brand-mark cursor-target" href="/" onClick={(event) => { event.preventDefault(); goToPage({ href: '/' }); }} aria-label="Abhinav portfolio home">AP</a>
        <GooeyNav items={navItems} particleCount={15} particleDistances={[80, 12]} particleR={90} activeIndex={activeIndex < 0 ? 0 : activeIndex} animationTime={600} timeVariance={260} colors={[1, 2, 3, 1, 2, 3, 1, 4]} onItemClick={goToPage} />
      </header>
      <main>
        <Suspense fallback={<div className="page-loading">Loading portfolio…</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cv" element={<CvPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <ScrollToTop />
    </div>
  );
}

function App() {
  return <BrowserRouter><SiteLayout /></BrowserRouter>;
}

export default App;
