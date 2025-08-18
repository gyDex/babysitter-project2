'use client'

import Link from 'next/link'
import CardBabysitter from '../CardBabysitter/CardBabysitter'
import styles from './CardBabysitterList.module.scss'
import { CustomSelect } from '@/shared/compontents/CustomSelect/CustomSelect'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { cities } from '@/entities/cities'
import { getAllNannyByCity } from '@/shared/api/nannyApi'
import { useAuth } from '@/entities/stores/useAuth'
import { INannyItem } from '@/entities/types/INanny'
import { setCityCookies } from '@/features/setCityCookies'

const CardBabysitterList = () => {
    const [city, setCity] = useState<string | undefined>('')
    const [nanny, setNanny] = useState<INannyItem[]>([]);
    const [, setLoading] = useState<boolean>(false)

    const {user} = useAuth();

    useEffect(() => {
      
    }, [])

    useEffect(() => {
      setCity(Cookies.get('city'))

      async function getData() {
        await getAllNannyByCity((city?.toString() || user?.residency)).then((data: INannyItem[]) => {
            setNanny(data?.slice(0,4))
        }).finally(() => {
            setLoading(false)
        })
      }

      getData();
    },[city])

    console.log(city)
    console.log(nanny)

  return (
    <section id='storage-babysitter' className={styles['card-babysitters']}>
        <div className={styles['card-babysitters__inner']}>
            <h2 className={styles['card-babysitters__title']}>Найдите няню, к которой потянется ваш ребенок</h2>
            
            <div className={styles['card-babysitters__select-wrap']}>
                <CustomSelect onChange={(e) => {
                  setCityCookies(e);
                  setCity(e)
                  setNanny([]);
                }} title={city} items={cities} />
            </div>
            <div className={styles['card-babysitters__list']}>
              {
                  nanny.map((data, index) => <CardBabysitter key={index} data={data} />)
              }
            </div>

            <Link className={styles['card-babysitters__link']} href={'/'}>
            Посмотреть всех</Link>
        </div>
    </section>
  )
}

export default CardBabysitterList
