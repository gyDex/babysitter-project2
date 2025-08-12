import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadAudio } from '../api/fileApi';

type FileWithProgress = {
  file: File;
  progress: number; // 0–100
  status: 'pending' | 'uploading' | 'done' | 'error';
};
const FileUploadBox: React.FC<{
  description: string;
  text: React.ReactNode;
  className?: string;
  onUpload?: (path: string) => void;
  callbackSave?: (path: any) => void;
  upload?: any,
}> = ({ description, text, className, onUpload, upload = uploadAudio, callbackSave }) => {
  const [files, setFiles] = useState<FileWithProgress[]>([]);

  const uploadFiles = async (filesToUpload: FileWithProgress[], currentFiles: FileWithProgress[]) => {
    const updatedFiles = [...currentFiles];
    for (let i = 0; i < filesToUpload.length; i++) {
      const f = filesToUpload[i];
      const index = updatedFiles.findIndex((uf) => uf.file.name === f.file.name);
      if (index === -1 || updatedFiles[index].status !== 'pending') continue;

      updatedFiles[index] = { ...updatedFiles[index], status: 'uploading', progress: 0 };
      setFiles([...updatedFiles]);

      const formData = new FormData();
      formData.append('file', f.file);

      try {
        const res =  await upload(formData, (p: any) => {
          updatedFiles[index] = { ...updatedFiles[index], progress: p };
          setFiles([...updatedFiles]);
        }) as any;

        if (res.filePath) {
          res.path = res.filePath;
        }

        console.log(onUpload)
        if (onUpload !== undefined) {
          onUpload(res.path);
        }

        updatedFiles[index] = { ...updatedFiles[index], status: 'done', progress: 100, path: res.path } as any;

        callbackSave?.(updatedFiles.map((item: any) => {
          if (item.status !== 'error') {
            return item
          }
        }))
        setFiles([...updatedFiles]);
      } catch {
        updatedFiles[index] = { ...updatedFiles[index], status: 'error' };
        setFiles([...updatedFiles]);
      }
    }
  };


  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      progress: 0,
      status: 'pending' as const,
    }));

    setFiles((prev) => {
      const combined = [...prev, ...newFiles] as any;
      // Передаём актуальное состояние прямо сюда
      uploadFiles(newFiles, combined);
      return combined;
    });
  }, []);

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((f) => f.file.name !== name));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'application/pdf': [],
      'audio/mpeg': [],
      'audio/wav': [],
      'video/mp4': [],
      'audio/ogg': [],
    },
    multiple: true,
  });

  const pendingFiles = files.filter((f) => f.status === 'pending' || f.status === 'uploading');
  const uploadedFiles = files.filter((f) => f.status === 'done');

  return (
    <>
    
      <div
        {...getRootProps()}
        className={`border flex flex-col ${className} h-auto items-center justify-center border-dashed bg-[#F8F8FF] border-[#384EB74D] rounded-md px-[9px] py-[9px] text-center cursor-pointer hover:border-gray-400 transition-colors`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-sm text-[#0F0F0F] block my-[9px]">Отпустите файлы здесь…</p>
        ) : (
          <>
            <p className="text-sm text-[#0F0F0F] block my-[5px]">{text}</p>
            <p className="text-xs text-gray-400 mt-1">{description}</p>
          </>
        )}
      </div>

      {pendingFiles.length > 0 && (
        <>
          <ul className="w-full flex flex-col mt-[25px]">
            {pendingFiles.map((f, index) => (
              <li
                key={`${f.file.name}-${index}`}
                className="relative rounded-[4px] px-[8px] py-[8px] w-full h-[36px] flex items-center justify-between border-[#E3E3E3] border-[0.5px]"
              >
                <span className="font-[onest] max-w-[90%] truncate text-[12px] leading-[18px] font-normal rounded-[4px]">
                  {f.file.name}
                </span>
                <button onClick={() => removeFile(f.file.name)}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 16C5.87833 16 3.84331 15.1571 2.34315 13.6568C0.842901 12.1565 0 10.1217 0 8C0 5.87833 0.842901 3.84332 2.34315 2.34315C3.84353 0.842902 5.87833 0 8 0C10.1217 0 12.1567 0.842902 13.6568 2.34315C15.1571 3.84353 16 5.87833 16 8C15.9974 10.121 15.1538 12.1545 13.654 13.654C12.1543 15.1538 10.1207 15.9974 8 16ZM11.0851 5.94242V5.9423C11.2254 5.80678 11.3053 5.62063 11.3071 5.42558C11.3088 5.23053 11.2321 5.04292 11.0941 4.90496C10.9562 4.76701 10.7685 4.69031 10.5735 4.69202C10.3784 4.69372 10.1923 4.77371 10.0568 4.91397L8 6.97149L5.94323 4.91397C5.75853 4.7356 5.49346 4.66779 5.2457 4.73572C4.99805 4.80366 4.8046 4.99713 4.73665 5.24477C4.66871 5.49254 4.73653 5.7576 4.9149 5.9423L6.97167 7.99983L4.9149 10.0573C4.77464 10.1929 4.69465 10.379 4.69294 10.5741C4.69124 10.7691 4.76794 10.9567 4.90589 11.0947C5.04383 11.2326 5.23145 11.3093 5.4265 11.3076C5.62155 11.3059 5.8077 11.2259 5.94322 11.0857L7.99999 9.02815L10.0568 11.0857C10.1923 11.2259 10.3784 11.3059 10.5735 11.3076C10.7685 11.3093 10.9561 11.2326 11.0941 11.0947C11.2321 10.9567 11.3088 10.7691 11.307 10.5741C11.3053 10.379 11.2253 10.1929 11.0851 10.0573L9.02832 7.99983L11.0851 5.94242Z" fill="#D9D9D9"/>
                  </svg>
                </button>
                {f.status === 'uploading' && (
                  <div
                    className="absolute bottom-0 left-0 h-[3px] rounded-[10px] bg-[#7733F4]"
                    style={{ width: `${f.progress}%` }}
                  />
                )}
              </li>
            ))}
          </ul>
        </>
      )}

      {uploadedFiles.length > 0 && (
        <>
          <h2 className="mt-[20px] font-[onest] leading-[100%] font-medium text-[14px] text-[#7C8092]">
            Загружено
          </h2>
          <ul className="w-full flex gap-[12px] flex-col mt-[12px]">
            {uploadedFiles.map((f) => (
              <li
                key={f.file.name}
                className="relative relative rounded-[4px] px-[8px] py-[8px] w-full h-[36px] flex items-center justify-between border-[#0A8554] border-[0.5px]"
              >
                <span className="font-[onest] max-w-[90%] truncate text-[#7C8092] text-[12px] leading-[18px] font-normal rounded-[4px]">
                  {f.file.name}
                </span>
                <button onClick={() => removeFile(f.file.name)}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="8" fill="#FEEDED"/>
                    <path d="M11.4769 5.14517H10.4774C10.464 5.14054 10.4501 5.13753 10.436 5.13614H9.37174V4.25348C9.3718 4.18714 9.3458 4.12346 9.29945 4.07608C9.25304 4.02871 9.18995 4.00138 9.12369 4H6.60672C6.53948 4 6.47501 4.02667 6.42752 4.07422C6.37997 4.12177 6.35324 4.18624 6.35324 4.25348V5.13614H5.29439C5.2803 5.13753 5.2664 5.14054 5.25303 5.14517H4.25347C4.16288 5.14517 4.07921 5.19345 4.03395 5.27188C3.98868 5.35031 3.98868 5.44691 4.03395 5.52535C4.07921 5.60378 4.16288 5.65211 4.25347 5.65211H5.06783L5.72585 11.7735C5.7329 11.8358 5.76263 11.8933 5.8094 11.9351C5.85611 11.9769 5.91661 11.9999 5.97932 12H9.75462C9.81668 11.9991 9.87627 11.9756 9.92233 11.9339C9.96831 11.8922 9.99751 11.8352 10.0045 11.7735L10.6625 5.66105H11.4769C11.5675 5.66105 11.6511 5.61277 11.6964 5.53434C11.7417 5.45591 11.7417 5.35924 11.6964 5.28087C11.6511 5.20244 11.5675 5.1541 11.4769 5.1541L11.4769 5.14517ZM6.86566 4.50695H8.86472V5.13614H6.86566V4.50695ZM9.52455 11.4894H6.20582L5.57663 5.66111H10.1537L9.52455 11.4894Z" fill="#E10007"/>
                    <path d="M7.86675 10.8957C7.93399 10.8957 7.99845 10.869 8.04601 10.8215C8.09356 10.7739 8.12023 10.7095 8.12023 10.6422V6.50742C8.12023 6.41683 8.07195 6.33316 7.99352 6.2879C7.91509 6.24257 7.81842 6.24257 7.73999 6.2879C7.66156 6.33317 7.61328 6.41683 7.61328 6.50742V10.6422C7.61328 10.7095 7.63995 10.7739 7.6875 10.8215C7.73505 10.869 7.79952 10.8957 7.86676 10.8957H7.86675Z" fill="#E10007"/>
                    <path d="M6.8713 10.8944H6.88208C6.94901 10.8917 7.0121 10.8625 7.05761 10.8133C7.10305 10.7641 7.12725 10.6989 7.12478 10.632L6.97195 6.49719L6.97201 6.49713C6.97063 6.42941 6.94167 6.36512 6.89178 6.31926C6.84182 6.27345 6.77536 6.25004 6.70771 6.25443C6.64077 6.25726 6.57769 6.28645 6.53224 6.33563C6.48674 6.38481 6.4626 6.45 6.46501 6.51694L6.61784 10.6517C6.62103 10.7169 6.64908 10.7784 6.69627 10.8236C6.7434 10.8687 6.80606 10.8941 6.8713 10.8944L6.8713 10.8944Z" fill="#E10007"/>
                    <path d="M8.85421 10.8931H8.86318C8.92999 10.8946 8.9947 10.8698 9.04345 10.8241C9.09215 10.7784 9.12104 10.7154 9.12387 10.6486L9.2767 6.51379H9.27664C9.27911 6.44686 9.25491 6.38167 9.20946 6.33249C9.16396 6.28331 9.10088 6.25412 9.03394 6.25129C8.9655 6.24424 8.89724 6.26633 8.84589 6.3122C8.79455 6.35801 8.76493 6.42338 8.76427 6.49224L8.60964 10.627H8.6097C8.60627 10.6949 8.63022 10.7613 8.67621 10.8113C8.72214 10.8613 8.7863 10.8908 8.85421 10.8931L8.85421 10.8931Z" fill="#E10007"/>
                    </svg>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default FileUploadBox;
