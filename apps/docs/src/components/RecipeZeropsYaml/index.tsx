import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import examples from '@site/static/examples.json';

interface ExampleTemplate {
  name: string;
  url?: string;
  config: string;
}

interface RecipeZeropsYamlProps {
  initialYaml?: string;
}

// Default minimal YAML template
const DEFAULT_YAML = `zerops:
  - setup: app
    build:
      base: nodejs@20
      buildCommands:
        - pnpm i
        - pnpm build
      deployFiles:
        - dist
    run:
      base: nodejs@20
      ports:
        - port: 3000
          httpSupport: true
      start: node dist/analog/server/index.mjs`;

const RecipeZeropsYaml: React.FC<RecipeZeropsYamlProps> = ({ initialYaml = DEFAULT_YAML }) => {
  const [yamlContent, setYamlContent] = useState<string>(initialYaml);
  const [selectedExampleIndex, setSelectedExampleIndex] = useState<number>(-1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownListRef = useRef<HTMLDivElement>(null);

  // Set initial example on component mount
  useEffect(() => {
    // Use default YAML as initial content
    setYamlContent(DEFAULT_YAML);
  }, []);

  // Update the useEffect to scroll highlighted items into view
  useEffect(() => {
    // Only execute if dropdown is open and we have a valid highlighted index
    if (isDropdownOpen && highlightedIndex >= 0 && dropdownListRef.current) {
      // Find the highlighted element
      const highlightedElement = dropdownListRef.current.children[highlightedIndex] as HTMLElement;
      
      if (highlightedElement) {
        // Get the container's scroll position and dimensions
        const container = dropdownListRef.current;
        const containerRect = container.getBoundingClientRect();
        const elementRect = highlightedElement.getBoundingClientRect();
        
        // Calculate if the element is outside the visible area
        const isBelow = elementRect.bottom > containerRect.bottom;
        const isAbove = elementRect.top < containerRect.top;
        
        if (isBelow || isAbove) {
          // Calculate the scroll position needed to center the element
          const scrollTop = highlightedElement.offsetTop - (containerRect.height / 2) + (elementRect.height / 2);
          
          // Smoothly scroll the container
          container.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
          });
        }
      }
    }
  }, [highlightedIndex, isDropdownOpen]);

  // Filter examples based on search term
  const filteredExamples = examples.filter(example => 
    example.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    setIsDropdownOpen(true);
    
    if (value === '') {
      setSelectedExampleIndex(-1);
      setHighlightedIndex(-1);
    } else {
      setHighlightedIndex(0);
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    setIsDropdownOpen(true);
    setSearchTerm('');
    setHighlightedIndex(0);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
    // Use a ref to track the timeout
    const timeoutId = setTimeout(() => {
      if (!searchRef.current?.contains(document.activeElement)) {
        setIsDropdownOpen(false);
      }
    }, 150);

    return () => clearTimeout(timeoutId);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen) return;

    const { key } = event;
    
    // Handle backspace/delete when no search term
    if ((key === 'Backspace' || key === 'Delete') && !searchTerm && selectedExampleIndex !== -1) {
      setSelectedExampleIndex(-1);
      setYamlContent(DEFAULT_YAML);
      return;
    }
    
    const hasDefaultOption = !searchTerm;
    const maxIndex = filteredExamples.length + (hasDefaultOption ? 0 : -1);
    
    switch (key) {
      case 'ArrowDown':
        event.preventDefault();
        setHighlightedIndex(prev => prev === -1 ? 0 : (prev < maxIndex ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setHighlightedIndex(prev => prev === -1 ? 0 : (prev > 0 ? prev - 1 : maxIndex));
        break;
      case 'Enter':
        event.preventDefault();
        if (highlightedIndex === -1 && filteredExamples.length > 0) {
          const originalIndex = examples.findIndex(ex => ex.name === filteredExamples[0].name);
          handleExampleSelect(originalIndex);
          return;
        }
        
        if (hasDefaultOption && highlightedIndex === 0) {
          handleExampleSelect(-1);
        } else {
          const adjustedIndex = hasDefaultOption ? highlightedIndex - 1 : highlightedIndex;
          if (adjustedIndex >= 0 && adjustedIndex < filteredExamples.length) {
            const filteredExample = filteredExamples[adjustedIndex];
            const originalIndex = examples.findIndex(ex => ex.name === filteredExample.name);
            handleExampleSelect(originalIndex);
          }
        }
        break;
      case 'Escape':
        event.preventDefault();
        setIsDropdownOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleExampleSelect = (index: number) => {
    setSelectedExampleIndex(index);
    setYamlContent(index === -1 ? DEFAULT_YAML : (examples[index]?.config || DEFAULT_YAML));
    setIsDropdownOpen(false);
    setSearchTerm('');
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get the selected example name
  const getInputValue = () => {
    if (searchTerm) {
      return searchTerm;
    }
    
    if (isInputFocused) {
      return ''; // Empty when focused to allow proper backspace
    }
    
    if (selectedExampleIndex === -1) {
      return 'Analog Node.js';
    } else if (examples[selectedExampleIndex]) {
      return examples[selectedExampleIndex].name;
    }
    
    return '';
  };

  // Format YAML with syntax highlighting and line numbers
  const formatYaml = () => {
    const lines = yamlContent.split('\n');
    
    return (
      <div className={styles.codeWithLineNumbers}>
        <div className={styles.lineNumbers}>
          {lines.map((_, index) => (
            <div key={`line-num-${index}`}>{index + 1}</div>
          ))}
        </div>
        <div className={styles.codeContent}>
          {lines.map((line, index) => {
            // Handle empty lines
            if (!line.trim()) {
              return <div key={`line-${index}`} className={styles.codeLine}>&nbsp;</div>;
            }

            // Handle key-value pairs
            if (line.includes(':')) {
              const [key, ...valueParts] = line.split(':');
              const value = valueParts.join(':').trim();
              
              if (value) {
                const isBoolean = value === 'true' || value === 'false';
                return (
                  <div key={`line-${index}`} className={styles.codeLine}>
                    <span className={styles.yamlKey}>{key}:</span>
                    <span className={isBoolean ? styles.yamlBoolean : styles.yamlValue}>
                      {value}
                    </span>
                  </div>
                );
              }
              
              return (
                <div key={`line-${index}`} className={styles.codeLine}>
                  <span className={styles.yamlKey}>{key}:</span>
                </div>
              );
            }

            // Handle list items
            if (line.includes('-')) {
              const dashIndex = line.indexOf('-');
              const indent = line.slice(0, dashIndex);
              const content = line.slice(dashIndex);
              
              return (
                <div key={`line-${index}`} className={styles.codeLine}>
                  <span className={styles.yamlIndent}>{indent}</span>
                  <span className={styles.yamlValue}>{content}</span>
                </div>
              );
            }

            // Handle regular lines
            return (
              <div key={`line-${index}`} className={styles.codeLine}>
                {line}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Copy YAML to clipboard with visual feedback
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(yamlContent);
      setIsCopied(true);
      const timeoutId = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timeoutId);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={styles.zeropsContainer}>
      <div className={styles.optionsContainer}>
        {/* Searchable Example Selector */}
        <div className={styles.selectorContainer}>
          <label htmlFor="example-search" className={styles.selectorLabel}>
            Select Recipe
          </label>
          <div className={styles.searchContainer} ref={searchRef}>
            <input
              id="example-search"
              ref={inputRef}
              type="text"
              className={styles.searchInput}
              placeholder="Search recipes or click to browse..."
              value={getInputValue()}
              onChange={handleSearchChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
            />
            <span className={styles.searchIcon}>▼</span>
            
            {isDropdownOpen && (
              <div className={styles.dropdownList} ref={dropdownListRef}>
                {/* Only show default option when not searching */}
                {!searchTerm && (
                  <div 
                    className={`${styles.dropdownItem} ${selectedExampleIndex === -1 ? styles.selected : ''} ${highlightedIndex === 0 ? styles.highlighted : ''}`}
                    onClick={() => handleExampleSelect(-1)}
                    onMouseEnter={() => setHighlightedIndex(0)}
                  >
                    Analog Node.js
                  </div>
                )}
                {filteredExamples.map((example, filteredIndex) => {
                  // Find the actual index in the original examples array
                  const originalIndex = examples.findIndex(ex => ex.name === example.name);
                  // When searching, adjust the highlight index (no default item)
                  const adjustedHighlightIndex = searchTerm ? filteredIndex : filteredIndex + 1;
                  return (
                    <div 
                      key={originalIndex} 
                      className={`${styles.dropdownItem} 
                        ${selectedExampleIndex === originalIndex ? styles.selected : ''} 
                        ${highlightedIndex === adjustedHighlightIndex ? styles.highlighted : ''}`}
                      onClick={() => handleExampleSelect(originalIndex)}
                      onMouseEnter={() => setHighlightedIndex(adjustedHighlightIndex)}
                    >
                      {example.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className={styles.codeContainer}>
        <div className={styles.codeHeader}>
          <div className={styles.fileName}>zerops.yml</div>
          {/* Use the Analog Node.js GitHub repo URL for default template */}
          <a 
            href={selectedExampleIndex !== -1 && examples[selectedExampleIndex]?.url 
              ? examples[selectedExampleIndex].url 
              : "https://github.com/zeropsio/recipe-analog-nodejs"}
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.sourceRecipeLink}
          >
            source recipe ↗
          </a>
        </div>
        <div className={styles.codeViewContent}>
          <button 
            onClick={copyToClipboard}
            className={styles.copyButton}
            title="Copy YAML to clipboard"
          >
            {isCopied ? 'copied!' : 'copy'}
          </button>
          <pre className={styles.codePre}>
            <code>
              {formatYaml()}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default RecipeZeropsYaml; 