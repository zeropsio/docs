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

export const IfVar = ({ name, children }) => {
  return variables[name] ? children : null;
};

export const VarLink = ({ name, path, children }) => {
  const value = variables[name] || '';
  const href = path.replace('{{VAR}}', value);
  return <a href={href}>{children}</a>;
};

export const VarCodeBlock = ({ codeVar, languageVar }) => {
  const codeTemplate = variables[codeVar] || '';
  const language = variables[languageVar] || 'javascript';

  let code = codeTemplate;
  Object.keys(variables).forEach(key => {
    const placeholder = `{{${key}}}`;
    code = code.split(placeholder).join(variables[key]);
  });

  return <CodeBlock language={language}>{code}</CodeBlock>;
};

export const VarReasons = ({ name }) => {
  const reasons = variables[name] || [];
  if (!Array.isArray(reasons) || reasons.length === 0) {
    return <p>If your application needs additional tools beyond the default environment, you'll need to build a custom runtime image.</p>;
  }

  return (
    <ul>
      {reasons.map((reason, index) => (
        <li key={index} dangerouslySetInnerHTML={{ __html: reason }} />
      ))}
    </ul>
  );
};

export default Var;