'use client'

import React from "react";
import { PersonIcon } from "../Button";
import { RequiredLabel } from "./RequiredLabel";

export enum IconTypeLabel {
  OFF,
  ON,
}

export interface LabelProps {
  className?: string;
  text: string;
  htmlfor?: string;
  required?: boolean;
  icon?: IconTypeLabel;
}

export const Label = ({
  className = '',
  text,
  htmlfor = '',
  required = false,
  icon = IconTypeLabel.OFF,
}: LabelProps) => {
  const iconStyle = "ml-[5.5px] w-[9px] h-[10px]";
  return (
    <div className={`flex items-center gap-2 pc:gap-5 ${className}`}>
      <label htmlFor={htmlfor} className="flex items-center text-h5 pc:text-h4 text-gray-black">
        {text}
        {icon == IconTypeLabel.ON && (
          <PersonIcon fill=" fill-gray-black " iconStyle={iconStyle} />
        )}
      </label>
      <RequiredLabel required={required} />
    </div>
  );
};
