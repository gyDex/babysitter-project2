'use client';

import styles from './profile-edit-stage.module.scss';
import { useEditBabysitterStage } from "@/entities/stores/useEditBabysitterStage";
import FileUploadBox from '@/shared/compontents/FileUploadBox';
import { useMobileState } from '@/entities/stores/useMobileModal';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { uploadFiles } from '@/shared/api/fileApi';
import { useAnketsBabysitter } from '@/entities/stores/useAnketsBabysitter';
import { editData } from '@/shared/api/nannyApi';
import { useAuth } from '@/entities/stores/useAuth';
import { useState } from 'react';

const ProfileEditNineStage = () => {
  const stage = useEditBabysitterStage();

  const modalState = useMobileState();

  const [isValid, setValid] = useState<boolean>(true);
  const [errors, setErrors] = useState<string>('');

  const { about, education, age, ageBabysitter, jobs, name,
    occupation, typePay, duties, count,
    pathAvatar,
    pathAudio,
    pathEducation,
    email, chart, pay, location,
    personData, setPersonData,
  } = useAnketsBabysitter();

  const {user} = useAuth();
  
  const handleSubmit = async() => {
    setValid(true);

    if(personData === null || personData === undefined || personData.length === 0) {
      setValid(false);
      setErrors('Пожалуйста, загрузите файлы ')
      return;
    }

    console.log(personData)

    const result = {
      nanny: {
        about: about,
        education: education,
        jobs: jobs,
        typePay: typePay,
        pay: pay,
        experience: count.toString(),
        agesBaby: age.map((item: any) => {
          if (item.select === null || item.select === undefined || Object.keys(item).length === 0) {
            return false
          }
          return item.select
        } ),
        duties: [...duties],
        advantages: [...duties],
        charts: chart,
        occupancy: occupation,
        isValidated: true,
        audioFile: pathAudio,
        educationFile: pathEducation,
      },
      user: {
        email: email,
        fullName: name,
        age: ageBabysitter,
        residency: location,
        userAvatar: pathAvatar,
      }
    }
    try {
      await editData(user.id, result);

      // if (personData[0]?.path) {
      //   await downloadFile(personData[0].path);
      // }

      modalState.setOpen(true, 'accepted');
      stage.setStage('ten')
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className={styles['profile-edit-stage']}>
      <div className={styles['profile-edit-stage__top']}>
        <div className={styles['profile-edit-stage__top-row']}>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
          <div className={styles['profile-edit-stage__top-item']}></div>
          <div className={styles['profile-edit-stage__top-item']}></div>
          <div className={styles['profile-edit-stage__top-item']}></div>
        </div>

        <span className={styles['profile-edit-stage__top-description']}>шаг 9/12</span>
      </div>

      <div className='flex justify-between max-[768px]:flex-col mt-[48px] max-[768px]:mt-[16px]'>
        <div>
          <h2 className='font-[onest] text-[20px] leading-[26px] font-semibold  max-[768px]:text-[18px] mb-[16px] '>Подтвердите вашу личность</h2>
          <span className={styles['profile-edit-stage__description']}>
            Паспорт (главная страница и регистрация)
          </span>
          <span className={styles['profile-edit-stage__description']}>
            Мед.книжка
          </span>

          <div className='flex gap-[12px] items-center'>
            <span className={styles['profile-edit-stage__description']}>
              Документ о несудимости
            </span>
            <Tooltip>
              <TooltipTrigger className='mb-[16px]'>              
                <div className='bg-[#7733f4] rounded-[100%] w-[20px] h-[20px] text-[white] text-[14px]'>
                  ?</div>
              </TooltipTrigger >
              <TooltipContent className='bg-[#7733f4] '>
                <p>Документ получается за 5 минут на сайте госуслуг.</p>
              </TooltipContent>
            </Tooltip>
          </div>

        </div>

        <div className='w-full min-[768px]:max-w-[518px]'>
          <FileUploadBox onUpload={(path: any) => {
              console.log(path)
            }} callbackSave={setPersonData} upload={uploadFiles} className='min-h-[117px]' description='JPEG, PNG, PDF'  text={<>
              Перетяните или <span className="text-[#431DED]">загрузите</span> файлы
            </>}/>

            {
              !isValid  && (
              <span className="text-[red] font-normal font-[onest] text-sm mt-[16px] block">
                {errors}
              </span>
            )}
        </div>
      </div>


      <div className={styles['profile-edit-stage__bottom']}>
        <button
          onClick={() => stage.setStage('eight')}
          className={styles['profile-edit-stage__btn-bottom_prev']}
        >
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.88065 3.95312L2.83398 7.99979L6.88065 12.0465"
              stroke="#431DED"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.1673 8H2.94727"
              stroke="#431DED"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Назад
        </button>

        <button
          onClick={handleSubmit}
          className={styles['profile-edit-stage__btn-bottom']}
        >
          Опубликовать
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.61935 3.95312L13.666 7.99979L9.61935 12.0465"
              stroke="#431DED"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.33273 8H13.5527"
              stroke="#431DED"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProfileEditNineStage;
