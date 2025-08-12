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
    pay: [number, number]
    jobs: string,
    education: string,
    about: string,

    message: string,

    isVisible: boolean,

    advantagesNanny: [],

    modal: 'success' | 'confirmation' | 'accepted' | '',

    pathAudio: string,
    pathAvatar: string,
    pathEducation: string,
    personData: string[],

    setEmail: (email: string) => void;
    setName: (name: string) => void;
    setLocation: (location: string) => void;
    setDescription: (description: string) => void;
    setDuties: (duties: []) => void;
    setOccupation: (occupation: any) => void;
    setChart: (chart: string) => void;
    addChildren: (child: any) => void;
    changeChildren: (updatedChild: any, index: number) => void;
    
    setQuestions: (question: any) => void;
    changeCalendar: (calendar: any) => void;
    setTypePay: (pay: string) => void;
    setPay: (pay: [number, number]) => void;

    setAge: (age: any) => void;
    setAgeBabbysitter: (age: string) => void;
    setCount: (count: number) => void;
    setJobs: (jobs: string) => void;
    setEducation: (jobs: string) => void;
    setAbout: (about: string) => void;

    setModal: (type: any) => void;
    setData: (data: any) => void;
    setVisible: (data: any) => void;
    setAdvantages: (data: any) => void;
    setMessage: (data: any) => void;
    setAudio: (path: any) => void;
    setAvatar: (path: any) => void;
    setFileEducation: (path: any) => void;
    setPersonData:(data: any[]) => void;
} 

export const useAnketsBabysitter = create<AnketBabysitter>((set) => ({
    email: 'test@gmail.com',
    children: [{
        gender: '',
        age: 90,
    }],
    pay: [0, 0],
    name: 'Имя',
    question: '',
    location: 'Москва',
    description: 'Описание',
    duties: new Array(29).fill(false), 
    occupation: [],
    chart: '',
    calendar: '',
    typePay: '',
    age: [false,false,false,false,false,false],
    ageBabysitter: [20],
    count: 0,
    jobs: 'Jobs',
    education: 'Education',
    about: 'About',
    modal: '',
    advantagesNanny: [],

    pathAudio: '',
    pathAvatar: '',
    pathEducation: '',
    personData: [],

    isVisible: false,

    message: '',

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
    setAgeBabbysitter: (ageBabysitter) => set({ ageBabysitter:ageBabysitter }),

    changeCalendar: (calendar) => set({ calendar }),
    setTypePay: (pay) => set({ typePay: pay }),
    setPay: (pay) => set({ pay: pay }),
    setAge: (age) => set({ age: age }),
    setCount: (count) => set({ count: count }),
    setEducation: (education) => set({ education: education }),
    setAbout: (about) => set({ about: about }),

    setJobs: (jobs) => set({jobs: jobs}),
    setModal: (modal) => set({modal: modal}),

    setAdvantages: (advantages) => set({advantagesNanny: advantages}),
    
    setVisible: (vis) => set({isVisible: vis}),
    
    setMessage: (message) => set({message: message}),

    setAudio: (path) => set({
        pathAudio: path
    }),

    setAvatar: (path) => set({
        pathAvatar: path
    }),

    setFileEducation: (path) => set({
        pathEducation: path
    }),

    setPersonData: (path) => set({
        personData: path,
    }),

    setData: (data) => set({
        about: data.nannyProfile.about,
        age: data.nannyProfile.agesBaby.map((item: any) => {
            return {
                select: item
            }
        }),
        chart: data.nannyProfile.charts,
        count: data.nannyProfile.experience,
        education: data.nannyProfile.education,
        duties: data.nannyProfile.duties,
        email: data.email,
        location: data.residency,
        jobs: data.nannyProfile.jobs,
        name: data.fullName,
        typePay: data.nannyProfile.typePay,
        pay: data.nannyProfile.pay ?? [0,0],
        ageBabysitter: data.age,
        occupation: data.nannyProfile.occupancy,

        pathAudio: data.nannyProfile.audioFile,
        pathAvatar: data.userAvatar,
    })
}));
