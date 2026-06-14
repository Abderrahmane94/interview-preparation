import React, { useEffect, useState } from 'react';
import { useLocation } from '@docusaurus/router';

/**
 * Floating "↑ Questions" button — appears after scrolling 500px on doc pages.
 */
function BackToQuestionsButton({ visible }) {
  if (!visible) return null;
  return (
    <button
      className="back-to-questions-btn"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      title="Back to question list"
      aria-label="Back to question list"
    >
      <span className="back-to-questions-arrow">↑</span>
      <span className="back-to-questions-label">Questions</span>
    </button>
  );
}

export default function Root({ children }) {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const isDocPage = location.pathname.includes('/docs/');

  // Show/hide floating button based on scroll position
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Inject clickable "↑ list" links into every h2 on doc pages
  useEffect(() => {
    if (!isDocPage) return;

    // Wait for the DOM to render after navigation
    const timer = setTimeout(() => {
      const headings = document.querySelectorAll('.markdown h2');
      headings.forEach((h2) => {
        // Avoid double-injecting
        if (h2.querySelector('.back-to-list-link')) return;

        const link = document.createElement('a');
        link.href = '#';
        link.className = 'back-to-list-link';
        link.setAttribute('aria-label', 'Back to question list');
        link.textContent = '↑ list';
        link.addEventListener('click', (e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        h2.appendChild(link);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname, isDocPage]);

  return (
    <>
      {children}
      <BackToQuestionsButton visible={isDocPage && visible} />
    </>
  );
}
