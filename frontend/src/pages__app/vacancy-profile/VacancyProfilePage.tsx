'use client'

import Button from '@/shared/compontents/Button'
import styles from  './VacancyProfilePage.module.scss'
import React, { useEffect, useState } from 'react'
import ResponseFeedback from '@/widgets/ResponseFeedback/ResponseFeedback'
import { useHeader } from '@/entities/stores/useHeader'
import HeaderMenu from '@/widgets/HeaderMenu/HeaderMenu'
import { useRouter } from 'next/navigation'
import { getVacancy } from '@/shared/api/parentApi'

type Props = {
  empty?: boolean
}

const VacancyProfilePage:React.FC<Props> = ({empty = false}) => {
    const [, setResponses] = useState([1]);

    const [vacancies, setVacancies] = useState<any[] | null>(null);

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
    
    useEffect(() => {
      const getData = async() => {
        await getVacancy().then((data: any) => {
          setVacancies(data)
        })
      }

      getData();
    }, [])

    return (
      <>
        <HeaderMenu />

        <div className={styles['vacancy-profile']}>
            <div className={styles['vacancy-profile__inner']}>
              <div className='flex items-center justify-between'>
                <h1 className={styles['vacancy-profile__title']}>Мои вакансии</h1>

                <button onClick={() => router.push('/profile-parent/create')} className='cursor-pointer px-[12px] pb-[16px] pt-[14px] bg-[#7733F4] rounded-[8px] font-[onest] font-medium text-[14px] text-[white]'>Разместить вакансию</button>
              </div>
                  <div className={styles['vacancy-profile__content']}>

              {
                  (vacancies === null || vacancies === undefined)  &&
                      <div className={'min-h-[512px] bg-[white] w-full rounded-[16px] flex flex-col justify-center items-center'}>
                        <span className={'font-[onest] font-semibold text-[18px] max-[768px]:px-[16px] min-[768px]:text-[28px] text-center'}>
                            Загрузка...
                        </span>
                      </div>
              }
              {
                  (vacancies !== null && vacancies !== undefined && vacancies?.length !== null && vacancies?.length === 0)  &&
                      <div className={'min-h-[512px] bg-[white] w-full rounded-[16px] flex flex-col justify-center items-center'}>
                        <span className={'font-[onest] font-semibold text-[18px] max-[768px]:px-[16px] min-[768px]:text-[28px] text-center'}>
                            У вас пока нет действующих вакансий 
                        </span>

                        <div className='w-full max-w-[228px] '>
                          <Button onClick={() => router.push('/profile-parent/create')} text='Создать' variation='second' type='button'/>
                        </div>
                      </div>
              }
              { 
                  (vacancies && vacancies !== undefined && vacancies.length > 0) &&
                  <>
                    {
                      vacancies.map((item) => <>
                        <ResponseFeedback isRes={false}
                        childrens={item.childrens} 
                        charts={item.charts}
                        date={new Date("2025-08-03T10:36:06.612Z").toLocaleDateString()}
                        occupation={item.occupation}
                        quote={item.description} 
                        city={item.parent.user.residency}
                        name={item.parent.user.fullName} 
                        isViewName={false}
                        link={`/${item.id}`}
                        callbackEdit={() => {
                          router.replace(`/profile-parent/vacancy-detail/${item.id}`)
                        }}
                         />
                      </>)
                    }
                  </>
              }
              </div>
              {/* {
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
              } */}
            </div>
        </div>
      </>
    )
}

export default VacancyProfilePage
