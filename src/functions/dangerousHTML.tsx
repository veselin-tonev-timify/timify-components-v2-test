import React from 'react'
import DOMPurify from 'dompurify'
import encodeHtml from './encodeHtml'

export default function dangerousHTML(
  text: string | null | undefined,
  doHtmlEncoding?: boolean,
  skipSanitization?: boolean
): React.ReactElement | null {
  if (!text) return null
  let sanitizedText = skipSanitization || typeof window === 'undefined' ? text : DOMPurify.sanitize(text)
  if (doHtmlEncoding) sanitizedText = encodeHtml(sanitizedText)
  return <span dangerouslySetInnerHTML={{ __html: sanitizedText }} />
}