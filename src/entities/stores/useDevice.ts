import { create } from 'zustand'

interface DeviceState {
  isDevice: 'mobile' | 'desktop' | null,
  setDevice: (isDevice: any) => void
}

export const useDevice = create<DeviceState>()((set) => ({
  isDevice: null,
  setDevice: (isDevice) => set(() => ({ isDevice: isDevice })),
}))