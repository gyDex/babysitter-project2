import styles from './profile-edit-stage.module.scss';
import { useEditBabysitterStage } from "@/entities/stores/useEditBabysitterStage";
import { useAnketsBabysitter } from "@/entities/stores/useAnketsBabysitter";
import { useState } from 'react';
import TextEditor from '@/shared/compontents/TextEditor/TextEditor';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { EditorState } from 'draft-js';
import z from 'zod';
import { useMobileState } from '@/entities/stores/useMobileModal';

const schema = z.object({
  jobs: z.any(), // we validate manually in the component
});

const ProfileEditTwelveStage = () => {
  const stage = useEditBabysitterStage();

  const { jobs, setJobs } = useAnketsBabysitter();
  
  const mobileState = useMobileState();

  const {
    control,
    handleSubmit,
    trigger
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      jobs: EditorState.createEmpty(),
    },
  });

  const [errorsText, setErrors] = useState('');

  const onSubmit = async () => {
    const valid = await trigger('jobs');
    if (!valid) {
      setErrors('Поле обязательно для заполнения')
      return;
    }; 
    
    const text = jobs;
    if (!text) {
      setErrors('Поле обязательно для заполнения')
      return;
    }

    setJobs(text)

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
          <div className={styles['profile-edit-stage__top-item']}></div>
        </div>

        <span className={styles['profile-edit-stage__top-description']}>шаг 10/12</span>
      </div>

      <h2 className={styles['profile-edit-stage__title']}>Информация о местах работы </h2>
      <span onClick={() => mobileState.setOpen(true, 'jobs')} className='font-normal text-[#7C8092] cursor-pointer text-[16px] underline leading-[26px] block mb-[16px]'>
          Пример описания работ
      </span>
      <TextEditor name='jobs'  OnChangeText={setJobs} valueText={jobs}    control={control} description={'Перечислите места работы и обязанности, которые вы выполняли; достижения в работе с детьми; знания развивающих методик, детского питания, и пр.. В случае отсутствия опыта, расскажите, какие обязанности вы могли бы выполнять, как потенциальная няня.'}/>

        {errorsText !== '' && (
            <p className="font-[onest] text-red-600 text-sm mt-1">{errorsText}</p>
        )}

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

export default ProfileEditTwelveStage
