'use client'

import { useState } from "react";
import FileIcon from "@/components/parts/Message/FileIcon";
import { TimeStamp } from "@/components/parts/Message/TimeStamp";
import { MdClose } from "react-icons/md";
import { BalloonType } from "@/components/atoms/Message/Balloon";


interface AttachmentFileProps {
  extension: string
  fileName: string
  type?: BalloonType
  isRemoveBtn?: boolean
  time?: string
  onClose?: () => void
}

const AttachmentFile: React.FC<AttachmentFileProps> = ({ extension, fileName, type, isRemoveBtn = false, time, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleOnClick = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  }

  return isVisible ? (
    <div className={`${type == BalloonType.Received ? "flex-row-reverse " : ""}inline-flex gap-1 items-end`}>
      <div className="inline-flex items-center gap-1 px-3 py-2 border border-gray-gray rounded-[6px] bg-gray-white relative hover:cursor-pointer">
        <FileIcon extension={extension} />
        <span className="text-small">{fileName}</span>
        {isRemoveBtn && (
          <span onClick={handleOnClick} className="absolute cursor-pointer -top-1 -right-1 w-[14px] h-[14px] text-gray-white bg-gray-gray_dark rounded-full">
            <MdClose size={14} />
          </span>
        )}
      </div>
      <TimeStamp label={time} />
    </div>
  ) : null;
};

export default AttachmentFile;