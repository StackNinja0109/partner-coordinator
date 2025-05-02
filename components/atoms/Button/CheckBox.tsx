'use client'

import CheckBoxSquare from "@/components/parts/Button/CheckBoxSquare";
import { twMerge } from "tailwind-merge";

export enum CheckBoxColor {
  GrayLight = "bg-gray-gray_light ",
  GrayLighter = "bg-gray-gray_lighter ",
}

export interface CheckBoxProps {
  checked?: boolean;
  disabled?: boolean;
  name: string;
  text: string;
  backgroundColor: CheckBoxColor;
  onChange: (value: string) => void;
  className?: string;
  value: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  disabled = false,
  name,
  text,
  backgroundColor,
  onChange,
  className,
  value,
}) => {
  const opacity = disabled ? "opacity-40 " : " ";

  return (
    <div
      className={twMerge(
        `${
          "flex flex-row py-[6px] justify-center rounded items-center pc:px-[16px] sp:px-[12px] " +
          backgroundColor +
          opacity +
          (className ?? "")
        }`
      )}
      onClick={() => !disabled && onChange(text)}
    >
      <CheckBoxSquare
        checked={value == text}
        disabled={disabled}
        text={text}
        onChange={onChange}
      />

      <label
        htmlFor={name}
        className={
          "ml-4 text-gray-black pc:text-body_pc sp:text-body_sp w-[120%] text-left"
        }
      >
        {text}
      </label>
    </div>
  );
};

export default CheckBox;
