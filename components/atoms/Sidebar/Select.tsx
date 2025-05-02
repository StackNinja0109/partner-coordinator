'use client'

import React from "react";
import { PersonIcon } from "../Button";
import {
  MdCampaign,
  MdOutlineEditNote,
  MdLibraryAddCheck,
  MdGroups,
  MdQuestionAnswer,
  MdEmail,
} from "react-icons/md";
import { useRouter } from "next/navigation";

const CampaignIcon = ({ iconStyle }: { iconStyle: string }) => {
  return <MdCampaign className={iconStyle} size={22} />;
};

const EditNoteIcon = ({ iconStyle }: { iconStyle: string }) => {
  return <MdOutlineEditNote className={iconStyle} size={24} />;
};

const LibraryAddCheckIcon = ({ iconStyle }: { iconStyle: string }) => {
  return <MdLibraryAddCheck className={iconStyle} size={18} />;
};

const GroupsIcon = ({ iconStyle }: { iconStyle: string }) => {
  return <MdGroups className={iconStyle} size={18} />;
};

const QuestionAnswerIcon = ({ iconStyle }: { iconStyle: string }) => {
  return <MdQuestionAnswer className={iconStyle} size={18} />;
};

const MailIcon = ({ iconStyle }: { iconStyle: string }) => {
  return <MdEmail className={iconStyle} size={18} />;
};

export enum SelectStatus {
  ON,
  OFF,
}

export enum SelectNotice {
  ON,
  OFF,
}

export enum SelectSize {
  DEFAULT,
  SUB_1,
  SUB_2,
}

export enum IconType {
  PERSON,
  LIBRARY_ADD_CHECK,
  CAMPAIGN,
  EDIT_NOTE,
  GROUPS,
  QUESTION_ANSWER,
  EMAIL,
  TOPIC,
}

export interface SelectProps {
  status: SelectStatus;
  notice: SelectNotice;
  size: SelectSize;
  text: string;
  noticeNumber?: number;
  icon: IconType;
  href: string;
}

const getIconStyle = (
  status: SelectStatus,
  size: SelectSize,
  icon: IconType
) => {
  let iconStyle = "";

  switch (status) {
    case SelectStatus.ON:
      iconStyle += " fill-core-blue_dark ";
      break;
    case SelectStatus.OFF:
      iconStyle += " fill-gray-gray ";
      break;
  }
  if (icon == IconType.PERSON) {
    switch (size) {
      case SelectSize.DEFAULT:
        iconStyle += "w-[13.5px] h-[15px]";
        break;
      case SelectSize.SUB_1:
        iconStyle += "w-[16.5px] h-[18.33px]";
        break;
      case SelectSize.SUB_2:
        iconStyle += "w-[18px] h-[20px]";
        break;
    }
  }
  return iconStyle;
};

export const Select = ({
  status,
  notice,
  size,
  text,
  noticeNumber,
  icon,
  href,
}: SelectProps) => {
  let style = " ";
  switch (status) {
    case SelectStatus.ON:
      style +=
        "text-core-blue_dark border-l-[6px] border-core-blue_dark pl-[14px]";
      break;
    case SelectStatus.OFF:
      style += "text-gray-gray pl-[20px]";
      break;
  }
  switch (size) {
    case SelectSize.DEFAULT:
      style += " pr-[21px]";
      break;
    case SelectSize.SUB_1:
      style += " pr-[19px]";
      break;
    case SelectSize.SUB_2:
      style += " pr-[18px]";
      break;
  }

  const router = useRouter();

  return (
    <div
      className={
        "flex flex-row text-h4 py-[13.5px] items-center hover:cursor-pointer " +
        style
      }
      onClick={() => {
        router.push(href);
      }}
    >
      <span className="w-[29px]">
        {icon == IconType.PERSON && (
          <PersonIcon fill="" iconStyle={getIconStyle(status, size, icon)} />
        )}
        {icon == IconType.LIBRARY_ADD_CHECK && (
          <LibraryAddCheckIcon iconStyle={getIconStyle(status, size, icon)} />
        )}
        {icon == IconType.CAMPAIGN && (
          <CampaignIcon iconStyle={getIconStyle(status, size, icon)} />
        )}
        {icon == IconType.EDIT_NOTE && (
          <EditNoteIcon iconStyle={getIconStyle(status, size, icon)} />
        )}
        {icon == IconType.GROUPS && (
          <GroupsIcon iconStyle={getIconStyle(status, size, icon)} />
        )}
        {icon == IconType.QUESTION_ANSWER && (
          <QuestionAnswerIcon iconStyle={getIconStyle(status, size, icon)} />
        )}
        {icon == IconType.EMAIL && (
          <MailIcon iconStyle={getIconStyle(status, size, icon)} />
        )}
      </span>

      {text}
      {notice == SelectNotice.ON && (
        <div className="flex flex-row items-center justify-center w-5 h-5 rounded-full bg-core-red">
          <div className="m-auto text-mini text-gray-white">{noticeNumber}</div>
        </div>
      )}
    </div>
  );
};