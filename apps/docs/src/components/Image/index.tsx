import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useColorMode } from '@docusaurus/theme-common';

type ImageProps = {
  lightImage: string;
  darkImage?: string;
  alt: string;
  [key: string]: any;
};

const Image: React.FC<ImageProps> = ({ lightImage, darkImage, alt, ...props }) => {
  const { colorMode } = useColorMode();

  const imageUrl = colorMode === 'dark' ? darkImage : lightImage;

  return <img className="py-1.5" src={useBaseUrl(imageUrl)} alt={alt} {...props} />;
};

export default Image;
