'use client'

import { Icon } from "@/components/atoms";
import { TimeStamp } from "@/components/parts/Message/TimeStamp";
import Image from "next/image";
import { MessageSubListProps } from "@/components/organisms/Message/MessageList";
import { fromTimestampToString } from "@/utils/convert";

interface ListSubProps {
  item: MessageSubListProps
  selectedId: string
  onClick: (id: string) => void
}

const ListSub: React.FC<ListSubProps> = ({ item, selectedId, onClick }) => {
  return (
    <div onClick={() => onClick(item.userId)} className={`${selectedId === item.userId ? 'bg-gray-gray_light':'bg-gray-white'} relative flex w-[230px] h-[60px] p-[10px] border-b border-gray-gray cursor-pointer`}>
      <div className="inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full mr-[10px]">
        {item.avatar ? (
          <Image src={item.avatar} width={40} height={40} alt={item.name} />
        ) : (
          <Icon size={40} src={'/images/avatar/no_avatar.png'} alt="avatar" />
        )}
      </div>
      <div className="flex flex-col justify-between">
        <h4 className="text-h4">
          <span>{item.name}</span>
        </h4>
        <TimeStamp label={fromTimestampToString(item.userLastAccessAt).slice(0, 10)}/>
      </div>
      {item.unreadCount > 0 && (
        <span className="absolute inline-block bg-core-red w-[10px] h-[10px] rounded-full top-0 bottom-0 right-[10px] my-auto"></span>
      )}
    </div>
  );
};

export default ListSub;