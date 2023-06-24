import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <h1 className="hero__title">{siteConfig.title}</h1>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
            </div>
        </header>
    );
}

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`${siteConfig.title}`}
            description="Description will go into a meta tag in <head />">
            <HomepageHeader/>
            <main>
                <h2 style={{color:"grey", display: "flex", justifyContent:'center', alignItems:'center', padding: "2rem 0", width: "100%"}}>
                    Behavioral - Java - Spring Core - Spring Boot - Spring Data - Spring Web - Spring Security - Spring Test <br/></h2>
                <h2 style={{color:"grey", display: "flex", justifyContent:'center', alignItems:'center', width: "100%"}}>
                    Agile - Angular - Maven - SQL - Jenkins - Docker - Git
                </h2>
            </main>
        </Layout>
    );
}
