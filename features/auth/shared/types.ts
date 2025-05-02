import { Timestamp } from "firebase/firestore"

export interface OrganizationType {
    createdAt: Timestamp
    updatedAt: Timestamp
    name: string
    deletedAt?: Timestamp
  }