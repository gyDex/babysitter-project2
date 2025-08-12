import { AxiosRequestConfig } from "axios";
import api from ".";

export const uploadAudio = async (
  formState: FormData,
  onProgress: (percent: number) => void
): Promise<string> => {
  const config: AxiosRequestConfig = {
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percent);
      }
    },
    headers: { "Content-Type": "multipart/form-data" },
  };

  const response = await api.post(`/audio/upload`, formState, config);
  return response.data;
};

export const uploadFiles = async (formState: FormData): Promise<string> => {
  const response = await api.post(`/upload`, formState);
  return response.data;
};

export const downloadFile = async (path: string): Promise<void> => {
  const response = await api.get('file/download', {
    params: { path },
    responseType: 'blob', // Важно! Чтобы получить бинарный blob
    withCredentials: true, // если у тебя авторизация по куки нужна
  });

  // Получаем имя файла из заголовка
  let filename = 'file';
  const disposition = response.headers['content-disposition'];
  if (disposition) {
    const match = disposition.match(/filename="(.+)"/);
    if (match && match[1]) {
      filename = decodeURIComponent(match[1]);
    }
  }

  // Создаем ссылку для скачивания
  const blob = new Blob([response.data], { type: response.headers['content-type'] });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};
