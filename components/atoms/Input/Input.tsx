'use client'

import React from "react";
import { Controller, Control } from "react-hook-form";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

export enum InputType {
  BOX,
  AREA,
}

export enum InputStatus {
  DEFAULT,
  SEARCH,
  ERROR,
  PASSWORD,
  PASSWORD_ERROR,
}

export interface InputProps {
  type?: InputType;
  name: string;
  control?: Control<any>;
  placeholder?: string;
  status?: InputStatus;
  disabled?: boolean;
  setCurrentNumber?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  maxlength?: number;
  value?: string;
  rounded?: boolean;
  className?: string;
}

const getInputStyle = (
  type: InputType,
  status: InputStatus,
  disabled?: boolean
) => {
  let inputStyle = "";
  switch (type) {
    case InputType.BOX:
      inputStyle +=
        (status == InputStatus.PASSWORD || status == InputStatus.PASSWORD_ERROR
          ? "pc:pr-[43px] pr-[35px]"
          : "pc:pr-[16px] pr-[12px]") +
        " pc:py-[6.5px] pc:h-9 py-[7px] h-[34px] " +
        (status == InputStatus.SEARCH
          ? "pc:pl-[42px] pl-[38px]"
          : "pc:pl-[16px] pl-[12px]");
      break;
    case InputType.AREA:
      inputStyle +=
        " pc:min-h-[90px] pc:py-[6px] pc:px-[16px] min-h-[80px] py-[6px] px-[16px] ";
      break;
  }
  switch (status) {
    case InputStatus.DEFAULT:
      inputStyle +=
        " border-gray-gray_dark bg-gray-white focus-visible:outline-gray-gray_dark ";
      break;
    case InputStatus.SEARCH:
      inputStyle +=
        " border-gray-gray_dark bg-gray-white focus-visible:outline-gray-gray_dark ";
      break;
    case InputStatus.ERROR:
      inputStyle +=
        " border-core-red bg-light-red_light focus-visible:outline-core-red ";
      break;
    case InputStatus.PASSWORD:
      inputStyle +=
        " border-gray-gray_dark bg-gray-white focus-visible:outline-gray-gray_dark ";
      break;
    case InputStatus.PASSWORD_ERROR:
      inputStyle +=
        " border-core-red bg-light-red_light focus-visible:outline-core-red rounded ";
      break;
  }
  if (disabled) {
    inputStyle += " opacity-40 ";
  }
  return inputStyle;
};

const SearchIcon = () => {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-[25%] left-[13px] pc:w-[17px] pc:h-[17px] w-[14px] h-[14px]"
    >
      <path
        d="M12.9766 11.4716H12.1866L11.9066 11.2016C13.1066 9.80157 13.7266 7.89157 13.3866 5.86157C12.9166 3.08157 10.5966 0.861573 7.79658 0.521573C3.56658 0.00157288 0.00657776 3.56157 0.526578 7.79157C0.866578 10.5916 3.08658 12.9116 5.86658 13.3816C7.89658 13.7216 9.80658 13.1016 11.2066 11.9016L11.4766 12.1816V12.9716L15.7266 17.2216C16.1366 17.6316 16.8066 17.6316 17.2166 17.2216C17.6266 16.8116 17.6266 16.1416 17.2166 15.7316L12.9766 11.4716ZM6.97658 11.4716C4.48658 11.4716 2.47658 9.46157 2.47658 6.97157C2.47658 4.48157 4.48658 2.47157 6.97658 2.47157C9.46658 2.47157 11.4766 4.48157 11.4766 6.97157C11.4766 9.46157 9.46658 11.4716 6.97658 11.4716Z"
        fill="#AFAFAF"
      />
    </svg>
  );
};

const EyeIcon = ({
  isPasswordVisible,
  setIsPasswordVisible,
  disabled,
}: {
  isPasswordVisible: boolean;
  setIsPasswordVisible: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
}) => {
  return !isPasswordVisible ? (
    <BsFillEyeSlashFill
      onClick={() => {
        !disabled && setIsPasswordVisible(!isPasswordVisible);
      }}
      className={
        "absolute z-10 pc:top-1/4 pc:right-[8.8px] right-[9.3px] top-[27%] pc:w-[22px] pc:h-[20px] w-[18px] h-[15px]" +
        (disabled ? " " : " cursor-pointer ")
      }
    />
  ) : (
    <BsFillEyeFill
      onClick={() => {
        !disabled && setIsPasswordVisible(!isPasswordVisible);
      }}
      className={
        "absolute z-10  pc:top-1/4 top-[27%] pc:right-[8.8px] right-[9.3px] pc:w-[22px] pc:h-[20px] w-[18px] h-[15px]" +
        (disabled ? " " : " cursor-pointer ")
      }
    />
  );
};

export const Input = ({
  type = InputType.BOX,
  name,
  control,
  placeholder,
  status = InputStatus.DEFAULT,
  disabled = false,
  maxlength = 100,
  rounded = false,
  className = "w-full",
}: InputProps) => {
  const inputStyle = getInputStyle(type, status, disabled);

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  return (
    <div className="relative inline-flex flex-row w-full">
      {type == InputType.BOX ? (
        <>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <input
                maxLength={maxlength}
                name={name}
                value={field.value}
                onChange={field.onChange}
                autoComplete="off"
                type={
                  isPasswordVisible ||
                  (status !== InputStatus.PASSWORD &&
                    status !== InputStatus.PASSWORD_ERROR)
                    ? "text"
                    : "password"
                }
                className={twMerge(
                  `${
                    "appearance-none border bg-gray-white text-gray-black focus:outline-0  " +
                    (!isPasswordVisible &&
                    (status == InputStatus.PASSWORD ||
                      status == InputStatus.PASSWORD_ERROR) &&
                    field.value
                      ? " text-5xl font-times"
                      : " pc:text-body_sp text-body ") +
                    (rounded ? " rounded-[20px] " : " rounded ") +
                    inputStyle +
                    (disabled
                      ? " placeholder-gray-black  "
                      : " placeholder-gray-gray_dark ") +
                    className
                  }`
                )}
                placeholder={placeholder}
                disabled={disabled}
                // required
              />
            )}
          />
          {status == InputStatus.SEARCH && <SearchIcon />}
          {(status == InputStatus.PASSWORD ||
            status == InputStatus.PASSWORD_ERROR) && (
            <EyeIcon
              setIsPasswordVisible={setIsPasswordVisible}
              isPasswordVisible={isPasswordVisible}
              disabled={disabled}
            />
          )}
        </>
      ) : (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <textarea
              maxLength={maxlength}
              className={twMerge(
                `${
                  "appearance-none border bg-gray-white text-gray-black focus:outline-0 rounded " +
                  inputStyle +
                  (disabled
                    ? " placeholder-gray-black "
                    : " placeholder-gray-gray_dark ") +
                  className
                }`
              )}
              placeholder={placeholder}
              disabled={disabled}
              onChange={field.onChange}
              value={field.value}
              required
            ></textarea>
          )}
        />
      )}
    </div>
  );
};
