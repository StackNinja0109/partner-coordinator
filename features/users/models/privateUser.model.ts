import type { Timestamp } from 'firebase/firestore'
import { Address, Name, Occupation, OfficeHour, QuestionsForPrefecture, Career } from '@/features/projects/shared/types'

export interface PrivateUser {
  id?: string
  createdAt: Timestamp
  updatedAt: Timestamp
  name: Name
  gender: string
  occupation: Occupation
  birthday: Timestamp
  address: Address
  email: string
  phoneNumber: number
  clubs: string[]
  areasOfActivity: string[] // AreaOfActivity[];
  officeHours?: OfficeHour
  isExpeditionPossible?: string // enum
  experience?: string
  experienceNote?: string
  teacherLicenseStatus?: string
  teacherLicenseNote?: string
  otherLicense?: boolean
  otherLicenseNote?: string
  hasDriverLicense?: boolean
  pr?: string
  questionsForPrefecture?: QuestionsForPrefecture[]
  career?: Career[]
  subscribeEmail: boolean
  isSuspended: boolean
  isDeletedAccount: boolean
  deleatedAt?: Timestamp
  avatar: string
  precautions?: string
  userIdOfPrefecture: string

  isCandidateStage?: boolean
  confirmEmail?: string
}