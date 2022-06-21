import React from 'react';
import Link from "next/link";
import styles from "../styles/Home.module.css"
import Head from "next/head";

export const Home = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>My Next Tutorial</title>
            </Head>
            <Link href="/about">About</Link>
            <h1 className={styles.homePageTitle}>Hello World</h1>
        </div>
    );
};

export default Home;