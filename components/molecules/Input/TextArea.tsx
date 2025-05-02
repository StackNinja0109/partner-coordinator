'use client'

import React, { useState } from "react";
import { Controller, Control, useFormContext } from "react-hook-form";
import { DefaultValue } from "recoil";

interface TextAreaProps {
  className?: string;
  name: string;
  control: Control<any>;
  placeholder?: string;
  trigger?: any;
  maxLength?: number;
  attention?: any;
  disabled?: boolean;
  readOnly?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({ className = '', name, control, placeholder, maxLength, 
                trigger=null, attention, disabled = false, readOnly = false }) => {
  const { formState: { errors } } = useFormContext();
  const [inputValue, setInputValue] = useState('');

  const inputClassNames = [
    'w-full',
    'text-gray-black',
    'outline-none',
    'rounded',
    'pc:px-4 px-3',
    'pc:py-[6.5px] py-[7px]',
    'pc:text-body_pc text-body_sp',
    'leading-none',
    'rounded-[4px]',
    'pc:h-[90px] h-[80px]',
    `${readOnly ? 'bg-gray-gray_light' : 'bg-gray-white'}`,
    `${errors[name] ? 'border-core-red bg-light-red_light' : 'border'}`,
  ].join(' ');

  return (
    <div className={`relative inline-block ${className} ${disabled ? 'opacity-40' : ''}`}>
      <div className="relative">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <textarea
              className={inputClassNames}
              id={name}
              name={name}
              value={field.value}
              placeholder={placeholder}
              onChange={(event) => {
                field.onChange(event);
                setInputValue(event.target.value);
                if (trigger) trigger(name)
              }}
              disabled={disabled}
              readOnly={readOnly}
            />
          )}
        />
      </div>
      {maxLength && (
        <p className={`block mt-[2px] text-right text-timestamp ${errors[name] && 'text-core-red'}`}>
          {inputValue.length}/{maxLength}
        </p>
      )}
      {errors[name] ? (
        <p className="block mt-[2px] text-core-red text-timestamp pc:whitespace-nowrap">{errors[name]?.message?.toString()}</p>
      ) : (
        attention && (
          <p className="block mt-[2px] text-timestamp pc:whitespace-nowrap">{attention}</p>
        )
      )}
    </div>
  );
};

export default TextArea;
