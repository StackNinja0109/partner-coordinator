'use client'

import { Icon } from "@/components/atoms";

export enum TopProfileType {
  DEFAULT,
  EDIT,
}

export interface TopProfileProps {
  updateDate: string;
  updateTime: string;
  firstName: string;
  secondName: string;
  university: string;
  typeOfUniversity: string;
  year: string;
  status: TopProfileType;
  imageUrl?: string;
}

const ImageIcon = () => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.25 11.0833V2.91667C12.25 2.275 11.725 1.75 11.0833 1.75H2.91667C2.275 1.75 1.75 2.275 1.75 2.91667V11.0833C1.75 11.725 2.275 12.25 2.91667 12.25H11.0833C11.725 12.25 12.25 11.725 12.25 11.0833ZM5.19167 8.155L6.41667 9.63083L8.225 7.30333C8.34167 7.15167 8.575 7.15167 8.69167 7.30917L10.7392 10.0392C10.885 10.2317 10.745 10.5058 10.5058 10.5058H3.51167C3.26667 10.5058 3.1325 10.2258 3.28417 10.0333L4.73667 8.16667C4.8475 8.015 5.06917 8.00917 5.19167 8.155Z"
        fill="#307DC1"
      />
    </svg>
  );
};

export const TopProfile = ({
  updateDate,
  updateTime,
  firstName,
  secondName,
  university,
  typeOfUniversity,
  year,
  status,
  imageUrl,
}: TopProfileProps) => {
  return (
    <div className="flex flex-col gap-1 pt-[10px] pb-4 px-5 w-[360px]">
      <div className="flex flex-row gap-[2px] text-mini text-gray-gray_dark justify-end">
        <div>最終更新 :</div>
        <div>{updateDate}</div>
        <div>{updateTime}</div>
      </div>
      <div className="flex flex-row justify-center gap-5 text-gray-black">
        {imageUrl ? (
          <Icon src={imageUrl} alt="profile picture" size={60} />
        ) : (
          <Icon
            src="/images/avatar/no_avatar.png"
            alt="Example Image"
            size={60}
          />
        )}
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-[2px] items-end">
            <div className="text-h4">{firstName}</div>
            <div className="text-xl leading-5"> /</div>
            <div className="text-small">{secondName}</div>
          </div>
          <div className="flex flex-row gap-1 text-timestamp">
            <div>{university}</div>
            <div>{typeOfUniversity}</div>
            <div>{year}</div>
          </div>
          {status === TopProfileType.EDIT && (
            <div className="flex flex-row gap-[2px] text-core-blue text-mini hover:cursor-pointer">
              <ImageIcon />
              <div>プロフィール画像を変更</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
