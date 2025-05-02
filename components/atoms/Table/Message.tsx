'use client'

import { MdChatBubble } from "react-icons/md";

interface MessageProps {
  status: boolean;
  onClick?: () => void;
}

const Message: React.FC<MessageProps> = ({ status, onClick }) => {
  return (
    <div onClick={() => onClick()} className={`text-[20px] ${status ? 'text-core-sky' : 'text-gray-gray'} cursor-pointer`}>
      <MdChatBubble />
    </div>
  );
};

export default Message; 

