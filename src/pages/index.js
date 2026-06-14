import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Translate from "@docusaurus/Translate";
import styles from './index.module.css';

const stats = [
  { value: '200+', label: 'Q&A' },
  { value: '6',    label: 'Topics' },
  { value: 'EN',   label: '+ FR' },
];

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className={styles.heroTitle}>
          <Translate>Interview Preparation</Translate>
        </h1>
        <p className={styles.heroSubtitle}>
          <Translate>Your complete guide to cracking Java &amp; Spring developer interviews</Translate>
        </p>

        <div className={styles.statsRow}>
          {stats.map((s, i) => (
            <div key={i} className={styles.statBadge}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/Java/oop">
            <Translate>Start Studying →</Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title="Interview Preparation"
      description="Complete Java, Spring, SQL, and DevOps interview preparation guide">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
