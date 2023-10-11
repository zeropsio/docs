import { IconProps } from "@medusajs/icons/dist/types"
import clsx from "clsx"
import React from "react"

const IconNginx = (props: IconProps) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx("text-ui-fg-subtle", props.className)}
    >
      <path
        d="M4.1 44.9c.3.5.7.9 1.1 1.1l23.2 13.4c1 .6 2.1.6 3.1 0L54.7 46c1-.5 1.5-1.6 1.5-2.7V16.6c0-1.1-.6-2.1-1.5-2.7L31.5.5c-1-.6-2.1-.6-3.1 0L5.3 13.9c-1 .5-1.6 1.6-1.5 2.7v26.8c-.1.5 0 1.1.3 1.5"
        fill="#009639"
      />
      <path
        d="M22.6 40.2c0 1.6-1.3 3-3 3-1.6 0-3-1.3-3-3V19.7c.1-1.7 1.6-3 3.3-2.9h.1c1.6 0 3 .6 4.1 1.8l.9 1.1 12.5 14.9V19.8c0-1.6 1.3-3 3-3 1.6 0 3 1.3 3 3v20.5c-.1 1.7-1.6 3-3.3 2.9h-.1c-1.6 0-3-.6-4.1-1.8l-13.4-16v14.8z"
        fill="#fff"
      />
    </svg>
  )
}

export default IconNginx
