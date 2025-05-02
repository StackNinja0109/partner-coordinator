import type { Timestamp } from 'firebase/firestore'

enum ProjectScoutType {
  unsend = '未送信',
  scouted = 'スカウト済',
  notInterested = '興味なし',
  ng = 'NG',
}

export interface EventProjectScoutList {
  id?: string
  createdAt: Timestamp
  updatedAt: Timestamp
  status: string
  userId: string
  projectId: string
  deletedAt?: Timestamp
}