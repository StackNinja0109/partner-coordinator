import type { Timestamp } from 'firebase/firestore'
import { Name, Occupation, OfficeHour, QuestionsForPrefecture, Career } from '@/features/projects/shared/types'

export type Address = {
  zip: number
  prefecture: string
  city: string
  address1: string
  address2?: string
}

export interface Profile {
  id: string
  name: Name
  gender: string
  createdAt: Timestamp
  updatedAt: Timestamp
  occupation: Occupation
  birthday: Timestamp
  age: number
  phoneNumber: number
  zipCode: number
  address: string
  email: string
  clubs: string[]
  areasOfActivity: string[] // AreaOfActivity[];
  officeHours?: OfficeHour
  isExpeditionPossible?: string // enum;
  experienceNote?: string
  teacherLicenseStatus?: string
  teacherLicenseNote?: string
  hasDriverLicense?: boolean;
  otherLicense?: boolean
  otherLicenseNote?: string
  pr?: string
  questionsForPrefecture?: QuestionsForPrefecture[]
  career?: Career[]
  subscribeEmail: boolean;
  avatar?: string
  precautions?: string,
  userIdOfPrefecture: string,
}

export interface Coordinator {
  authId?: string
  createdAt: Timestamp
  updatedAt: Timestamp
  projectType: string
  organizationType: string
  prefectures: string
  cities: string[]
  organizationName: string
  name: Name
  phoneNumber: string
  notificationEmails: string[]
  isFirstPasswordSet: boolean
  isSuspended: boolean
  parentId: string
  deletedAt?: Timestamp
}

export interface Prefecture {
  createdAt: Timestamp
  updatedAt: Timestamp
  prefecture: string
  index: number
}