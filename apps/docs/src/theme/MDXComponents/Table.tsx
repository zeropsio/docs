import React from 'react';

type Props = React.TableHTMLAttributes<HTMLTableElement>;

export default function Table({ children, ...props }: Props): JSX.Element {
  return (
    <div className="table-scroll-wrapper">
      <table {...props}>{children}</table>
    </div>
  );
}
