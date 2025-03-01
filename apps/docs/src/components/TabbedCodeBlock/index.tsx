// TabbedCodeBlocks.jsx
import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

/**
 * Component for displaying code blocks with tabs
 * @param {Object} props
 * @param {Array} props.tabs - Array of tab objects { label, code, language, title }
 * @param {string} props.defaultTab - Label of the default selected tab
 */
const TabbedCodeBlocks = ({ tabs, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || (tabs.length > 0 ? tabs[0].label : ''));

  const handleTabChange = (tabLabel) => {
    setActiveTab(tabLabel);
  };

  // Find the currently active tab object
  const activeTabData = tabs.find(tab => tab.label === activeTab) || tabs[0];

  return (
    <div className={styles.tabbedCodeContainer}>
      <div className={styles.tabsHeader}>
        {tabs.map(tab => (
          <button
            key={tab.label}
            className={`${styles.tabButton} ${activeTab === tab.label ? styles.activeTab : ''}`}
            onClick={() => handleTabChange(tab.label)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.codeBlockWrapper}>
        <CodeBlock
          className={`language-${activeTabData.language || 'yaml'}`}
          title={activeTabData.title || activeTabData.label}
        >
          {activeTabData.code}
        </CodeBlock>
      </div>
    </div>
  );
};

export default TabbedCodeBlocks;