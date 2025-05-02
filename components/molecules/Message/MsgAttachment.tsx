'use client'

import { BalloonType } from "@/components/atoms/Message/Balloon";
import { TimeStamp } from "@/components/parts/Message/TimeStamp";
import { AlreadyReadLabel } from "@/components/parts/Message/AlreadyReadLabel";
import AttachmentFile from "@/components/atoms/Message/AttachmentFile";

interface MsgAttachmentProps {
  className?: string,
  type: BalloonType,
  extension: string,
  fileName: string,
  time: string,
  readStatus: boolean,  
}

const MsgAttachment: React.FC<MsgAttachmentProps> = ({ className = '', type, extension, fileName, time, readStatus }) => {
  return (
    <div className={`${className} ${type == BalloonType.Received ? "flex-row-reverse " : ""}inline-flex gap-1 items-end`}>
      <AttachmentFile extension={extension} fileName={fileName} isRemoveBtn={false} />
      <div>
        {readStatus && (
         <AlreadyReadLabel />
        )}
        <TimeStamp label={time} />
      </div>
    </div>
  );    
};

export default MsgAttachment;