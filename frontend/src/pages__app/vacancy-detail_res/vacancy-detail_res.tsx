'use client'

import ResponseFeedback from '@/widgets/ResponseFeedback/ResponseFeedback'
import styles from './vacancy-detail_res.module.scss';
import { useParams, useRouter } from 'next/navigation';
import { useHeader } from '@/entities/stores/useHeader';
import { useEffect, useState } from 'react';
import HeaderMenu from '@/widgets/HeaderMenu/HeaderMenu';
import { getVacancyById } from '@/shared/api/parentApi';

const VacancyDetail_Res = () => {
    const router = useRouter();

    const headerState = useHeader();
    
    useEffect(() => {
        headerState.setTransparent(false);
    }, [])

    const [vacancy, setVacancy] = useState(null) as any;

    const { id } = useParams();
    
    useEffect(() => {
        headerState.setTransparent(false);

        const getData = async() => {
            await getVacancyById(id as any).then((data: any) => {
                setVacancy(data)
            })
        }
        
        getData();
    }, [])


    console.log(vacancy)

    return (
        <>
            <HeaderMenu />

            <div className={styles['vacancy-detail']}>
                <div className={styles['vacancy-detail__container']}>
                    <button onClick={() => router.back()} className={styles['vacancy-detail__btn']}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.38065 3.95312L2.33398 7.99979L6.38065 12.0465" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.6673 8H2.44727" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        <span>Вернуться назад</span>
                    </button>  

                    {
                        (vacancy === null || vacancy === undefined)  &&
                            <div className={'min-h-[512px] bg-[white] w-full rounded-[16px] flex flex-col justify-center items-center'}>
                                <span className={'font-[onest] font-semibold text-[18px] max-[768px]:px-[16px] min-[768px]:text-[28px] text-center'}>
                                    Загрузка...
                                </span>
                            </div>
                    }  


                    {
                         vacancy !== undefined && vacancy !== null && 
                        <ResponseFeedback 
                            isEdit
                            isMessage  
                            isDetailParent    
                            IsRes={true} isRes={false}                           
                            childrens={vacancy.childrens} 
                            charts={vacancy.charts}
                            occupation={vacancy.occupation}
                            quote={vacancy.description} 
                            name={vacancy.parent.user.fullName}
                            isViewName={true}
                            linkEdit={id as any}
                            callbackEdit={() => {
                                router.replace(`/profile-parent/edit/${id}`)
                            }}
                            
                        /> 
                    }

                </div>
            </div>
        </>
    )
}

export default VacancyDetail_Res
