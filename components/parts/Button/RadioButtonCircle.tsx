import React from "react";

interface RadioButtonCircleProps {
  value: string;
  name: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const RadioButtonCircle: React.FC<RadioButtonCircleProps> = ({
  value,
  name,
  setValue,
}) => {
  return (
    <input
      type="radio"
      className={
        "w-5 h-5 pc:w-6 pc:h-6 appearance-none bg-gray-white border-gray-gray_dark border-[1px] focus:ring-core-sky focus:ring-[1px] rounded-full checked:bg-core-sky shadow-[0px_0px_0px_3px_#FDFDFD_inset] pc:shadow-[0px_0px_0px_4px_#FDFDFD_inset]"
      }
      checked={value === name}
      title={name}
      onChange={() => setValue(name)}
    />
  );
};

export default RadioButtonCircle;
