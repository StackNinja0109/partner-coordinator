'use client'

import { useEffect, useRef, useState } from "react";
import { useFormContext, Controller, Control } from "react-hook-form";
import { MdArrowDropDown } from "react-icons/md";
import Select from 'react-select';

export interface ISelectOptionsProps {
  label: string
  value: string
  isDisabled?: boolean
}

export type SelectBoxProps = {
  className?: string;
  control?: Control<any>;
  name: string;
  placeholder?: string;
  isDisabled?: boolean;
  isSearchable?: boolean;
  options: { value: string; label: string, isDisabled?: boolean }[];
  attention?: any;
};

const SelectBox: React.FC<SelectBoxProps> = ({ className = '', control, name, placeholder, isDisabled = false,
  isSearchable = false, options, attention, }) => {

  const styles = {
    control: (provided, state) => ({
      ...provided,
      fontSize: 14,
      boxShadow: 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: 14,
      fontWeight: state.isSelected ? "bold" : "normal",
      backgroundColor: state.isSelected ? "#EFEFEF" : "#FFFFFF",
      color: state.isDisabled || !state.selectProps.value? "#AFAFAF" : "#3D3D3D",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      borderLeft: 'none',
      display: 'none',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      width: 0,
    }),
    singleValue:  (provided, state) => ({
      ...provided,
      color: !state.selectProps.value.value? "#AFAFAF" : '#3D3D3D',
    })
  };

  return (
    <div className={`${className}`}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="relative">
            <Select
              {...field}
              placeholder={placeholder}
              isDisabled={isDisabled}
              isSearchable={isSearchable}
              options={options}
              styles={styles}
            />
            <MdArrowDropDown className="absolute inset-y-0 my-auto right-1 pointer-events-none text-[20px] pc:text-[24px]" />
          </div>
        )}
      />
      {attention && (
        <p className="block mt-[2px] text-timestamp">{attention}</p>
      )}
    </div>
  );
};

export default SelectBox;
