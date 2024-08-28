import { IconProps } from "@medusajs/icons/dist/types"
import clsx from "clsx"
import React from "react"

const IconPhp = (props: IconProps) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx("text-ui-fg-subtle", props.className)}
    >
      <path
        fill="#000"
        className="dark:fill-[#ADB1B8]"
        d="M7.6 36.1h14.2c4.2 0 7.2 1.2 9.1 3.6 1.9 2.4 2.5 5.6 1.9 9.7-.2 1.9-.8 3.7-1.6 5.5-.8 1.8-2 3.5-3.4 4.9-1.8 1.8-3.7 3-5.7 3.5s-4.1.7-6.3.7H9.4l-2 10.1H0l7.6-38m6.2 6.1-3.2 15.9c.2 0 .4.1.6.1h.8c3.4 0 6.2-.3 8.5-1s3.8-3.3 4.6-7.7c.6-3.7 0-5.8-1.9-6.4-1.9-.6-4.2-.8-7-.8-.4 0-.8.1-1.2.1l-1.2-.2M41.1 26h7.3l-2.1 10.1h6.6c3.6.1 6.3.8 8.1 2.2 1.8 1.4 2.3 4.1 1.6 8.1L59 64.1h-7.4L55 47.2c.4-1.8.2-3-.3-3.8s-1.8-1.1-3.7-1.1l-5.9-.1L40.8 64h-7.3l7.6-38m29.3 10.1h14.2c4.2 0 7.2 1.2 9.1 3.6 1.9 2.4 2.5 5.6 1.9 9.7-.2 1.9-.8 3.7-1.6 5.5-.8 1.8-2 3.5-3.4 4.9-1.8 1.8-3.7 3-5.7 3.5s-4.1.7-6.3.7h-6.4l-2 10.1h-7.4l7.6-38m6.2 6.1-3.2 15.9c.2 0 .4.1.6.1h.7c3.4 0 6.2-.3 8.5-1s3.8-3.3 4.6-7.7c.6-3.7 0-5.8-1.9-6.4-1.9-.6-4.2-.8-7-.8-.4 0-.8.1-1.2.1l-1.1-.2"
      />
    </svg>
  )
}

export default IconPhp
