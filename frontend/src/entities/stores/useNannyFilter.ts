import { create } from 'zustand'

interface FilterNannyState {
    startAge: string,
    endAge: string,
    changeStart: (age: string) => void,
    changeEnd: (age: string) => void,

    occupancy: string,
    changeOccupancy: (occupancy: string) => void,

    experience: string,
    setExperience: (experience: string) => void,

    pay: string,
    setPay: (pay: string) => void
}

export const useFilterNannyState = create<FilterNannyState>()((set) => ({
  startAge: '',
  endAge: '',
  occupancy: '',
  experience: '',
  pay: '',

  changeStart: (age) => set(() => ({ startAge: age })),
  changeEnd: (age) => set(() => ({ endAge: age })),
  changeOccupancy: (occupancy) => set(() => ({ occupancy: occupancy })),
  setExperience: (experience) => set(() => ({ experience: experience })),
  setPay: (age) => set(() => ({ pay: age })),
}))