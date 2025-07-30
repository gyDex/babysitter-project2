'use client';

import styles from './profile-edit-stage.module.scss';
import { useState } from 'react';
import { useAnketsBabysitter } from '@/entities/stores/useAnketsBabysitter';
import { useEditBabysitterStage } from '@/entities/stores/useEditBabysitterStage';

const ProfileEditSevenStage = () => {
    const stage = useEditBabysitterStage();

    const [error, setError] = useState(false);

    const { duties, setDuties } = useAnketsBabysitter() as any; 

    const handleContinue = () => {
        // const isValid = !!typePay || isAgreementChecked;

        // if (!isValid) {
        // setError(true);
        // return;
        // }

        setError(false);
        stage.setStage('eight');
    };

    const advantages = [
        { id: '1', label: '🧠 Психологическое образование' },
        { id: '2', label: '🎵 Музыкальное образование' },
        { id: '3', label: '👩‍🏫 Педагог начальных классов' },
        { id: '4', label: '🌧️ Прогулки в любую погоду' },
        { id: '5', label: '🔎 Ищу постоянную семью' },
        { id: '6', label: '🏫 Подготовка к школе' },
        { id: '7', label: '📚 Помощь с уроками' },
        { id: '8', label: '🏠 Помощь по дому' },
        { id: '9', label: '🤒 Присмотр за заболевшими' },
        { id: '10', label: '⛑️ Курсы первой помощи' },
        { id: '11', label: '🎤 Пение' },
        { id: '12', label: '🏺 Лепка' },
        { id: '13', label: '🎨 Живопись' },
        { id: '14', label: '🚗 Водительское удостоверение' },
        { id: '15', label: '👶 Готова работать с младенцами' },
        { id: '16', label: '🌐 Знание иностранных языков' },
        { id: '17', label: '🧒 Опыт работы с детьми с ОВЗ' },
        { id: '18', label: '🩺 Есть медицинское образование' },
        { id: '19', label: '✈️ Готова сопровождать ребенка в поездках' },
        { id: '20', label: '🍲 Приготовление детского питания' },
        { id: '21', label: '🧩 Занятия по методике Монтессори' },
        { id: '22', label: '🚭 Без вредных привычек' },
        { id: '23', label: '🔄 Готова к срочным заменам' },
        { id: '24', label: '📅 Готова к работе в выходные' },
        { id: '25', label: '✂️ Умею шить, мастерить поделки' },
        { id: '26', label: '🌙 Готова работать в ночное время' },
        { id: '27', label: '🫶 Использую мягкие методы воспитания' },
        { id: '28', label: '🐶 Готова помогать с животными в доме' },
        { id: '29', label: '👨‍👩‍👧‍👦 Опыт работы в многодетных семьях' },
    ];


    console.log(duties)

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
                <div className={styles['profile-edit-stage__top-item']}></div>
                <div className={styles['profile-edit-stage__top-item']}></div>
                <div className={styles['profile-edit-stage__top-item']}></div>
                <div className={styles['profile-edit-stage__top-item']}></div>
                <div className={styles['profile-edit-stage__top-item']}></div>
            </div>

            <span className={styles['profile-edit-stage__top-description']}>шаг 7/12</span>
        </div>

        <h2 className={styles['profile-edit-stage__title']}>Отредактируйте ваши преимущества</h2>

        <div className="flex flex-col gap-[40px] min-[1024px]:flex-row min-[1024px]:gap-[96px] w-full">
        </div>
        <ul className="flex flex-wrap gap-[12px]">
            {advantages.map(({ id, label }) => {
                const isActive = duties.includes(id);

                return (
                <li
                    key={id}
                    onClick={() => {
                    if (isActive) {
                        setDuties(duties.filter((item: any) => item !== id));
                    } else {
                        setDuties([...duties, id]);
                    }
                    }}
                    className={`cursor-pointer w-fit border-[1px] rounded-[24px] font-[onest] text-[14px] leading-[18px] px-[16px] py-[7px] transition-colors
                    ${isActive ? 'bg-[#7733f4] text-white border-[#7733f4]' : 'border-[#7C8092] text-black'}
                    `}
                >
                    {label}
                </li>
                );
            })}
        </ul>
                
        {error && (
            <span className="text-[red] text-sm mt-[16px] block">
            Пожалуйста, выберите один из вариантов оплаты
            </span>
        )}

        <div className={styles['profile-edit-stage__bottom']}>
            <button
            onClick={() => stage.setStage('six')}
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

export default ProfileEditSevenStage;
