import { create } from 'zustand'

interface EditStage {
  stage: 'first' | 'second' | 'three' | 'four' | 'five' | 'six' | 'seven' | 
  'eight' | 'nine' | 'ten' | 'eleven' | 'final' | 'twelve'
  setStage: (stage: any) => void
}

export const useEditBabysitterStage = create<EditStage>()((set) => ({
  stage: 'first',
  setStage: (stage) => set(() => ({ stage: stage })),
}))