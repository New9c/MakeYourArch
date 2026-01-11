import React, { useState, useEffect } from 'react';
import ArchBlock from '@site/src/components/ArchBlock';
import styles from './index.module.css';
import Layout from '@theme/Layout';

const WM_DATA = [
    {
        id: 'gnome',
        name: 'GNOME',
        pkg: 'gnome',
        docs: '/docs/gnome',
        // When GNOME is picked, auto-set these:
        defaults: {
            dm: 'gdm',
            terminal: 'gnome-terminal'
        }
    },
    {
        id: 'hyprland',
        name: 'Hyprland',
        pkg: 'hyprland',
        docs: '/docs/hyprland',
        defaults: {
            dm: 'sddm', // Often recommended for Wayland
            terminal: 'kitty'
        }
    }
];

const DM_DATA = [
    { id: 'sddm', name: 'SDDM', pkg: 'sddm', docs: '/docs/sddm-guide' },
    { id: 'gdm', name: 'GDM', pkg: 'gdm', docs: '/docs/gnome-setup' }
];

const TERM_DATA = [
    { id: 'alacritty', name: 'Alacritty', pkg: 'alacritty', docs: '/docs/terminal/Alacritty' },
    { id: 'kitty', name: 'Kitty', pkg: 'kitty', docs: '/docs/terminal/Kitty' }
];

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
    useEffect(() => {
        // 1. Find the data for the currently selected WM
        const selectedWm = WM_DATA.find(item => item.id === wm);

        // 2. If it has defaults, apply them!
        if (selectedWm && selectedWm.defaults) {
            if (selectedWm.defaults.dm) setDm(selectedWm.defaults.dm);
            if (selectedWm.defaults.terminal) setTerminal(selectedWm.defaults.terminal);
        }
    }, [wm]); // [wm] means "Only run this code when 'wm' changes"

    return (
        <Layout title='MakeYourArch' description='Make Your Own Flavored Arch'>
            <div className="container">
                <h1> Make Your Arch</h1>
                <h3> If you want something less custom, you can check alternatives</h3>
                <div className="grid">
                    <ArchBlock title="Window Manager" options={WM_DATA} selectedId={wm} onSelect={setWm} />
                    <ArchBlock title="Display Manager" options={DM_DATA} selectedId={dm} onSelect={setDm} />
                    <ArchBlock title="Terminal" options={TERM_DATA} selectedId={terminal} onSelect={setTerminal} />
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
