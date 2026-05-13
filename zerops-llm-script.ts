import * as fs from 'node:fs'
import * as path from 'node:path'
import * as globModule from 'glob'
// Shared MDX -> markdown converters (also used by the per-page markdown-source
// plugin). Single source of truth so the LLM bundle and the per-page .md route
// produce consistent output.
import * as C from './apps/docs/src/plugins/markdown-source/converters'

const frontmatterRegex = /^\n*---(\n.+)*?\n---\n/
const frontmatterBlockRegex = /^\s*---\n([\s\S]*?)\n---\n/

const contentDir = path.resolve('apps/docs/content')
const dataJsonPath = path.resolve('apps/docs/static/data.json')

// Lazy data.json loader for UnorderedCodeList resolution.
let dataJsonCache: Record<string, unknown> | null = null
function getDataJson(): Record<string, unknown> {
  if (dataJsonCache) return dataJsonCache
  try {
    dataJsonCache = JSON.parse(fs.readFileSync(dataJsonPath, 'utf-8'))
  } catch {
    dataJsonCache = {}
  }
  return dataJsonCache ?? {}
}

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
  // 1. Strip frontmatter
  let cleaned = content.replace(frontmatterRegex, '')

  // 2. Drop JSX comments, normalize <br>, drop import lines, drop images.
  cleaned = cleaned.replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
  cleaned = cleaned.replace(/<br\s*\/?>/g, '\n')
  cleaned = cleaned.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '')
  cleaned = cleaned.replace(/<Image\s+[^>]*\/?>/g, '')
  cleaned = cleaned.replace(/<img\s+[^>]*\/?>/g, '')
  cleaned = cleaned.replace(/!\[[^\]]*\]\([^)]+\)/g, '')
  cleaned = cleaned.replace(/<figure[^>]*>([\s\S]*?)<\/figure>/g, '')
  cleaned = cleaned.replace(/<Head>[\s\S]*?<\/Head>/g, '')

  // 3. Convert HTML <a> tags to markdown links (mirrors the plugin's step 12).
  cleaned = cleaned.replace(
    /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/g,
    (_m, href, text) => {
      const inner = String(text)
        .replace(/<code>(.*?)<\/code>/g, '`$1`')
        .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
        .replace(/<em>(.*?)<\/em>/g, '*$1*')
        .replace(/<b>(.*?)<\/b>/g, '**$1**')
        .replace(/<[^>]+>/g, '')
        .trim()
      return `[${inner}](${href})`
    }
  )

  // 4. Shared converter chain (same module the per-page .md route uses).
  cleaned = C.convertFAQToMarkdown(cleaned)
  cleaned = C.convertTabsToMarkdown(cleaned)
  cleaned = C.convertNoteToMarkdown(cleaned)
  cleaned = C.convertAsciiGraphToMarkdown(cleaned)
  cleaned = C.convertDocCardListToMarkdown(cleaned)
  cleaned = C.convertCustomCardToMarkdown(cleaned)
  cleaned = C.convertDropdownToMarkdown(cleaned)
  cleaned = C.convertSectionLandscapeToMarkdown(cleaned)
  cleaned = C.convertExpandableTableToMarkdown(cleaned)
  cleaned = C.convertUnorderedCodeListStandalone(cleaned, getDataJson, null)
  cleaned = C.convertCodingAgentsTopologyToMarkdown(cleaned)
  cleaned = C.convertIntroAgentVisualToMarkdown(cleaned)
  cleaned = C.convertDeployButtonToMarkdown(cleaned)
  cleaned = C.convertVideoToMarkdown(cleaned)
  cleaned = C.convertBadgeToMarkdown(cleaned)
  cleaned = C.convertButtonToMarkdown(cleaned)
  cleaned = C.convertLinkToMarkdown(cleaned)
  cleaned = C.dropSilentComponents(cleaned)
  cleaned = C.convertDetailsToMarkdown(cleaned)

  // 5. Final catch-all: strip any remaining unknown uppercase JSX components
  // while preserving markdown tables (the LLM corpus reads tables as data).
  const sections = cleaned.split(/(\|.*\|\n\|.*\|\n(\|.*\|\n)*)/)
  let processed = ''
  for (const section of sections) {
    if (!section) continue
    if (section.trim().startsWith('|')) {
      processed += section
    } else {
      processed += section.replace(
        /<[A-Z][a-zA-Z]*[\s\S]*?(?:\/>|<\/[A-Z][a-zA-Z]*>)/g,
        ''
      )
    }
  }

  // 6. Collapse trailing whitespace + consecutive blank lines.
  const lines = processed.split('\n').map((line) => line.replace(/[ \t]+$/g, ''))
  const out: string[] = []
  let lastEmpty = false
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed === '' && lastEmpty) continue
    out.push(line)
    lastEmpty = trimmed === ''
  }

  return out.join('\n')
}

function hasFrontmatterFlag(content: string, flag: string): boolean {
  const frontmatter = content.match(frontmatterBlockRegex)?.[1] ?? ''
  const flagRegex = new RegExp(`^${flag}:\\s*true\\s*$`, 'm')
  return flagRegex.test(frontmatter)
}

function shouldIncludeInLLMDocs(file: string): boolean {
  const fileContent = fs.readFileSync(path.resolve(contentDir, file), 'utf-8')
  return (
    !hasFrontmatterFlag(fileContent, 'draft') &&
    !hasFrontmatterFlag(fileContent, 'unlisted')
  )
}

async function generateContent(
  files: string[],
  contentDir: string
): Promise<string> {
  let content = ''
  
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

  const optionalFiles = globModule
    .sync('**/*.mdx', { cwd: contentDir })
    .filter(shouldIncludeInLLMDocs)

  const optionals: string[] = []

  for (const file of optionalFiles) {
    optionals.push(
      `- [${capitalizeDelimiter(extractLabel(file)).replace(/-/, ' ')}](https://docs.zerops.io/${sliceExt(file)}.md)`
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
  const files = globModule
    .sync('**/*.mdx', { cwd: contentDir })
    .filter(shouldIncludeInLLMDocs)

  const fullContent = await generateContent(
    files,
    contentDir
  )

  fs.writeFileSync(outputFullFile, fullContent, 'utf-8')
  console.log(`< Output '${outputFullFile}' `)

  const outputTinyFile = path.resolve(publicDir, 'llms-small.txt')

  const tinyExclude = ['references', 'company', 'help']
  const tinyFiles = files.filter((filename: string) => !tinyExclude.some(exclude => filename.includes(exclude)))

  const tinyContent = await generateContent(
    tinyFiles,
    contentDir
  )

  fs.writeFileSync(outputTinyFile, tinyContent, 'utf-8')
  console.log(`< Output '${outputTinyFile}' `)
}

generateLLMDocs().catch(console.error)
