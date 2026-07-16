import { useState, useEffect, useMemo, useRef } from 'react';
import { useColorMode, useThemeConfig } from '@docusaurus/theme-common';
import mermaid from 'mermaid';

export const MermaidContainerClassName = 'docusaurus-mermaid-container';

const lightThemeVariables = {
  background: 'transparent',
  mainBkg: '#ECEFF3',
  primaryColor: '#ECEFF3',
  primaryTextColor: '#030712',
  primaryBorderColor: '#D1D5DB',
  nodeBorder: '#D1D5DB',
  lineColor: '#11181C',
  fontFamily: 'Inter',
  fontSize: '14.75px',
  tertiaryColor: '#F3F4F6',
  tertiaryBorderColor: '#D1D5DB',
  tertiaryTextColor: '#030712',
  clusterBkg: '#F3F4F6',
  edgeLabelBackground: '#ffffff',
};

const darkThemeVariables = {
  background: 'transparent',
  mainBkg: '#1e293b',
  primaryColor: '#1e293b',
  primaryTextColor: '#f8fafc',
  primaryBorderColor: '#64748b',
  nodeBorder: '#64748b',
  lineColor: '#94a3b8',
  fontFamily: 'Inter',
  fontSize: '14.75px',
  tertiaryColor: '#334155',
  tertiaryBorderColor: '#64748b',
  tertiaryTextColor: '#f8fafc',
  clusterBkg: '#1e293b',
  edgeLabelBackground: '#1e293b',
  textColor: '#f8fafc',
  secondaryColor: '#334155',
  secondaryTextColor: '#e2e8f0',
  secondaryBorderColor: '#64748b',
};

export function useMermaidThemeConfig() {
  return useThemeConfig().mermaid;
}

export function useMermaidConfig() {
  const { colorMode } = useColorMode();
  const mermaidThemeConfig = useMermaidThemeConfig();
  const theme = mermaidThemeConfig.theme[colorMode];
  const { options } = mermaidThemeConfig;

  return useMemo(() => {
    const { themeVariables: _ignored, ...restOptions } = options;

    return {
      startOnLoad: false,
      ...restOptions,
      theme,
      themeVariables:
        colorMode === 'dark' ? darkThemeVariables : lightThemeVariables,
    };
  }, [theme, options, colorMode]);
}

function useMermaidId() {
  return useRef(`mermaid-svg-${Math.round(Math.random() * 10000000)}`).current;
}

async function renderMermaid({ id, text, config }) {
  mermaid.mermaidAPI.initialize(config);
  try {
    return await mermaid.render(id, text);
  } catch (e) {
    document.querySelector(`#d${id}`)?.remove();
    throw e;
  }
}

export function useMermaidRenderResult({ text, config: providedConfig }) {
  const [result, setResult] = useState(null);
  const id = useMermaidId();
  const defaultMermaidConfig = useMermaidConfig();
  const config = providedConfig ?? defaultMermaidConfig;

  useEffect(() => {
    renderMermaid({ id, text, config })
      .then(setResult)
      .catch((e) => {
        setResult(() => {
          throw e;
        });
      });
  }, [id, text, config]);

  return result;
}
