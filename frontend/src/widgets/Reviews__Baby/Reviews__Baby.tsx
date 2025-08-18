import Link from 'next/link';
import styles from './Reviews__Baby.module.scss';
import { useEffect, useState } from 'react';
import { getAllVacancyByCity } from '@/shared/api/nannyApi';
import { useAuth } from '@/entities/stores/useAuth';
// import ResponseFeedback from '../ResponseFeedback/ResponseFeedback';
import Cookies from 'js-cookie';
import ResponseFeedback from '../ResponseFeedback/ResponseFeedback';
import { useMobileState } from '@/entities/stores/useMobileModal';

const Reviews__Baby = () => {
    
    const [data, setData] = useState([]);

    const [isLoading, setLoading] = useState(false);

    const { user } = useAuth();

    const [city, setCity] = useState<string | undefined>();

    const mobileState = useMobileState();

    useEffect(() => {
        const cityCookie = Cookies.get('city')
        console.log(cityCookie)
        setCity(cityCookie)
    }, [])

    useEffect(() => {
        console.log(city)
        const getData = async() => {
            await getAllVacancyByCity((user?.residency === undefined || user?.residency === null) ? city : user.residency).then((data) => {
                console.log(data)
                setLoading(true)
                setData(data as any)
            }).finally(() => {
                setLoading(false)
            })
        }

        getData();
    }, [city])

    console.log(data)

    return (
        <section id='reviews' className={styles['reviews-baby']} >
            <div className={styles['reviews-baby__container']}>
                <h1 className={styles['reviews-baby__title']}>
                    Наш сервис ежедневно привлекает от 3-х новых семей, активно ищущих няню
                </h1>

                <div className={styles['reviews-baby__list']}>
                    {
                        isLoading && <span className={'font-[onest] text-[white] font-semibold text-[18px]'}>
                            Загрузка...
                        </span>
                    }
                    {
                        data?.length === 0 &&  <span className={'font-[onest] text-[white] font-semibold text-[18px]'}>
                            Ничего не найдено
                        </span>
                    }
                    {
                        !isLoading && (data && data !== undefined && data.length > 0) &&
                        <>
                            {
                            data.map((item: any) => 
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
                                    
                                }}
                                callbackRequest={
                                    () => {
                                        mobileState.setRegister(true, '');
                                    }
                                }
                                />
                            )
                            }
                        </>     
                    }
                </div>
                <Link href={'/'} className={styles['reviews-baby__link']}>
                    Посмотреть все
                </Link>
            </div>
        </section>
    )

}

export default Reviews__Baby
