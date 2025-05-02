'use client'

import { MdArrowBack } from "react-icons/md";

interface BackButtonProps {
  className?: string;
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-center w-5 h-5 pc:w-10 pc:h-10 rounded-full bg-gray-gray text-gray-white text-[12px] pc:text-[24px] cursor-pointer ${className}`}
    >
      <MdArrowBack />
    </div>
  );
}

export default BackButton;