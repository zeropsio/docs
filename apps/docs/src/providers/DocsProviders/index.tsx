import { ColorModeProvider, ModalProvider, NotificationProvider } from "docs-ui"
import React from "react"
import LearningPathProvider from "../LearningPath"

type DocsProvidersProps = {
  children?: React.ReactNode
}

const DocsProviders = ({ children }: DocsProvidersProps) => {
  return (
    <ColorModeProvider>
      <ModalProvider>
        <LearningPathProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </LearningPathProvider>
      </ModalProvider>
    </ColorModeProvider>
  )
}

export default DocsProviders
