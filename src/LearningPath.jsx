import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LearningPath = ({ articles }) => {
  // Group articles by path
  const paths = articles.reduce((acc, article) => {
    if (!acc[article.path]) {
      acc[article.path] = [];
    }
    acc[article.path].push(article);
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h1>Learning Paths</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.2rem' }}>
        Structured courses grouped by ancient sciences and philosophies.
      </p>

      {Object.entries(paths).map(([pathName, pathArticles]) => (
        <div key={pathName} style={{ marginBottom: '4rem' }}>
          <h2 style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem', color: 'var(--accent-saffron-light)' }}>
            {pathName}
          </h2>
          <div className="article-list">
            {pathArticles.slice(0, 5).map(article => ( // Limit to 5 for UI simplicity
              <Link to={`/article/${article.id}`} key={article.id} className="glass-panel article-item">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{article.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{article.summary}</p>
              </Link>
            ))}
            {pathArticles.length > 5 && (
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <span style={{ color: 'var(--accent-gold)' }}>+ {pathArticles.length - 5} more articles in this path</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default LearningPath;
