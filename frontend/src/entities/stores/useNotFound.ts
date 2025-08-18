import { create } from 'zustand';

interface NotFoundState {
    isNotFound: boolean;
    setNotFound: (notFound: any) => void;
} 

export const useNotFound = create<NotFoundState>((set) => ({
    isNotFound: false,
    setNotFound: (notFound) => set(() => ({ isNotFound: notFound })),
}));
