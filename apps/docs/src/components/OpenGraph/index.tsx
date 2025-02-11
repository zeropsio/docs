import React from 'react';
import { ImageResponse } from '@vercel/og';

interface OpenGraphImageProps {
  title: string;
  description: string;
  type?: 'feature' | 'guide' | 'reference';
}

export default function OpenGraphImage({
  title,
  description,
  type = 'feature',
}: OpenGraphImageProps) {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0F172A',
          padding: '48px',
        }}
      >
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
    ),
    {
      width: 1200,
      height: 630,
    }
  );
} 