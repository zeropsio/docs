import React from 'react';
import { InlineCode } from 'docs-ui';

interface Props {
  data: (string | string[])[];
}

export default function UnorderedCodeList({ data }: Props): JSX.Element {
  return (
    <ul>
      {data.map((token, index) => (
        <li key={index}>
          {Array.isArray(token) ? (
            // If token is an array, render each item in a separate <code> block
            token.map((item, subIndex) => (
              <React.Fragment key={subIndex}>
                <InlineCode>{item}</InlineCode>
                {subIndex < token.length - 1 && ', '}
              </React.Fragment>
            ))
          ) : (
            // If token is a string, render it in a single <code> block
            <InlineCode>{token}</InlineCode>
          )}
        </li>
      ))}
    </ul>
  );
}
