'use client';

import styles from './profile-edit-stage.module.scss';
import { useEditBabysitterStage } from "@/entities/stores/useEditBabysitterStage";
import { EditorState } from 'draft-js';
import TextEditor from '@/shared/compontents/TextEditor/TextEditor';
import FileUploadBox from '@/shared/compontents/FileUploadBox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useState } from 'react';
import { useAnketsBabysitter } from '@/entities/stores/useAnketsBabysitter';
import { useMobileState } from '@/entities/stores/useMobileModal';

const schema = z.object({
  education: z.any(), // we validate manually in the component
});

const ProfileEditTenStage = () => {
  const stage = useEditBabysitterStage();

    const { setEducation, education } = useAnketsBabysitter();
  
    const mobileState = useMobileState();

  const {
    control,
    handleSubmit,
    trigger
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      education: EditorState.createEmpty(),
    },
  });

  const [errorsText, setErrors] = useState('');

  const onSubmit = async () => {
    const valid = await trigger('education');
    if (!valid) {
      setErrors('Поле обязательно для заполнения')
      return;
    }; 
    
    const text = education;
    if (!text) {
      setErrors('Поле обязательно для заполнения')
      return;
    }

    
    setEducation(text);

    console.log('Submitted:', text);
    stage.setStage('twelve');
  };

  return (
    <div className={styles['profile-edit-stage']}>
      <div className={styles['profile-edit-stage__top']}>
        <div className={styles['profile-edit-stage__top-row']}>
          {[...Array(11)].map((_, i) => (
            <div key={i} className={styles['profile-edit-stage__top-item_active']}></div>
          ))}
          <div className={styles['profile-edit-stage__top-item']}></div>
        </div>
        <span className={styles['profile-edit-stage__top-description']}>шаг 11/12</span>
      </div>

      <h2 className={styles['profile-edit-stage__title']}>Информация об образовании</h2>

      <div className="flex gap-[24px] w-full max-[768px]:flex-col">
        <div className="w-full">
          <span onClick={() => mobileState.setOpen(true, 'example')} className="font-normal text-[#7C8092] underline mb-[16px] block">
            Пример описания образования
          </span>
          <TextEditor
          OnChangeText={setEducation}
          valueText={education}
            control={control}
            name="education"
            placeholder="Опишите ваш опыт работы, обязанности, достижения и знания"
          />

          {errorsText !== '' && (
            <p className="font-[onest] text-red-600 text-sm mt-1">{errorsText}</p>
          )}
        </div>

        <div className="w-full max-w-[454px]">
          <span className="font-semibold text-[16px] leading-[26px] block mb-[16px]">
            Прикрепите документы, подтверждающие образование
          </span>
          <FileUploadBox
            title="Загрузите фотографию"
            types="JPEG, PNG"
            text={<>Перетяните или <span className="text-[#431DED]">загрузите</span> файлы</>}
            description="JPEG, PNG, PDF"
          />
        </div>
      </div>

      <div className={styles['profile-edit-stage__bottom']}>
        <button
          onClick={() => stage.setStage('ten')}
          className={styles['profile-edit-stage__btn-bottom_prev']}
        >
          Назад
        </button>

        <button
          onClick={handleSubmit(onSubmit)}
          className={styles['profile-edit-stage__btn-bottom']}
        >
          Продолжить
        </button>
      </div>
    </div>
  );
};

export default ProfileEditTenStage;
