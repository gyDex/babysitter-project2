'use client'

import Button from '@/shared/compontents/Button'
import styles from  './vacancy__id.module.scss'
import React, { useEffect, useState } from 'react'
import ResponseFeedback from '@/widgets/ResponseFeedback/ResponseFeedback'
import CardBabysitter from '@/widgets/CardBabysitter/CardBabysitter'
import { useHeader } from '@/entities/stores/useHeader'
import HeaderMenu from '@/widgets/HeaderMenu/HeaderMenu'
import { useParams, useRouter } from 'next/navigation'
import { getVacancyById } from '@/shared/api/parentApi'

type Props = {
  empty?: boolean
}

const VacancyID:React.FC<Props> = ({empty = false}) => {
    const [, setResponses] = useState([1]);

    const [vacancy, setVacancy] = useState(null) as any;

    const headerState = useHeader();

    const { id } = useParams();

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
        await getVacancyById(id as any).then((data: any) => {
          setVacancy(data)
        })
      }

      getData();
    }, [])

    const date =  new Date(vacancy?.createdAt).toLocaleDateString()

    return (
      <>
        <HeaderMenu />

        <div className={styles['vacancy-profile']}>
            <div className={styles['vacancy-profile__inner']}>
              <h1 className={styles['vacancy-profile__title']}>Вакансия от {date === 'Invalid Date' ? '' : date}</h1>

              {
                  (vacancy !== undefined && vacancy !== null ) &&
                  <div className={styles['vacancy-profile__content']}>
                        {
                            <ResponseFeedback isRes={false}
                                isEdit
                                childrens={vacancy.childrens} 
                                charts={vacancy.charts}
                                occupation={vacancy.occupation}
                                quote={vacancy.description} 
                                name={vacancy.parent.user.fullName} 
                                isViewName={true}
                                linkEdit={id as any}
                                callbackEdit={() =>                        
                                    router.replace(`/profile-parent/vacancy-detail/${id}`)
                                }
                                />
                        }
                  </div>
              }

                {
                    (vacancy === null || vacancy === undefined)  &&
                        <div className={'min-h-[512px] mt-[40px] bg-[white] w-full rounded-[16px] flex flex-col justify-center items-center'}>
                            <span className={'font-[onest] font-semibold text-[18px] max-[768px]:px-[16px] min-[768px]:text-[28px] text-center'}>
                                Загрузка...
                            </span>
                        </div>
                }
              {
                vacancy !== null && vacancy !== undefined && <div>
                      <div className={styles['vacancy-profile__responses']}>
                          {
                                vacancy.responses === null && vacancy.responses === undefined ||  vacancy.responses.length === 0 && <div className={styles['vacancy-profile__responses-empty']}>
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
                                vacancy.responses.length > 0  && 
                                <div>
                                    <h2 className={styles['vacancy-profile__res-title']}>Отклики</h2>

                                    <div className={styles['vacancy-profile__list']}>
                                      {
                                          vacancy.responses.map((item: any) => <CardBabysitter key={item.id} isMoreBtn data={item.nanny} isMessage={item.message ?? false} />)
                                      }
                                    
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

export default VacancyID
