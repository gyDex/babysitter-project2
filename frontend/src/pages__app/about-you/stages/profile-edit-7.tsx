'use client';

import styles from './profile-edit-stage.module.scss';
import { useState } from 'react';
import { useAnketsBabysitter } from '@/entities/stores/useAnketsBabysitter';
import { useEditBabysitterStage } from '@/entities/stores/useEditBabysitterStage';
import { advantages } from '@/entities/consts/advantages';

const ProfileEditSevenStage = () => {
    const stage = useEditBabysitterStage();
    const [error, setError] = useState(false);
    const { advantagesNanny, setAdvantages } = useAnketsBabysitter() as any;

    const handleContinue = () => {
        setError(false);
        stage.setStage('eight');
    };

    const toggleDuty = (index: number) => {
        const updated = [...advantagesNanny];
        updated[index] = !updated[index];
        setAdvantages(updated);
    };

    return (
        <div className={styles['profile-edit-stage']}>
            <div className={styles['profile-edit-stage__top']}>
                <div className={styles['profile-edit-stage__top-row']}>
                    {Array.from({ length: 12 }, (_, i) => (
                        <div
                            key={i}
                            className={
                                i <= 6
                                    ? styles['profile-edit-stage__top-item_active']
                                    : styles['profile-edit-stage__top-item']
                            }
                        ></div>
                    ))}
                </div>
                <span className={styles['profile-edit-stage__top-description']}>шаг 7/12</span>
            </div>

            <h2 className={styles['profile-edit-stage__title']}>Отредактируйте ваши преимущества</h2>

            <ul className="flex flex-wrap gap-[12px]">
                {advantages.map(({ id, label }) => {
                    const isActive = advantagesNanny[id];

                    return (
                        <li
                            key={id}
                            onClick={() => toggleDuty(id)}
                            className={`cursor-pointer w-fit border-[1px] rounded-[24px] font-[onest] text-[14px] leading-[18px] px-[16px] py-[7px] transition-colors
                            ${isActive ? 'bg-[#7733f4] text-white border-[#7733f4]' : 'border-[#7C8092] text-black'}`}
                        >
                            {label}
                        </li>
                    );
                })}
            </ul>

            {error && (
                <span className="text-[red] text-sm mt-[16px] block">
                    Пожалуйста, выберите хотя бы один пункт
                </span>
            )}

            <div className={styles['profile-edit-stage__bottom']}>
                <button
                    onClick={() => stage.setStage('six')}
                    className={styles['profile-edit-stage__btn-bottom_prev']}
                >
                    Назад
                </button>

                <button onClick={handleContinue} className={styles['profile-edit-stage__btn-bottom']}>
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
        </div>
    );
};

export default ProfileEditSevenStage;
