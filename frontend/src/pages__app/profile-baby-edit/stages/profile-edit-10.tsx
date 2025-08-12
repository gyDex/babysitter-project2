import styles from './profile-edit-stage.module.scss';
import { useEditBabysitterStage } from "@/entities/stores/useEditBabysitterStage";
import { useAnketsBabysitter } from "@/entities/stores/useAnketsBabysitter";
import { useState } from 'react';
import TextEditor from '@/shared/compontents/TextEditor/TextEditor';
import FileUploadBox from '@/shared/compontents/FileUploadBox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { EditorState } from 'draft-js';
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
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      education: EditorState.createEmpty(),
    },
  });

  const [errorsText, setErrors] = useState('');

  const onSubmit = async () => {
    const valid = education;
    console.log(education)
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
    stage.setStage('eleven');
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
          <div className={styles['profile-edit-stage__top-item_active']}></div>
          <div className={styles['profile-edit-stage__top-item']}></div>
        </div>

        <span className={styles['profile-edit-stage__top-description']}>шаг 10/11</span>
      </div>

      <h2 className={styles['profile-edit-stage__title']}>Изменить ваше образование </h2>

      <div className='flex gap-[24px] w-full max-[768px]:flex-col'>
        <div className='w-full'>
            <span onClick={() => mobileState.setOpen(true, 'education')} className='font-normal text-[#7C8092] cursor-pointer text-[16px] underline leading-[26px] block mb-[16px]'>
                Пример описания образования 
            </span>
            <TextEditor OnChangeText={setEducation} valueText={education} control={control} name='education' description={'Перечислите места работы и обязанности, которые вы выполняли; достижения в работе с детьми; знания развивающих методик, детского питания, и пр.. В случае отсутствия опыта, расскажите, какие обязанности вы могли бы выполнять, как потенциальная няня.'} />

            {errorsText !== '' && (
              <p className="font-[onest] text-red-600 text-sm mt-1">{errorsText}</p>
            )}
        </div>
        <div  className='w-full max-w-[454px]'>
            <span className='font-semibold text-[16px] leading-[26px] block mb-[16px]'>
                Прикрепите документы, подтверждающие образование
            </span>
            <FileUploadBox    text={<>
              Перетяните или <span className="text-[#431DED]">загрузите</span> файлы

            </>} description='JPEG, PNG, PDF'/>
        </div>
      </div>


      <div className={styles['profile-edit-stage__bottom']}>
        <button onClick={() => stage.setStage('nine')} className={styles['profile-edit-stage__btn-bottom_prev']}>
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.88065 3.95312L2.83398 7.99979L6.88065 12.0465" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.1673 8H2.94727" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          Назад
        </button>

        <button onClick={handleSubmit(onSubmit)} className={styles['profile-edit-stage__btn-bottom']}>
          Продолжить
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.61935 3.95312L13.666 7.99979L9.61935 12.0465" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2.33273 8H13.5527" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

    </div>
  )
}

export default ProfileEditTenStage
