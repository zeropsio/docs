import React from 'react';
import { InlineCode } from 'docs-ui';

interface Props {
  data: (string | string[])[];
}

// Helper function to split text into code and comment parts
const splitCodeAndComment = (text: string): { code: string; comment: string | null } => {
  const match = text.match(/^(.+?)(\s*\([^)]+\))$/);
  if (match) {
    return {
      code: match[1].trim(),
      comment: match[2].trim()
    };
  }
  return {
    code: text,
    comment: null
  };
};

export default function UnorderedCodeList({ data }: Props): JSX.Element {
  return (
    <ul>
      {data.map((token, index) => (
        <li key={index}>
          {Array.isArray(token) ? (
            // If token is an array, handle each item separately
            token.map((item, subIndex) => {
              const { code, comment } = splitCodeAndComment(item);
              return (
                <React.Fragment key={subIndex}>
                  <InlineCode>{code}</InlineCode>
                  {comment && <span className="text-gray-400 ml-0.5">{comment}</span>}
                  {subIndex < token.length - 1 && ', '}
                </React.Fragment>
              );
            })
          ) : (
            // If token is a string, handle single item
            (() => {
              const { code, comment } = splitCodeAndComment(token);
              return (
                <>
                  <InlineCode>{code}</InlineCode>
                  {comment && <span className="text-gray-400 ml-1">{comment}</span>}
                </>
              );
            })()
          )}
        </li>
      ))}
    </ul>
  );
}