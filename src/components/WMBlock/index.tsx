import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faGlobe } from '@fortawesome/free-solid-svg-icons';
import styles from './style.module.css';
import { TRAIT_LIB } from '../../data/traits';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';


interface Option {
    id: string;
    name: string;
    pkg: string;
    traits?: Array<string>;
    defaults?: Array<string>;

    hue?: number;
    title?: string;
    desc?: string;
    image?: string;

    docs?: string;
    site?: string;
    github?: string;
}

interface Props {
    options: Option[];
    selectedId: string;
    onSelect: (id: string) => void;
}

export function TraitIcon({ traitKey }) {
    const trait = TRAIT_LIB[traitKey];

    if (!trait) return null;

    return (
        <div className={styles.traitWrapper} title={trait.desc}>
            <FontAwesomeIcon
                icon={trait.icon}
                style={{ color: trait.color }}
                className={styles.icon}
            />
        </div>
    );
}

export default function WMBlock({ options, selectedId, onSelect }: Props) {
    const selectedData = options.find(o => o.id === selectedId);

    const isActive = !!selectedId;
    const blockStyle = isActive ? {
        backgroundColor: `hsl(${selectedData.hue ?? 210}, 70%, 50%, 10%)`, // Default Gray
        color: '#fff',
        border: `2px solid hsl(${selectedData.hue ?? 210}, 70%, 50%)`
    } : {
        backgroundColor: `hsl(0, 0%, 40%, 10%)`, // Default Gray
        color: '#fff'
    };

    return (
        <div className={styles.block} style={blockStyle}>
            <div className={styles.header}>
                <h2>{selectedData?.title ?? "Window Manager"}</h2>
                <select
                    value={selectedId}
                    onChange={(e) => onSelect(e.target.value)}
                    className={styles.select}
                >
                    <option value="">None</option>
                    {options.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.name}</option>
                    ))}
                </select>
            </div>
            <div className={styles.mainBody}>
                <div>
                    <div className={styles.traitContainer}>
                        {selectedData?.traits?.map(tKey => (
                            <TraitIcon key={tKey} traitKey={tKey} />
                        ))}
                    </div>
                    {isActive && selectedData?.desc && (
                        <h3>
                            {selectedData.desc}
                        </h3>
                    )}
                    {isActive && selectedData?.docs && (
                        <a href={selectedData.docs} className={styles.link} title="Quick Docs">
                            <FontAwesomeIcon icon={faBook} />
                        </a>
                    )}
                    {isActive && selectedData?.github && (
                        <a href={selectedData.github} className={styles.link} title="Github">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                    )}
                    {isActive && selectedData?.site && (
                        <a href={selectedData.site} className={styles.link} title="Github">
                            <FontAwesomeIcon icon={faGlobe} />
                        </a>
                    )}
                </div>
                {selectedData?.image && (
                    <div className={styles.imageWrapper} >
                        <img
                            src={selectedData.image}
                            alt={selectedData.name}
                            className={styles.previewImage}
                        />
                    </div>
                )}
            </div>

        </div>
    );
}
