import React, { useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

interface RuntimeConfig {
  label: string;
  versions: string[];
  defaultVersion: string;
  buildBase: ((v: string) => string) | null;
  runBase: (v: string) => string;
  importType: (v: string) => string;
  defaultBuildCommands: string;
  defaultDeployFiles: string;
  defaultCache: string;
  defaultStart: string;
  defaultPort: number;
  hasBuild: boolean;
}

interface DatabaseConfig {
  label: string;
  versions: string[];
  defaultVersion: string;
  importType: (v: string) => string;
  supportsHA: boolean;
}

const RUNTIMES: Record<string, RuntimeConfig> = {
  nodejs: {
    label: 'Node.js',
    versions: ['24', '22', '20', '18'],
    defaultVersion: '24',
    buildBase: (v) => `nodejs@${v}`,
    runBase: (v) => `nodejs@${v}`,
    importType: (v) => `nodejs@${v}`,
    defaultBuildCommands: 'npm i\nnpm run build',
    defaultDeployFiles: 'dist\npackage.json\nnode_modules',
    defaultCache: 'node_modules',
    defaultStart: 'npm start',
    defaultPort: 3000,
    hasBuild: true,
  },
  go: {
    label: 'Go',
    versions: ['1.22'],
    defaultVersion: '1.22',
    buildBase: (v) => `go@${v}`,
    runBase: (v) => `go@${v}`,
    importType: (v) => `go@${v}`,
    defaultBuildCommands: 'go build -o app main.go',
    defaultDeployFiles: 'app',
    defaultCache: '',
    defaultStart: './app',
    defaultPort: 8080,
    hasBuild: true,
  },
  python: {
    label: 'Python',
    versions: ['3.14', '3.12', '3.11'],
    defaultVersion: '3.12',
    buildBase: (v) => `python@${v}`,
    runBase: (v) => `python@${v}`,
    importType: (v) => `python@${v}`,
    defaultBuildCommands: 'pip install -r requirements.txt',
    defaultDeployFiles: '.',
    defaultCache: '',
    defaultStart: 'python main.py',
    defaultPort: 8000,
    hasBuild: true,
  },
  'php-apache': {
    label: 'PHP (Apache)',
    versions: ['8.5', '8.4', '8.3', '8.1'],
    defaultVersion: '8.5',
    buildBase: (v) => `php@${v}`,
    runBase: (v) => `php-apache@${v}`,
    importType: (v) => `php-apache@${v}`,
    defaultBuildCommands: 'composer install',
    defaultDeployFiles: '.',
    defaultCache: '',
    defaultStart: '',
    defaultPort: 80,
    hasBuild: true,
  },
  'php-nginx': {
    label: 'PHP (Nginx)',
    versions: ['8.5', '8.4', '8.3', '8.1'],
    defaultVersion: '8.5',
    buildBase: (v) => `php@${v}`,
    runBase: (v) => `php-nginx@${v}`,
    importType: (v) => `php-nginx@${v}`,
    defaultBuildCommands: 'composer install',
    defaultDeployFiles: '.',
    defaultCache: '',
    defaultStart: '',
    defaultPort: 80,
    hasBuild: true,
  },
  bun: {
    label: 'Bun',
    versions: ['1.3', '1.2', 'nightly', 'canary'],
    defaultVersion: '1.3',
    buildBase: (v) => `bun@${v}`,
    runBase: (v) => `bun@${v}`,
    importType: (v) => `bun@${v}`,
    defaultBuildCommands: 'bun install\nbun run build',
    defaultDeployFiles: 'dist\nnode_modules',
    defaultCache: 'node_modules',
    defaultStart: 'bun start',
    defaultPort: 3000,
    hasBuild: true,
  },
  deno: {
    label: 'Deno',
    versions: ['2', '1'],
    defaultVersion: '2',
    buildBase: (v) => `deno@${v}`,
    runBase: (v) => `deno@${v}`,
    importType: (v) => `deno@${v}`,
    defaultBuildCommands: 'deno cache main.ts',
    defaultDeployFiles: '.',
    defaultCache: '',
    defaultStart: 'deno run --allow-all main.ts',
    defaultPort: 8000,
    hasBuild: true,
  },
  rust: {
    label: 'Rust',
    versions: ['1.86', '1.80', '1.78', 'nightly'],
    defaultVersion: '1.86',
    buildBase: (v) => `rust@${v}`,
    runBase: (v) => `rust@${v}`,
    importType: (v) => `rust@${v}`,
    defaultBuildCommands: 'cargo build --release',
    defaultDeployFiles: 'target/release/app',
    defaultCache: '',
    defaultStart: './app',
    defaultPort: 8080,
    hasBuild: true,
  },
  java: {
    label: 'Java',
    versions: ['21', '17'],
    defaultVersion: '21',
    buildBase: (v) => `java@${v}`,
    runBase: (v) => `java@${v}`,
    importType: (v) => `java@${v}`,
    defaultBuildCommands: './mvnw clean install',
    defaultDeployFiles: 'target/app.jar',
    defaultCache: '',
    defaultStart: 'java -jar target/app.jar',
    defaultPort: 8080,
    hasBuild: true,
  },
  dotnet: {
    label: '.NET',
    versions: ['10', '9', '8', '7', '6'],
    defaultVersion: '10',
    buildBase: (v) => `dotnet@${v}`,
    runBase: (v) => `dotnet@${v}`,
    importType: (v) => `dotnet@${v}`,
    defaultBuildCommands: 'dotnet publish -c Release -o ./publish',
    defaultDeployFiles: 'publish',
    defaultCache: '',
    defaultStart: 'dotnet publish/App.dll',
    defaultPort: 5000,
    hasBuild: true,
  },
  elixir: {
    label: 'Elixir',
    versions: ['1.16'],
    defaultVersion: '1.16',
    buildBase: (v) => `elixir@${v}`,
    runBase: (v) => `elixir@${v}`,
    importType: (v) => `elixir@${v}`,
    defaultBuildCommands: 'mix local.hex --force\nmix deps.get\nMIX_ENV=prod mix release',
    defaultDeployFiles: '_build/prod/rel/app',
    defaultCache: '',
    defaultStart: '_build/prod/rel/app/bin/app start',
    defaultPort: 4000,
    hasBuild: true,
  },
  gleam: {
    label: 'Gleam',
    versions: ['1.5'],
    defaultVersion: '1.5',
    buildBase: (v) => `gleam@${v}`,
    runBase: (v) => `gleam@${v}`,
    importType: (v) => `gleam@${v}`,
    defaultBuildCommands: 'gleam deps download\ngleam build',
    defaultDeployFiles: '.',
    defaultCache: '',
    defaultStart: 'gleam run',
    defaultPort: 8080,
    hasBuild: true,
  },
  nginx: {
    label: 'Nginx',
    versions: ['1.22'],
    defaultVersion: '1.22',
    buildBase: null,
    runBase: (v) => `nginx@${v}`,
    importType: (v) => `nginx@${v}`,
    defaultBuildCommands: '',
    defaultDeployFiles: '',
    defaultCache: '',
    defaultStart: '',
    defaultPort: 80,
    hasBuild: false,
  },
  alpine: {
    label: 'Alpine Linux',
    versions: ['3.23', '3.22', '3.21', '3.20', '3.19', '3.18', '3.17'],
    defaultVersion: '3.23',
    buildBase: null,
    runBase: (v) => `alpine@${v}`,
    importType: (v) => `alpine@${v}`,
    defaultBuildCommands: '',
    defaultDeployFiles: '',
    defaultCache: '',
    defaultStart: './app',
    defaultPort: 8080,
    hasBuild: false,
  },
  ubuntu: {
    label: 'Ubuntu',
    versions: ['24.04', '22.04'],
    defaultVersion: '24.04',
    buildBase: null,
    runBase: (v) => `ubuntu@${v}`,
    importType: (v) => `ubuntu@${v}`,
    defaultBuildCommands: '',
    defaultDeployFiles: '',
    defaultCache: '',
    defaultStart: './app',
    defaultPort: 8080,
    hasBuild: false,
  },
};

const DATABASES: Record<string, DatabaseConfig> = {
  postgresql: {
    label: 'PostgreSQL',
    versions: ['18', '17', '16', '14'],
    defaultVersion: '16',
    importType: (v) => `postgresql@${v}`,
    supportsHA: true,
  },
  mariadb: {
    label: 'MariaDB',
    versions: ['10.6'],
    defaultVersion: '10.6',
    importType: (v) => `mariadb@${v}`,
    supportsHA: true,
  },
  keydb: {
    label: 'KeyDB',
    versions: ['6'],
    defaultVersion: '6',
    importType: (v) => `keydb@${v}`,
    supportsHA: false,
  },
  valkey: {
    label: 'Valkey',
    versions: ['7.2'],
    defaultVersion: '7.2',
    importType: (v) => `valkey@${v}`,
    supportsHA: false,
  },
};

function buildZeropsYml(
  rt: RuntimeConfig,
  version: string,
  hostname: string,
  port: number,
  httpSupport: boolean,
  buildCommands: string,
  deployFiles: string,
  startCommand: string,
): string {
  const lines: string[] = [];

  lines.push('zerops:');
  lines.push(`  - setup: ${hostname}`);

  if (rt.hasBuild && rt.buildBase) {
    const buildBase = rt.buildBase(version);
    const cmds = buildCommands.split('\n').map((s) => s.trim()).filter(Boolean);
    const files = deployFiles.split('\n').map((s) => s.trim()).filter(Boolean);

    lines.push('    build:');
    lines.push(`      base: ${buildBase}`);

    if (cmds.length > 0) {
      lines.push('      buildCommands:');
      cmds.forEach((cmd) => lines.push(`        - ${cmd}`));
    }

    if (files.length > 0) {
      lines.push('      deployFiles:');
      files.forEach((f) => lines.push(`        - ${f}`));
    }

    if (rt.defaultCache) {
      lines.push(`      cache: ${rt.defaultCache}`);
    }
  }

  lines.push('    run:');
  lines.push(`      base: ${rt.runBase(version)}`);

  if (port > 0) {
    lines.push('      ports:');
    lines.push(`        - port: ${port}`);
    lines.push(`          httpSupport: ${httpSupport}`);
  }

  const trimmedStart = startCommand.trim();
  if (trimmedStart) {
    lines.push(`      start: ${trimmedStart}`);
  }

  return lines.join('\n');
}

function buildImportYaml(
  rt: RuntimeConfig,
  version: string,
  hostname: string,
  httpSupport: boolean,
  addDatabase: boolean,
  db: DatabaseConfig | null,
  dbVersion: string,
  dbHostname: string,
  dbHa: boolean,
): string {
  const lines: string[] = [];

  lines.push('project:');
  lines.push('  name: my-project');
  lines.push('  location: eu-central');
  lines.push('');
  lines.push('services:');
  lines.push(`  - hostname: ${hostname}`);
  lines.push(`    type: ${rt.importType(version)}`);
  if (httpSupport) {
    lines.push('    enableSubdomainAccess: true');
  }
  lines.push('    minContainers: 1');
  lines.push('    maxContainers: 6');

  if (addDatabase && db) {
    lines.push('');
    lines.push(`  - hostname: ${dbHostname}`);
    lines.push(`    type: ${db.importType(dbVersion)}`);
    lines.push(`    mode: ${dbHa ? 'HA' : 'NON_HA'}`);
    lines.push('    priority: 1');
  }

  return lines.join('\n');
}

function YamlGeneratorContent() {
  const [runtimeKey, setRuntimeKey] = useState('nodejs');
  const [version, setVersion] = useState('24');
  const [hostname, setHostname] = useState('app');
  const [port, setPort] = useState(3000);
  const [httpSupport, setHttpSupport] = useState(true);
  const [buildCommands, setBuildCommands] = useState('npm i\nnpm run build');
  const [deployFiles, setDeployFiles] = useState('dist\npackage.json\nnode_modules');
  const [startCommand, setStartCommand] = useState('npm start');
  const [addDatabase, setAddDatabase] = useState(false);
  const [dbKey, setDbKey] = useState('postgresql');
  const [dbVersion, setDbVersion] = useState('16');
  const [dbHostname, setDbHostname] = useState('db');
  const [dbHa, setDbHa] = useState(false);
  const [activeTab, setActiveTab] = useState<'zerops' | 'import'>('zerops');

  const rt = RUNTIMES[runtimeKey];
  const db = DATABASES[dbKey];

  const handleRuntimeChange = (key: string) => {
    const newRt = RUNTIMES[key];
    setRuntimeKey(key);
    setVersion(newRt.defaultVersion);
    setPort(newRt.defaultPort);
    setBuildCommands(newRt.defaultBuildCommands);
    setDeployFiles(newRt.defaultDeployFiles);
    setStartCommand(newRt.defaultStart);
    setHttpSupport(key !== 'alpine' && key !== 'ubuntu');
  };

  const handleDbChange = (key: string) => {
    setDbKey(key);
    setDbVersion(DATABASES[key].defaultVersion);
    if (!DATABASES[key].supportsHA) setDbHa(false);
  };

  const zeropsYml = buildZeropsYml(rt, version, hostname, port, httpSupport, buildCommands, deployFiles, startCommand);
  const importYaml = buildImportYaml(rt, version, hostname, httpSupport, addDatabase, db, dbVersion, dbHostname, dbHa);

  return (
    <div className={styles.generator}>
      <div className={styles.form}>
        {/* Runtime */}
        <div className={styles.section}>
          <p className={styles.sectionTitle}>Runtime</p>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="runtime">Technology</label>
              <select
                id="runtime"
                className={styles.select}
                value={runtimeKey}
                onChange={(e) => handleRuntimeChange(e.target.value)}
              >
                <optgroup label="Runtimes">
                  <option value="nodejs">Node.js</option>
                  <option value="go">Go</option>
                  <option value="python">Python</option>
                  <option value="php-apache">PHP (Apache)</option>
                  <option value="php-nginx">PHP (Nginx)</option>
                  <option value="bun">Bun</option>
                  <option value="deno">Deno</option>
                  <option value="rust">Rust</option>
                  <option value="java">Java</option>
                  <option value="dotnet">.NET</option>
                  <option value="elixir">Elixir</option>
                  <option value="gleam">Gleam</option>
                </optgroup>
                <optgroup label="Web Servers &amp; Containers">
                  <option value="nginx">Nginx</option>
                  <option value="alpine">Alpine Linux</option>
                  <option value="ubuntu">Ubuntu</option>
                </optgroup>
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="version">Version</label>
              <select
                id="version"
                className={styles.select}
                value={version}
                onChange={(e) => setVersion(e.target.value)}
              >
                {rt.versions.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Service */}
        <div className={styles.section}>
          <p className={styles.sectionTitle}>Service</p>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="hostname">Hostname</label>
              <input
                id="hostname"
                type="text"
                className={styles.input}
                value={hostname}
                onChange={(e) => setHostname(e.target.value || 'app')}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="port">Port</label>
              <input
                id="port"
                type="number"
                className={styles.input}
                value={port}
                min={1}
                max={65535}
                onChange={(e) => setPort(parseInt(e.target.value) || rt.defaultPort)}
              />
            </div>
          </div>
          <div className={styles.checkboxField}>
            <input
              id="httpSupport"
              type="checkbox"
              className={styles.checkbox}
              checked={httpSupport}
              onChange={(e) => setHttpSupport(e.target.checked)}
            />
            <label htmlFor="httpSupport" className={styles.checkboxLabel}>
              HTTP support
            </label>
          </div>
          <p className={styles.hint}>Enable for web apps that need subdomain or custom domain access.</p>
        </div>

        {/* Build */}
        {rt.hasBuild && (
          <div className={styles.section}>
            <p className={styles.sectionTitle}>Build</p>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="buildCmds">Build commands</label>
              <p className={styles.hint}>One command per line.</p>
              <textarea
                id="buildCmds"
                className={styles.textarea}
                value={buildCommands}
                onChange={(e) => setBuildCommands(e.target.value)}
                rows={3}
                spellCheck={false}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="deployFiles">Deploy files</label>
              <p className={styles.hint}>Files and folders to deploy. One path per line.</p>
              <textarea
                id="deployFiles"
                className={styles.textarea}
                value={deployFiles}
                onChange={(e) => setDeployFiles(e.target.value)}
                rows={3}
                spellCheck={false}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="startCmd">Start command</label>
              <input
                id="startCmd"
                type="text"
                className={styles.input}
                value={startCommand}
                onChange={(e) => setStartCommand(e.target.value)}
                placeholder="e.g. npm start"
                spellCheck={false}
              />
            </div>
          </div>
        )}

        {/* Run (containers only) */}
        {!rt.hasBuild && (
          <div className={styles.section}>
            <p className={styles.sectionTitle}>Run</p>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="startCmd">Start command</label>
              <input
                id="startCmd"
                type="text"
                className={styles.input}
                value={startCommand}
                onChange={(e) => setStartCommand(e.target.value)}
                placeholder="e.g. ./app"
                spellCheck={false}
              />
            </div>
          </div>
        )}

        {/* Database */}
        <div className={styles.section}>
          <p className={styles.sectionTitle}>Database</p>
          <div className={styles.checkboxField}>
            <input
              id="addDb"
              type="checkbox"
              className={styles.checkbox}
              checked={addDatabase}
              onChange={(e) => setAddDatabase(e.target.checked)}
            />
            <label htmlFor="addDb" className={styles.checkboxLabel}>Add a database service</label>
          </div>

          {addDatabase && (
            <>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="dbType">Type</label>
                  <select
                    id="dbType"
                    className={styles.select}
                    value={dbKey}
                    onChange={(e) => handleDbChange(e.target.value)}
                  >
                    <option value="postgresql">PostgreSQL</option>
                    <option value="mariadb">MariaDB</option>
                    <option value="keydb">KeyDB</option>
                    <option value="valkey">Valkey</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="dbVersion">Version</label>
                  <select
                    id="dbVersion"
                    className={styles.select}
                    value={dbVersion}
                    onChange={(e) => setDbVersion(e.target.value)}
                  >
                    {db.versions.map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="dbHostname">Hostname</label>
                <input
                  id="dbHostname"
                  type="text"
                  className={styles.input}
                  value={dbHostname}
                  onChange={(e) => setDbHostname(e.target.value || 'db')}
                />
              </div>
              {db.supportsHA && (
                <div className={styles.checkboxField}>
                  <input
                    id="dbHa"
                    type="checkbox"
                    className={styles.checkbox}
                    checked={dbHa}
                    onChange={(e) => setDbHa(e.target.checked)}
                  />
                  <label htmlFor="dbHa" className={styles.checkboxLabel}>High availability (HA)</label>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className={styles.output}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'zerops' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('zerops')}
          >
            zerops.yml
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'import' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('import')}
          >
            Import YAML
          </button>
        </div>
        <div className={styles.codeWrapper}>
          {activeTab === 'zerops' && (
            <CodeBlock language="yaml" title="zerops.yml">
              {zeropsYml}
            </CodeBlock>
          )}
          {activeTab === 'import' && (
            <CodeBlock language="yaml" title="description.yaml">
              {importYaml}
            </CodeBlock>
          )}
        </div>
        {activeTab === 'import' && (
          <p className={styles.note}>
            Paste this into the <strong>Import a project</strong> dialog in the{' '}
            <a href="https://app.zerops.io" target="_blank" rel="noopener noreferrer">Zerops GUI</a>,
            or use <code>zcli project project-import</code> from the CLI.
          </p>
        )}
        {activeTab === 'zerops' && (
          <p className={styles.note}>
            Add this file to the root of your repository. Zerops uses it to build and deploy your app on every push.
            See the <a href="/zerops-yaml/specification">full specification</a> for all available options.
          </p>
        )}
      </div>
    </div>
  );
}

export default function YamlGenerator() {
  return (
    <BrowserOnly fallback={<div>Loading generator…</div>}>
      {() => <YamlGeneratorContent />}
    </BrowserOnly>
  );
}
