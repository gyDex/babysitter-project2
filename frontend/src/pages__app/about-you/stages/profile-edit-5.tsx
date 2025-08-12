'use client';

import styles from './profile-edit-stage.module.scss';
import { useState } from 'react';
import { RadioGroup } from '@/components/ui/radio-group';
import RadioItem from '@/widgets/RadioItem/RadioItem';
import { useEditBabysitterStage } from '@/entities/stores/useEditBabysitterStage';
import { useAnketsBabysitter } from '@/entities/stores/useAnketsBabysitter';

const ProfileEditFiveStage = () => {
    const stage = useEditBabysitterStage();

    const [isAgreementChecked] = useState(false);
    const [error, setError] = useState(false);

    const { occupation, setOccupation } = useAnketsBabysitter();

    const handleContinue = () => {
        const isValid = !!occupation || isAgreementChecked;

        if (!isValid) {
        setError(true);
        return;
        }

        setError(false);
        stage.setStage('second');
    };

    return (
        <div className={styles['profile-edit-stage']}>

        <div className={styles['profile-edit-stage__top']}>
            <div className={styles['profile-edit-stage__top-row']}>
            <div className={styles['profile-edit-stage__top-item_active']}></div>
            <div className={styles['profile-edit-stage__top-item']}></div>
            <div className={styles['profile-edit-stage__top-item']}></div>
            <div className={styles['profile-edit-stage__top-item']}></div>
            <div className={styles['profile-edit-stage__top-item']}></div>
            <div className={styles['profile-edit-stage__top-item']}></div>
            <div className={styles['profile-edit-stage__top-item']}></div>
            <div className={styles['profile-edit-stage__top-item']}></div>
            <div className={styles['profile-edit-stage__top-item']}></div>
            <div className={styles['profile-edit-stage__top-item']}></div>
            <div className={styles['profile-edit-stage__top-item']}></div>
            </div>

            <span className={styles['profile-edit-stage__top-description']}>шаг 1/12</span>
        </div>

        <h2 className={styles['profile-edit-stage__title']}>Какую занятость вы ищете?</h2>

        <div className="flex flex-row gap-[40px] min-[1024px]:flex-row min-[1024px]:gap-[96px] w-full">
            <RadioGroup className='w-full flex h-fit flex-col  min-[1024px]:flex-row'>
                <div className="max-[768px]:mb-[16px] min-[1024px]:min-w-[150px] flex gap-[12px] flex-col" role="radiogroup">
                    <RadioItem
                        style={{
                            width: '100%',
                        }}
                        id="full"
                        name={'Полная'}
                        value={'full'}
                        variation='second'
                        checked={occupation === 'full'}
                        onChange={() => setOccupation(('full'))}
                    />
                </div>
                <div className="max-[768px]:mb-[16px] min-[1024px]:min-w-[150px] flex gap-[12px] flex-col" role="radiogroup">
                    <RadioItem
                        style={{
                            width: '100%',
                        }}
                        id="part"
                        name={'Частичная'}
                        value={'part'}
                        variation='second'
                        checked={occupation === 'part'}
                        onChange={() => setOccupation(('part'))}
                    />
                </div>
                <div className="max-[768px]:mb-[16px] min-[1024px]:min-w-[300px] flex gap-[12px] flex-col" role="radiogroup">
                    <RadioItem
                        style={{
                            width: '100%',
                        }}
                        id="both"
                        name={'Мне подходят оба варианта'}
                        value={'both'}
                        variation='second'
                        checked={occupation === 'both'}
                        onChange={() => setOccupation(('both'))}
                    />
                </div>
            </RadioGroup>
        </div>

        {/* Ошибка */}
        {error && (
            <span className="text-[red] text-sm mt-[16px] block">
            Пожалуйста, выберите один из вариантов оплаты
            </span>
        )}

        {/* Кнопки */}
        <div className={styles['profile-edit-stage__bottom']}>

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

export default ProfileEditFiveStage;
