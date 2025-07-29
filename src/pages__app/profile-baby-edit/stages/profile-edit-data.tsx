'use client';

import { useEditParentStage } from '@/entities/stores/useEditParentStage';
import styles from './profile-edit-stage.module.scss';
import { useState } from 'react';
import { useAnketsParent } from '@/entities/stores/useAnketsParent';
import { useRouter } from 'next/navigation';

const ProfileEditEightStage = () => {
  const stage = useEditParentStage();

  const router = useRouter();

    const { setName, setEmail, setLocation, location, name, email } = useAnketsParent();
  
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    location: '',
  });

  const validate = () => {
    const newErrors = {
      fullName: name.trim() ? '' : 'Укажите имя и фамилию',
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? '' : 'Укажите корректный email',
      location: location.trim() ? '' : 'Укажите место жительства',
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((v) => v === '');
  };

  const handleSubmit = () => {
    if (!validate()) return;

    router.push('/profile-parent/vacancy')
  };

  return (
    <div className={styles['profile-edit-stage']}>
      <div className={styles['profile-edit-stage__top']}>
        <div className={styles['profile-edit-stage__top-row']}>
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={
                i === 6
                  ? styles['profile-edit-stage__top-item_active']
                  : styles['profile-edit-stage__top-item']
              }
            />
          ))}
        </div>
        <span className={styles['profile-edit-stage__top-description']}>шаг 7/7</span>
      </div>

      <h2 className={styles['profile-edit-stage__title']}>Ваши контактные данные</h2>
      <span className={styles['profile-edit-stage__description']}>
        Укажите ваши фамилия, имя и почту, чтобы мы могли с вами связаться
      </span>

      <div className="flex w-full gap-[24px] max-[768px]:flex-col">
        <div className="w-full">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-[8px] h-fit border-1 border-[#D9D9D9] w-full px-[16px] py-[18px] rounded-[16px] !text-[silver] text-black text-[18px] leading-[24px] font-normal"
            placeholder="Петрова Полина"
          />
          <span className="font-[onest] text-red-500 text-sm">{errors.fullName}</span>
          <span className={styles['profile-edit-stage__description']}>Напишите ваше имя и фамилию</span>
        </div>

        <div className="w-full">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-[8px] h-fit border-1 border-[#D9D9D9] w-full px-[16px] py-[18px] rounded-[16px] !text-[silver] text-black text-[18px] leading-[24px] font-normal"
            placeholder="example@yandex.ru"
          />
          <span className="font-[onest] text-red-500 text-sm">{errors.email}</span>
          <span className={styles['profile-edit-stage__description']}>Укажите вашу почту</span>
        </div>

        <div className="w-full">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mb-[8px] h-fit border-1 border-[#D9D9D9] w-full px-[16px] py-[18px] rounded-[16px] !text-[silver] text-black text-[18px] leading-[24px] font-normal"
            placeholder="г. Москва, м. Братиславская"
          />
          <span className="font-[onest] text-red-500 text-sm">{errors.location}</span>
          <span className={styles['profile-edit-stage__description']}>Место жительство (можете указать район)</span>
        </div>
      </div>

      <div className={styles['profile-edit-stage__bottom']}>
        <button
          onClick={() => stage.setStage('six')}
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

export default ProfileEditEightStage;
