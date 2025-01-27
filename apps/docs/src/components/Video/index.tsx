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
  preload = 'none',
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
    setIsZoomed(true);
    document.body.style.overflow = 'hidden';
  };

  const handleUnzoom = () => {
    setIsZoomed(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <div className="flex justify-center pb-1">
        <video
          ref={videoRef}
          className={`max-w-full h-auto rounded-lg cursor-zoom-in hover:opacity-90 transition-opacity ${className || ''}`}
          width={width}
          height={height}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload={preload}
          onClick={handleZoom}
        >
          <source src={src} type={type} />
          Your browser does not support the video tag.
        </video>
      </div>
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center cursor-zoom-out p-8"
          onClick={handleUnzoom}
        >
          <div className="relative w-full max-w-6xl animate-in fade-in zoom-in duration-200">
            <video
              className="w-full h-auto rounded-lg shadow-2xl ring-1 ring-white/10"
              autoPlay={autoPlay}
              loop={loop}
              muted={muted}
              playsInline={playsInline}
            >
              <source src={src} type={type} />
            </video>
          </div>
        </div>
      )}
    </>
  );
};

export default Video; 