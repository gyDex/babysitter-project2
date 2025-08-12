'use client'

import Image from 'next/image'
import styles from './CardBabysitter.module.scss'
import AudioPlayer from '../AudioPlayer/AudioPlayer'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { INannyItem } from '@/entities/types/INanny'
import { getDate } from '@/features/getDate'
import DOMPurify from 'dompurify';

type Props = {
    isMessage?: boolean | string | undefined,
    isMoreBtn?: boolean,
    isResponseBtn?: boolean,

    data: INannyItem,
}

const CardBabysitter:React.FC<Props> = ({isMessage, isMoreBtn = false, isResponseBtn, data}) => {
    const [showMore, setShowMore] = useState(false);
    const messageRef = useRef<HTMLParagraphElement>(null);
    const [, setIsMeasured] = useState(false);
    const [isClamped, setIsClamped] = useState(false);

    useEffect(() => {
        const el = messageRef.current;
        if (!el) return;

        requestAnimationFrame(() => {
            const isOverflowing = el.scrollHeight > el.clientHeight + 1;
            setIsClamped(isOverflowing);
            setIsMeasured(true);
        });
    }, [isMessage]);

    const router = useRouter();

    const sanitizedEducation = DOMPurify.sanitize(data?.education !== undefined ? data?.education : '');
    const sanitizedAbout = DOMPurify.sanitize(data?.about ?? '');

    return (
        <div className={styles['card-babysit']}>
            <div className={styles['card-babysit__top-info-mobile']}>
                <div className={styles['card-babysit__top-info-label']}>
                    Активно ищу работу
                </div>

                <span className={styles['card-babysit__words']}>
                    <span className={styles['card-babysit__word']}>
                        {data.occupancy === 'full' ? 'Полная' : 'Частичная'}
                    </span>
                    <span className={styles['card-babysit__word']}>
                        Без проживания
                    </span>
                </span>
            </div>

            <div className={styles['card-babysit__top']}>
                <div className={styles['card-babysit__avatar']}>
                    <img
                        className={styles['card-babysit__avatar-image']}
                        src={
                            data?.user?.userAvatar && data.user.userAvatar !== ''
                            ? data.user.userAvatar
                            : '/images/card-babysit/image.jpg'
                        }
                        alt="heart"
                        width={100}
                        height={100}
                        />
                </div>

                <div className={styles['card-babysit__top-bottom']}>
                    <div className={styles['card-babysit__top-info']}>
                        <div className={styles['card-babysit__top-info-left']}>
                            <h2 className={styles['card-babysit__name']}>{data.user.fullName}</h2>

                            <address className={styles['card-babysit__address']}>
                                {data.user.residency ?? 'Москва, Аэропорт'}
                            </address>
                        </div>

                        <div className={styles['card-babysit__top-info-right']}>
                            <div className={styles['card-babysit__top-info-label']}>
                                Активно ищу работу
                            </div>

                            <span className={styles['card-babysit__words']}>
                                <span className={styles['card-babysit__word']}>
                                    {data.occupancy === 'full' ? 'Полная' : 'Частичная'}
                                </span>
                                <span className={styles['card-babysit__word']}>
                                    Без проживания
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className={styles['card-babysit__top-labels_desk']}>
                        <div className={styles['card-babysit__top-label']}>
                            Возраст: <b>
                                {data.user.age ? `${data.user.age} лет` : '30 лет'}
                            </b>
                        </div>

                        <div className={styles['card-babysit__top-label']}>
                            Опыт работы: <b>
                                {data.experience ? `${data.experience} лет` : '5 лет'}
                            </b>
                        </div>
                    </div> 
                </div>

            </div>
            <div className={styles['card-babysit__top-labels_mob']}>
                <div className={styles['card-babysit__top-label']}>
                    Возраст: <b>
                        {data.age ?? '30 лет'}
                    </b>
                </div>

                <div className={styles['card-babysit__top-label']}>
                    Опыт работы: <b>
                        {data.experience ?? '5 лет'}
                    </b>
                </div>
            </div>

            {
                isMessage && 
                <div className={styles['card-babysit__message']}>
                    <span className={styles['card-babysit__message-title']}>Сопроводительное письмо</span>

                    <div className='inline'>
                        <p
                        ref={messageRef}
                        className={`
                            ${styles['card-babysit__message-text']}
                            ${!showMore ? 'line-clamp-3' : ''}
                        `}
                        >
                            {isMessage}
                        </p>
                        {isClamped && (
                        <button
                            type="button"
                            onClick={() => setShowMore(!showMore)}
                            className={styles['card-babysit__read-more']}
                        >
                            {showMore ? 'Скрыть' : 'Читать далее'}
                        </button>
                        )}

                    </div>

                </div>
            }
            

            <p className={styles['card-babysit__description']}>
                <b>Личные качества:</b>
                <div dangerouslySetInnerHTML={{__html: sanitizedAbout}}></div>
            </p>

            {
                (data.audioFile !== undefined && data.audioFile !== null && data.audioFile !== '') ?
                <AudioPlayer src={data?.audioFile as string}  />
                : 
                <div className='h-[62px]'>

                </div>
            }


            <span className={styles['card-babysit__text1']}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.0013 0.666626C4.40964 0.666626 0.667969 4.40829 0.667969 8.99996C0.667969 13.5916 4.40964 17.3333 9.0013 17.3333C13.593 17.3333 17.3346 13.5916 17.3346 8.99996C17.3346 4.40829 13.593 0.666626 9.0013 0.666626ZM12.9846 7.08329L8.25963 11.8083C8.14297 11.925 7.98464 11.9916 7.81797 11.9916C7.6513 11.9916 7.49297 11.925 7.3763 11.8083L5.01797 9.44996C4.7763 9.20829 4.7763 8.80829 5.01797 8.56663C5.25963 8.32496 5.65964 8.32496 5.9013 8.56663L7.81797 10.4833L12.1013 6.19996C12.343 5.95829 12.743 5.95829 12.9846 6.19996C13.2263 6.44163 13.2263 6.83329 12.9846 7.08329Z" fill="#7C8092"/>
                </svg>
                
                Проверено: Номер телефона подтвержден
            </span>

            <span className={styles['card-babysit__text']}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.0253 13.0333C14.5836 12.6667 15.3169 13.0667 15.3169 13.7333V14.8083C15.3169 15.8667 14.4919 17 13.5003 17.3333L10.8419 18.2167C10.3753 18.375 9.61693 18.375 9.15859 18.2167L6.50026 17.3333C5.50026 17 4.68359 15.8667 4.68359 14.8083V13.725C4.68359 13.0667 5.41693 12.6667 5.96693 13.025L7.68359 14.1417C8.34193 14.5833 9.17526 14.8 10.0086 14.8C10.8419 14.8 11.6753 14.5833 12.3336 14.1417L14.0253 13.0333Z" fill="#7C8092"/>
                    <path d="M16.6503 5.3833L11.6586 2.1083C10.7586 1.51663 9.27526 1.51663 8.37526 2.1083L3.35859 5.3833C1.75026 6.42497 1.75026 8.7833 3.35859 9.8333L4.69193 10.7L8.37526 13.1C9.27526 13.6916 10.7586 13.6916 11.6586 13.1L15.3169 10.7L16.4586 9.94997V12.5C16.4586 12.8416 16.7419 13.125 17.0836 13.125C17.4253 13.125 17.7086 12.8416 17.7086 12.5V8.39997C18.0419 7.32497 17.7003 6.07497 16.6503 5.3833Z" fill="#7C8092"/>
                </svg>

                
                Образование: {data.education ? <div dangerouslySetInnerHTML={{__html: sanitizedEducation}} /> : '5 лет'}
            </span>

            <div className={styles['card-babysit__date']}>
                🕒 График: 
                    <b>
                        {                
                        getDate(data.charts as any)
                         ?? '5 лет'}
                    </b>
            </div>

            {
                isResponseBtn &&
                <button onClick={() => router.push('/profile-parent/response')} className={styles['card-babysit__btn-more']}>
                    Откликнуться
                </button>
            }

            {
                isMoreBtn && 
                <button onClick={() => router.push(`/profile-parent/response/${data.id}`)} className={styles['card-babysit__btn-more']}>
                    Подробнее
                </button>
            }
        </div>
    )
}

export default CardBabysitter
