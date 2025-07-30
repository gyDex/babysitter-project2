import { create } from 'zustand'

interface MobileModalState {
  isOpen: boolean,
  isRegister: boolean,
  type: string,
  setOpen: (isOpen: boolean, type: string) => void;
  setRegister: (isRegister: boolean, type: string) => void;
}

export const useMobileState = create<MobileModalState>()((set) => ({
  isOpen: true,
  isRegister: false,
  type: '',
  setOpen: (isOpen, type) => set(() => ({ isOpen: isOpen, type })),
  setRegister: (isRegister) => set(() => ({ isRegister: isRegister })),
}))