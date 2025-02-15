/// <reference types="react" />

interface OpenGraphImageProps {
  title: string;
  description?: string;
}

const OpenGraphImage = async ({
  title,
  description,
}: OpenGraphImageProps) => {
  const { ImageResponse } = await import('@vercel/og');
  
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: 80,
          backgroundColor: '#ffffff',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, #f0f0f0 2%, transparent 0%), radial-gradient(circle at 75px 75px, #f0f0f0 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          backgroundPosition: '-30px -30px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 40,
          }}
        >
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z"
              fill="#00E6A7"
            />
            <path
              d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z"
              fill="url(#paint0_linear_1_2)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1_2"
                x1="25"
                y1="0"
                x2="25"
                y2="50"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#00E6A7" />
                <stop offset="1" stopColor="#00E6A7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <h1
            style={{
              fontSize: 60,
              fontFamily: 'Inter',
              fontWeight: 600,
              color: '#111',
              margin: 0,
              lineHeight: 1.2,
              marginBottom: description ? 20 : 0,
            }}
          >
            {title}
          </h1>
          {description && (
            <p
              style={{
                fontSize: 30,
                fontFamily: 'Inter',
                color: '#666',
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {description}
            </p>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            bottom: 80,
            color: '#666',
            fontFamily: 'Inter',
            fontSize: 24,
          }}
        >
          docs.zerops.io
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

module.exports = {
  default: OpenGraphImage
}; 