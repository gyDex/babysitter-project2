'use client';

import styles from './PaymentStage.module.scss'
import Button from '@/shared/compontents/Button';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/entities/stores/useAuth';
import { createOrder } from '@/shared/api/paymentApi';

type Props = {
  without_sub: boolean,
}


const PaymentStage:React.FC<Props> = ({without_sub}) => {

    const router = useRouter();

    const { user } = useAuth() as any;

    const [link, setLink] = useState('');

    const getPaymentLink = async () => {
        await createOrder({
            userId: user.id,
            amount: 1900,
        }).then((data: any) => {
            setLink(data.paymentLink);
        }) 
    };

    useEffect(() => {
        if (link !== undefined && link !== null && link !== '') {
            router.push(link);
        }
    }, [link])

    const handleClick = async() => {
        try {
            getPaymentLink();
        } catch (error) {
            console.error('Ошибка при запросе кода:', error);
        }
    }

    return (
        <section className={styles['code-stage']}>
            {
                without_sub &&
                <div className={styles['code-stage__label-wrap']}>
                    <span className={styles['code-stage__label']}>Похоже, ваша подписка истекла 10.10.2010</span>
                </div>
            }

            <h1 className={styles['code-stage__title']}>Месяц оплаты платформы стоит <span className={styles['code-stage__price']}>1990₽</span></h1>

            <p className={styles['code-stage__description']}>
                За эту стоимость вы получаете:
            </p>

            <ul className={styles['code-stage__list']}>
                <li className={styles['code-stage__item']}>
                    <span className={styles['code-stage__item-number']}>01</span>
                    <span className={styles['code-stage__item-title']}>Доступ к базе ко всем няням в сервисе</span>

                    <svg width="64" height="59" viewBox="0 0 64 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M31.8735 -1.2679L28.6519 -18M37.6454 -5.70292L39.726 -14.1026M37.6454 36.2953L42.0751 58M31.8735 42.9478L30.464 52.0195M50.9345 9.86763L63.7536 3.16711M15.4971 9.86763L1 0.748011M9.18818 13.2467H2.34232M18.7187 29.9788L6.30218 40.3943M52.3439 26.6477L62.21 31.6635M33.7709 9.86763L44.1502 0.748011L41.0546 14.9746L53.6191 18.5313L41.0546 22.0879L44.1502 31.6635L34.7724 26.6477L25.6677 39.0504L26.7602 24.2766L9.18818 21.176L24.088 14.9746L21.2064 1.47758L33.7709 9.86763Z" stroke="#F3E19C" stroke-width="2.04301"/>
                    </svg>
                </li>
                <li className={styles['code-stage__item']}>
                    <span className={styles['code-stage__item-number']}>02</span>
                    <span className={styles['code-stage__item-title']}>Возможность выложить вакансию, где сами няни будут откликаться на вашу анкету</span>

                    <svg style={{
                        top:'6px',
                        right: '12px'
                    }} width="43" height="48" viewBox="0 0 43 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.8037 46C39.201 31.8266 49.3045 7.90086 34.2459 2.6346C19.1872 -2.63165 13.2023 26.6614 20.6673 24.8699C28.1323 23.0784 13.9112 4.00992 5.34568 10.2431C-3.21981 16.4764 1.14478 35.2182 24.8037 46Z" stroke="#F3E19C" stroke-width="2.2449"/>
                    </svg>
                </li>
                <li className={styles['code-stage__item']}>
                    <span className={styles['code-stage__item-number']}>03</span>
                    <span className={styles['code-stage__item-title']}>Договор, который поможет регламентировать отношения между вами и нянейе</span>

                    <svg width="42" height="40" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.31232 18.2448L19.7406 30.1363C23.2581 23.9931 32.6488 9.56536 42.0716 1M1 8.45958L2.66388 39L33.7084 36.9376L31.5629 6.96767L1 8.45958Z" stroke="#F3E19C" stroke-width="1.86275"/>
                    </svg>
                </li>
            </ul>

            <div className={styles['code-stage__bottom']}>
                <Button onClick={handleClick} style={{
                    marginTop: '0px',
                }} text='Оплатить' variation='second' type='button' />

                <button onClick={() => {
                    router.push('/profile-parent/base-data')
                }} className={styles['code-stage__bottom-btn']}>
                    Посмотреть базу нянь
                </button>
            </div>
        </section>
    )
}

export default PaymentStage
