import { create } from 'zustand'

interface AuthState {
  roleAuth: 'babysitter' | 'parent',
  phone: string,
  isAuth: boolean
  setRole: (isDevice: any) => void,
  setPhone: (phone: any) => void,
  setAuth: (auth: boolean) => void
}

export const useAuth = create<AuthState>()((set) => ({
  roleAuth: 'babysitter',
  phone: '0-000-000-0000',
  isAuth: false,
  setRole: (role) => set(() => ({ roleAuth: role })),
  setPhone: (phone) => set(() => ({ phone: phone })),
  setAuth: (auth) => set(() => ({ isAuth: auth })),
}))