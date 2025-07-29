'use client'

import Link from 'next/link'
import CardBabysitter from '../CardBabysitter/CardBabysitter'
import styles from './CardBabysitterList.module.scss'
import { CustomSelect } from '@/shared/compontents/CustomSelect/CustomSelect'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { cities } from '@/entities/cities'

const CardBabysitterList = () => {
    const [city, setCity] = useState<string | undefined>('')

    useEffect(() => {
      setCity(Cookies.get('city'))
    }, [])

  return (
    <section id='storage-babysitter' className={styles['card-babysitters']}>
        <div className={styles['card-babysitters__inner']}>
            <h2 className={styles['card-babysitters__title']}>Найдите няню, к которой потянется ваш ребенок</h2>
            
            <div className={styles['card-babysitters__select-wrap']}>
                <CustomSelect title={city} items={cities} />
            </div>
            <div className={styles['card-babysitters__list']}>
                <CardBabysitter />
                <CardBabysitter />
                <CardBabysitter />
                <CardBabysitter />
            </div>

            <Link className={styles['card-babysitters__link']} href={'/'}>
            Посмотреть всех</Link>
        </div>
    </section>
  )
}

export default CardBabysitterList
