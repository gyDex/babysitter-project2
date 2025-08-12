import { create } from 'zustand'

interface CreateStage {
  stage: 'first' | 'second' | 'three' | 'four' | 'five' | 'six' | 'seven',
  setStage: (stage: any) => void
}

export const useCreateParentStage = create<CreateStage>()((set) => ({
  stage: 'first',
  setStage: (stage) => set(() => ({ stage: stage })),
}))