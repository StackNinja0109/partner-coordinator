'use client'

import React, { useState } from "react";
import { Controller, Control, useFormContext } from "react-hook-form";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { MdSearch } from "react-icons/md";

interface InputProps {
  className?: string;
  name: string;
  control: Control<any>;
  type?: string;
  placeholder?: string;
  trigger?: any;
  maxLength?: number;
  attention?: any;
  disabled?: boolean;
  readOnly?: boolean;
  onClick?: () => void;
  onChange?: () => void;
}

const Input: React.FC<InputProps> = ({ className = '', name, control, type = 'text', placeholder, 
                trigger=null, maxLength, attention, disabled = false, readOnly = false, onClick, onChange }) => {
  const { formState: { errors } } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  const inputClassNames = [
    'w-full',
    'text-gray-black',
    'outline-none',
    'rounded',
    'pc:px-4 px-3',
    'pc:py-[6.5px] py-[7px]',
    '',
    'leading-none',
    'pc:h-9 h-[34px]',
    `${readOnly ? 'bg-gray-gray_light' : 'bg-gray-white'}`,
    `${errors[name] ? 'border-core-red bg-light-red_light' : 'border'}`,
    `${type === 'searchbtn' && 'pc:pl-12 pl-[38px]'}`,
    `${type === 'searchbox' ? 'pc:pl-12 pl-[38px] rounded-[20px] border-gray-gray text-body_sp' : 'rounded-[4px] pc:text-body_pc text-body_sp'}`,
  ].join(' ');

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  }
  
  const handleChange = () => {
    if (onChange) {
      onChange();
    }
  }
  
  const isHyphenNotAllowed = name === 'zipcode' || name === 'phoneNumber' || name === 'workZipCode' || name === 'addressZipCode'

  return (
    <div className={`relative inline-block ${className} ${disabled ? 'opacity-40' : ''}`}>
      <div className="relative" onClick={handleClick}>
        {( type === 'searchbtn' || type === 'searchbox' ) && (
          <MdSearch className={`${inputValue === "" ? 'text-gray-gray_dark' : 'text-gray-black'} absolute inline-block top-0 bottom-0 my-auto pc:left-4 left-3 pc:text-[24px] text-[20px]`} />
        )}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              className={inputClassNames}
              type={type === 'password' && showPassword ? 'text' : type}
              id={name}
              name={name}
              value={isHyphenNotAllowed && field.value? field.value.replaceAll('-', '') : field.value}
              placeholder={placeholder}
              onChange={(event) => {
                field.onChange(event);
                setInputValue(event.target.value);
                handleChange();
                if (trigger) trigger(name)
              }}
              disabled={disabled}
              readOnly={readOnly}
              autoComplete="off"
            />
          )}
        />
        {type === 'password' && (
          <button type="button" className="absolute top-0 bottom-0 my-auto pc:right-[17px] right-3 pc:text-[24px] text-[20px]" onClick={togglePasswordVisibility}>
            {showPassword ? (
              <AiFillEyeInvisible />
            ) : (
              <AiFillEye />
            )}
          </button>
        )}
      </div>
      {maxLength && (
        <p className={`block mt-[2px] text-right text-timestamp ${errors[name] && 'text-core-red'}`}>
          {inputValue.length}/{maxLength}
        </p>
      )}
      {errors[name] ? (
        <p className="block mt-[2px] text-core-red text-timestamp whitespace-nowrap">{errors[name]?.message?.toString()}</p>
      ) : (
        attention && (
          <p className="block mt-[2px] text-timestamp whitespace-nowrap">{attention}</p>
        )
      )}
    </div>
  );
};

export default Input;
