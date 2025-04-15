import * as fs from 'node:fs'
import * as path from 'node:path'
import * as globModule from 'glob'

const frontmatterRegex = /^\n*---(\n.+)*?\n---\n/
const mdxComponentRegex = /<[^>]+>/g
const imageRegex = /!\[.*?\]\(.*?\)/g
const importRegex = /^import\s+.*?from\s+['"].*?['"];?/gm

const contentDir = path.resolve('apps/docs/content')

const sliceExt = (file: string) => {
  return file.split('.').slice(0, -1).join('.')
}

const extractLabel = (file: string) => {
  const pathWithoutExt = sliceExt(file)
  const parts = pathWithoutExt.split('/')
  return parts.map(part => 
    part.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  ).join(' > ')
}

function capitalizeDelimiter(str: string): string {
  return str
    .split('-')
    .map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('-')
}

function cleanMarkdownContent(content: string): string {
  let cleaned = content.replace(frontmatterRegex, '')
  
  const sections = cleaned.split(/(\|.*\|\n\|.*\|\n(\|.*\|\n)*)/)
  let processedContent = ''
  
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i]
    
    if (section.trim().startsWith('|')) {
      processedContent += section
    } else {
      let processedSection = section
      processedSection = processedSection.replace(mdxComponentRegex, '')
      processedSection = processedSection.replace(imageRegex, '')
      processedSection = processedSection.replace(importRegex, '')
      processedContent += processedSection
    }
  }
  
  const lines = processedContent.split('\n')
  const processedLines: string[] = []
  let lastLineWasEmpty = false
  
  for (const line of lines) {
    const trimmedLine = line.trim()
    
    if (trimmedLine === '' && lastLineWasEmpty) {
      continue
    }
    
    processedLines.push(line)
    lastLineWasEmpty = trimmedLine === ''
  }
  
  return processedLines.join('\n')
}

async function generateContent(
  files: string[],
  contentDir: string,
  header: string
): Promise<string> {
  let content = header + '# Start of Zerops documentation\n\n'
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    console.log(`> Writing '${file}' `)
    const fileContent = fs.readFileSync(
      path.resolve(contentDir, file),
      'utf-8'
    )
    
    const cleanedContent = cleanMarkdownContent(fileContent)
    const title = extractLabel(file)
    
    if (i === 0) {
      content += '-'.repeat(40) + '\n\n'
    }
    
    content += `# ${title}\n\n${cleanedContent}\n\n`
    content += '-'.repeat(40) + '\n\n'
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