import React from 'react';
import CodeBlock from '@theme/CodeBlock';

const variables = {};

export const SetVar = ({ name, value }) => {
  variables[name] = value;
  return null;
};

export const Var = ({ name }) => {
  return <>{variables[name] || ''}</>;
};

export const VarLink = ({ name, path, children }) => {
  const value = variables[name] || '';
  const href = path.replace('{{VAR}}', value);
  return <a href={href}>{children}</a>;
};

export const VarCodeBlock = ({ codeVar, languageVar }) => {
  const code = variables[codeVar] || '';
  const language = variables[languageVar] || 'javascript';
  return <CodeBlock language={language}>{code}</CodeBlock>;
};

export default Var;