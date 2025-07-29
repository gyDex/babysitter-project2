import { create } from 'zustand';

interface AnketParent {
    email: string;
    name: string;
    location: string;
    description: string;
    duties: any;
    occupation: any;
    chart: string;
    children: any;
    calendar: any,
    question: string,

    typePay: string,

    setEmail: (email: string) => void;
    setName: (name: string) => void;
    setLocation: (location: string) => void;
    setDescription: (description: string) => void;
    setDuties: (duties: any) => void;
    setOccupation: (occupation: any) => void;
    setChart: (chart: string) => void;
    addChildren: (child: any) => void;
    changeChildren: (updatedChild: any, index: number) => void;
    
    setQuestions: (question: any) => void;
    changeCalendar: (calendar: any) => void;
    setTypePay: (pay: string) => void;
} 

export const useAnketsParent = create<AnketParent>((set) => ({
    email: '',
    children: [{
        gender: '',
        age: '',
    }],
    name: '',
    question: '',
    location: '',
    description: '',
    duties: new Array(14).fill(false), 
    occupation: [],
    chart: '',
    calendar: '',
    typePay: '',

    addChildren: (child) => set((state) => ({ children: [...state.children,child] })),
    changeChildren: (updatedChild, index) => set((state) => ({ children: state.children.map((child: any, i: any) =>
        i === index ? updatedChild : child
    ),  })),

    setEmail: (email) => set({ email }),
    setQuestions: (question) => set({ question }),
    setName: (name) => set({ name }),
    setLocation: (location) => set({ location }),
    setDescription: (description) => set({ description }),
    setDuties: (duties) => set({ duties }),
    setOccupation: (occupation) => set({ occupation }),
    setChart: (chart) => set({ chart }),

    changeCalendar: (calendar) => set({ calendar }),
    setTypePay: (pay) => set({ typePay: pay }),
}));
