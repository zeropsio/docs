import React from "react";
import { Tooltip } from 'docs-ui';
import { LogoGithub, LogoLinkedin, LogoNodejs } from "@docusaurus/icons";

interface CardItem {
    name: string;
    link?: string;  // Optional for non-clickable items
    icon?: React.ReactNode;  // React Node for each icon
}

interface TechCardProps {
    heading: string;
    description: string;
    items: CardItem[];
}

const TechCard: React.FC<TechCardProps> = ({ heading, description, items }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
            {items.map((item, index) => {
                const isClickable = !!item.link;

                const CardContent = (
                    <div
                        className={`flex flex-col items-center justify-center p-2 rounded-lg border border-solid
                        ${isClickable ? "cursor-pointer bg-[#F2F5F7] dark:bg-medusa-bg-base hover:bg-medusa-bg-subtle-hover dark:hover:bg-medusa-bg-base-hover hover:bg-medusa-bg-base active:bg-[#EEF0F2] dark:active:bg-[#2A2C30]"
                                      : "cursor-not-allowed opacity-60"}
                        border-medusa-border-base bg-medusa-bg-subtle duration-300`}
                    >
                        {item.icon && (
                            <span className="mb-1 flex items-center justify-center rounded-full border border-gray-300">
                                {item.icon}
                            </span>
                        )}
                        <span className="text-md font-medium text-center text-[#3B3D40] dark:text-gray-300">
                            {item.name}
                        </span>
                    </div>
                );

                return isClickable ? (
                    <a key={index} href={item.link} aria-label={item.name}>
                        {CardContent}
                    </a>
                ) : (
                    <Tooltip key={index} text="Documentation coming soon">
                        {CardContent}
                    </Tooltip>
                );
            })}
        </div>
    );
};

export default TechCard;
