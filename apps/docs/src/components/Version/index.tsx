import React from 'react';

const serviceVersions = {
  typesense: {
    current: '27.1',
    supported: ['27.1']
  }
};

export const TypesenseVersions = () => {
  const versionString = `typesense@${serviceVersions.typesense.current}`;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-4">Supported Versions</h2>
        <p>Currently supported Typesense version:</p>
        <ul className="list-disc pl-6 mb-4">
          <li><code>{versionString}</code></li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2">Service Import</h3>
        <p className="mb-2">
          To deploy Typesense in your project, include the following configuration in your <code>import.yml</code>:
        </p>
        <div className="relative">
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">
              {`services:
  - hostname: YOUR_HOSTNAME_HERE  # e.g. typesense0
    type: ${versionString}
    mode: NON_HA`}
            </code>
          </pre>
        </div>
        <p className="mt-2 text-sm">You can also deploy in HA mode by setting <code>mode: HA</code>.</p>
      </div>
    </div>
  );
};

export default TypesenseVersions;