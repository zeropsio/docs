import { IconProps } from '@medusajs/icons/dist/types';
import clsx from 'clsx';
import React from 'react';

const IconFirewall = (props: IconProps) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 512 512"
      fill="currentColor"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      {...props}
      className={clsx('text-ui-fg-subtle', props.className)}
    >
      <g>
        <g>
          <path d="M498.701,0H13.299C5.954,0,0,5.955,0,13.299v485.403C0,506.045,5.954,512,13.299,512h485.403
           c7.344,0,13.299-5.955,13.299-13.299V13.299C512,5.955,506.045,0,498.701,0z M148.503,26.597h214.996v135.204h-0.001H148.503
           V26.597z M26.597,26.597h95.308v135.204H26.597V26.597z M26.597,323.601V188.399h216.104v135.203L26.597,323.601L26.597,323.601z
            M121.905,485.403H26.597V350.199h95.308V485.403z M363.499,485.403H148.503V350.199h214.996V485.403z M485.403,485.403h-95.308
           V350.199h95.308V485.403z M485.403,323.601H269.299v0V188.399h216.104V323.601z M485.403,161.801h-95.308V26.597h95.308V161.801z" />
        </g>
      </g>
    </svg>
  );
};

export default IconFirewall;
