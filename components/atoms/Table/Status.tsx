'use client'

import React, { useState, useEffect } from "react";
import { GoTriangleDown } from "react-icons/go";

export enum StatusType {
  NotStarted = "未対応",
  InProgress = "対応中",
  Interview = "面談",
  Adopted = "採用",
  Change = "一括変更",
  NotAdopted = "不採用",
  Cancel = "辞退"
}

interface Props {
  className?: string;
  currentStatus: string;
  isForChange?: boolean;
  handleChange: (status: string) => void;
}

const Status: React.FC<Props> = ({ className = '', currentStatus, isForChange = false, handleChange }) => {
  const statusList = isForChange ? [
    { id: 1, name: "未対応" },
    { id: 2, name: "対応中" },
    { id: 3, name: "面談" },
    { id: 4, name: "採用" },
    { id: 5, name: "一括変更" },
    { id: 6, name: "不採用" },
    { id: 7, name: "辞退" },
  ] : [
    { id: 1, name: "未対応" },
    { id: 2, name: "対応中" },
    { id: 3, name: "面談" },
    { id: 4, name: "採用" },
    { id: 5, name: "不採用" },
    { id: 6, name: "辞退" },
  ];
  
  let clickedStatus: string;

  const setStyledClass = (status: string) => {
    let styledClass = "";
    let bgClass = "bg-gray-gray_light";
    let textClass = "text-timestamp";
    let widthClass = "w-[74px]";

    switch (status) {
      case "未対応":
        bgClass = "bg-light-red_light";
        break;
      case "対応中":
        bgClass = "bg-light-blue_light";
        break;
      case "面談":
        bgClass = "bg-tools-purple_light";
        break;
      case "採用":
        bgClass = "bg-light-green_light";
        break;
      case "一括変更":
        widthClass = "w-[88px] h-[26px]"
        textClass = "text-mini";
        break;
    
      default:
        break;
    }

    styledClass = `${textClass} ${widthClass} ${bgClass}`;

    return styledClass;
  }

  const [selectedStatus, setSelectedStatus] = useState(currentStatus)
  const [showStatusList, setShowStatusList] = useState(false)
  const [matchingClass, setMatchingClass] = useState(setStyledClass(currentStatus))

  useEffect(() => {
    setSelectedStatus(currentStatus);
    setMatchingClass(setStyledClass(currentStatus))
  }, [currentStatus]);

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      !target.classList.contains("custom-select-option") &&
      !target.classList.contains("selected-text")
    ) {
      setShowStatusList(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleListDisplay = () => {
    setShowStatusList(prevState => !prevState);
  };

  const handleOptionClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLElement;
    let clickedOption = target.getAttribute("data-name") || "";
    statusList.map(status => {
      if (status.name == clickedOption) {
        clickedStatus = status.name;
      }
    })
    
    handleChange(clickedStatus)
    setSelectedStatus(clickedStatus);
    setShowStatusList(false);
    
    let styledClass = setStyledClass(clickedStatus);
    setMatchingClass(styledClass);

  };

  return (
    <div className={`inline-block relative ${className}`}>
      <div
        className={`relative border border-gray-gray_dark rounded px-3 py-1 ${matchingClass} ${showStatusList ? "selected-text active" : "selected-text"}`}
        onClick={handleListDisplay}
      >
        {selectedStatus}
        <GoTriangleDown className="absolute top-0 bottom-0 my-auto right-[6px]" />
      </div>
      {showStatusList && (
        <ul className="absolute z-50 w-full rounded border-x border-gray-gray_dark">
          {statusList.map(status => {
            return (
              <li
                className="px-3 py-1 list-none border-b cursor-pointer custom-select-option bg-gray-gray_light text-timestamp border-gray-gray_dark"
                data-name={status.name}
                key={status.id}
                onClick={handleOptionClick}
              >
                {status.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Status;