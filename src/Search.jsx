import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';

const Search = ({ articles }) => {
  const [query, setQuery] = useState('');

  const results = query.length > 2 
    ? articles.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.summary.toLowerCase().includes(query.toLowerCase())).slice(0, 20)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ position: 'relative', marginBottom: '3rem' }}>
        <SearchIcon size={24} style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
        <input 
          type="text" 
          className="search-input" 
          style={{ paddingLeft: '4rem' }}
          placeholder="Search sacred texts, concepts, or historical figures..." 
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {query.length > 2 && (
        <div>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Found {results.length} results</h3>
          <div className="article-list">
            {results.map(article => (
              <Link to={`/article/${article.id}`} key={article.id} className="glass-panel article-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-saffron-light)' }}>{article.title}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{article.path}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>{article.summary}</p>
              </Link>
            ))}
            
            {results.length === 0 && (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                No texts found matching "{query}". Try another search term.
              </div>
            )}
          </div>
        </div>
      )}
      
      {query.length <= 2 && (
        <div style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <SearchIcon size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
          <p>Begin your search to explore the vast ocean of knowledge.</p>
        </div>
      )}
    </motion.div>
  );
};

export default Search;
