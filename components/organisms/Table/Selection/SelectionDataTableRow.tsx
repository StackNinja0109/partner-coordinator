'use client'

import { SelectionItem } from "./SelectionDataTable"
import CheckBox from "./CheckBox"
import { Timestamp } from "firebase/firestore";
import { HowToApply } from "@/components/atoms/Table/HowToApply";
import Status, { StatusType } from "@/components/atoms/Table/Status";
import Message from "@/components/atoms/Table/Message";
import TimeStump from "@/components/atoms/Table/TimeStump";
import { useState } from "react";
import axios from "axios"
import Modal from "@/components/molecules/Modal/Modal";
import Button, { ButtonColor, ButtonShape } from "@/components/atoms/Button/Button";
import { fromTimestampToDate } from "@/utils/convert";
import DatePickerComponent from "../../DateFrame/Calendar";
import TimePickerComponent from "../../DateFrame/Clock";

const getStatusToJapanese = (status: string): string => {
  if (status === 'notstarted') return '未対応'
  else if (status === 'inprogress') return '対応中'
  else if (status === 'interview') return '面談';
  else if (status === 'adopted') return '採用';
  else if (status === 'change') return '一括変更';
  else if (status === 'notadopted') return '不採用';
  return '辞退';
}

export interface SelectionDataTableRowProps {
  item: SelectionItem;
  is_selected: boolean;
  onClick: (id: string) => void;
  onSelected: (data: boolean) => void;
  handleInterviewTime: (interviewTime: Timestamp, userId: string) => void;
  handleStatus: (status: string, docId: string, projectId: string) => void;
}

const SelectionDataTableRow = ({ item, is_selected, onSelected, onClick, handleInterviewTime, handleStatus }: SelectionDataTableRowProps) => {

  // -----    START INTERVIEWDATE SETTING SECTION   ----- //
  const [interviewModalOpen, setInterviewModalOpen] = useState(false)
  const onInterviewClick = () => {
    setInterviewModalOpen(true)
  }

  const interviewDate = fromTimestampToDate(item.interviewAt)
  const [date, setDate] = useState(interviewDate)
  const [time, setTime] = useState(`${interviewDate.getHours()}:${interviewDate.getMinutes()}`)

  const handleSave = () => {
    const hourMinutes = time.split(':')
    const updatedInterviewDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), Number(hourMinutes[0]), Number(hourMinutes[1]));
    setInterviewModalOpen(false)
    handleInterviewTime(Timestamp.fromDate(updatedInterviewDate), item.docId)
  }

  const handleChangeDate = (date: Date) => {
    setDate(date);
  }

  const handleChangeTime = (time: string) => {
    setTime(time);
  }

  const handleChangeStatus = (status: string) => {
    handleStatus(status, item.userId, item.projectId)
  }
  // *****    END INTERVIEWDATE SETTING SECTION   ***** //

  return (
    <>
      <tr className="border-b h-[55px] border-gray-gray_light text-timestamp text-gray-black">
        <td onClick={() => onClick(item.userId)} className="cursor-pointer">
          <div className="flex items-center text-body_sp">
            {item.name.sei} {item.name.mei}
          </div>
        </td>
        <td>
          <div className="flex items-center">
            <HowToApply applyType={item.applyOrScout} />
          </div>
        </td>
        <td>
          <div className="flex items-center">
            {item.age}
          </div>
        </td>
        <td>
          <div className="flex items-center">
            {item.gender === 'male' ? '男' : item.gender === 'female' ? '女' : '無回答'}
          </div>
        </td>
        <td>
          <div className="flex items-center">
            {item.type}
          </div>
        </td>
        <td>
          <div className="flex items-center">
            <div>
              {item.organization}
            </div>
          </div>
        </td>
        <td>
          <div className="flex items-center">
            <Status key={item.docId} currentStatus={getStatusToJapanese(item.status)} handleChange={handleChangeStatus} />
          </div>
        </td>

        <td>
          <div className="flex items-center">
            <button className="text-left text-small text-core-blue" onClick={onInterviewClick}>
              {item.isSetInterview === true ? (
                <>
                  <TimeStump date={fromTimestampToDate(item.interviewAt)} moreClass='text-core-blue font-bold' />
                </>
              ) : getStatusToJapanese(item.status) === '面談' && '面接日を入力'}
            </button>
          </div>
        </td>
        <td>
          <div className="flex items-center">
            <TimeStump date={fromTimestampToDate(item.lastMessageAt)} />
          </div>
        </td>

        <td>
          <div className="flex items-center">
            <Message onClick={() => onClick(item.userId)} status={item.isUnread} />
          </div>
        </td>
        <td>
          <CheckBox checked={is_selected} onChange={onSelected} />
        </td>
      </tr>
      <Modal isOpen={interviewModalOpen} onClose={() => true} >
        <div className="w-[75vw] pc:w-[480px] flex flex-col items-center gap-5 pc:gap-[30px]">
          <div className="text-center text-h5 pc:text-h3">面談日時</div>
          <div className="w-full">
            <div className="flex justify-center items-center gap-x-10 pc:text-body_pc sp:text-body_sp">
              <DatePickerComponent
                handleChangeDate={handleChangeDate}
                value={date}
              />
              <TimePickerComponent
                handleChangeTime={handleChangeTime}
                value={time}
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pc:gap-5">
            <Button
              className="w-[140px] pc:w-[200px] py-2 pc:py-[17.5px] text-small pc:text-body_sp"
              color={ButtonColor.CANCEL}
              shape={ButtonShape.ELLIPSE}
              text="キャンセル"
              onclick={() => setInterviewModalOpen(false)}
            />
            <Button
              className="w-[140px] pc:w-[200px] py-2 pc:py-[17.5px] text-small pc:text-body_sp"
              color={ButtonColor.SUB}
              shape={ButtonShape.ELLIPSE}
              text="保存する"
              onclick={handleSave}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default SelectionDataTableRow