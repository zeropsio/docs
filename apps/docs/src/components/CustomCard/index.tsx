import React from 'react';

interface BaseCustomCardProps {
  title: string;
  children: React.ReactNode;
}

interface EmojiCardProps extends BaseCustomCardProps {
  emoji: string;
  icon?: never;
  iconProps?: never;
}

interface IconCardProps extends BaseCustomCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconProps?: React.SVGProps<SVGSVGElement>;
  emoji?: never;
}

type CustomCardProps = EmojiCardProps | IconCardProps;

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  children,
  emoji,
  icon: Icon,
  iconProps = {
    width: 20,
    height: 20
  }
}) => {
  return (
    <div className="bg-medusa-tag-neutral-bg border-medusa-tag-neutral-border flex flex-row py-1.5 px-1 my-2 border border-solid rounded shadow-none">
      <span className="mr-1">
        {emoji ? emoji : Icon && <Icon {...iconProps} />}
      </span>
      <span className="flex flex-col flex-wrap">
        <span className="font-semibold text-md">{title}</span>
        <div className="pb-0 pt-0.5">{children}</div>
      </span>
    </div>
  );
};

export default CustomCard;