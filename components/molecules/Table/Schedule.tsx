'use client'

import { OfficeHour } from "@/features/projects/shared/types";
import { convertToJapaneseAmPm, convertToJapaneseDayName } from "@/utils/convert";
import React from "react";

interface ScheduleProps {
  className?: string;
  schedule?: OfficeHour;
  size: 'default' | 'small' | 'mini' | 'scale';
}

const Schedule: React.FC<ScheduleProps> = ({ className = '', schedule, size }) => {
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const amPm = ['am', 'pm'];

  const hasSchedule = (day: string, time: string) => {
    let daySchedule: String[] = [];
    switch (day) {
      case "monday":
        if (schedule) daySchedule = schedule.monday;
        break;
      case "tuesday":
        if (schedule) daySchedule = schedule.tuesday;
        break;
      case "wednesday":
        if (schedule) daySchedule = schedule.wednesday;
        break;
      case "thursday":
        if (schedule) daySchedule = schedule.thursday;
        break;
      case "friday":
        if (schedule) daySchedule = schedule.friday;
        break;
      case "saturday":
        if (schedule) daySchedule = schedule.saturday;
        break;
      case "sunday":
        if (schedule) daySchedule = schedule.sunday;
        break;

      default:
        break;
    }
    if (!daySchedule) {
      return false;
    }
    return daySchedule.includes(time);
  };

  const sizes = {
    default: {
      blackDotSize: "w-5 h-5",
      cellSize: "min-w-[67px]",
      textClass: "text-body_sp",
    },
    small: {
      blackDotSize: "w-4 h-4",
      cellSize: "min-w-[51px]",
      textClass: "text-timestamp",
    },
    mini: {
      blackDotSize: "w-[14px] h-[14px]",
      cellSize: "min-w-[28px]",
      textClass: "text-timestamp",
    },
    scale: {
      blackDotSize: "w-[1.3em] h-[1.3em]",
      cellSize: "min-w-[3em]",
      textClass: "text-timestamp",
    }
  };

  const { blackDotSize, cellSize, textClass } = sizes[size];

  return (
    <div className={`${className}`}>
      <table className="w-full text-center">
        <thead className="bg-gray-gray_lighter">
          <tr>
            <th className="border border-gray-gray"></th>
            {daysOfWeek.map(day => (
              <th key={day} className={`${textClass} pc:text-body_sp h-5 border border-gray-gray ${cellSize} pc:min-w-[50px] leading-none`}>{convertToJapaneseDayName(day)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {amPm.map(time => (
            <tr key={time}>
              <td className={`${textClass} pc:text-body_sp bg-gray-gray_lighter border border-gray-gray ${cellSize} pc:min-w-[50px] py-[5px]`}>{convertToJapaneseAmPm(time)}</td>
              {daysOfWeek.map(day => (
                <td key={`${day}-${time}`} className={`border border-gray-gray align-middle ${size === 'small' ? 'bg-gray-white' : ''} ${cellSize} pc:min-w-[50px]`}>
                  {hasSchedule(day, time) ? (
                    <span className={`block mx-auto ${blackDotSize} pc:w-4 pc:h-4 rounded-full bg-gray-black`}></span>
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(Schedule);