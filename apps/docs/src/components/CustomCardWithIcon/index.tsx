import React from 'react';

interface CustomCardWithIconProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
  children: React.ReactNode;
  iconProps?: React.SVGProps<SVGSVGElement>;
}

const CustomCardWithIcon: React.FC<CustomCardWithIconProps> = ({
  title,
  desc,
  children,
  icon: Icon,
  iconProps = {
    width: 20,
    height: 20
  }
}) => {
  return (
    <grid className="mt-1 height-100 bg-medusa-tag-neutral-bg border-medusa-tag-neutral-border flex grid py-1.5 px-1 border border-solid rounded shadow-none">
      <grid className="flex grid-cols-2">
        <span className="mr-1">
          <Icon {...iconProps} />
        </span>
        <span className="flex flex-col flex-wrap">
          <span className="font-semibold text-md">{title}</span>
          <div className="flex-grow">{desc}</div>
        </span>
      </grid>
      {children}
    </grid>
  );
};

export default CustomCardWithIcon;