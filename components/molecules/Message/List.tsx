'use client'

import { TimeStamp } from "@/components/parts/Message/TimeStamp";
import { MessageListProps } from "@/components/organisms/Message/MessageList";
import { formatDateString } from "@/utils/convert";
import styles from "./style.module.css";

export enum Size {
  PC,
  SP
}

export enum Sex {
  Boy = "男子",
  Girl = "女子"
}

interface ListProps {
  size: Size,
  item: MessageListProps,
  selectedId: string,
  unreadStatus: boolean,
  unreadCount?: number,
  date: string,
  text?: string,
  onClick: (projectId: string) => void,
}

const List: React.FC<ListProps> = ({ size, item, selectedId, unreadStatus, unreadCount, date, text, onClick }) => {

  const dateString = date.slice(0, 10) === formatDateString(new Date()) ? date.slice(11) : date.slice(0, 10)
  return (
    <div onClick={() => onClick(item.projectId)} className={`${item.projectId === selectedId ? 'bg-gray-gray_light' : 'bg-gray-white'} flex flex-col justify-between gap-1 w-[300px] px-[10px] py-4 border-b border-gray-gray cursor-pointer`}>
      <div className="flex justify-between">
        <div className='flex flex-col justify-between'>
          <h3 className="flex flex-col gap-1">
            <span className={`${size == Size.PC ? 'text-h4 pc:text-h4' : 'text-h5'} leading-none`}>{item.organizationName}</span>
            <span className={`${size == Size.PC ? 'text-timestamp block' : 'text-small ml-2'} leading-none`}>{item.eventName}&nbsp;&nbsp;{item.gender}</span>
          </h3>
          {size == Size.SP && (
            <p className="leading-none text-timestamp">{text}</p>
          )}
        </div>
        <div className={`flex flex-col text-right items-end gap-1 ${unreadStatus ? 'justify-center' : 'justify-end'}`}>
          {unreadStatus && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-core-red text-gray-white text-timestamp">{unreadCount}</span>
          )}
          {size == Size.PC ? (
            <TimeStamp label={dateString} />
          ) : (
            <div className="text-mini text-gray-gray_dark">
              <span>{dateString}</span>
            </div>
          )}
        </div>
      </div>
      {/* <div className="text-timestamp">
        {item.lastMessage}
      </div> */}
    </div>
  )
};

export default List;