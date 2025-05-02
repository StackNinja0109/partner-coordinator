'use client'

import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

interface HeaderProps {
  name: string,
  messageUrl: string,
  onClose?: () => void;
}

const Header: React.FC<HeaderProps> = ({ name, messageUrl, onClose}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  const handleOnClick = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  }
  
  return isVisible ? (
    <div className="w-full bg-core-blue_dark flex justify-between items-center p-[10px] rounded-t-[6px]">
      <div className="flex">
        <span onClick={handleOnClick} className="cursor-pointer mr-[10px] text-[26px] text-gray-white">
          <IoMdClose />
        </span>
        <span className="text-h3 text-gray-white">{name}</span>
      </div>
      <a href={messageUrl} className="inline-flex justify-center items-center cursor-pointer h-[29px] bg-core-blue border border-gray-white px-[10px] py-[6px]">
        <span className="text-timestamp text-gray-white">メッセージ画面で確認</span>
      </a>
    </div>
  ) : null;
};

export default Header;

