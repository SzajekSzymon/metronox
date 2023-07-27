
"use client"

import classnames from "classnames";
import Image from "next/image";

type IconProps = {
  iconName: string;
  alt: string;
  className?: string;
  height?: number;
  width?: number;
  style?: React.CSSProperties;
  onClick?: (v: any) => void;
};

export const Icon = ({ iconName, alt, className, height = 100, width = 100, style, onClick }: IconProps) => {
  const iconUrl = `/icons/${iconName}.svg`;

  return (
      <Image
        src={iconUrl}
        alt={alt}
        className={classnames('icon', className)}
        width={width}
        height={height}
        priority
        onClick={onClick}
      />
  );
};
