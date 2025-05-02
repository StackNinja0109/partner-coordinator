import SelectBox from "@/components/atoms/Input/SelectBox";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useForm } from 'react-hook-form';
import { WorkingDateAndTime } from "@/features/events/shared/types";
import DatePickerComponent from "./Calendar";
import { Timestamp } from "firebase/firestore";
import { fromTimestampToDate } from "@/utils/convert";
import { v4 } from 'uuid';

interface ThisProps {
  workingDateAndTime: WorkingDateAndTime,
  index: number,
  isSetTime: boolean,
  handleUpdateWorkingDateAndTime: (updatedWorkingDateAndTime: WorkingDateAndTime, index: number) => void,
  handleRemoveWorkingDateAndTime: (index: number) => void,
}

export const DateFrame = ({ workingDateAndTime, index, isSetTime, handleUpdateWorkingDateAndTime, handleRemoveWorkingDateAndTime }: ThisProps) => {
  interface IFormValues {
    startHour: { label: string, value: string }
    startMinute: { label: string, value: string }
    endHour: { label: string, value: string }
    endMinute: { label: string, value: string }
  }

  const startHourStr = workingDateAndTime.start.hour
  const startMinuteStr = workingDateAndTime.start.min
  const endHourStr = workingDateAndTime.end.hour
  const endMinuteStr = workingDateAndTime.end.min
  const methods = useForm<IFormValues>({
    defaultValues: {
      startHour: {label: startHourStr, value: startHourStr},
      startMinute: {label: startMinuteStr, value: startMinuteStr},
      endHour: {label: endHourStr, value: endHourStr},
      endMinute: {label: endMinuteStr, value: endMinuteStr}
    },
  });

  const { control, watch } = methods;

  const startHour = watch('startHour')['value'] || '09';
  const startMinute = watch('startMinute')['value'] || '00';
  const endHour = watch('endHour')['value'] || '17';
  const endMinute = watch('endMinute')['value'] || '00';

  const [date, setDate] = useState(fromTimestampToDate(workingDateAndTime.date as Timestamp))
  const handleChangeDate = (date: Date) => {
    setDate(date);
  }

  const [didMount, setDidMount] = useState(false)
  useEffect(() => {
    setDidMount(true)
  }, [workingDateAndTime])

  useEffect(() => {
    if (didMount === false) return
    const updatedWorkingDateAndTime = {
      date: Timestamp.fromDate(date),
      start: {
        hour: startHour,
        min: startMinute,
      },
      end: {
        hour: endHour,
        min: endMinute,
      }
    }
    handleUpdateWorkingDateAndTime(updatedWorkingDateAndTime, index)
  }, [date, startHour, startMinute, endHour, endMinute, index])

  const hours = [], minutes = [];
  for (let i = 0; i < 24; i++) {
    hours.push({ value: (i < 10 ? "0" : "") + i.toString(), label: (i < 10 ? "0" : "") + i.toString() });
  }

  for (let i = 0; i < 60; i++) {
    minutes.push({ value: (i < 10 ? "0" : "") + i.toString(), label: (i < 10 ? "0" : "") + i.toString() });
  }

  return (
    <div className="flex pc:flex-row sp:flex-col items-center pc:pl-5 sp:pl-2.5 pc:gap-5 sp:gap-5">
      <div className="pc:text-body_pc sp:text-body_sp">
        <DatePickerComponent
          handleChangeDate={handleChangeDate}
          isDisabled={isSetTime === false ? (index === 0 ? false : true) : false}
          value={date}
        />
      </div>
      <div className="flex items-center pc:px-5 sp:px-2.5 pc:gap-5 pc:flex-row sp:flex-col sp:gap-1">
        <div className="flex flex-row gap-[10px] items-center">
          <SelectBox
            control={control}
            className="w-[75px]"
            name="startHour"
            isDisabled={isSetTime === false ? (index === 0 ? false : true) : false}
            options={hours}
          />
          <div className="pc:text-body_pc sp:text-body_sp">:</div>
          <SelectBox
            control={control}
            className="w-[75px]"
            name="startMinute"
            isDisabled={isSetTime === false ? (index === 0 ? false : true) : false}
            options={minutes}
          />
        </div>
        <div>～</div>
        <div className="flex flex-row gap-[10px] items-center">
          <SelectBox
            control={control}
            className="w-[75px]"
            name="endHour"
            isDisabled={isSetTime === false ? (index === 0 ? false : true) : false}
            options={hours}
          />
          <div className="pc:text-body_pc sp:text-body_sp">:</div>
          <SelectBox
            control={control}
            className="w-[75px]"
            name="endMinute"
            isDisabled={isSetTime === false ? (index === 0 ? false : true) : false}
            options={minutes}
          />
        </div>
        <div className="text-core-red text-timestamp whitespace-nowrap cursor-pointer" onClick={() => handleRemoveWorkingDateAndTime(index)}>削除</div>
      </div>
    </div>
  );
};
