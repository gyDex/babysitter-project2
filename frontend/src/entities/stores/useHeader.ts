import { create } from 'zustand'

interface HeaderState {
  isTransparent: boolean
  setTransparent: (isTransparent: boolean) => void,

  isOpenMenu: boolean,
  setOpenMenu: (isOpenMenu: boolean) => void,

  NotFirstBlock: boolean,
  setNotFirstBlock: (NotFirstBlock: boolean) => void,

  toggleHeaderMenu: () => void,
  toggleTransparent: () => void,
}

export const useHeader = create<HeaderState>()((set) => ({
  isTransparent: false,
  setTransparent: (isTransparent) => set(() => ({ isTransparent: isTransparent })),

  isOpenMenu: false,
  NotFirstBlock: false,
  setOpenMenu: (isOpenMenu) => set(() => ({ isOpenMenu: isOpenMenu })),
  toggleHeaderMenu: () => set((state) => ({ isOpenMenu: !state.isOpenMenu })),
  toggleTransparent: () => set((state) => ({ isTransparent: !state.isTransparent })),
  setNotFirstBlock: (NotFirstBlock) => set(() => ({ NotFirstBlock: NotFirstBlock })),
}))