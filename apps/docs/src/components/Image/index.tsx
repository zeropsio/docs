import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useColorMode } from '@docusaurus/theme-common';

type ImageProps = {
  lightImage: string;
  darkImage?: string;
  alt: string;
  caption?: string;
  [key: string]: any;
};

const Image: React.FC<ImageProps> = ({
  lightImage,
  darkImage,
  alt,
  caption,
  ...props
}) => {
  const { colorMode } = useColorMode();

  const imageUrl = colorMode === 'dark' ? darkImage : lightImage;

  return (
    <div className="py-0.5 text-center text-sm flex flex-col ">
      <img
        className="mx-auto"
        loading="lazy"
        src={useBaseUrl(imageUrl)}
        alt={alt}
        {...props}
      />
      <span className="pt-0.5 opacity-65">{caption}</span>
    </div>
  );
};

export default Image;
