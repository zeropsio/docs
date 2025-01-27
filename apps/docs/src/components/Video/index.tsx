import React, { useEffect, useRef, useState } from 'react';

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
  preload = 'auto',
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
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

  const handleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
    document.body.style.overflow = isZoomed ? '' : 'hidden';
  };

  return (
    <div className="w-full flex justify-center">
      <div 
        className={
          isZoomed 
            ? 'fixed inset-0 z-[9999] bg-black/75 flex items-center justify-center' 
            : 'w-full'
        }
        onClick={isZoomed ? handleZoom : undefined}
      >
        <div className={
          isZoomed 
            ? 'w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8'
            : 'w-full'
        }>
          <video
            ref={videoRef}
            className={`
              w-full rounded-xl cursor-zoom-in
              ${isZoomed ? 'max-h-[85vh] object-contain' : 'h-auto'}
              ${className || ''}
            `}
            width={width}
            height={height}
            autoPlay={autoPlay}
            loop={loop}
            muted={!isZoomed}
            playsInline={playsInline}
            preload="auto"
            onClick={handleZoom}
          >
            <source src={src} type={type} />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default Video; 