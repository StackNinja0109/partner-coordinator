import type { Timestamp } from 'firebase/firestore'

export interface LeaderProjectScoutList {
  id?: string
  createdAt: Timestamp
  updatedAt: Timestamp
  status: string
  projectId: string
  userId: string
  deletedAt?: Timestamp
}