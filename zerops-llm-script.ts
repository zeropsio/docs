import * as fs from 'node:fs'
import * as path from 'node:path'
import * as globModule from 'glob'

const frontmatterRegex = /^\n*---(\n.+)*?\n---\n/

const contentDir = path.resolve('apps/docs/content')

const sliceExt = (file: string) => {
  return file.split('.').slice(0, -1).join('.')
}

const extractLabel = (file: string) => {
  return sliceExt(file.split('/').pop() || '')
}

function capitalizeDelimiter(str: string): string {
  return str
    .split('-')
    .map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('-')
}

async function generateContent(
  files: string[],
  contentDir: string,
  header: string
): Promise<string> {
  let content = header + '# Start of Zerops documentation\n'
  for (const file of files) {
    console.log(`> Writing '${file}' `)
    const fileContent = fs.readFileSync(
      path.resolve(contentDir, file),
      'utf-8'
    )
    const contentWithoutFrontmatter = fileContent.replace(frontmatterRegex, '')
    const lines = contentWithoutFrontmatter.split('\n')
    const filteredLines = lines.filter(line => !line.trim().startsWith('import '))
    content += filteredLines.join('\n') + '\n\n'
  }
  return content
}

async function generateLLMDocs() {
  const publicDir = path.resolve('apps/docs/static')
  
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  
  const outputListFile = path.resolve(publicDir, 'llms.txt')

  const optionalFiles = globModule.sync('**/*.mdx', { cwd: contentDir })

  const optionals: string[] = []

  for (const file of optionalFiles) {
    optionals.push(
      `- [${capitalizeDelimiter(extractLabel(file)).replace(/-/, ' ')}](https://docs.zerops.io/${sliceExt(file)})`
    )
  }

  fs.writeFileSync(
    outputListFile,
    [
      '# Zerops',
      '',
      '> Zerops is a developer-first Platform-as-a-Service, running on bare metal, with every part built from scratch. Zerops aims to be the perfect mix of developer experience, flexibility, scalability and affordability, making it a great fit for applications of any size, complexity and traffic.',
      '',
      '## Docs',
      '',
      '- [Full Docs](https://docs.zerops.io/llms-full.txt) Full documentation of Zerops. (without examples)',
      '- [Tiny Docs](https://docs.zerops.io/llms-small.txt): Tiny documentation of Zerops. (includes only description of core)',
      '',
      '## Optional',
      '',
      ...optionals,
    ].join('\n'),
    'utf-8'
  )
  console.log(`< Output '${outputListFile}' `)

  const outputFullFile = path.resolve(publicDir, 'llms-full.txt')
  const files = globModule.sync('**/*.mdx', { cwd: contentDir })

  const fullContent = await generateContent(
    files,
    contentDir,
    '<SYSTEM>This is the full developer documentation for Zerops.</SYSTEM>\n\n'
  )

  fs.writeFileSync(outputFullFile, fullContent, 'utf-8')
  console.log(`< Output '${outputFullFile}' `)

  const outputTinyFile = path.resolve(publicDir, 'llms-small.txt')

  const tinyExclude = ['references', 'company', 'help']
  const tinyFiles = files.filter((filename: string) => !tinyExclude.some(exclude => filename.includes(exclude)))

  const tinyContent = await generateContent(
    tinyFiles,
    contentDir,
    '<SYSTEM>This is the tiny developer documentation for Zerops.</SYSTEM>\n\n'
  )

  fs.writeFileSync(outputTinyFile, tinyContent, 'utf-8')
  console.log(`< Output '${outputTinyFile}' `)
}

generateLLMDocs().catch(console.error)