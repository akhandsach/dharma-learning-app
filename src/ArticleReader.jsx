import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
// We would ideally use a markdown parser here, but since the parsed markdown is plain HTML/Text with some ## headers, we'll do a simple render or just use dangerouslySetInnerHTML if we use a library like marked.
// Let's install marked to render the markdown files correctly. For now we will do a basic fetch and render.

const ArticleReader = ({ addKarma }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/data/articles/${id}.md`)
      .then(res => res.text())
      .then(text => {
        setContent(text);
        setLoading(false);
        setCompleted(false);
      })
      .catch(err => {
        console.error("Error loading article:", err);
        setLoading(false);
      });
  }, [id]);

  const handleComplete = () => {
    if (!completed) {
      addKarma(50); // Hardcoded karma for simplicity
      setCompleted(true);
    }
  };

  // Very basic markdown parser for the few tags we supported in python
  const renderMarkdown = (text) => {
    if (!text) return { __html: '' };
    let html = text
      .replace(/### (.*)/g, '<h3>$1</h3>')
      .replace(/## (.*)/g, '<h2>$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br/>');
    
    return { __html: `<p>${html}</p>` };
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <button 
        onClick={() => navigate(-1)} 
        style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}
      >
        <ArrowLeft size={20} /> Back
      </button>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>Loading sacred knowledge...</div>
      ) : (
        <div className="glass-panel" style={{ padding: '3rem' }}>
          <h1 style={{ color: 'var(--accent-gold)' }}>{id.replace(/_/g, ' ')}</h1>
          
          <div 
            className="markdown-content" 
            dangerouslySetInnerHTML={renderMarkdown(content)}
          />

          <div style={{ marginTop: '4rem', borderTop: '1px solid var(--border-glass)', paddingTop: '2rem', display: 'flex', justifyContent: 'center' }}>
            <button 
              className="btn-primary" 
              onClick={handleComplete}
              disabled={completed}
              style={{ background: completed ? 'var(--bg-card)' : 'var(--gradient-saffron)', color: completed ? 'var(--accent-gold)' : '#fff', border: completed ? '1px solid var(--accent-gold)' : 'none' }}
            >
              {completed ? <><CheckCircle size={20} /> Knowledge Absorbed (+50 Karma)</> : 'Mark as Read & Earn Karma'}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ArticleReader;
