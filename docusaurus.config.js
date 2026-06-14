// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Interview Preparation',
  tagline: 'Be Ready For Your Job!',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-test-site.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en','fr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
            //'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Interview Prep',
        logo: {
          alt: 'Interview Preparation Logo',
          src: 'img/prepa.png',
        },
        items: [
          // ── Java ──────────────────────────────────────────────
          {
            type: 'dropdown',
            label: '☕ Java',
            position: 'left',
            items: [
              { type: 'doc', docId: 'Java/basics',                    label: 'Basics' },
              { type: 'doc', docId: 'Java/oop',                       label: 'OOP' },
              { type: 'doc', docId: 'Java/collections',               label: 'Collections' },
              { type: 'doc', docId: 'Java/multithreading',            label: 'Multithreading' },
              { type: 'doc', docId: 'Java/generics-exception-handling', label: 'Generics & Exceptions' },
              { type: 'doc', docId: 'Java/advanced',                  label: 'Advanced' },
              { type: 'doc', docId: 'Java/new-in-8-11-17',           label: 'New in Java 8/11/17' },
              { type: 'doc', docId: 'Java/JEE',                       label: 'JEE' },
            ],
          },
          // ── Spring ────────────────────────────────────────────
          {
            type: 'dropdown',
            label: '🍃 Spring',
            position: 'left',
            items: [
              { type: 'doc', docId: 'Spring/spring-core',     label: 'Spring Core' },
              { type: 'doc', docId: 'Spring/spring-boot',     label: 'Spring Boot' },
              { type: 'doc', docId: 'Spring/spring-web',      label: 'Spring Web (MVC)' },
              { type: 'doc', docId: 'Spring/spring-data',     label: 'Spring Data (JPA)' },
              { type: 'doc', docId: 'Spring/spring-security', label: 'Spring Security' },
              { type: 'doc', docId: 'Spring/spring-test',     label: 'Spring Test' },
            ],
          },
          // ── DevOps ────────────────────────────────────────────
          {
            type: 'dropdown',
            label: '🛠️ DevOps',
            position: 'left',
            items: [
              { type: 'doc', docId: 'Docker/docker',           label: 'Docker' },
              { type: 'doc', docId: 'Kubernetes/kubernetes',   label: 'Kubernetes' },
              { type: 'doc', docId: 'Helm/helm',               label: 'Helm' },
              { type: 'doc', docId: 'Terraform/terraform',     label: 'Terraform' },
              { type: 'doc', docId: 'Git/Git',                 label: 'Git' },
              { type: 'doc', docId: 'Maven/maven',             label: 'Maven' },
              { type: 'doc', docId: 'Jenkins/Jenkins',         label: 'Jenkins' },
            ],
          },
          // ── Architecture ──────────────────────────────────────
          {
            type: 'dropdown',
            label: '🏗️ Architecture',
            position: 'left',
            items: [
              { type: 'doc', docId: 'Architecture&CleanCode/architecture-pattern', label: 'Architecture Patterns' },
              { type: 'doc', docId: 'UML/UML',                 label: 'UML' },
              { type: 'doc', docId: 'webServices/basics',      label: 'Web Services & API' },
            ],
          },
          // ── Front-End ─────────────────────────────────────────
          {
            type: 'dropdown',
            label: '🖥️ Front-End',
            position: 'left',
            items: [
              { type: 'doc', docId: 'Angular/basics',          label: 'Angular' },
            ],
          },
          // ── DB ────────────────────────────────────────────────
          {
            type: 'dropdown',
            label: '🗄️ DB',
            position: 'left',
            items: [
              { type: 'doc', docId: 'SQL/sql',                 label: 'SQL & Databases' },
            ],
          },
          // ── Agile ─────────────────────────────────────────────
          {
            type: 'dropdown',
            label: '🔄 Agile',
            position: 'left',
            items: [
              { type: 'doc', docId: 'Agile/scrum',             label: 'Agile & Scrum' },
            ],
          },
          // ── Soft Skills ───────────────────────────────────────
          {
            type: 'dropdown',
            label: '🧑‍💼 Soft Skills',
            position: 'left',
            items: [
              { type: 'doc', docId: 'Behavioral/basics',               label: 'Behavioral' },
              { type: 'doc', docId: 'Behavioral/questions-to-clients', label: 'Questions to Ask' },
            ],
          },
          // ── Right side ────────────────────────────────────────
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/Abderrahmane94/interview-preparation',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © 15-06-2026`,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
