import { IconProps } from "@medusajs/icons/dist/types"
import clsx from "clsx"
import React from "react"

const IconRabbitmq = (props: IconProps) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx("text-ui-fg-subtle", props.className)}
    >
      <path
        d="M24.3 11.1c.7 0 1.2.5 1.2 1.2V25c0 .7-.5 1.2-1.2 1.2H2.7c-.7 0-1.2-.5-1.2-1.2V2c0-.7.5-1.2 1.2-1.2h2.6c.7 0 1.2.5 1.2 1.2v8c0 .6.5 1.1 1.1 1.1h2c.6-.1 1.1-.5 1.1-1.1V2c0-.7.5-1.2 1.2-1.2h2.6c.7 0 1.2.5 1.2 1.2v7.9c0 .6.5 1.2 1.1 1.2h7.5z"
        fill="#f60"
      />
    </svg>
  )
}

export default IconRabbitmq
