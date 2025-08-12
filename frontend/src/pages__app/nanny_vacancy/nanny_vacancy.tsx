'use client'

import { useHeader } from '@/entities/stores/useHeader';
import ResponseFeedback from '@/widgets/ResponseFeedback/ResponseFeedback';
import { useRouter } from 'next/navigation';
import styles from './nanny_vacancy.module.scss';
import { useEffect, useState } from 'react';
import HeaderMenu from '@/widgets/HeaderMenu/HeaderMenu';
import { getAllVacancyByCity } from '@/shared/api/nannyApi';
import { useAuth } from '@/entities/stores/useAuth';

const Nanny__Vacancy = () => {
    const [vacancies, setVacancies] = useState<any[] | null>(null);

    const headerState = useHeader();

    const router = useRouter();

    const { user } = useAuth();
    
    useEffect(() => {
        headerState.setTransparent(false);
    }, [])

    useEffect(() => {
        const getData = async() => {

            await getAllVacancyByCity(user.residency as string).then((data: any) => {
                setVacancies(data)
            })
        }

        getData();
    }, [])

    console.log(vacancies)

  return (
          <>
        <HeaderMenu />

        <div className={styles['vacancy-profile']}>
            <div className={styles['vacancy-profile__inner']}>
              <div className='flex items-center justify-between'>
                <h1 className={styles['vacancy-profile__title']}>Вакансии в  городе {user.residency}</h1>
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
                (vacancies?.length === 0) && <>
                  <span className={'font-[onest] font-semibold text-[18px]'}>
                      Ничего не найдено
                  </span>
                </>
              }
              { 
                  (vacancies && vacancies !== undefined && vacancies.length > 0) &&
                  <>
                    {
                      vacancies.map((item) => 
                        <ResponseFeedback key={item.id} isRes={true}
                        childrens={item.childrens} 
                        charts={item.charts}
                        date={new Date("2025-08-03T10:36:06.612Z").toLocaleDateString()}
                        occupation={item.occupation}
                        quote={item.description} 
                        name={item.parent.user.fullName} 
                        isViewName={true}
                        city={item.parent.user.residency}
                        link={`${item.id}`}
                        callbackEdit={() => {
                          router.replace(`/profile-babysitter/vacancy-detail/${item.id}`)
                        }}
                        />
                      )
                    }
                  </>
              }
              </div>
            </div>
        </div>
      </>
  )
}

export default Nanny__Vacancy
