import React, { useState } from "react"
import { useLocation } from "@docusaurus/router"

export function CopyPageMenu() {
  const [copyFeedback, setCopyFeedback] = useState(false)
  const location = useLocation()

  const mdPath = `${location.pathname}.md`

  async function handleCopyMarkdown() {
    try {
      const response = await fetch(mdPath)
      if (!response.ok) throw new Error("Failed to fetch")
      const text = await response.text()
      await navigator.clipboard.writeText(text)
      setCopyFeedback(true)
      setTimeout(() => setCopyFeedback(false), 2000)
    } catch {
      console.error("Failed to copy markdown")
    }
  }

  function handleViewMarkdown() {
    window.open(mdPath, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="copy-page-menu">
      <div className="copy-page-menu__divider" />
      <button
        onClick={handleCopyMarkdown}
        className="copy-page-menu__item"
        type="button"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.333 5.333V3.467c0-.747 0-1.12.146-1.406a1.333 1.333 0 0 1 .583-.582c.285-.146.659-.146 1.405-.146h5.066c.747 0 1.12 0 1.406.146.25.128.454.332.582.582.146.286.146.66.146 1.406v5.066c0 .747 0 1.12-.146 1.406a1.333 1.333 0 0 1-.582.583c-.286.145-.66.145-1.406.145h-1.866M3.467 14.667h5.066c.747 0 1.12 0 1.406-.146.25-.128.454-.332.582-.583.146-.285.146-.659.146-1.405V7.467c0-.747 0-1.12-.146-1.406a1.333 1.333 0 0 0-.582-.583c-.286-.145-.66-.145-1.406-.145H3.467c-.747 0-1.12 0-1.406.145a1.333 1.333 0 0 0-.582.583C1.333 6.347 1.333 6.72 1.333 7.467v5.066c0 .746 0 1.12.146 1.405.128.251.332.455.582.583.286.146.66.146 1.406.146Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {copyFeedback ? "Copied!" : "Copy as Markdown"}
      </button>
      <button
        onClick={handleViewMarkdown}
        className="copy-page-menu__item"
        type="button"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.333 8s2.667-5.333 6.667-5.333S14.667 8 14.667 8s-2.667 5.333-6.667 5.333S1.333 8 1.333 8Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        View as Markdown
      </button>
    </div>
  )
}
