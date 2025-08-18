import { INannyItem } from "@/entities/types/INanny";
import api from ".";

export const editData = async (id: string,data: any): Promise<string> => {
    console.log(data)

    const response = await api.put(`/users/nanny/${id}`, data);

    return response.data;
};

export const createRequest = async (name: string, id: string, request: string): Promise<any> => {
  const response = await api.post(`/users/nanny/request`, {
    message: request,
    id: id,
    parent: name ?? 'Имя'
  });
  
  return response.data;
};

export const getNannyProfile = async (): Promise<any> => {
  const response = await api.get(`/users/nanny/profile`);
  return response.data;
};

export const getNanny = async (): Promise<any> => {
  const response = await api.get(`/users/nanny`);
  return response.data;
};

export const getSimNanny = async (id: string): Promise<any> => {
  const response = await api.get(`/users/nanny-sim?id=${id}`);
  return response.data;
};

export const getAllNannyByCity = async (city: string): Promise<INannyItem[]> => {
  console.log('city',city)
  const response = await api.get(`/users/nanny/city?city=${city}`);
  return response.data;
};

export const getAllReviews = async ():Promise<any[]> => {
  const response = await api.get(`/users/nanny/reviews`);
  return response.data;
}

export const getNannyById = async (id: string): Promise<any> => {
  const response = await api.get(`/users/nanny/${id}`);
  return response.data;
};

export const getImage = async (id: string): Promise<any> => {
  const response = await api.get(`audio/file/${id}`);
  return response.data;
};

export const getAllVacancyByCity = async (city: string): Promise<string> => {
  console.log(city)
  const response = await api.get(`/users/nanny/vacancy/city?city=${city}`);
  return response.data;
};

export const respond = async (id: string, vacid: string, message: string | null): Promise<string> => {
    const response = await api.post(`/users/nanny/respond`, {
      data: {
        userId: id,
        vacId: vacid,
        message: message,
      }
    });

    return response.data;
};

