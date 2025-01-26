import React, { useEffect, useRef } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay might be blocked by browser
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex justify-center pb-1">
      <video
        ref={videoRef}
        className={`max-w-full h-auto ${isDarkMode ? 'dark:invert-[0.85] dark:hue-rotate-180 dark:contrast-[1.3] dark:brightness-[0.7] dark:saturate-[1.5] dark:opacity-85' : ''} ${className || ''}`}
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
    </div>
  );
};

export default Video; 