import { create } from 'zustand';

interface AnketBabysitter {
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
    age: any,
    ageBabysitter: any,
    count: number,

    typePay: string,
    jobs: string,
    education: string,
    about: string,

    modal: 'success' | 'confirmation' | 'accepted' | '',

    setEmail: (email: string) => void;
    setName: (name: string) => void;
    setLocation: (location: string) => void;
    setDescription: (description: string) => void;
    setDuties: (duties: []) => void;
    setOccupation: (occupation: []) => void;
    setChart: (chart: string) => void;
    addChildren: (child: any) => void;
    changeChildren: (updatedChild: any, index: number) => void;
    
    setQuestions: (question: any) => void;
    changeCalendar: (calendar: any) => void;
    setTypePay: (pay: string) => void;

    setAge: (age: any) => void;
    setAgeBabbysitter: (age: string) => void;
    setCount: (count: number) => void;
    setJobs: (jobs: string) => void;
    setEducation: (jobs: string) => void;
    setAbout: (about: string) => void;

    setModal: (type: any) => void;
} 

export const useAnketsBabysitter = create<AnketBabysitter>((set) => ({
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
    age: 0,
    ageBabysitter: 0,
    count: 0,
    jobs: '',
    education: '',
    about: '',
    modal: '',

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
    setAgeBabbysitter: (ageBabysitter) => set({ ageBabysitter }),

    changeCalendar: (calendar) => set({ calendar }),
    setTypePay: (pay) => set({ typePay: pay }),
    setAge: (age) => set({ age: age }),
    setCount: (count) => set({ count: count }),
    setEducation: (education) => set({ education: education }),
    setAbout: (about) => set({ about: about }),

    setJobs: (jobs) => set({jobs: jobs}),
    setModal: (modal) => set({modal: modal})
}));
