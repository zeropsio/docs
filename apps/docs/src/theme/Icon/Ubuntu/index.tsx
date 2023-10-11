import { IconProps } from "@medusajs/icons/dist/types"
import clsx from "clsx"
import React from "react"

const IconUbuntu = (props: IconProps) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 260 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx("text-ui-fg-subtle", props.className)}
    >
      <path fill="#e95420" d="M.1 0h251v251H.1z" />
      <path fill="none" d="M29.4 19.3h192.3v192.3H29.4z" />
      <circle fill="#fff" cx="57.1" cy="125.3" r="26.1" />
      <circle fill="#fff" cx="166" cy="68" r="26.1" />
      <path
        fill="#fff"
        d="M116.1 192.5c-18.8-4-34.6-16.1-43.4-33.1-7 3.2-14.8 4.1-22.3 2.8 10.7 26.3 33.4 45.4 61.2 51.3 6.1 1.3 12.3 2 18.6 1.9-4.8-6.3-7.5-13.9-7.7-21.9-2.2-.2-4.3-.5-6.4-1z"
      />
      <circle fill="#fff" cx="160.1" cy="192.7" r="26.1" />
      <path
        fill="#fff"
        d="M196.4 183.1c8.1-10.2 13.9-22.4 16.6-35.2 4.8-22.4.3-46-12.3-65.1-3 7.1-8.1 13.1-14.7 17.2 7.1 13.3 9.2 28.6 6 43.4-1.6 7.2-4.3 14-8.1 20.2 6.2 5 10.5 11.8 12.5 19.5zM55.1 87.8c.7 0 1.3-.1 2-.1 2.6 0 5.3.3 7.9.8 4.3.9 8.3 2.5 11.9 4.8 11.8-16.9 30.8-27.1 51.3-27.4.1-2 .4-3.9.8-5.9 1.2-5.6 3.6-10.8 7.1-15.3-32.8-2.6-64.7 14.4-81 43.1z"
      />
    </svg>
  )
}

export default IconUbuntu
