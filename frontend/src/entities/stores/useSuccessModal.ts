import { create } from 'zustand'

interface SuccessModalStage {
    isOpen: false,
    setOpen: (open: any) => void
}

export const useSuccessModalStage = create<SuccessModalStage>()((set) => ({
    isOpen: false,
    setOpen: (open) => set(() => ({ isOpen: open })),
}))