import { create } from 'zustand'

interface AuthState {
  roleAuth: 'babysitter' | 'parent' | 'baby' | 'PARENT' | 'NANNY' ,
  phone: string,
  isAuth: boolean,
  isValid: boolean,
  user: any,
  setRole: (isDevice: any) => void,
  setPhone: (phone: any) => void,
  setAuth: (auth: boolean) => void
  setValid: (isValid: boolean) => void;
  setUser: (user: any) => void;
}

export const useAuth = create<AuthState>()((set) => ({
  roleAuth: 'NANNY',
  phone: '',
  isAuth: false,
  isValid: false,
  user: null,
  setRole: (role) => set(() => ({ roleAuth: role })),
  setPhone: (phone) => set(() => ({ phone: phone })),
  setValid: (isValid) => set(() => ({ isValid: isValid })),
  setAuth: (auth) => set(() => ({ isAuth: auth })),
  setUser: (user) => set(() => ({ user: user })),
}))