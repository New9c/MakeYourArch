import React, { useState, useEffect } from 'react';
import ArchBlock from '@site/src/components/ArchBlock';
import WMBlock from '@site/src/components/WMBlock';
import styles from './index.module.css';
import Layout from '@theme/Layout';
import { WM_DATA, DM_DATA, TERM_DATA } from '../data/database';


export default function MakeYourArch() {
    const [dm, setDm] = useState('');
    const [wm, setWm] = useState('');
    const [terminal, setTerminal] = useState('');

    // 1. Helper to get the package name from our data sets
    const getPkg = (list, id) => list.find(item => item.id === id)?.pkg;

    // 2. Create the array of selected packages
    const selectedPkgs = [
        getPkg(DM_DATA, dm),
        getPkg(WM_DATA, wm),
        getPkg(TERM_DATA, terminal)
    ].filter(Boolean); // This removes any 'undefined' entries if nothing is selected

    const fullCommand = `sudo pacman -S ${selectedPkgs.join(' ')}`;
    // The "Auto-Setter" Logic
    const selectedWm = WM_DATA.find(item => item.id === wm);

    useEffect(() => {
        // 1. Find the data for the currently selected WM
        const selectedWm = WM_DATA.find(item => item.id === wm);

        // 2. If it has defaults, apply them!
        setDm('')
        setTerminal('')
        if (selectedWm && selectedWm.forces) {
            if (selectedWm.forces.dm) setDm(selectedWm.forces.dm);
            if (selectedWm.forces.terminal) setTerminal(selectedWm.forces.terminal);
        }
    }, [wm]); // [wm] means "Only run this code when 'wm' changes"

    return (
        <Layout title='MakeYourArch' description='Make Your Own Flavored Arch'>
            <div className="container">
                <div className={styles.head}>
                    <h1> Make Your Arch</h1>
                    <h3> If you want something less custom, you can check alternatives</h3>
                </div>
                <div className={styles.grid}>
                    <WMBlock options={WM_DATA} selectedId={wm} onSelect={setWm} />
                    <ArchBlock title="Display Manager" options={DM_DATA} selectedId={dm}
                        onSelect={setDm} isForced={selectedWm?.forces && 'dm' in selectedWm.forces} WM={selectedWm} />
                    <ArchBlock title="Terminal" options={TERM_DATA} selectedId={terminal}
                        onSelect={setTerminal} isForced={selectedWm?.forces && 'terminal' in selectedWm.forces} WM={selectedWm} />
                </div>

                {/* 3. The Mega Command Bar */}
                {selectedPkgs.length > 0 && (
                    <div className={styles.megaCommandBar}>
                        <div className={styles.commandText}>
                            <code>{fullCommand}</code>
                        </div>
                        <button
                            onClick={() => navigator.clipboard.writeText(fullCommand)}
                            className={styles.megaCopyBtn}
                        >
                            Copy Full Install Command
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
}
