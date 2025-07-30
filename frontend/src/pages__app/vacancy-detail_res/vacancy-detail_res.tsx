'use client'

import ResponseFeedback from '@/widgets/ResponseFeedback/ResponseFeedback'
import styles from './vacancy-detail_res.module.scss';
import { useRouter } from 'next/navigation';
import { useHeader } from '@/entities/stores/useHeader';
import { useEffect } from 'react';
import HeaderMenu from '@/widgets/HeaderMenu/HeaderMenu';

const VacancyDetail_Res = () => {
    const router = useRouter();

    const headerState = useHeader();
    
    useEffect(() => {
        headerState.setTransparent(false);
    }, [])

    return (
        <>
            <HeaderMenu />

            <div className={styles['vacancy-detail']}>
                <div className={styles['vacancy-detail__container']}>
                    <button onClick={() => router.push('/profile-parent/vacancy')} className={styles['vacancy-detail__btn']}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.38065 3.95312L2.33398 7.99979L6.38065 12.0465" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.6673 8H2.44727" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        <span>Вернуться назад</span>
                    </button>   


                    <ResponseFeedback verified={false}  isDetail IsRes={true} isRes={false} tasks={'Обеспечить безопасность, общение без гаджетов, мягкое вовлечение в игры.'} quote='Мы долго искали няню, которая найдёт подход к нашему очень активному сыну. Анна оказалась настоящей находкой! Не просто следит, а развивает, играет, вовлекает. Ребёнок каждый раз ждёт её как праздник.' name="Анна" person="мама Марка" />

                </div>
            </div>
        </>
    )
}

export default VacancyDetail_Res
