'use client'

import CustomSelect from '@/shared/compontents/CustomSelect/CustomSelect'
import styles from './base-data.module.scss'
import CardBabysitter from '@/widgets/CardBabysitter/CardBabysitter'
import MobileModal from '@/widgets/MobileModal/MobileModal'
import { useFilterState } from '@/entities/stores/useFilter'
import { SelectModal } from '@/widgets/SelectModal/SelectModal'
import { cities } from '@/entities/cities'
import { useHeader } from '@/entities/stores/useHeader'
import { useEffect, useMemo, useState } from 'react'
import HeaderMenu from '@/widgets/HeaderMenu/HeaderMenu'
import { finalAge, startAge } from '@/entities/consts/age'
import { INannyItem } from '@/entities/types/INanny'
import { getAllNannyByCity } from '@/shared/api/nannyApi'
import { useAuth } from '@/entities/stores/useAuth'
import { useFilterNannyState } from '@/entities/stores/useNannyFilter'

const BaseDataPage = () => {
    const filterState = useFilterState();
    
    const headerState = useHeader();

    const filterNanny = useFilterNannyState();

    const [items, setItems] = useState<INannyItem[]>();

    const { user } = useAuth();

    const [isLoading, setLoading] = useState(false);
      
    useEffect(() => {
        headerState.setTransparent(false);

        if (user.residency === undefined && user.residency === null) return;

        async function getData() {
            setLoading(true)

            await getAllNannyByCity(user.residency ?? 'Москва').then((data: INannyItem[]) => {
                setItems(data)
            }).finally(() => {
                setLoading(false)
            })

        }

        getData();

    }, [user.residency, filterNanny])

    const filteredItems = useMemo(() => {
        if (!items || items.length === 0) return null

        return items.filter((nanny: any) => {
            // Опыт
            let expFilterValue = 0
            if (filterNanny.experience !== 'без опыта') {
                const match = filterNanny.experience.match(/\d+/)
                expFilterValue = match ? parseInt(match[0], 10) : 0
            }
            // Предположим nanny.experience — число лет опыта
            if ((nanny.experience ?? 0) < expFilterValue) return false

            // График работы (occupancy)
            if (filterNanny.occupancy && filterNanny.occupancy === 'Частичная занятость' && nanny.occupancy !== 'part') {
                return false;
            }

            if (filterNanny.occupancy && filterNanny.occupancy === 'Полная занятость' && nanny.occupancy !== 'full') {
                return false;
            }

            // Ставка в час (pay)
            if (filterNanny.pay) {
                const payFilterValue = Number(filterNanny.pay)
                if ((Number(nanny.pay) ?? 0) < payFilterValue) return false
            }

            // Возраст
            const startAgeFilter = Number(filterNanny.startAge) || 0
            const endAgeFilter = Number(filterNanny.endAge) || 1000 // большой максимум

            if ((nanny.user.age ?? 0) < startAgeFilter) return false
            if ((nanny.user.age ?? 0) > endAgeFilter) return false

            return true
        })
    }, [items, filterNanny])

    return (
    <>
        <HeaderMenu />

        <section className={styles['base-data']}>
            <MobileModal button_title='Применить'  variation={'filter'} title={'Фильтры'} isOpen={
                filterState.isOpen
            } next={() => 
            {
                
            }} setOpen={filterState.setOpen}>
                <div className='flex flex-col gap-[8px]'>
                    <SelectModal description={'Опыт работы'} className={styles['base-data__select-modal']}  callbackChange={() => {}} title='от 1 года' items={cities}    
                    />

                    <SelectModal description={'График работы'} className={styles['base-data__select-modal']}  callbackChange={() => {}} title='Частичная занятость' items={cities}    
                    />

                    <SelectModal description={'Ставка в час'} className={styles['base-data__select-modal']}  callbackChange={() => {}} title='0т 300 ' items={cities}    
                    />

                    <div className='flex gap-[8px]'>
                        <div className='relative bg-[#FFFFFF] px-[16px] py-[9px] rounded-[16px] w-full'>
                            <label htmlFor="ageFirst" className='font-normal text-[14px] leading-[18px] font-[onest] absolute text-[#8E8E8E]'>Возраст с</label>

                            <input id='ageFirst' defaultValue={20}  className='text-[#191816] w-full focus-within:outline-none font-normal text-[18px] leading-[18px] font-[onest] text-[#8E8E8E] mt-[18px]' type="text" />
                        </div>
                        <div className='relative bg-[#FFFFFF] px-[16px] py-[9px] rounded-[16px] w-full'>
                            <label htmlFor="ageSecond" className='font-normal text-[14px] leading-[18px] font-[onest] absolute text-[#8E8E8E]'>Возраст до</label>

                            <input id='ageSecond' defaultValue={50}  className='text-[#191816] w-full focus-within:outline-none font-normal text-[18px] leading-[18px] font-[onest] text-[#8E8E8E] mt-[18px]' type="text" />
                        </div>
                    </div>
                </div>            
            </MobileModal>

            <div className={styles['base-data__container']}>

                <div className={styles['base-data__top']}>
                    <h1 className={styles['base-data__title']}>Найти няню</h1>

                    <button onClick={() => filterState.setOpen((prev: boolean) => !prev)} className={styles['base-data__filter-btn']}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.667 4.33325H10.667" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M3.99967 4.33325H1.33301" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.66634 6.66667C7.95501 6.66667 8.99967 5.622 8.99967 4.33333C8.99967 3.04467 7.95501 2 6.66634 2C5.37768 2 4.33301 3.04467 4.33301 4.33333C4.33301 5.622 5.37768 6.66667 6.66634 6.66667Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14.6667 11.6667H12" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5.33301 11.6667H1.33301" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9.33333 13.9999C10.622 13.9999 11.6667 12.9552 11.6667 11.6666C11.6667 10.3779 10.622 9.33325 9.33333 9.33325C8.04467 9.33325 7 10.3779 7 11.6666C7 12.9552 8.04467 13.9999 9.33333 13.9999Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                
                <div className={styles['base-data__filter']}>
                    <div className={styles['base-data__filter-item']}>
                        <span className={styles['base-data__filter-title']}>Опыт работы</span>

                        <CustomSelect value={filterNanny.experience} onChange={filterNanny.setExperience} title={'без опыта'} items={[
                            { name: 'без опыта', id: 'без опыта' },
                            { name: 'от 1 лет', id: 'от 1 лет' },
                            { name: 'от 3 лет', id: 'от 3 лет' },
                            { name: 'от 5 лет', id: 'от 5 лет' },
                            { name: 'от 8 лет', id: 'от 8 лет' },
                            { name: 'от 10 лет', id: 'от 10 лет' },
                            { name: 'от 15 лет', id: 'от 15 лет' },
                            { name: 'от 20 лет', id: 'от 20 лет' },
                        ]} />
                    </div>

                    <div className={styles['base-data__filter-item']}>
                        <span className={styles['base-data__filter-title']}>График работы</span>

                        <CustomSelect value={filterNanny.occupancy} onChange={filterNanny.changeOccupancy} title={'Частичная занятость'} items={[
                            { name: 'Частичная занятость', id: 'Частичная занятость' },
                            { name: 'Полная занятость', id: 'Полная занятость' },
                            { name: 'Оба выбора', id: 'Оба выбора' },
                        ]} />
                    </div>

                    <div className={styles['base-data__filter-item']}>
                        <span className={styles['base-data__filter-title']}>Ставка в час</span>

                        <CustomSelect value={filterNanny.pay} onChange={filterNanny.setPay} title={'0т 300'} items={[
                            { name: '0т 100 ', id: '100' },
                            { name: '0т 200 ', id: '200' },
                            { name: '0т 300 ', id: '300' },
                            { name: '0т 500 ', id: '500' },
                            { name: '0т 600 ', id: '600' },
                            { name: '0т 700 ', id: '700' },
                            { name: '0т 800 ', id: '800' },
                            { name: '0т 1000 ', id: '1000' },
                            { name: '0т 1500 ', id: '1500' },
                            { name: '0т 2000 ', id: '2000' },
                            { name: '0т 2500 ', id: '2500' },
                            { name: '0т 3000 ', id: '3000' },
                        ]} />
                    </div>

                    <div className={styles['base-data__filter-item']}>
                        <span className={styles['base-data__filter-title']}>Возраст</span>
                        
                        <div className={styles['base-data__filter-row']}>
                            <CustomSelect value={filterNanny.startAge} onChange={filterNanny.changeStart} title={'0т'} items={startAge} />

                            <CustomSelect value={filterNanny.endAge} onChange={filterNanny.changeEnd} title={'До'} items={finalAge()} />
                        </div>
                    </div>
                </div>

                {
                  (isLoading)  &&
                      <div className={'min-h-[512px] bg-[white] w-full rounded-[16px] flex flex-col justify-center items-center'}>
                        <span className={'font-[onest] font-semibold text-[18px] max-[768px]:px-[16px] min-[768px]:text-[28px] text-center'}>
                            Загрузка...
                        </span>
                      </div>
                }
                

                <div className={styles['base-data__content']}>
                    {
                        !isLoading && filteredItems && filteredItems.length > 0 && filteredItems.map((item: INannyItem) => {
                            if (!item.isVisible) {
                                return <>
                                    <CardBabysitter data={item} isMoreBtn />
                                </>
                            }
                        })
                    }
                    {
                        (items === undefined || items === null || filteredItems === undefined || filteredItems === null || filteredItems.length === 0) 
                        && !isLoading && 
                        <>
                            <span className={'font-[onest] font-semibold text-[18px]'}>
                                Ничего не найдено
                            </span>
                        </> 
                    }
                </div>
            </div>
        </section>
    </>
  )
}

export default BaseDataPage
