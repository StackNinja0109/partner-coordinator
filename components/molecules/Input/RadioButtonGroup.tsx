'use client'

import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface RadioButtonGroupProps {
  className?: string;
  name: string;
  options: { label: string; value: string }[];
  onOptionChange?: (option: string) => void;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ className = '', name, options, onOptionChange }) => {
  const { register } = useFormContext();
  
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOption = event.target.value;
    if (onOptionChange) {
      onOptionChange(selectedOption);
    }
  };

  return (
    <div className={`flex flex-wrap gap-5 pc:gap-10 ${className}`}>
      {options.map((option) => (
        <div key={option.value} className="flex items-center gap-2">
          <input
            type="radio"
            id={`${name}-${option.value}`}
            value={option.value}
            {...register(name, { onChange: handleOptionChange })}
            className="w-5 h-5 pc:w-6 pc:h-6 appearance-none bg-gray-white border-gray-gray_dark border-[1px] focus:ring-core-sky focus:ring-[1px] rounded-full checked:bg-core-sky shadow-[0px_0px_0px_3px_#FDFDFD_inset] pc:shadow-[0px_0px_0px_4px_#FDFDFD_inset]"
          />
          <label htmlFor={`${name}-${option.value}`} className="pc:text-body_pc text-body_sp">{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
