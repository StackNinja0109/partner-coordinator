import Link from "next/link";
import MsgText from "@/components/molecules/Message/MsgText";
import { BalloonColor, BalloonType } from "@/components/atoms/Message/Balloon";
import { formatDateString, fromTimestampToString, messageDisplayDate } from "@/utils/convert";
import DateLabel from "@/components/atoms/Message/DateLabel";
import AttachmentFile from "@/components/atoms/Message/AttachmentFile";
import { MessageProps } from "./MessageContent";
import { Timestamp } from "firebase/firestore";

interface ThisProps {
  index: number
  msg: MessageProps
  coordinatorId: string
  prevMsgDate?: Timestamp
}

const MessageItem = ({ index, msg, coordinatorId, prevMsgDate }: ThisProps) => {
  let isMessageDisplayDate: boolean = true
  if (index) {
    if (formatDateString(msg.createdAt.toDate()) === formatDateString(prevMsgDate.toDate())) isMessageDisplayDate = false
  }
  return (
    <>
      {isMessageDisplayDate && (
        <div className="flex justify-center">
          <DateLabel label={messageDisplayDate(msg.createdAt)} />
        </div>
      )}
      {msg.type !== 'file' ?
        <MsgText
          bgColor={msg.senderId === coordinatorId ? BalloonColor.Green : BalloonColor.White}
          type={msg.senderId === coordinatorId ? BalloonType.Received : BalloonType.Sent}
          textContent={msg.text}
          time={fromTimestampToString(msg.createdAt).slice(11)}
          readStatus={false}
        /> :
        <div className="flex flex-col gap-3 border-t border-gray-gray_light mt-[10px]">
          {msg.fileUrl && (
            msg.fileUrl.map((file, index) => {
              let extension = file.fileName.split('.').pop() || "";
              return (
                <Link className={msg.senderId === coordinatorId ? "self-end" : "self-start"} href={file.fileUrl} key={index} target="_blank">
                  <AttachmentFile
                    extension={extension}
                    fileName={file.fileName}
                    type={msg.senderId === coordinatorId ? BalloonType.Received : BalloonType.Sent}
                    time={fromTimestampToString(msg.createdAt).slice(11)}
                  />
                </Link>
              );
            }
            ))}
        </div>
      }
    </>
  )
}

export default MessageItem