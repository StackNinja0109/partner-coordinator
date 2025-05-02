import { Timestamp } from 'firebase/firestore'

export type Address = {
  zip: number
  prefecture: string
  city: string
  address1: string
  address2?: string
}

export type Member = {
  lastAccessedAt: Timestamp
  unreadCount: number
  userId: string
}

export type Name = {
  sei: string
  mei: string
  seiKana: string
  meiKana: string
}

export const OccupationType = {
  universityStudent: '大学生',
  companyEmployee: '会社員',
  facultyMember: '教員',
  publicServant: '公務員',
  selfEmployed: '自営業',
  homemaker: '主婦',
  others: 'その他',
} as const

export type OccupationType = keyof typeof OccupationType

export type Occupation = {
  type: OccupationType
  organization: string
  faculty?: string
  grade?: string
}

export type AreaOfActivity = {
  area: string
  note: string
}

export type OfficeHour = {
  Monday: string[]
  Tuesday: string[]
  Wednesday: string[]
  Thursday: string[]
  Friday: string[]
  Saturday: string[]
  Sunday: string[]
  // note?: string;
}

export type Career = {
  termOfStart: Timestamp
  termOfEnd: Timestamp
  organizationName: string
}

export type Option = {
  value: string
  placeholder: boolean
  text: string
  icon: number
  size: number
}

export type RegisterUserInput = {
  sei: string
  mei: string
  seiKana: string
  meiKana: string
  gender: string
  job: string
  organization: string
  faculty: string
  grade: string
  birthday: Timestamp
  zip: number
  prefecture: string
  city: string
  address1: string
  address2: string
  phoneNumber: number
  email: string
  confirmEmail: string
}

export type ProfileUserInput = {
  sei: string
  mei: string
  seiKana: string
  meiKana: string
  gender: string
  job: string
  organization: string
  faculty: string
  grade: string
  birthday: Timestamp
  zip: number
  prefecture: string
  city: string
  address1: string
  address2: string
  phoneNumber: number
  email: string
  receiveMail: string
}

export type ScheduleType = {
  [key: string]: any[]
}

export type OfficeHourType = {
  date: Timestamp
  start: {
    hour: string
    min: string
  }
  end: {
    hour: string
    min: string
  }
}

export type QuestionsForPrefecture = {
  prefecture: string
  question: string
  answer: string
  id: string
}

export type ClubTypeCategoryPopulate = {
  id?: string
  createdAt: Timestamp
  updatedAt: Timestamp
  largeCategory: string
  mediumCategory: string
  name: string
  isPublish: boolean
  largeCategoryName: string
  mediumCategoryName: string
}

export type CityTypePopulate = {
  id?: string
  createdAt: Timestamp
  updatedAt: Timestamp
  zip: string
  prefecture: string
  area: string
  city: string
  prefectureName?: string
  areaName?: string
}
