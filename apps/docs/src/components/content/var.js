import React from 'react';

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

export default Var;