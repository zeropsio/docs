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

const RecipeZeropsYaml: React.FC<RecipeZeropsYamlProps> = ({ initialYaml }) => {
  const [yamlContent, setYamlContent] = useState<string>(initialYaml || '');
  const [selectedExampleIndex, setSelectedExampleIndex] = useState<number>(-1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownListRef = useRef<HTMLDivElement>(null);

  // Default minimal YAML template
  const defaultYaml = `zerops:
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

  // Set initial example on component mount
  useEffect(() => {
    // Use default YAML as initial content
    setYamlContent(defaultYaml);
  }, []);

  // Update the useEffect to scroll highlighted items into view
  useEffect(() => {
    // Only execute if dropdown is open and we have a valid highlighted index
    if (isDropdownOpen && highlightedIndex >= 0 && dropdownListRef.current) {
      // Find the highlighted element
      const highlightedElement = dropdownListRef.current.children[highlightedIndex] as HTMLElement;
      
      if (highlightedElement) {
        // Scroll the element into view
        const listRect = dropdownListRef.current.getBoundingClientRect();
        const elementRect = highlightedElement.getBoundingClientRect();
        
        // Check if element is outside the visible area
        if (elementRect.bottom > listRect.bottom) {
          // Element is below visible area, scroll down
          highlightedElement.scrollIntoView({ block: 'end', behavior: 'auto' });
        } else if (elementRect.top < listRect.top) {
          // Element is above visible area, scroll up
          highlightedElement.scrollIntoView({ block: 'start', behavior: 'auto' });
        }
      }
    }
  }, [highlightedIndex, isDropdownOpen]);

  // Filter examples based on search term
  const filteredExamples = examples.filter(example => 
    example.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setIsDropdownOpen(true);
    
    // If backspace clears all text, reset the selected example
    if (event.target.value === '') {
      setSelectedExampleIndex(-1);
      setHighlightedIndex(-1); // Reset highlighted index
    } else {
      // Automatically highlight the first result when searching
      setHighlightedIndex(0);
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    setIsDropdownOpen(true);
    // Clear search term when focusing
    setSearchTerm('');
    
    // Automatically highlight the first option when dropdown opens
    setHighlightedIndex(0);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
    // Allow dropdown to stay open briefly to handle clicks
    setTimeout(() => {
      if (!searchRef.current?.contains(document.activeElement)) {
        setIsDropdownOpen(false);
      }
    }, 150);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // If user presses Backspace or Delete, and there's a selection but no search term
    if ((event.key === 'Backspace' || event.key === 'Delete') && searchTerm === '' && selectedExampleIndex !== -1) {
      setSelectedExampleIndex(-1);
      setYamlContent(defaultYaml);
      return;
    }
    
    // Handle arrow key navigation in dropdown
    if (isDropdownOpen) {
      // When searching, there is no default option
      const hasDefaultOption = !searchTerm;
      const maxIndex = filteredExamples.length + (hasDefaultOption ? 0 : -1);
      
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          // If nothing is highlighted yet, select the first option
          if (highlightedIndex === -1) {
            setHighlightedIndex(0);
          } else {
            setHighlightedIndex(prev => (prev < maxIndex ? prev + 1 : 0));
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          // If nothing is highlighted yet, select the first option
          if (highlightedIndex === -1) {
            setHighlightedIndex(0);
          } else {
            setHighlightedIndex(prev => (prev > 0 ? prev - 1 : maxIndex));
          }
          break;
        case 'Enter':
          event.preventDefault();
          // If nothing is highlighted but we have search results, select the first one
          if (highlightedIndex === -1 && filteredExamples.length > 0) {
            // Select the first result
            const originalIndex = examples.findIndex(ex => ex.name === filteredExamples[0].name);
            handleExampleSelect(originalIndex);
            return;
          }
          
          if (hasDefaultOption && highlightedIndex === 0) {
            // Default option
            handleExampleSelect(-1);
          } else {
            // Adjust the index based on whether we have a default option
            const adjustedIndex = hasDefaultOption ? highlightedIndex - 1 : highlightedIndex;
            if (adjustedIndex >= 0 && adjustedIndex < filteredExamples.length) {
              // Find the actual index in the original examples array
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
    }
  };

  const handleExampleSelect = (index: number) => {
    setSelectedExampleIndex(index);
    
    if (index === -1) {
      // Default template selected
      setYamlContent(defaultYaml);
    } else if (examples[index]) {
      // Example from the examples.json
      setYamlContent(examples[index].config);
    }
    
    setIsDropdownOpen(false); // Close dropdown immediately
    setSearchTerm(''); // Clear search term
    setHighlightedIndex(-1); // Reset highlighted index
    
    // Ensure input loses focus to prevent immediate reopening
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
            if (line.includes(':')) {
              const [key, value] = line.split(':');
              if (value && value.trim()) {
                // Check for boolean values
                const trimmedValue = value.trim();
                if (trimmedValue === 'true' || trimmedValue === 'false') {
                  return (
                    <div key={`line-${index}`} className={styles.codeLine}>
                      <span className={styles.yamlKey}>{key}:</span>
                      <span className={styles.yamlBoolean}>{value}</span>
                    </div>
                  );
                } else {
                  return (
                    <div key={`line-${index}`} className={styles.codeLine}>
                      <span className={styles.yamlKey}>{key}:</span>
                      <span className={styles.yamlValue}>{value}</span>
                    </div>
                  );
                }
              } else {
                return (
                  <div key={`line-${index}`} className={styles.codeLine}>
                    <span className={styles.yamlKey}>{key}:</span>
                  </div>
                );
              }
            } else if (line.includes('-')) {
              const dashPart = line.slice(0, line.indexOf('-') + 1);
              const restPart = line.slice(line.indexOf('-') + 1);
              return (
                <div key={`line-${index}`} className={styles.codeLine}>
                  <span className={styles.yamlIndent}>{dashPart}</span>
                  <span className={styles.yamlValue}>{restPart}</span>
                </div>
              );
            }
            
            return <div key={`line-${index}`} className={styles.codeLine}>{line}</div>;
          })}
        </div>
      </div>
    );
  };

  // Copy YAML to clipboard with visual feedback
  const copyToClipboard = () => {
    navigator.clipboard.writeText(yamlContent).then(() => {
      setIsCopied(true);
      // Reset copied state after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
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