'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from './Button';

type Props = {
    description: string,
    text: React.ReactNode,
    className?: string,
    title?: string,
    types?: string,
}

const FileUploadBox:React.FC<Props> = ({description, text, className, title, types }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log('Загруженные файлы:', acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'application/pdf': []
    }
  });

  return (
    <>
        <div className={`space-y-2 max-[768px]:hidden font-[onest] !text-[#0F0F0F] ${className}`}>
            <div
                {...getRootProps()}
                className={`border flex flex-col ${className} !h-full items-center justify-center border-dashed bg-[#F8F8FF] border-[#384EB74D] rounded-md px-[9px] py-[9px] text-center cursor-pointer hover:border-gray-400 transition-colors`}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                <p className="text-sm text-[#0F0F0F]  block my-[9px]">Отпустите файлы здесь…</p>
                ) : (
                <>
                    <p className="text-sm text-[#0F0F0F]  block my-[5px]">
                        {text}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{description}</p>
                </>
                )}
            </div>
        </div>
        
        <div className='min-[768px]:hidden p-[16px] border-[#D9D9D9] border-[1px] rounded-[6px] w-full'>
            <span className='block font-[onest] text-[16px] leading-[20px] font-semibold'>{title}</span>

            <span className='block mt-[12px] mb-[24px] text-[#7C8092] font-[onest] text-[16px] leading-[20px] font-normal'>{types}</span>

            <Button type='button' heart={false} text='Загрузить файл' variation='second'/>
        </div>
    </>
  );
};

export default FileUploadBox;
