'use client';

import { useEditParentStage } from '@/entities/stores/useEditParentStage';
import styles from './profile-edit-stage.module.scss';
import ProfileEditCheckItem from './ProfileEditCheckItem';
import { useState } from 'react';
import { useAnketsParent } from '@/entities/stores/useAnketsParent';

const initialOptions = [
  'Развивающие занятия',
  'Рисование',
  'Обучение языкам',
  'Пение',
  'Танцы',
  'На усмотрение специалиста',
];

const ProfileEditThreeStage = () => {
    const stage = useEditParentStage();

    const [error, setError] = useState(false);
    
    const { occupation, setOccupation, question, setQuestions } = useAnketsParent();

    const handleChange = (index: number, value: boolean) => {
        const updated = [...occupation];
        updated[index] = value;
        setOccupation(updated);
    };

    const handleContinue = () => {
        const hasChecked = occupation.some(Boolean);
        if (!hasChecked) {
        setError(true);
        return;
        }

        setError(false);
        stage.setStage('four');
    };

    return (
        <div className={styles['profile-edit-stage']}>
        <div className={styles['profile-edit-stage__top']}>
            <div className={styles['profile-edit-stage__top-row']}>
            <div className={styles['profile-edit-stage__top-item']}></div>
            <div className={styles['profile-edit-stage__top-item']}></div>
            <div className={styles['profile-edit-stage__top-item_active']}></div>
            <div className={styles['profile-edit-stage__top-item']}></div>
            <div className={styles['profile-edit-stage__top-item']}></div>
            <div className={styles['profile-edit-stage__top-item']}></div>
            <div className={styles['profile-edit-stage__top-item']}></div>
            </div>

            <span className={styles['profile-edit-stage__top-description']}>шаг 3/7</span>
        </div>

        <h2 className={styles['profile-edit-stage__title']}>Чем заниматься с ребенком?</h2>

        <div className={styles['profile-edit-stage__content_three']}>
            <div className={styles['profile-edit-stage__check-list']}>
                {initialOptions.map((text, i) => (
                    <ProfileEditCheckItem
                        key={i}
                        text={text}
                        checked={occupation[i]}
                        onChange={(checked) => handleChange(i, checked)}
                    />
                ))}
            </div>

            {error && (
            <span className="text-[red] text-sm mt-[8px] block">
                Пожалуйста, выберите хотя бы один вариант
            </span>
            )}

            <textarea
            placeholder="Дополнительный вопрос"
            className="border-1 border-[#D9D9D9] w-full px-[16px] py-[18px] rounded-[16px] text-[silver] text-[18px] leading-[24px] font-normal min-h-[145px] min-[768px]:hidden"
            />

            <input
            value={question}
            onChange={(e) => {
                setQuestions(e.currentTarget.value)
            }}
            className="border-1 border-[#D9D9D9] w-full px-[16px] py-[18px] rounded-[16px] text-[silver] text-[18px] leading-[24px] font-normal max-[768px]:hidden"
            placeholder="Дополнительный вопрос"
            />
        </div>

        <div className={styles['profile-edit-stage__bottom']}>
            <button onClick={() => stage.setStage('second')} className={styles['profile-edit-stage__btn-bottom_prev']}>
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.88065 3.95312L2.83398 7.99979L6.88065 12.0465" stroke="#431DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.1673 8H2.94727" stroke="#431DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Назад
            </button>

            <button onClick={handleContinue} className={styles['profile-edit-stage__btn-bottom']}>
            Продолжить
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.61935 3.95312L13.666 7.99979L9.61935 12.0465" stroke="#431DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.33273 8H13.5527" stroke="#431DED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </button>
        </div>
        </div>
    );
};

export default ProfileEditThreeStage;
