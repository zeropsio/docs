export type GlossaryType = {
  matchTextRegex: RegExp
  ignoreTextRegex?: RegExp
  title: string
  content: string
  referenceLink: string
}

const glossary: GlossaryType[] = []

export const getGlossary = () => [...glossary]

export const getGlossaryByPath = (path: string): GlossaryType | undefined => {
  return glossary.find(
    (g) => g.matchTextRegex.test(path) && !g.ignoreTextRegex?.test(path)
  )
}
