'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEditBabysitterStage } from '@/entities/stores/useEditBabysitterStage';
import { useAnketsBabysitter } from '@/entities/stores/useAnketsBabysitter';
import styles from './profile-edit-stage.module.scss';

const formSchema = z.object({
  fullName: z.string().min(1, 'Укажите имя и фамилию'),
  ageBabysitter: z.string().min(1, 'Укажите возраст'),
  email: z
    .string()
    .email('Укажите корректный email')
    .min(1, 'Укажите email'),
  location: z.string().min(1, 'Укажите место жительства'),
});

type FormValues = z.infer<typeof formSchema>;

const ProfileEditEightStage = () => {
  const stage = useEditBabysitterStage();
  const { setName, setEmail, setLocation, setAgeBabbysitter, ageBabysitter, email, name, location } = useAnketsBabysitter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
  });

  const onSubmit = (data: FormValues) => {
    setName(data.fullName);
    setEmail(data.email);
    setAgeBabbysitter(data.ageBabysitter);
    setLocation(data.location);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['profile-edit-stage']}>
      <div className={styles['profile-edit-stage__top']}>
        <div className={styles['profile-edit-stage__top-row']}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={
                i < 8
                  ? styles['profile-edit-stage__top-item_active']
                  : styles['profile-edit-stage__top-item']
              }
            />
          ))}
        </div>
        <span className={styles['profile-edit-stage__top-description']}>шаг 8/12</span>
      </div>

      <h2 className={styles['profile-edit-stage__title']}>Ваши контактные данные</h2>
      <span className={styles['profile-edit-stage__description']}>
        Укажите ваши фамилия, имя и почту, чтобы мы могли с вами связаться
      </span>

      <div className="flex w-full gap-[16px] max-[768px]:flex-col">
        <div className="w-full">
          <input
            {...register('fullName')}
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            className="mb-[8px] font-[onest] border border-[#D9D9D9] w-full px-[16px] py-[18px] rounded-[16px] !text-[silver] text-[18px]"
            placeholder="Петрова Полина"
          />
          <span className="text-red-500 font-[onest] text-sm">{errors.fullName?.message}</span>
          <span className={styles['profile-edit-stage__description']}>
            Напишите ваше имя и фамилию
          </span>
        </div>

        <div className="w-full min-[1024px]:max-w-[171px]">
          <input
            {...register('ageBabysitter')}
            value={ageBabysitter}
            onChange={(e) => setAgeBabbysitter(e.currentTarget.value)}
            className="mb-[8px] font-[onest] border border-[#D9D9D9] w-full px-[16px] py-[18px] rounded-[16px] !text-[silver] text-[18px]"
            placeholder="28"
          />
          <span className="text-red-500 font-[onest] text-sm">{errors.ageBabysitter?.message}</span>
          <span className={styles['profile-edit-stage__description']}>Укажите ваш возраст</span>
        </div>

        <div className="w-full">
          <input
            {...register('email')}
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            className="mb-[8px] font-[onest] border border-[#D9D9D9] w-full px-[16px] py-[18px] rounded-[16px] !text-[silver] text-[18px]"
            placeholder="example@yandex.ru"
          />
          <span className="text-red-500 font-[onest] text-sm">{errors.email?.message}</span>
          <span className={styles['profile-edit-stage__description']}>Укажите вашу почту</span>
        </div>

        <div className="w-full">
          <input
            {...register('location')}
            value={location}
            onChange={(e) => setLocation(e.currentTarget.value)}
            className="mb-[8px] font-[onest] border border-[#D9D9D9] w-full px-[16px] py-[18px] rounded-[16px] !text-[silver] text-[18px]"
            placeholder="г. Москва, м. Братиславская"
          />
          <span className="text-red-500 font-[onest] text-sm">{errors.location?.message}</span>
          <span className={styles['profile-edit-stage__description']}>
            Место жительство (можете указать район)
          </span>
        </div>
      </div>

      <div className={styles['profile-edit-stage__bottom']}>
        <button
          type="button"
          onClick={handleSubmit(() => {
            stage.setStage('seven')
          })}
          className={styles['profile-edit-stage__btn-bottom_prev']}
        >
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none">
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

        <button type="submit" onClick={handleSubmit((data) => {
            onSubmit(data)
            stage.setStage('nine')
          })} className={styles['profile-edit-stage__btn-bottom']}>
          Продолжить
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
    </form>
  );
};

export default ProfileEditEightStage;
