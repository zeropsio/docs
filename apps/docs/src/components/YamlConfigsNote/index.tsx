import Admonition from '@theme/Admonition';
import React from 'react';

const YamlConfigsNote: React.FC = () => {
  return (
    <Admonition type="note" title="Import YAML vs. zerops.yaml — two different files">
      <p>
        Zerops uses two YAML files that serve different roles. Don't confuse them.
      </p>

      <p>
        <strong>Import YAML</strong> — an Infrastructure-as-Code
        manifest used to provision infrastructure, configure routing, and seed
        secrets. Today it lets you create projects and services via the import
        and export mechanisms; routing capabilities are on the roadmap.
      </p>

      <p>
        <strong><a href="/zerops-yaml/specification">zerops.yaml</a></strong> — the
        application deployment description file. It tells Zerops how to build,
        deploy, and run a runtime application, and is typically committed to
        the application's source-code repository.
      </p>
    </Admonition>
  );
};

export default YamlConfigsNote;
