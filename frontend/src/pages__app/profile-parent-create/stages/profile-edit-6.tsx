'use client';

import styles from './profile-edit-stage.module.scss';
import ProfileEditSixStageItem from './profile-edit-6_Item';
import { useState } from 'react';
import { RadioGroup } from '@/components/ui/radio-group';
import RadioItem from '@/widgets/RadioItem/RadioItem';
import { useAnketsParent } from '@/entities/stores/useAnketsParent';
import { useCreateParentStage } from '@/entities/stores/useCreateParentStage';

const ProfileEditSixStage = () => {
    const stage = useCreateParentStage();

    const [isAgreementChecked] = useState(false);
    const [error, setError] = useState(false);

    const { typePay, setTypePay } = useAnketsParent();

    const handleContinue = () => {
        const isValid = !!typePay || isAgreementChecked;

        if (!isValid) {
        setError(true);
        return;
        }

        setError(false);
        stage.setStage('seven');
    };

    return (
        <div className={styles['profile-edit-stage']}>

        <div className={styles['profile-edit-stage__top']}>
            <div className={styles['profile-edit-stage__top-row']}>
            {[...Array(7)].map((_, i) => (
                <div
                key={i}
                className={
                    i === 5
                    ? styles['profile-edit-stage__top-item_active']
                    : styles['profile-edit-stage__top-item']
                }
                ></div>
            ))}
            </div>
            <span className={styles['profile-edit-stage__top-description']}>шаг 6/7</span>
        </div>

        <h2 className={styles['profile-edit-stage__title']}>Сколько вы готовы платить?</h2>

        {/* Основной контент */}
        <div className="flex flex-col gap-[40px] min-[1024px]:flex-row min-[1024px]:gap-[96px] w-full">
            <div className="flex flex-col w-full gap-[40px] min-[1024px]:flex-row min-[1024px]:gap-[96px]">
            <ProfileEditSixStageItem
                selectedValue={typePay}
                setSelectedValue={setTypePay}
                maxSlider={200}
                minSlider={3000}
                description="Минимально приемлемая"
                name="Почасовая (₽/час)"
                id={'hourly'}
                value="hourly"
            />

            <ProfileEditSixStageItem
                selectedValue={typePay}
                setSelectedValue={setTypePay}
                maxSlider={50000}
                minSlider={250000}
                description="Минимально приемлемая"
                name="Месячная (₽/мес)"
                id={'monthly'}
                value="monthly"
            />
            </div>

            <RadioGroup className='w-full min-[768px]:max-w-[300px] h-fit'>
                <div className="max-[768px]:mb-[16px] min-[1024px]:flex-row flex gap-[12px] flex-col" role="radiogroup">
                    <RadioItem
                        style={{
                            width: '100%',
                        }}
                        id="contract"
                        name={'Зарплата по договоренности'}
                        value={'contract'}
                        variation='second'
                        checked={typePay === 'contract'}
                        onChange={() => setTypePay(('contract'))}
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
            <button
            onClick={() => stage.setStage('five')}
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

export default ProfileEditSixStage;
