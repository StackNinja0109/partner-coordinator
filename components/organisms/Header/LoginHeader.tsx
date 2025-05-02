'use client'

import React from "react";

const NotificationIcon = () => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.0014 23.5625C14.1931 23.5625 15.1681 22.5875 15.1681 21.3958H10.8347C10.8347 22.5875 11.7989 23.5625 13.0014 23.5625ZM19.5014 17.0625V11.6458C19.5014 8.32 17.7247 5.53583 14.6264 4.79917V4.0625C14.6264 3.16333 13.9006 2.4375 13.0014 2.4375C12.1022 2.4375 11.3764 3.16333 11.3764 4.0625V4.79917C8.26723 5.53583 6.5014 8.30917 6.5014 11.6458V17.0625L5.1039 18.46C4.4214 19.1425 4.89807 20.3125 5.86223 20.3125H20.1297C21.0939 20.3125 21.5814 19.1425 20.8989 18.46L19.5014 17.0625Z"
        fill="#FDFDFD"
      />
    </svg>
  );
};

const ProfileIcon = () => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="26" height="26" rx="13" fill="#D8D8D8" />
      <path
        d="M13 13C14.3812 13 15.5 11.8812 15.5 10.5C15.5 9.11875 14.3812 8 13 8C11.6188 8 10.5 9.11875 10.5 10.5C10.5 11.8812 11.6188 13 13 13ZM13 14.25C11.3312 14.25 8 15.0875 8 16.75V17.375C8 17.7188 8.28125 18 8.625 18H17.375C17.7188 18 18 17.7188 18 17.375V16.75C18 15.0875 14.6687 14.25 13 14.25Z"
        fill="#FDFDFD"
      />
    </svg>
  );
};

const HelpIcon = () => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.0001 2.16675C7.02008 2.16675 2.16675 7.02008 2.16675 13.0001C2.16675 18.9801 7.02008 23.8334 13.0001 23.8334C18.9801 23.8334 23.8334 18.9801 23.8334 13.0001C23.8334 7.02008 18.9801 2.16675 13.0001 2.16675ZM14.0834 20.5834H11.9167V18.4167H14.0834V20.5834ZM16.3259 12.1876L15.3509 13.1842C14.8092 13.7367 14.4192 14.2351 14.2242 15.0151C14.1376 15.3617 14.0834 15.7517 14.0834 16.2501H11.9167V15.7084C11.9167 15.2101 12.0034 14.7334 12.1551 14.2892C12.3717 13.6609 12.7292 13.0976 13.1842 12.6426L14.5276 11.2776C15.0259 10.8009 15.2642 10.0859 15.1234 9.32758C14.9826 8.54758 14.3759 7.88675 13.6176 7.67008C12.4151 7.33425 11.2992 8.01675 10.9417 9.04592C10.8117 9.44675 10.4759 9.75008 10.0534 9.75008H9.72841C9.10008 9.75008 8.66675 9.14342 8.84008 8.53675C9.30591 6.94425 10.6601 5.73092 12.3392 5.47092C13.9859 5.21092 15.5567 6.06675 16.5317 7.42091C17.8101 9.18675 17.4309 11.0826 16.3259 12.1876Z"
        fill="#FDFDFD"
      />
    </svg>
  );
};

const ChatBubbleIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.6667 2.41675H4.33341C3.27925 2.41675 2.41675 3.27925 2.41675 4.33341V21.5834L6.25008 17.7501H19.6667C20.7209 17.7501 21.5834 16.8876 21.5834 15.8334V4.33341C21.5834 3.27925 20.7209 2.41675 19.6667 2.41675Z"
        fill="#FDFDFD"
      />
    </svg>
  );
};

export const LoginHeader = () => {
  const system_name = "{system_name}";

  return (
    <div className="flex flex-row w-[360px] justify-between items-center p-[10px] bg-core-blue_dark">
      <div className=" text-gray-white text-small hover:cursor-pointer">
        {system_name}
      </div>
      <div className="flex flex-row gap-[10px] items-start">
        <div className="hover:cursor-pointer">
          <NotificationIcon />
        </div>
        <div className="hover:cursor-pointer">
          <ChatBubbleIcon />
        </div>
        <div className="hover:cursor-pointer">
          <HelpIcon />
        </div>
        <div className="hover:cursor-pointer">
          <ProfileIcon />
        </div>
      </div>
    </div>
  );
};
