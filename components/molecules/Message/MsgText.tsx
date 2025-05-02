'use client'

import Balloon, {  BalloonColor, BalloonType } from "@/components/atoms/Message/Balloon";
import { TimeStamp } from "@/components/parts/Message/TimeStamp";
import { AlreadyReadLabel } from "@/components/parts/Message/AlreadyReadLabel";

interface MsgTextProps {
  className?: string,
  bgColor: BalloonColor,
  type: BalloonType,
  textContent: any,
  time: string,
  readStatus: boolean,
}

const MsgText: React.FC<MsgTextProps> = ({ className = '', bgColor, type, textContent, time, readStatus }) => {
  return (
    <div className={`${className} ${type == BalloonType.Received ? "flex-row-reverse " : ""}inline-flex gap-1 items-end`}>
      <Balloon textContent={textContent} balloonColor={bgColor} balloonType={type} />
      <div>
        {readStatus && (
         <AlreadyReadLabel />
        )}
        <TimeStamp label={time} />
      </div>
    </div>
  );    
};

export default MsgText;