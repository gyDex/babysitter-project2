import api from ".";

export const subscribe = async (): Promise<string> => {
    const response = await api.put(`/users/parent/subscribe`);

    return response.data;
};

export const createVacancy = async (data: any): Promise<string> => {
    const response = await api.post(`/users/parent/vacancy`, data);

    return response.data;
};

export const getVacancy = async (): Promise<string> => {
    const response = await api.get(`/users/parent/vacancy`);

    return response.data;
};

export const getVacancyById = async (id: string): Promise<string> => {
    const response = await api.get(`/users/parent/vacancy/${id}`);

    return response.data;
};

export const updateAddInfo = async (id: string, body: any): Promise<string> => {
    const response = await api.put(`/users/parent/vacancy/${id}`, body);

    return response.data;
};

export const changeCity = async (city: string): Promise<string> => {
    const response = await api.put(`/users/city`, {
        city: city
    });

    return response.data;
};


