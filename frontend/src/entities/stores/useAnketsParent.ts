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
    addInfo: string,

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

    setAddInfo: (data: any) => void;
    
    setData: (data: any) => void;
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
    occupation: [false, false, false, false, false, false],
    chart: '',
    calendar: '',
    typePay: '',
    addInfo: '',

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
    
    setAddInfo: (addInfo) => set({ addInfo: addInfo }),

    setTypePay: (pay) => set({ typePay: pay }),

    setData: (data) => set({ 
        description: data.description,
        question: data.question,
        occupation: data.occupation,
        chart: data.charts,
        calendar: data.charts,
        duties: data.duties,
        children: data.childrens,
        email: data.parent.user.email,
        name: data.parent.user.fullName,
        location: data.parent.user.residency,
        typePay: data.payType,
     }),
}));
