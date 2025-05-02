import { Timestamp, FieldValue } from 'firebase/firestore'

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

export type WorkingDateAndTime = {
  date: FieldValue | Timestamp
  start: {
    hour: string
    min: string
  }
  end: {
    hour: string
    min: string
  }
}

export interface EventProject {
  id?: string
  createdAt: FieldValue | Timestamp
  updatedAt: FieldValue | Timestamp
  title: string
  organizer: string
  schoolName: string[]
  numberOfApplicants: number
  workplace: Address
  officeHours: WorkingDateAndTime[]
  officeHoursNote: string
  jobDescription: string
  gender: string
  people?: string
  salary: string
  note?: string
  name: Name
  position?: string
  address: Address
  phoneNumber: string   // number
  email: string
  status: string
  memo: string
  deletedAt?: Timestamp
}

export const initialEventProject: EventProject = {
  createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    title: "",
    organizer: "",
    schoolName: [],
    numberOfApplicants: 0,
    workplace: {
      zip: 0,
      prefecture: "",
      city: "",
      address1: "",
    },
    officeHours: [],
    officeHoursNote: "",
    jobDescription: "",
    gender: "",
    salary: "",
    name: {
      sei: "",
      mei: "",
      seiKana: "",
      meiKana: "",
    },
    position: "",
    address: {
      zip: 0,
      prefecture: "",
      city: "",
      address1: "",
    },
    phoneNumber: "",
    email: "",
    status: "",
    memo: "",
}