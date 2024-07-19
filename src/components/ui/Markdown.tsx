import { marked } from 'marked'
import React, { FC, useMemo } from 'react'

interface Props {
  text?: string | null
}

export const Markdown: FC<Props> = ({ text }) => {
  const markdown = useMemo<string | null>(() => {
    if (text === null) return null
    if (text === undefined) return null
    if (text.trim() === '') return null

    const result = marked.parse(text)

    // `marked.parse()` can return a `Promise<string>`
    // if the option `async` is set to `true`.
    // This isn't the case here, so this line is just to satisfy TypeScript.
    if (typeof result !== 'string') return null

    return result
  }, [text])

  if (markdown === null) return null

  return (
    <div
      className="prose prose-brand select-text"
      dangerouslySetInnerHTML={{ __html: markdown }}
    />
  )
}
