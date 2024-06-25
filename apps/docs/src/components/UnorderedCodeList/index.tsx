import React from "react"
import type { Props } from "@theme/DocItem/Layout"

export default function UnorderedCodeList({ data }: Props): JSX.Element {
  return (
        <ul>
        {
          data.map((token, i) => {
            return(
              <li>
                <code>{token}</code>
              </li>
            )
          })
        }
    </ul>
  )
}
