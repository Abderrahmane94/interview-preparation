import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';
import Translate from "@docusaurus/Translate";

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <h1 className="hero__title"><Translate>Interview Preparation</Translate></h1>
                <p className="hero__subtitle"><Translate>Be Ready For Your Job!</Translate></p>
            </div>
        </header>
    );
}

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`<Translate>Interview Preparation</Translate>`}
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
