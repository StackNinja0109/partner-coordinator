import type { Timestamp } from 'firebase/firestore'
import { Name, Occupation } from '../shared/types'

enum SelectionStatus {
  notStarted = "未対応",
  inProgress = "対応中",
  interview = "面談",
  adopted = "採用",
  change = "一括変更",
  notAdopted = "不採用",
  cancel = "辞退",
}

export interface LeaderSelectionList {
  projectId: string
  docId: string
  userId: string
  createdAt: Timestamp
  updatedAt: Timestamp
  gender: string
  birthday: Timestamp
  name: Name
  occupation: Occupation
  interviewAt: Timestamp
  status: SelectionStatus
  lastMessageAt: Timestamp
  isUnread: boolean
  applyOrScout: string
  isSetInterview: boolean
}
