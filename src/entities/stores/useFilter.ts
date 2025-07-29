import { create } from 'zustand'

interface FilterState {
  isOpen: boolean
  setOpen: (open: any) => void
}

export const useFilterState = create<FilterState>()((set) => ({
  isOpen: false,
  setOpen: (open) => set(() => ({ isOpen: open })),
}))