import api from ".";

export const createOrder = async (body: any): Promise<string> => {
    const response = await api.post(`/payment/create`, body);

    return response.data;
};


