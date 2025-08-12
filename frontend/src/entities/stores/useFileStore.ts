import {create} from 'zustand';

type FileWithProgress = {
  file: File;
  progress: number; // 0–100
  status: 'pending' | 'uploading' | 'done' | 'error';
};

type FileStore = {
  filesByKey: Record<string, FileWithProgress[]>;
  addFiles: (key: string, newFiles: FileWithProgress[]) => void;
  updateFile: (
    key: string,
    fileName: string,
    data: Partial<Omit<FileWithProgress, 'file'>>
  ) => void;
  removeFile: (key: string, fileName: string) => void;
  clearFiles: (key: string) => void;
};

export const useFileStore = create<FileStore>((set) => ({
  filesByKey: {},
  addFiles: (key, newFiles) =>
    set((state) => ({
      filesByKey: {
        ...state.filesByKey,
        [key]: [...(state.filesByKey[key] || []), ...newFiles],
      },
    })),
  updateFile: (key, fileName, data) =>
    set((state) => ({
      filesByKey: {
        ...state.filesByKey,
        [key]: state.filesByKey[key]?.map((f) =>
          f.file.name === fileName ? { ...f, ...data } : f
        ) || [],
      },
    })),
  removeFile: (key, fileName) =>
    set((state) => ({
      filesByKey: {
        ...state.filesByKey,
        [key]: state.filesByKey[key]?.filter((f) => f.file.name !== fileName) || [],
      },
    })),
  clearFiles: (key) =>
    set((state) => ({
      filesByKey: {
        ...state.filesByKey,
        [key]: [],
      },
    })),
}));
