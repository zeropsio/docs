import React from "react"

interface Props {
  data: string[]
}

export default function UnorderedCodeList({ data }: Props): JSX.Element {
  return (
    <ul>
      {data.map((token: string, index: number) => {
        return (
          <li key={index}>
            <code>{token}</code>
          </li>
        )
      })}
    </ul>
  )
}
