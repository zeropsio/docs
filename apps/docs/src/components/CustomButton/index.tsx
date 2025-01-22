import React from 'react';
import Link from '@docusaurus/Link';

const CustomButton = ({ link, badgeWidth, title }) => {
  return (
    <div className="inline-flex flex-col items-center gap-1">
      <Link className="inline-block group" to={link}>
        <svg
          className="duration-100"
          width={badgeWidth}
          viewBox="0 0 167 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_469_290)">
            <path
              d="M151.364 0H15C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30H151.364C159.648 30 166.364 23.2843 166.364 15C166.364 6.71573 159.648 0 151.364 0Z"
              className="fill-[#e9eaec] dark:fill-[#3b3d42] group-hover:fill-[#d6d9dd] dark:group-hover:fill-[#4a4c51] group-hover:fill-[#C7C9CE] group-active:fill-[#9ca3af] duration-100"
            />
            <text
              x="83"
              y="15"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-[#414b59] dark:fill-[#e9eaec]"
              fontFamily="Inter"
              fontSize="11px"
              pointerEvents="none"
            >
              {title}
            </text>
            <mask
              id="mask0_469_290"
              maskUnits="userSpaceOnUse"
              x="124"
              y="10"
              width="12"
              height="11"
              style={{ maskType: 'luminance' }}
            >
              <path d="M135.455 10H124.545V20.9091H135.455V10Z" fill="white" />
            </mask>
          </g>
        </svg>
      </Link>
    </div>
  );
};

export default CustomButton;