import React from 'react'
import { ImageResponse } from '@vercel/og'
import fs from 'fs/promises'
import path from 'path'

interface OpenGraphImageProps {
  title: string
  description?: string
}

export default async function OpenGraphImage({
  title,
  description,
}: OpenGraphImageProps) {
  // Read the base image
  const baseImagePath = path.join(process.cwd(), 'static/img/og-templates/base.png')
  const baseImage = await fs.readFile(baseImagePath)

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          backgroundImage: `url(data:image/png;base64,${baseImage.toString('base64')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '60px',
            width: '100%',
          }}
        >
          <h1
            style={{
              fontSize: 56,
              fontFamily: 'Inter',
              fontWeight: 800,
              color: '#1A1A1A',
              margin: 0,
              lineHeight: 1.2,
              marginBottom: description ? 16 : 0,
              letterSpacing: '-0.02em',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              textRendering: 'optimizeLegibility',
            }}
          >
            {title}
          </h1>
          {description && (
            <p
              style={{
                fontSize: 28,
                fontFamily: 'Inter',
                fontWeight: 600,
                color: '#616A71',
                margin: 0,
                lineHeight: 1.4,
                maxWidth: '80%',
                letterSpacing: '-0.01em',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'optimizeLegibility',
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
} 