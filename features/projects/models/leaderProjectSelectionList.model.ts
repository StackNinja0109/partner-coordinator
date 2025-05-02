import type { Timestamp } from 'firebase/firestore'

enum ProjectSelectionType {
  notStarted = "未対応",
  inProgress = "対応中",
  interview = "面談",
  adopted = "採用",
  change = "一括変更",
  notAdopted = "不採用",
  cancel = "辞退"
}

enum ApplyOrScout {
  apply = "応募",
  scout = "スカウト"
}
export interface LeaderProjectSelectionList {
  id?: string
  createdAt: Timestamp
  updatedAt: Timestamp
  status: string
  userId: string
  isUnread: boolean
  applyOrScout: ApplyOrScout
  deletedAt?: Timestamp
}
