import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import {
  Activity,
  Database,
  LayoutDashboard,
  Terminal,
  Cpu,
  Share2,
  BookOpen,
  ArrowRight,
  GitBranch
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Page Imports
import Logs from './pages/Logs';
import Filebeat from './pages/Filebeat';
import Logstash from './pages/Logstash';
import Elasticsearch from './pages/Elasticsearch';
import Kibana from './pages/Kibana';
import Applications from './pages/Applications';
import Pipeline from './pages/Pipeline';

const Home = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="page-container"
  >
    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
      <h1 className="neon-text" style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: '800' }}>ELK Stack Dynamics</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
        The gold standard for observability. Trace the journey of a single log line from a Kubernetes pod to a global executive dashboard.
      </p>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <NavLink to="/logs" className="cyber-button" style={{ fontSize: '1.1rem', padding: '15px 40px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          Live Logs <Terminal size={20} />
        </NavLink>
        <NavLink to="/pipeline" className="cyber-button" style={{ background: 'var(--secondary)', boxShadow: '0 0 15px var(--secondary-glow)', fontSize: '1.1rem', padding: '15px 40px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          Full Pipeline <GitBranch size={20} />
        </NavLink>
      </div>
    </div>

    <div className="glass-panel" style={{ padding: '40px', marginBottom: '40px' }}>
      <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>The Enterprise Pipeline</h2>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {[
          { icon: <Cpu size={24} />, label: 'Pods', color: 'var(--primary)' },
          { icon: <Share2 size={24} />, label: 'Filebeat', color: 'var(--secondary)' },
          { icon: <Activity size={24} />, label: 'Logstash', color: 'var(--accent)' },
          { icon: <Database size={24} />, label: 'Elastic', color: 'var(--primary)' },
          { icon: <LayoutDashboard size={24} />, label: 'Kibana', color: 'gold' },
        ].map((item, i) => (
          <React.Fragment key={item.label}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              style={{ textAlign: 'center', flex: 1, minWidth: '100px' }}
            >
              <div className="glass-panel" style={{ padding: '20px', borderColor: item.color, background: `${item.color}05` }}>
                <div style={{ color: item.color, display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                <p style={{ marginTop: '10px', fontSize: '0.8rem', fontWeight: 'bold' }}>{item.label}</p>
              </div>
            </motion.div>
            {i < 4 && <ArrowRight color="var(--border-color)" className="hide-mobile" />}
          </React.Fragment>
        ))}
      </div>
    </div>

    <div className="grid-layout">
      <div className="glass-panel" style={{ padding: '30px' }}>
        <h3>Real-time Collection</h3>
        <p style={{ marginTop: '10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Filebeat monitors thousands of containers simultaneously with sub-second latency.
        </p>
      </div>
      <div className="glass-panel" style={{ padding: '30px' }}>
        <h3>Smart Processing</h3>
        <p style={{ marginTop: '10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Logstash decodes complex Java stack traces and enriches data with GeoIP info.
        </p>
      </div>
      <div className="glass-panel" style={{ padding: '30px' }}>
        <h3>Infinite Scale</h3>
        <p style={{ marginTop: '10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Elasticsearch handles petabytes of data while maintaining millisecond search speeds.
        </p>
      </div>
    </div>
  </motion.div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navbar = () => {
  const links = [
    { to: '/', label: 'Home', icon: <BookOpen size={18} /> },
    { to: '/pipeline', label: 'Pipeline', icon: <GitBranch size={18} /> },
    { to: '/logs', label: 'Logs', icon: <Terminal size={18} /> },
    { to: '/filebeat', label: 'Filebeat', icon: <Share2 size={18} /> },
    { to: '/logstash', label: 'Logstash', icon: <Activity size={18} /> },
    { to: '/elasticsearch', label: 'Elasticsearch', icon: <Database size={18} /> },
    { to: '/kibana', label: 'Kibana', icon: <LayoutDashboard size={18} /> },
    { to: '/applications', label: 'Applications', icon: <Cpu size={18} /> },
  ];

  return (
    <nav className="glass-panel" style={{
      margin: '20px',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: '20px',
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ background: 'var(--primary)', padding: '6px', borderRadius: '8px', display: 'flex' }}>
          <Activity size={20} color="var(--bg-color)" />
        </div>
        <span style={{ fontWeight: '800', letterSpacing: '2px', fontSize: '1.1rem' }}>ELK.DYNAMICS</span>
      </div>
      <div style={{ display: 'flex', gap: '5px' }}>
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {link.icon}
            <span className="nav-text" style={{ fontSize: '0.8rem' }}>{link.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="layout">
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 120px)' }}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pipeline" element={<Pipeline />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/filebeat" element={<Filebeat />} />
              <Route path="/logstash" element={<Logstash />} />
              <Route path="/elasticsearch" element={<Elasticsearch />} />
              <Route path="/kibana" element={<Kibana />} />
              <Route path="/applications" element={<Applications />} />
            </Routes>
          </AnimatePresence>
        </main>
        <footer style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', fontSize: '0.85rem', borderTop: '1px solid var(--border-color)', marginTop: '60px' }}>
          <p style={{ marginBottom: '10px' }}>&copy; 2026 ELK.DYNAMICS Operational Insight Platform. Built for Scalability.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center' }}>
            <span>Directed by <strong>Divesh Jadhwani</strong></span>
            <a href="https://github.com/d-hackmt" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/dhackmt" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
              LinkedIn
            </a>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
