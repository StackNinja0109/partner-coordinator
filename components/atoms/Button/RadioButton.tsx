'use client'

import RadioButtonCircle from "@/components/parts/Button/RadioButtonCircle";
import React, { useEffect } from "react";


export interface RadioButtonProps {
  value: string;
  disabled: boolean;
  name: string;
  label: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  disabled,
  name,
  label,
  setValue,
}) => {
  const onClick = () => {
    !disabled && setValue(name);
  };

  const opacity = disabled ? "opacity-40" : "";

  return (
    <div className={"flex items-center " + ` ${opacity}`} onClick={onClick}>
      <RadioButtonCircle
        value={value}
        name={name}
        setValue={setValue}
      />
      <label
        htmlFor={name}
        className="ml-2 font-normal text-gray-black text-body_sp pc:text-body_pc "
      >
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
