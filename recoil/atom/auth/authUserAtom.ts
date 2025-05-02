import { atom } from 'recoil'
import { User } from 'firebase/auth'

interface AuthUserState {
  user: User | null
  prefecture: string
  organizationName: string
  organizationType: string
}

export const authUserState = atom<AuthUserState>({
  key: 'authUserState',
  default: {
    user: null,
    prefecture: '',
    organizationName: '',
    organizationType: '',
  },
  dangerouslyAllowMutability: true
})