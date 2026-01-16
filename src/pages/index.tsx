import React, { useState } from 'react';
import styles from './index.module.css';
import Layout from '@theme/Layout';
import MakeYourArch from '../components/makeyourarch';


export default function App() {
    return (
        <Layout title='MakeYourArch' description='Make Your Own Flavored Arch'>
            <div className={styles.head}>
                <h1> Make Your Arch</h1>
                <h3> If you want something less custom, you can check alternatives</h3>
            </div>
            <MakeYourArch />
        </Layout>
    );
}
