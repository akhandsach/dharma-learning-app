import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Compass, Search as SearchIcon, Award, User, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './Dashboard';
import ArticleReader from './ArticleReader';
import LearningPath from './LearningPath';
import Search from './Search';

// Sidebar Component
const Sidebar = ({ karma }) => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="sidebar glass-panel">
      <div>
        <h2 style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Compass size={28} /> DharmaLearn
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Neo-Vedic Knowledge Platform</p>
      </div>

      <div className="karma-badge" style={{ alignSelf: 'flex-start' }}>
        <Award size={20} />
        <span>{karma} Karma Points</span>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '2rem' }}>
        <Link to="/" className={`nav-link ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}>
          <Home size={20} /> Dashboard
        </Link>
        <Link to="/paths" className={`nav-link ${isActive('/paths') ? 'active' : ''}`}>
          <BookOpen size={20} /> Learning Paths
        </Link>
        <Link to="/search" className={`nav-link ${isActive('/search') ? 'active' : ''}`}>
          <SearchIcon size={20} /> Explore
        </Link>
      </nav>

      <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(249, 115, 22, 0.05)', borderRadius: '8px' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <User size={16} /> Daily Goal
        </h4>
        <div style={{ background: 'rgba(255,255,255,0.1)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ width: '40%', height: '100%', background: 'var(--gradient-saffron)' }}></div>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Read 2 more articles to complete.</p>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [karma, setKarma] = useState(() => {
    const saved = localStorage.getItem('dharma_karma');
    return saved ? parseInt(saved) : 0;
  });

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    localStorage.setItem('dharma_karma', karma);
  }, [karma]);

  useEffect(() => {
    fetch('/data/index.json')
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.error("Error loading articles index:", err));
  }, []);

  const addKarma = (amount) => {
    setKarma(prev => prev + amount);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar karma={karma} />
        <main className="main-content">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Dashboard articles={articles} />} />
              <Route path="/paths" element={<LearningPath articles={articles} />} />
              <Route path="/search" element={<Search articles={articles} />} />
              <Route path="/article/:id" element={<ArticleReader addKarma={addKarma} />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
