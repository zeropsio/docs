import React from 'react';
import { ImageResponse } from '@vercel/og';

interface OpenGraphImageProps {
  title: string;
  description: string;
  type?: 'feature' | 'guide' | 'reference';
  layout?: 'default' | 'dashboard' | 'code' | 'terminal';
  background?: string;
}

const LAYOUTS = {
  default: {
    background: '#0F172A',
    overlay: 'linear-gradient(90deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.85) 100%)',
  },
  dashboard: {
    background: 'url(https://docs.zerops.io/img/og-backgrounds/dashboard.png)',
    overlay: 'linear-gradient(90deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.8) 100%)',
  },
  code: {
    background: 'url(https://docs.zerops.io/img/og-backgrounds/code.png)',
    overlay: 'linear-gradient(90deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.85) 100%)',
  },
  terminal: {
    background: 'url(https://docs.zerops.io/img/og-backgrounds/terminal.png)',
    overlay: 'linear-gradient(90deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.8) 100%)',
  },
};

export default async function OpenGraphImage({
  title,
  description,
  type = 'feature',
  layout = 'default',
  background,
}: OpenGraphImageProps) {
  const selectedLayout = LAYOUTS[layout];
  
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundImage: background || selectedLayout.background,
          padding: '48px',
          position: 'relative',
        }}
      >
        {/* Background Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: selectedLayout.overlay,
            zIndex: 1,
          }}
        />

        {/* Content Container */}
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Logo and Type Badge */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <img
              src="https://docs.zerops.io/img/logo.svg"
              alt="Zerops"
              width={180}
              height={48}
            />
            <div
              style={{
                backgroundColor: '#1E293B',
                padding: '8px 16px',
                borderRadius: '8px',
                color: '#94A3B8',
                fontSize: '16px',
                textTransform: 'uppercase',
              }}
            >
              {type}
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
              gap: '24px',
            }}
          >
            <h1
              style={{
                fontSize: '48px',
                color: '#F8FAFC',
                lineHeight: 1.2,
                margin: 0,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '24px',
                color: '#94A3B8',
                lineHeight: 1.5,
                margin: 0,
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
              }}
            >
              {description}
            </p>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#64748B',
              fontSize: '16px',
            }}
          >
            <span>docs.zerops.io</span>
            <span>Developer-First Cloud Platform</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: await fetch(
            'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2'
          ).then((res) => res.arrayBuffer()),
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: await fetch(
            'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2'
          ).then((res) => res.arrayBuffer()),
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );
} 