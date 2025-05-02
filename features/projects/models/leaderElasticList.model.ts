import type { Timestamp } from 'firebase/firestore'
import { Name, Occupation } from '../shared/types'

enum ProjectStatus {
  unsend = '未送信',
  scouted = 'スカウト済',
  notInterested = '興味なし',
  ng = 'NG',
  notStarted = "未対応",
  inProgress = "対応中",
  interview = "面談",
  adopted = "採用",
  change = "一括変更",
  notAdopted = "不採用",
  cancel = "辞退",
}

export interface LeaderElasticList {
  projectId: string
  docId: string
  userId: string
  createdAt: Timestamp
  updatedAt: Timestamp
  gender: string
  birthday: Timestamp
  name: Name
  occupation: Occupation
  candidateAt: Timestamp
  status: ProjectStatus
  scoutAt: Timestamp
  email: string
  isExpeditionPossible?: string // enum
  experience?: string
  experienceNote?: string
  teacherLicenseStatus?: string
  teacherLicenseNote?: string
  otherLicense?: boolean
  otherLicenseNote?: string
  hasDriverLicense?: string
}
