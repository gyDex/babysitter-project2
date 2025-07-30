import { create } from 'zustand'

interface RegisterStage {
    stage: 'phone' | 'code' | 'payment',
    setStage: (stage: any) => void
}

export const useRegisterStage = create<RegisterStage>()((set) => ({
    stage: 'phone',
    setStage: (stage) => set(() => ({ stage: stage })),
}))