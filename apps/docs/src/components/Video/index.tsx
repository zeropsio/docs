import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';

interface VideoProps {
  src: string;
  type?: string;
  width?: string;
  height?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  className?: string;
}

const Video: React.FC<VideoProps> = ({
  src,
  type = 'video/webm',
  width = '100%',
  height = 'auto',
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  preload = 'none',
  className,
}) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  return (
    <video
      className={`${styles.video} ${isDarkMode ? styles.darkMode : ''} ${className || ''}`}
      width={width}
      height={height}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={preload}
    >
      <source src={src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video; 