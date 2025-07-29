'use client'

import styles from  './vacancy.module.scss'
import React, { useEffect, useState } from 'react'
import CardBabysitter from '@/widgets/CardBabysitter/CardBabysitter'
import { useHeader } from '@/entities/stores/useHeader'
import HeaderMenu from '@/widgets/HeaderMenu/HeaderMenu'
type Props = {
  empty?: boolean
}

const VacancyPage:React.FC<Props> = ({empty = false}) => {
    const [setResponses] = useState([1]) as any;

    const headerState = useHeader();
  
    useEffect(() => {
      headerState.setTransparent(false);
    }, [])

    useEffect(() => {
      if(empty) {
        setResponses([]);  
      }
    }, [empty])

    return (
      <>
        <HeaderMenu />

        <div className={styles['vacancy-profile']}>
            <div className={styles['vacancy-profile__inner']}>
              <h1 className={styles['vacancy-profile__title']}>База нянь в городе N</h1>

              {
                <div className={styles['vacancy-profile__content']}>
                    {
                        <div className={styles['vacancy-profile__list']}>
                            <CardBabysitter isMoreBtn />
                            <CardBabysitter isMoreBtn />
                        </div>
                    }
                </div>
              }
            </div>
        </div>
      </>
    )
}

export default VacancyPage
