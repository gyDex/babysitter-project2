'use client'

import Button from '@/shared/compontents/Button'
import styles from  './VacancyProfilePage.module.scss'
import React, { useEffect, useState } from 'react'
import ResponseFeedback from '@/widgets/ResponseFeedback/ResponseFeedback'
import CardBabysitter from '@/widgets/CardBabysitter/CardBabysitter'
import { useHeader } from '@/entities/stores/useHeader'
import HeaderMenu from '@/widgets/HeaderMenu/HeaderMenu'
import { useRouter } from 'next/navigation'

type Props = {
  empty?: boolean
}

const VacancyProfilePage:React.FC<Props> = ({empty = false}) => {
    const [isCreate, setCreate] = useState(false);

    const [responses, setResponses] = useState([1]);

    const headerState = useHeader();

    const router = useRouter();
  
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
              <h1 className={styles['vacancy-profile__title']}>Мои вакансии</h1>

              {
                  !isCreate &&
                  <div className={styles['vacancy-profile__content']}>
                      <div className={'min-h-[512px] bg-[white] w-full rounded-[16px] flex flex-col justify-center items-center'}>
                        <span className={'font-[onest] font-semibold text-[18px] max-[768px]:px-[16px] min-[768px]:text-[28px] text-center'}>
                            У вас пока нет действующих вакансий 
                        </span>

                        <div className='w-full max-w-[228px] '>
                          <Button onClick={() => setCreate(true)} text='Создать' variation='second' type='button'/>
                        </div>
                      </div>
                  </div>
              }
              {
                  isCreate && <div className={styles['vacancy-profile__content']}>
                      <ResponseFeedback isRes={false} quote='Мы долго искали няню, которая найдёт подход к нашему очень активному сыну. Анна оказалась настоящей находкой! Не просто следит, а развивает, играет, вовлекает. Ребёнок каждый раз ждёт её как праздник.' name="Анна" person="мама Марка" />

                      <div className={styles['vacancy-profile__responses']}>
                          {
                              responses.length === 0 && <div className={styles['vacancy-profile__responses-empty']}>
                                  <h1 className={styles['vacancy-profile__responses-title']}>
                                    Пока никто не откликнулся
                                  </h1>

                                  <span className={styles['vacancy-profile__responses-description']}>
                                    Вы можете сами найти специалиста в базе нянь 
                                  </span>
                                  
                                  <Button onClick={() => router.push('/profile-parent/base-data')} text='Перейти в базу нянь' variation='second' type='button'></Button>
                              </div>
                          }

                          {
                              responses.length === 1 && <div>
                                <h2 className={styles['vacancy-profile__res-title']}>Отклики</h2>

                                <div className={styles['vacancy-profile__list']}>
                                  <CardBabysitter  isMessage={'Здравствуйте, Анна! Меня зовут Алиса, я няня с более чем 6-летним опытом работы с детьми от 1 до 7 лет. Я очень заинтересована в вашей вакансии и хотела бы помочь вам в заботе о Марке'} />
                                  <CardBabysitter isMessage={'Здравствуйте, Анна! Меня зовут Алиса, я няня с более чем 6-летним опытом работы с детьми от 1 до 7 лет. Я очень заинтересована в вашей вакансии и хотела бы помочь вам в заботе о Марке'} />
                                </div>
                              </div>
                          }
                      </div>
                  </div>
              }
            </div>
        </div>
      </>
    )
}

export default VacancyProfilePage
