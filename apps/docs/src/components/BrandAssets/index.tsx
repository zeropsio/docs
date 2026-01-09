import React from 'react';

type AssetType = {
  name: string;
  description: string;
  preview: string;
};

const AssetCard = ({ asset }: { asset: AssetType }) => (
  <div className="bg-[var(--ifm-card-background-color)] border border-[var(--ifm-color-emphasis-200)] rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
    <div className="p-8 bg-[var(--ifm-background-color)] border-b border-[var(--ifm-color-emphasis-200)] flex items-center justify-center min-h-[160px]">
      <img src={asset.preview} alt={asset.name} className="max-w-full max-h-[120px] object-contain" />
    </div>
    <div className="p-6">
      <h3 className="m-0 mb-2 text-xl font-semibold text-[var(--ifm-heading-color)]">{asset.name}</h3>
      <p className="m-0 text-sm text-[var(--ifm-color-emphasis-700)] leading-relaxed">{asset.description}</p>
    </div>
  </div>
);

export default function BrandAssets() {
  const logos: AssetType[] = [
    {
      name: "Zerops Logo",
      description: "Official Zerops logo in high resolution",
      preview: "/img/brand/zerops-logo-preview.png"
    },
    {
      name: "Zerops Icon",
      description: "Zerops icon for favicons and small displays",
      preview: "/img/brand/zerops-icon-preview.png"
    }
  ];

  const badges: AssetType[] = [
    {
      name: "Deploy in Zerops",
      description: "Badge for projects that can be deployed in Zerops",
      preview: "/img/brand/deploy-badge-preview.png"
    },
    {
      name: "Powered by Zerops",
      description: "Badge for projects powered by Zerops",
      preview: "/img/brand/powered-badge-preview.png"
    }
  ];

  return (
    <div>
      <div className="flex  py-1 border-b border-[var(--ifm-color-emphasis-200)]">
        <a 
          href="/brand/zerops-assets.zip"
          download
          className="flex py-0.75 px-1.5 rounded-lg bg-medusa-bg-subtle hover:bg-medusa-bg-base active:bg-[#EEF0F2] dark:active:bg-[#2A2C30] border border-solid border-medusa-border-base items-center gap-1 text-[#3B3D40] dark:text-gray-300 hover:text-gray-900 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          <span>
            <div className="text-base font-semibold">Download Zerops Assets</div>
          </span>
        </a>
      </div>
    </div>
  );
} 