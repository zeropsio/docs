import React from 'react';

interface CustomCardWithIconProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  children: React.ReactNode;
  iconProps?: React.SVGProps<SVGSVGElement>;
}

const CustomCardWithIcon: React.FC<CustomCardWithIconProps> = ({
  title,
  children,
  icon: Icon,
  iconProps = {
    width: 20,
    height: 20
  }
}) => {
  return (
    <div className="height-100 bg-medusa-tag-neutral-bg border-medusa-tag-neutral-border flex flex-row py-1.5 px-1 border border-solid rounded shadow-none">
      <span className="mr-1">
        <Icon {...iconProps} />
      </span>
      <span className="flex flex-col flex-wrap">
        <span className="font-semibold text-md">{title}</span>
        {children}
      </span>
    </div>
  );
};

export default CustomCardWithIcon;