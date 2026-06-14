import React, { useEffect, useState } from 'react';
import { useLocation } from '@docusaurus/router';

// ─── Predefined keywords (exact + concept) ───────────────────────────────────
const KEYWORDS = [
  // Java core
  'OOP','SOLID','AOP','IoC','DI','JPA','ORM','JVM','JDK','JRE',
  'ArrayList','LinkedList','HashMap','HashSet','TreeMap','TreeSet',
  'ConcurrentHashMap','LinkedHashMap','LinkedHashSet','PriorityQueue',
  'BeanFactory','ApplicationContext','DispatcherServlet',
  'Thread','Runnable','Callable','ExecutorService','FutureTask',
  'Optional','Stream','Lambda','Iterator',
  'EJB','JSF','CDI','MDB',
  // Spring
  'Spring','Hibernate','Actuator','AutoConfiguration',
  // Web / API
  'REST','RESTful','SOAP','HTTP','API','JWT','CORS','AMQP',
  'RabbitMQ','idempotent','microservice','Monolithic',
  'PUT','PATCH','POST','DELETE','GET',
  // DB
  'SQL','NoSQL','MVC','CQRS','JPQL','JDBC',
  // DevOps / Tools
  'Docker','Jenkins','Maven','Gradle','Git','SVN','CI/CD',
  'Scrum','Agile','Kanban','Waterfall','Sprint','Backlog','DevOps',
  'Container','Kubernetes','Pipeline','Angular',
  // OOP concepts
  'polymorphism','encapsulation','abstraction','inheritance','composition',
  'overloading','overriding','aggregation','association',
  'deadlock','singleton','immutable','serialization','reflection',
  // Design patterns
  'Factory','Observer','Strategy','Decorator','Facade','Adapter',
  'Builder','Prototype','Composite','Proxy','Command','Template',
  // Architecture
  'coupling','cohesion','transaction','indexing','normalization','annotation',
  // Behavioral / HR keywords
  'project','customer','client','colleague','problem','solution',
  'conflict','disagreement','qualities','weakness','weaknesses','strengths',
  'degree','culture','hire','career','cancelled','blocked','ticket',
  'developer','company','technical','experience','proud','react',
  // Agile
  'methodology','Sprint','Backlog','Master','Story','velocity','retrospective',
  // Git/Docker
  'merge','rebase','branching','Container','virtual','machine',
  // Clean code
  'legacy','refactor','coupling','cohesion','YAGNI','DRY','KISS',
];

// ─── Stop words (filtered out in fallback mode) ───────────────────────────────
const STOP_WORDS = new Set([
  'what','how','why','when','where','who','which','whose',
  'is','are','was','were','be','been','being',
  'do','does','did','have','has','had','will','would','could','should','can','may',
  'a','an','the',
  'i','you','we','they','it','he','she','me','us','them',
  'my','your','our','their','its',
  'in','of','on','at','to','for','with','by','as','from','between','about','into',
  'and','or','but','if','than','that','this','these','those','so','nor',
  'give','tell','describe','explain','define','see','make','get','know','need','use',
  'some','any','all','not','only','also','there','here','then',
  'good','best','most','more','less','one','time','way','type','different',
  'example','situation','case','work','work','used','uses','using',
  'java', // too generic — appears in every Java doc heading
]);

// ─── Build combined regex from keyword list ───────────────────────────────────
function buildKeywordRegex() {
  const escaped = KEYWORDS
    .map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .sort((a, b) => b.length - a.length); // longest first to avoid partial matches
  return new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi');
}

// ─── Fallback: pick 1-2 meaningful words from stop-word-filtered text ─────────
function buildFallbackRegex(linkEl) {
  const raw = linkEl.textContent
    .toLowerCase()
    .replace(/[^a-záàâäãåéèêëíìîïóòôöõúùûüýÿñç\s]/g, ' ');

  const words = raw
    .split(/\s+/)
    .filter(w => w.length >= 4 && !STOP_WORDS.has(w));

  if (!words.length) return null;

  // Prefer longer words (more specific), take up to 2
  const picks = [...new Set(words)]
    .sort((a, b) => b.length - a.length)
    .slice(0, 2);

  const escaped = picks.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi');
}

// ─── Wrap matched text in a text node with <span class="toc-keyword"> ─────────
function wrapMatches(textNode, regex, cssClass) {
  const text = textNode.nodeValue;
  if (!regex.test(text)) return false;
  regex.lastIndex = 0;

  const frag = document.createDocumentFragment();
  let last = 0, match, wrapped = false;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) frag.appendChild(document.createTextNode(text.slice(last, match.index)));
    const span = document.createElement('span');
    span.className = cssClass;
    span.textContent = match[0];
    frag.appendChild(span);
    last = regex.lastIndex;
    wrapped = true;
  }
  if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
  textNode.parentNode.replaceChild(frag, textNode);
  return wrapped;
}

// Walk text nodes in el, skipping <code> and already-highlighted spans
function highlightInElement(el, regex, cssClass = 'toc-keyword') {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const p = node.parentElement;
      if (p.closest('code') || p.classList.contains('toc-keyword') || p.classList.contains('toc-fallback'))
        return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes = [];
  let n;
  while ((n = walker.nextNode())) nodes.push(n);
  let anyWrapped = false;
  nodes.forEach(node => { if (wrapMatches(node, regex, cssClass)) anyWrapped = true; });
  return anyWrapped;
}

// ─── Main enhancement function ────────────────────────────────────────────────
function injectTocEnhancements(isDocPage) {
  if (!isDocPage) return;

  const kwRegex = buildKeywordRegex();

  // 1. Highlight all TOC links
  document.querySelectorAll('.markdown .table-of-contents li a').forEach(link => {
    if (link.dataset.highlighted) return;
    link.dataset.highlighted = '1';

    // Try predefined keywords first
    const hit = highlightInElement(link, kwRegex, 'toc-keyword');

    // Fallback: if no predefined keyword matched AND no <code> exists, find key nouns
    if (!hit && !link.querySelector('code')) {
      const fallback = buildFallbackRegex(link);
      if (fallback) highlightInElement(link, fallback, 'toc-fallback');
    }
  });

  // 2. Inject clickable "↑ list" links on each question heading
  document.querySelectorAll('.markdown h2').forEach(h2 => {
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

// ─── Back to questions floating button ───────────────────────────────────────
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

// ─── Custom sidebar toggle button ─────────────────────────────────────────────
function SidebarToggleButton({ isDocPage }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!isDocPage) return;

    // Watch the sidebar container for hidden/visible state
    const observer = new MutationObserver(() => {
      const sidebar = document.querySelector('.theme-doc-sidebar-container');
      if (sidebar) {
        // Docusaurus adds --hidden modifier class when collapsed
        const hidden = [...sidebar.classList].some(c => c.includes('hidden') || c.includes('Hidden'));
        setIsCollapsed(hidden);
      }
    });

    observer.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    });

    // Read initial state
    const sidebar = document.querySelector('.theme-doc-sidebar-container');
    if (sidebar) {
      const hidden = [...sidebar.classList].some(c => c.includes('hidden') || c.includes('Hidden'));
      setIsCollapsed(hidden);
    }

    return () => observer.disconnect();
  }, [isDocPage]);

  const toggle = () => {
    // Try aria-label selector first, fall back to class-name selector
    const btn =
      document.querySelector('button[aria-label="Collapse sidebar"]') ||
      document.querySelector('button[aria-label="Expand sidebar"]') ||
      document.querySelector('button[class*="collapseSidebarButton"]');
    if (btn) btn.click();
  };

  if (!isDocPage) return null;

  return (
    <button
      onClick={toggle}
      className={`sidebar-custom-toggle ${isCollapsed ? 'sidebar-custom-toggle--collapsed' : ''}`}
      title={isCollapsed ? 'Show sidebar' : 'Hide sidebar'}
      aria-label={isCollapsed ? 'Show sidebar' : 'Hide sidebar'}
    >
      {isCollapsed ? (
        <>
          <span className="sct-icon">▶</span>
          <span className="sct-label">Menu</span>
        </>
      ) : (
        <>
          <span className="sct-icon">◀</span>
          <span className="sct-label">Hide</span>
        </>
      )}
    </button>
  );
}

// ─── Root wrapper ─────────────────────────────────────────────────────────────
export default function Root({ children }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isDocPage = location.pathname.includes('/docs/');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => injectTocEnhancements(isDocPage), 350);
    return () => clearTimeout(t);
  }, [location.pathname, isDocPage]);

  return (
    <>
      {children}
      <BackToQuestionsButton visible={isDocPage && scrolled} />
      <SidebarToggleButton isDocPage={isDocPage} />
    </>
  );
}
