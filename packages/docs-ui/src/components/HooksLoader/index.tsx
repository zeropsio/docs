"use client"

import React from "react"
import { usePageScrollManager } from "../../hooks"

type HooksLoaderProps = {
  options?: {
    pageScrollManager?: boolean
    currentLearningPath?: boolean
  }
  children?: React.ReactNode
}

export const HooksLoader = ({ children, options = {} }: HooksLoaderProps) => {
  const { pageScrollManager } = options
  // load any hooks that require providers to be loaded here.
  if (pageScrollManager) {
    usePageScrollManager()
  }

  return <>{children}</>
}
