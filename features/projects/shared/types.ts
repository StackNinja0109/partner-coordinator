import { Timestamp, FieldValue, serverTimestamp } from 'firebase/firestore'

export type OfficeHour = {
  [key: string]: string[] | string
  monday: string[]
  tuesday: string[]
  wednesday: string[]
  thursday: string[]
  friday: string[]
  saturday: string[]
  sunday: string[]
  note: string
}

export type Address = {
  zip: number
  prefecture: string
  city: string
  address1: string
  address2?: string
}

export type Name = {
  sei: string
  mei: string
  seiKana: string
  meiKana: string
}

export type Occupation = {
  type: string
  organization: string
  faculty?: string
  grade?: string
}

export type AreaOfActivity = {
  area: string
  note: string
}

export type ScheduleType = {
  [key: string]: any[]
}

export type QuestionsForPrefecture = {
  prefecture: string
  question: string
  answer: string
  id: string
}

export type Career = {
  termOfStart: Timestamp
  termOfEnd: Timestamp
  organizationName: string
}

export interface LeaderProject {
  createdAt: FieldValue | Timestamp
  updatedAt: FieldValue | Timestamp
  id?: string
  type: string
  target?: string[]
  organizationName: string
  applyForProject?: string
  eventType: string;
  eventName: string
  gender: string
  recruitment: number
  workplace: Address
  workingHours: OfficeHour
  activityDescription: string
  desiredGender: string
  desiredAge: string[]
  desiredQualifications?: string
  desiredTalent?: string
  desiredSalary: string
  desiredNote?: string
  name: Name
  position?: string
  phoneNumber: string
  email: string
  status: string
  memo: string
}

export const initialLeaderProject: LeaderProject = {
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
  type: '',
  organizationName: '',
  eventType: '',
  eventName: '',
  gender: '',
  recruitment: 0,
  workplace: {
    zip: 0,
    city: '',
    prefecture: '',
    address1: '',
  },
  workingHours: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
    note: '',
  },
  activityDescription: '',
  desiredGender: '',
  desiredAge: [],
  desiredSalary: '',
  name: {
    sei: '',
    mei: '',
    seiKana: '',
    meiKana: '',
  },
  position: '',
  phoneNumber: "",
  email: '',
  status: '',
  memo: '',
}