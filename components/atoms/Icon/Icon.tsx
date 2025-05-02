'use client'

import React from "react";
import Image from "next/image";

// Define the IconProps interface for the Icon component
interface IconProps {
  src: string;
  alt: string;
  size?: 20 | 40 | 60 | 80;
  className?: string;
}

// Create the Icon component
const Icon: React.FC<IconProps> = ({ src, alt, size = 20, className = "" }) => {

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`icon rounded-full ${className}`}
    />
  );
};

export default Icon;
