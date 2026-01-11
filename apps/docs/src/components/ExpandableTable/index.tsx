// src/components/ExpandableTable/index.tsx
import React, { useState, useRef, useEffect, ReactNode } from 'react';
import styles from './styles.module.css';

interface ExpandableTableProps {
    children: ReactNode;
}

export default function ExpandableTable({ children }: ExpandableTableProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [height, setHeight] = useState<number | undefined>(undefined);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            const tableEl = containerRef.current.querySelector('table');
            if (tableEl) {
                setHeight(tableEl.offsetHeight);
            }
        }
    }, [children]);

    return (
        <div
            ref={containerRef}
            className={`${styles.tableContainer} ${isExpanded ? styles.expanded : ''}`}
            style={isExpanded ? { height } : undefined}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            {children}
        </div>
    );
}