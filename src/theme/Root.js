import React, { useEffect, useState } from 'react';
import { useLocation } from '@docusaurus/router';

// ─── Keywords to highlight in the question list ───────────────────────────────
// Group 1: exact-case acronyms and class names
const EXACT_KEYWORDS = [
  'OOP', 'SOLID', 'AOP', 'IoC', 'DI', 'JPA', 'ORM', 'JVM', 'JDK', 'JRE',
  'REST', 'RESTful', 'SOAP', 'HTTP', 'API', 'SQL', 'NoSQL', 'MVC', 'MVP',
  'EJB', 'JSF', 'JWT', 'CORS', 'AMQP', 'CDI',
  'ArrayList', 'LinkedList', 'HashMap', 'HashSet', 'TreeMap', 'TreeSet',
  'ConcurrentHashMap', 'LinkedHashMap', 'LinkedHashSet',
  'BeanFactory', 'ApplicationContext', 'DispatcherServlet',
  'RabbitMQ', 'Docker', 'Jenkins', 'Maven', 'Gradle',
  'Thread', 'Runnable', 'Callable', 'ExecutorService',
  'Optional', 'Stream', 'Lambda',
  'PUT', 'PATCH', 'POST', 'GET', 'DELETE',
];

// Group 2: conceptual terms (case-insensitive match)
const CONCEPT_KEYWORDS = [
  'polymorphism', 'encapsulation', 'abstraction', 'inheritance', 'composition',
  'overloading', 'overriding', 'aggregation', 'association',
  'deadlock', 'singleton', 'idempotent', 'microservice', 'monolithic',
  'immutable', 'serialization', 'reflection', 'annotation',
  'transaction', 'indexing', 'normalization',
];

function buildKeywordRegex() {
  // Exact-case terms (|) + concept terms (case-insensitive flag applied separately)
  const exactPart  = EXACT_KEYWORDS.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const conceptPart = CONCEPT_KEYWORDS.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  // Combined: exact first (longer matches win), then concepts
  return new RegExp(`\\b(${exactPart}|${conceptPart})\\b`, 'gi');
}

// Wrap keyword matches inside a text node with <span class="toc-keyword">
function highlightTextNode(textNode, regex) {
  const text = textNode.nodeValue;
  if (!regex.test(text)) return;
  regex.lastIndex = 0;

  const frag = document.createDocumentFragment();
  let last = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      frag.appendChild(document.createTextNode(text.slice(last, match.index)));
    }
    const span = document.createElement('span');
    span.className = 'toc-keyword';
    span.textContent = match[0];
    frag.appendChild(span);
    last = regex.lastIndex;
  }

  if (last < text.length) {
    frag.appendChild(document.createTextNode(text.slice(last)));
  }

  textNode.parentNode.replaceChild(frag, textNode);
}

// Walk all text nodes inside an element, skipping <code> (already styled by CSS)
function highlightInElement(el, regex) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      // Skip text inside <code> tags — they're handled by CSS
      if (node.parentElement.closest('code')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes = [];
  let n;
  while ((n = walker.nextNode())) nodes.push(n);
  nodes.forEach(node => highlightTextNode(node, regex));
}

function injectTocEnhancements(isDocPage) {
  if (!isDocPage) return;

  const regex = buildKeywordRegex();

  // 1. Highlight keywords in TOC link text
  const tocLinks = document.querySelectorAll('.markdown .table-of-contents li a');
  tocLinks.forEach(link => {
    if (link.dataset.highlighted) return;
    link.dataset.highlighted = '1';
    highlightInElement(link, regex);
  });

  // 2. Inject clickable "↑ list" link on each question heading
  const headings = document.querySelectorAll('.markdown h2');
  headings.forEach(h2 => {
    if (h2.querySelector('.back-to-list-link')) return;
    const link = document.createElement('a');
    link.href = '#';
    link.className = 'back-to-list-link';
    link.setAttribute('aria-label', 'Back to question list');
    link.textContent = '↑ list';
    link.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    h2.appendChild(link);
  });
}

// ─── Floating "Back to Questions" button ─────────────────────────────────────
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

// ─── Root wrapper ─────────────────────────────────────────────────────────────
export default function Root({ children }) {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const isDocPage = location.pathname.includes('/docs/');

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => injectTocEnhancements(isDocPage), 350);
    return () => clearTimeout(timer);
  }, [location.pathname, isDocPage]);

  return (
    <>
      {children}
      <BackToQuestionsButton visible={isDocPage && visible} />
    </>
  );
}
