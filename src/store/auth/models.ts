import { fb } from '../../services/firebase'

export type User = fb.User

export interface AuthState {
  loading: boolean
  authenticated: boolean
  user: User | undefined
}
