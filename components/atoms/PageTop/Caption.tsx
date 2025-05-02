'use client'

// Import the required libraries
import React from "react";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Define the TopPageCaptionProps interface for the TopPageCaption component
interface TopPageCaptionProps {
  className?: string;
  title: string;
  subTitle?: string;
  isLockIcon?: boolean
}

// Create the TopPageCaption component
const TopPageCaption: React.FC<TopPageCaptionProps> = ({
  className = '',
  title,
  subTitle,
  isLockIcon = false,
}) => {

  return (
    <div
      className={`w-full flex flex-col pc:flex-row gap-2 pc:gap-5 items-center px-3 pc:px-5 py-3 rounded-t-[10px] bg-light-blue_light ${className}`}
    >
      <h4 className={`text-h5 sp:text-h4 text-core-blue`}>{title}</h4>
      <div className="flex flex-row items-center gap-1">
        {isLockIcon && (
          <p className={`text-mini text-gray-black`}>
            ※ <FontAwesomeIcon icon={faLock} />
          </p>
        )}
        {subTitle && (
          <p className={`text-mini text-gray-black`}>{subTitle}</p>
        )}
      </div>
    </div>
  );
};

export default TopPageCaption;
