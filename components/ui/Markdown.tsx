import marked from 'marked'
import { FC, useMemo } from 'react'

interface Props {
  text?: string | null
}

export const Markdown: FC<Props> = ({ text }) => {
  const markdown = useMemo<string | null>(() => {
    if (text === null) return null
    if (text === undefined) return null
    if (text.trim() === '') return null
    return marked(text)
  }, [text])

  if (markdown === null) return null

  return (
    <div
      className="prose prose-brand select-text"
      dangerouslySetInnerHTML={{ __html: markdown }}
    />
  )
}
