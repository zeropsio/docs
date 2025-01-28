import React from 'react';

const ComparisonSection = ({ title, items, type }) => (
  <div className="flex-1">
    <h4 className={`flex items-center gap-1 mb-1 ${type === 'pros' ? 'text-[#2F7B6E]' : 'text-[#925A61]'}`}>
      {title}
    </h4>
    <ul className="list-none p-0 m-0 flex flex-col gap-0.5">
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-0.5">
          <div className="w-0.5 min-w-0.5 shrink-0 aspect-square rounded-full bg-gray-400 flex items-center justify-center scale-75" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ComparisonCard = ({ pros, cons }) => (
  <div className="card mb-1">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 px-1 pt-1 pb-1">
      <ComparisonSection title="Advantages" items={pros} type="pros" />
      <ComparisonSection title="Limitations" items={cons} type="cons" />
    </div>
  </div>
);

const DevelopmentEnvironmentComparison = () => {
  return (
    <div className="grid">
      <div className="min-w-[250px] flex flex-col gap-1">
        <div className="text-lg font-medium mb-0.5 mt-1 text-[var(--docs-fg-base)]">Containers</div>
        <ComparisonCard
          pros={[
            'Start coding in minutes',
            'Easy to switch between projects',
            'Share exact setup with teammates',
            'Low resource usage on your machine'
          ]}
          cons={[
            'Some things (like debugging) might need extra setup',
            'Can\'t run different operating systems'
          ]}
        />

        <div className="text-lg font-medium mb-0.5 text-[var(--docs-fg-base)]">Virtual Machines</div>
        <ComparisonCard
          pros={[
            'Complete isolation with own kernel',
            'Can run any OS you need',
            'More like a "real" server',
            'Run almost anything with standard install instructions'
          ]}
          cons={[
            'Slower startup (full kernel boot required)',
            'Higher resource overhead',
            'Need restart for vertical scaling',
            'Can\'t decrease disk size once allocated'
          ]}
        />
      </div>
    </div>
  );
};

export default DevelopmentEnvironmentComparison;