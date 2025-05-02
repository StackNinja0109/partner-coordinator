import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface CheckBoxSquareProps {
  checked: boolean;
  disabled: boolean;
  text: string;
  onChange: (value: string) => void;
}

const CheckBoxSquare: React.FC<CheckBoxSquareProps> = ({
  checked,
  disabled,
  text,
  onChange,
}) => {
  const border = checked ? "" : "border-[1px]";

  return (
    <div className="relative flex justify-center w-5 h-5 ">
      <input
        type="checkbox"
        className={
          "appearance-none bg-gray-white border-gray-gray_dark  checked:bg-core-sky disabled:opacity-60 rounded-sm absolute pc:w-[20px] pc:h-[20px] sp:w-[18px] sp:h-[18px] " +
          `${border}`
        }
        disabled={disabled}
        checked={checked}
        title={text}
        onChange={() => onChange(text)}
      />
      {checked ? (
        <FontAwesomeIcon
          icon={faCheck}
          className={"absolute mt-[2px] text-gray-gray_lighter sp:scale-75"}
        />
      ) : null}
    </div>
  );
};

export default CheckBoxSquare;
