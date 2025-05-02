import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";

export function convertToJapaneseDayName(dayName: string): string {
  const days: { [key: string]: string } = {
    sunday: "日",
    monday: "月",
    tuesday: "火",
    wednesday: "水",
    thursday: "木",
    friday: "金",
    saturday: "土",
  };

  if (days.hasOwnProperty(dayName)) {
    return days[dayName];
  } else {
    return "Invalid day name";
  }
}

export function convertToJapaneseAmPm(enStr: string): string {
  const amPm: { [key: string]: string } = {
    am: "午前",
    pm: "午後",
  };

  if (amPm.hasOwnProperty(enStr)) {
    return amPm[enStr];
  } else {
    return "Invalid day name";
  }
}

export const dateFormat = (date: Date) => {
  return dayjs(date).format('YYYY/MM/DD dddd HH:mm')
};

export const formatDateString = (date: Date) => {
  return dayjs(date).format("YYYY/MM/DD")
}

export const formatTimeString = (date: Date) => {
  return dayjs(date).format("YYYY/MM/DD HH:mm")
}

export const fromTimestampToDate = (timestamp: Timestamp) => {  // YYYY/MM/DD HH:mm
  return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
}

export const fromTimestampToString = (timestamp: Timestamp) => {  // YYYY/MM/DD HH:mm
  return formatTimeString(fromTimestampToDate(timestamp))
}

export const fromTimestampToStringWithDay = (timestamp: Timestamp) => {   // YYYY/MM/DD(月)
  const date = timestamp.toDate()
  const dateString = dateFormat(date).split(" ")[0]
  const dayString = convertToJapaneseDayName((dateFormat(date).split(" ")[1]).toLowerCase())
  return dateString + '(' + dayString + ')'
}

export const messageDisplayDate = (msgCreatedAt: Timestamp) => {
  let todayDate: Date = new Date()
  let yesterdayDate: Date = new Date()
  yesterdayDate.setDate(yesterdayDate.getDate() - 1)
  let todayDateString: string = formatDateString(todayDate)
  let yesterdayDateString: string = formatDateString(yesterdayDate)
  let currentMsgDateString: string = formatDateString(msgCreatedAt.toDate())

  if (currentMsgDateString === todayDateString) return '今日'
  else if (currentMsgDateString === yesterdayDateString) return '昨日'
  else return currentMsgDateString
}

export const calculateAge = (dob: Timestamp) => {
  let diff_ms = Date.now() - dob.toDate().getTime()
  let age_dt = new Date(diff_ms)
  return Math.abs(age_dt.getUTCFullYear() - 1970)
}

export const formatBirthdayString = (dob: Timestamp) => {   // XXXX年XX月XX日
  const dobDate: Date = dob.toDate()
  const year: number = dobDate.getFullYear()
  const month: number = dobDate.getMonth() + 1
  const date: number = dobDate.getDate()
  return (
    year.toString() + "年" + month.toString() + "月" + date.toString() + "日"
  );
};

export const formatBirthdayStringToMonth = (dob: Timestamp) => {   // XXXX年XX月XX日
  const dobDate: Date = dob.toDate()
  const year: number = dobDate.getFullYear()
  const month: number = dobDate.getMonth() + 1
  const date: number = dobDate.getDate()
  return (
    year.toString() + "年" + month.toString() + "月"
  );
};