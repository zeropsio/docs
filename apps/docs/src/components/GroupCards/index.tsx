import React from "react";

interface CardItem {
    name: string;
    link: string;
}

interface GroupCardsProps {
    emoji?: string;
    heading: string;
    items: CardItem[];
}

const GroupCards: React.FC<GroupCardsProps> = ({ items, heading, emoji }) => {
    return (
        <div className="pt-1.5 pb-2 px-3 rounded-md my-2 bg-[#F2F5F7] dark:bg-medusa-bg-base py-1 px-0.5 flex flex-col ">
            <div className="flex items-center space-x-0.5 -ml-1.5">
                <span>{emoji}</span>
                <span className="text-xl font-medium text-[#3B3D40] dark:text-gray-200">{heading}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-1 pt-1.5">
                {items.map((item, index) => (
                    <a
                        key={index}
                        href={item.link}
                        className="flex items-center justify-center py-0.5 px-2.5 rounded-lg border border-solid border-medusa-border-base bg-medusa-bg-subtle hover:bg-medusa-bg-base active:bg-[#EEF0F2] duration-300"
                    >
                        <span className="text-md font-medium text-center text-[#3B3D40] dark:text-gray-300">{item.name}</span>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default GroupCards;