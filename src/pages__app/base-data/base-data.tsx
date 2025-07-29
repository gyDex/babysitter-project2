'use client'

import CustomSelect from '@/shared/compontents/CustomSelect/CustomSelect'
import styles from './base-data.module.scss'
import CardBabysitter from '@/widgets/CardBabysitter/CardBabysitter'
import MobileModal from '@/widgets/MobileModal/MobileModal'
import { useFilterState } from '@/entities/stores/useFilter'
import { SelectModal } from '@/widgets/SelectModal/SelectModal'
import { cities } from '@/entities/cities'
import { useHeader } from '@/entities/stores/useHeader'
import { useEffect } from 'react'
import HeaderMenu from '@/widgets/HeaderMenu/HeaderMenu'
import { finalAge, startAge } from '@/entities/consts/age'

const BaseDataPage = () => {
    const filterState = useFilterState();
    
    const headerState = useHeader();
      
    useEffect(() => {
        headerState.setTransparent(false);
    }, [])

    console.log(finalAge())

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

                    <CustomSelect title={'без опыта'} items={[
                        { name: 'без опыта', id: 'notexp' },
                        { name: 'от 1 лет', id: '1year' },
                        { name: 'от 3 лет', id: '3year' },
                        { name: 'от 5 лет', id: '5year' },
                        { name: 'от 8 лет', id: '8year' },
                        { name: 'от 10 лет', id: '10year' },
                        { name: 'от 15 лет', id: '15year' },
                        { name: 'от 20 лет', id: '20year' },
                    ]} />
                </div>

                <div className={styles['base-data__filter-item']}>
                    <span className={styles['base-data__filter-title']}>График работы</span>

                    <CustomSelect title={'Частичная занятость'} items={[
                          { name: 'Частичная занятость', id: 'part-empl' },
                          { name: 'Полная занятость', id: 'full-empl' },
                    ]} />
                </div>

                <div className={styles['base-data__filter-item']}>
                    <span className={styles['base-data__filter-title']}>Ставка в час</span>

                    <CustomSelect title={'0т 300'} items={[
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
                        <CustomSelect title={'0т'} items={startAge} />

                        <CustomSelect title={'До'} items={finalAge()} />
                    </div>
                </div>
            </div>

            <div className={styles['base-data__content']}>
                <CardBabysitter isMoreBtn />
                <CardBabysitter isMoreBtn  />
                <CardBabysitter isMoreBtn  />
                <CardBabysitter isMoreBtn  />
            </div>
        </div>
    </section>
    </>
  )
}

export default BaseDataPage
