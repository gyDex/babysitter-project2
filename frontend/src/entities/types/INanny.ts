export interface INannyItem {
    id: string,
    address: string,
    name: string,
    education: string,
    charts: string,
    experience: string,
    age: string,
    about: string,
    occupancy: string,
    audioFile?: string,
    isVisible?: boolean,
    user: {
        userAvatar?: string,
        age: string,
        residency: string,
        fullName: string,
    }
}