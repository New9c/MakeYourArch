import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCopy } from '@fortawesome/free-solid-svg-icons';
import styles from './style.module.css';

interface Option {
    id: string;
    name: string;
    pkg: string;
    docs: string; // The specific doc link for this item
}

interface Props {
    title: string;
    options: Option[];
    selectedId: string;
    onSelect: (id: string) => void;
}

export default function ArchBlock({ title, options, selectedId, onSelect }: Props) {
    const selectedData = options.find(o => o.id === selectedId);
    const isActive = !!selectedId;

    const copyToClipboard = () => {
        if (selectedData) {
            navigator.clipboard.writeText(`sudo pacman -S ${selectedData.pkg}`);
        }
    };

    return (
        <div className={`${styles.block} ${isActive ? styles.active : ''}`}>
            <div className={styles.header}>
                <h3>{title}</h3>
                {/* Only show docs icon if an option is selected */}
                {isActive && selectedData?.docs && (
                    <a href={selectedData.docs} className={styles.docsLink} title="View Docs">
                        <FontAwesomeIcon icon={faBook} />
                    </a>
                )}
            </div>

            <select
                value={selectedId}
                onChange={(e) => onSelect(e.target.value)}
                className={styles.select}
            >
                <option value="">Choose {title}...</option>
                {options.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                ))}
            </select>

            {isActive && (
                <div className={styles.codeBox}>
                    <code>{selectedData?.pkg}</code>
                    <button onClick={copyToClipboard} className={styles.copyBtn}>
                        <FontAwesomeIcon icon={faCopy} />
                    </button>
                </div>
            )}
        </div>
    );
}
