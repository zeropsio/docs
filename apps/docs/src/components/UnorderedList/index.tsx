import React from "react"
import type { Props } from "@theme/DocItem/Layout"

export default function UnorderedList({ data }: Props): JSX.Element {
  return (
        <ul>
        {
          data.map((token, i) => {
            return(
              <li>
                <code dangerouslySetInnerHTML={{ __html: token }}></code>
              </li>
            )
          })
        }
    </ul>
  )
}
