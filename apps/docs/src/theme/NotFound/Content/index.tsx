import React from "react"
import clsx from "clsx"
import Translate from "@docusaurus/Translate"
import type { Props } from "@theme/NotFound/Content"
import Heading from "@theme/Heading"

export default function NotFoundContent({ className }: Props): JSX.Element {
  return (
    <main
      className={clsx("container markdown theme-doc-markdown my-4", className)}
    >
      <div className="row">
        <div className="col col--6 col--offset-3">
          <Heading as="h1">
            <Translate
              id="theme.NotFound.title"
              description="The title of the 404 page"
            >
              Page Not Found
            </Translate>
          </Heading>
        </div>
      </div>
    </main>
  )
}
