import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useColorMode } from '@docusaurus/theme-common';

type ImageProps = {
  lightImage: string;
  darkImage?: string;
  alt: string;
  caption?: string;
  invertColors?: boolean;
  [key: string]: any;
};

const Image: React.FC<ImageProps> = ({
  lightImage,
  darkImage,
  alt,
  caption,
  invertColors = false,
  ...props
}) => {
  const { colorMode } = useColorMode();

  const imageUrl =
    colorMode === 'dark' && darkImage
      ? darkImage
      : lightImage;

  const applyFilters = colorMode === 'dark' && !darkImage && invertColors;

  return (
    <div className="py-0.5 text-center text-sm flex flex-col">
      <img
        className={`mx-auto ${applyFilters ? 'filter invert hue-rotate-180' : ''}`}
        loading="lazy"
        src={useBaseUrl(imageUrl)}
        alt={alt}
        {...props}
      />
      {caption && <span className="pt-0.5 opacity-65">{caption}</span>}
    </div>
  );
};

export default Image;
