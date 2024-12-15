import { IconProps } from '@medusajs/icons/dist/types';
import clsx from 'clsx';
import React from 'react';

const IconQdrant = (props: IconProps) => {
  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.width || 20}
        height={props.height || 20}
        viewBox="0 0 256 296"
        {...props}
        className={clsx('text-ui-fg-subtle', props.className)}>
        <defs>
            <linearGradient id="logosQdrantIcon0" x1="81.562%" x2="-18.086%" y1="44.842%" y2="44.842%">
                <stop offset="0%" stop-color="#ff3364"/>
                <stop offset="100%" stop-color="#c91540" stop-opacity="0"/>
            </linearGradient>
        </defs>
        <path fill="#24386c" d="m201.317 271.722l-5.894-162.509l-10.675-42.845L256 73.911v196.582l-43.525 25.12z"/>
        <path fill="#7589be" d="M255.995 73.9L212.47 99.037l-89.82-19.702L17.516 122.14L0 73.9l63.988-36.95L127.996 0l63.99 36.95z"/>
        <path fill="#b2bfe8" d="m.003 73.9l43.525 25.137l25.231 75.037l85.19 68.162l-25.948 53.363l-64.008-36.952l-63.99-36.95V73.898"/>
        <path fill="#24386c" d="m156.857 202.807l-28.856 42.54v50.256l40.946-23.625l21.097-31.503"/>
        <path fill="#7589be" d="m128.019 195.107l-40.963-70.922l8.823-23.507l33.542-16.262l39.525 39.77z"/>
        <path fill="#b2bfe8" d="m87.056 124.179l40.945 23.625v47.288l-37.869 1.629l-22.907-29.25z"/>
        <path fill="#24386c" d="m128.001 147.8l40.946-23.623l27.866 46.4l-33.722 27.862l-35.09-3.35z"/>
        <path fill="#dc244c" d="m168.947 271.975l43.525 23.626V99.04l-42.245-24.38L128 50.276L85.756 74.658L43.53 99.04v97.542l42.226 24.381l42.245 24.383l40.946-23.646zm0-100.531L128 195.088l-40.945-23.644v-47.269L128 100.531l40.946 23.644z"/>
        <path fill="url(#logosQdrantIcon0)" d="M128.019 245.363v-50.264l-40.733-23.442v50.18z"/>
      </svg>
  );
};

export default IconQdrant;