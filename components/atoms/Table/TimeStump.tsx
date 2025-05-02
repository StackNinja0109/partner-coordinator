'use client'

import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { convertToJapaneseDayName, dateFormat } from "@/utils/convert";

interface TimeStumpProps {
  date: Date;
  moreClass?: string
}

const TimeStump: React.FC<TimeStumpProps> = ({ date, moreClass = 'text-gray-gray_dark' }) => {
  const dateString = dateFormat(date).split(" ")[0];
  const dayString = convertToJapaneseDayName((dateFormat(date).split(" ")[1]).toLowerCase())
  const timeString = dateFormat(date).split(" ")[2];
  
  return (
    <div className={`text-body_sp ${moreClass}`}>
      <span>{dateString}({dayString})</span><br />
      <span>{timeString}</span>
    </div>
  );
};

export default TimeStump;