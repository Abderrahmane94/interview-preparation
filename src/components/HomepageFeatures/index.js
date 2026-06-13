import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    emoji: '☕',
    title: 'Java Core',
    description:
      'OOP, generics, exceptions, multithreading, and collections — from theory to interview-ready answers.',
  },
  {
    emoji: '🍃',
    title: 'Spring Framework',
    description:
      'Spring Core (IoC/DI/AOP), Spring Boot, Spring Data JPA, Spring Security, and Spring MVC.',
  },
  {
    emoji: '🗄️',
    title: 'SQL & Databases',
    description:
      'SQL joins, indexes, transactions, stored procedures, and query optimization techniques.',
  },
  {
    emoji: '🏗️',
    title: 'Architecture & Clean Code',
    description:
      'Design patterns, SOLID principles, clean code practices, and architectural patterns like MVC.',
  },
  {
    emoji: '🧑‍💼',
    title: 'Behavioral',
    description:
      'How to present yourself, questions to ask employers, and proven tips to succeed in IT interviews.',
  },
  {
    emoji: '🛠️',
    title: 'DevOps & Tools',
    description:
      'Git, Maven, Docker, Jenkins, Agile/Scrum, Angular — everything a senior developer is expected to know.',
  },
];

function Feature({ emoji, title, description }) {
  return (
    <div className={clsx('col col--4', styles.featureCard)}>
      <div className={styles.featureEmoji}>{emoji}</div>
      <div className="padding-horiz--md">
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Topics Covered</h2>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
