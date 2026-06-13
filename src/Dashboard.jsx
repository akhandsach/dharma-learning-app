import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Book, Award, Clock } from 'lucide-react';

const Dashboard = ({ articles }) => {
  // Get random featured articles
  const featuredArticles = articles.slice(0, 4);

  // Group by paths for stats
  const paths = [...new Set(articles.map(a => a.path))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ color: 'var(--accent-saffron)' }}>Namaste! 🙏</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Continue your journey into Sanatana Dharma.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <Book size={24} color="var(--accent-saffron)" style={{ marginBottom: '1rem' }} />
          <h3>{articles.length}</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Total Articles Available</p>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <Award size={24} color="var(--accent-gold)" style={{ marginBottom: '1rem' }} />
          <h3>{paths.length}</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Learning Paths</p>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <Clock size={24} color="var(--accent-blue)" style={{ marginBottom: '1rem' }} />
          <h3>Daily</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Karma Goal: 50 pts</p>
        </div>
      </div>

      <h2>Recommended Reading</h2>
      <div className="path-grid">
        {featuredArticles.map(article => (
          <Link to={`/article/${article.id}`} key={article.id} style={{ textDecoration: 'none' }}>
            <div className="glass-panel path-card">
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {article.path}
              </span>
              <h3>{article.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', flex: 1 }}>
                {article.summary.substring(0, 100)}...
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <span style={{ color: 'var(--accent-saffron)', fontSize: '0.85rem', fontWeight: '600' }}>+{article.readTime * 10} Karma</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{article.readTime} min read</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default Dashboard;
