import { create } from 'zustand'

interface EditStage {
  stage: 'first' | 'second' | 'three' | 'four' | 'five' | 'six' | 'seven',
  setStage: (stage: any) => void
}

export const useEditParentStage = create<EditStage>()((set) => ({
  stage: 'first',
  setStage: (stage) => set(() => ({ stage: stage })),
}))