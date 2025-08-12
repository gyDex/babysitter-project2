'use client'

import { useMobileState } from '@/entities/stores/useMobileModal'
import Button from '@/shared/compontents/Button'
import HeaderMenu from '@/widgets/HeaderMenu/HeaderMenu'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import styles from './response.module.scss';
import Popup from '@/widgets/Popup/Popup'
import { useHeader } from '@/entities/stores/useHeader'


const AboutYouPage = () => {
    const router = useRouter();

    const mobileState = useMobileState();


    const headerState = useHeader();

    useEffect(() => {
        headerState.setTransparent(false)
    },[headerState.isOpenMenu])

  return (
    <>
        <HeaderMenu />

        <Popup styleMain={{
        padding: '24px',
        width: '669px',
      }} top={false} title={false} onClose={() => mobileState.setOpen(false, '')}  isOpen={mobileState.isOpen && mobileState.type === 'form_babysitter'} isNotBtn cross={true} setOpen={mobileState.setOpen}>
          <div className='max-w-[557px]'>
            <ul className={styles['response__content-bullet-list']}>
              <li>2009 — Томский колледж культуры и искусств: режиссёр-постановщик, преподаватель социально-культурной деятельности и народно-художественного творчества</li>
              <li>2012 — Повышение квалификации: педагог дополнительного образования.</li>
              <li>2020 — Диплом о профессиональной переподготовке: педагог-психолог дошкольного образования.</li>
              <li>Дополнительное обучение у практикующих психологов и коучей в сфере детской, семейной и взрослой психологии.</li>
              <li>Участие в образовательных проектах и интенсивных программах по развитию осознанности, эмоционального интеллекта и профессионального роста в помогающих профессиях.</li>
              <li>Погружение в психолого-педагогические подходы, современные практики сопровождения детей и родителей.</li>
            </ul>

          </div>
      </Popup>

        <Popup styleMain={{
        padding: '24px',
        width: '669px',
      }} top={false} title={false} onClose={() => mobileState.setOpen(false, '')}  isOpen={mobileState.isOpen && mobileState.type === 'jobs'} isNotBtn cross={true} setOpen={mobileState.setOpen}>
        <div className='flex flex-col gap-[32px] max-[768px]:gap-[16px]'>
            <div>
            <div className='flex gap-[5px] max-[768px]:inline'>
                <span className='font-[onest] max-[768px]:inline-flex text-[20px] font-semibold'>
                    С 2017 по 2017:
                </span>

                <span className='font-[onest] max-[768px]:inline text-[20px] font-normal'>
                    вожатая в детском лагере «Звёздочка»
                </span>
            </div>
            
            <p className='font-[onest] text-[16px] leading-[24px] font-normal block mt-[12px]'>Работала с группой детей 7–10 лет. Организация игр, дневного режима, сопровождение на мероприятия, решение конфликтных ситуаций, обеспечение безопасности.</p>
            </div>

            <div>
            <div className='flex gap-[5px] max-[768px]:inline'>
                <span className='font-[onest] text-[20px] font-semibold'>
                    С 2017 по 2017:
                </span>

                <span className='font-[onest] text-[20px] font-normal'>
                    вожатая в детском лагере «Звёздочка»
                </span>
            </div>
            
            <p className='font-[onest] text-[16px] leading-[24px] font-normal block mt-[12px]'>Работала с группой детей 7–10 лет. Организация игр, дневного режима, сопровождение на мероприятия, решение конфликтных ситуаций, обеспечение безопасности.</p>
            </div>

            <div>
            <div className='flex gap-[5px] max-[768px]:inline'>
                <span className='font-[onest] text-[20px] font-semibold'>
                    С 2017 по 2017:
                </span>

                <span className='font-[onest] text-[20px] font-normal'>
                    вожатая в детском лагере «Звёздочка»
                </span>
            </div>
            
            <p className='font-[onest] text-[16px] leading-[24px] font-normal block mt-[12px]'>Работала с группой детей 7–10 лет. Организация игр, дневного режима, сопровождение на мероприятия, решение конфликтных ситуаций, обеспечение безопасности.</p>
            </div>

            <div>
            <div className='flex gap-[5px] max-[768px]:inline'>
                <span className='font-[onest] text-[20px] font-semibold'>
                    С 2017 по 2017:
                </span>

                <span className='font-[onest] text-[20px] font-normal'>
                    вожатая в детском лагере «Звёздочка»
                </span>
            </div>
            
            <p className='font-[onest] text-[16px] leading-[24px] font-normal block mt-[12px]'>Работала с группой детей 7–10 лет. Организация игр, дневного режима, сопровождение на мероприятия, решение конфликтных ситуаций, обеспечение безопасности.</p>
            </div>
        </div>
      </Popup>

        <section className='w-full flex items-center max-[1024px]:px-[16px] min-[1024px]:pt-[200px] justify-center pt-[137px]'>
            <div className='max-w-[1200px] w-full  '>
                <div className='rounded-[16px] bg-[white] min-[1024px]:flex justify-between w-full p-[16px] min-[1024px]:p-[32px]'>
                    <div className='flex flex-col'>
                        <div className='max-[1024px]:flex-col-reverse min-[1024px]:gap-[16px] h-fit flex min-[1024px]:items-center'>
                            <h1 className='font-semibold min-[1024px]:text-[28px] text-[20px] min-[1024px]:mt-[0px] leading-[28px] block mt-[16px] mb-[8px]'>
                                Расскажите о себе
                            </h1>
                            <div className='bg-[#EFF0F5] px-[8px] py-[3px] w-fit h-fit rounded-[24px] gap-[4px] flex gap-[2px] items-center justify-content font-[onest] font-normal text-[12px] leading-[16px]'>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.5 3.75C6.5 3.33579 6.16421 3 5.75 3C5.33579 3 5 3.33579 5 3.75V6.75C5 7.09415 5.23422 7.39414 5.5681 7.47761L7.5681 7.97761C7.96994 8.07807 8.37715 7.83375 8.47761 7.4319C8.57807 7.03006 8.33375 6.62285 7.9319 6.52239L6.5 6.16442V3.75Z" fill="#191816"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6ZM10.5 6C10.5 8.48528 8.48528 10.5 6 10.5C3.51472 10.5 1.5 8.48528 1.5 6C1.5 3.51472 3.51472 1.5 6 1.5C8.48528 1.5 10.5 3.51472 10.5 6Z" fill="#191816"/>
                                </svg>

                                Это займет 5 минут
                            </div>

                        </div>
                        <span className='font-normal text-[#7C8092] max-[1024px]:mt-[8px] cursor-pointer text-[16px] underline leading-[26px] block min-[1024px]:mb-[16px]'>
                            Посмотреть, как будет выглядеть мой профиль
                        </span>

                        <div className='max-[1024px]:hidden mt-auto'>
                            <Button onClick={() => router.push('/about-you/response')} type='button' style={{
                                width: 'fit-content',
                                paddingInline: '58px',
                                marginTop: 'auto'
                            }}   text='Рассказать' heart variation='second' />
                        </div>
                    </div>

                    <div className='max-w-[556px]'>
                        <p className='block font-semibold min-[1024px]:mt-[0px] text-[18px] leading-[26px] min-[1024px]:text-[20px] block mt-[32px]'>Что вам будет доступно на платформе:</p>

                        <div className='flex flex-col gap-[20px] mt-[24px]'>
                            <div className='flex gap-[12px] '>
                                <svg className='shrink-0' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="24" height="24" rx="3" fill="#EFF0F5"/>
                                    <path d="M9.90034 14.085L11.8353 15.78C11.9253 15.8625 12.0678 15.8625 12.1578 15.78L14.0928 14.085C14.5953 13.6425 14.6628 12.8925 14.2428 12.3675C13.8228 11.8425 13.0578 11.745 12.5253 12.15L12.0003 12.555L11.4678 12.1575C10.9278 11.7525 10.1703 11.85 9.75034 12.375C9.33034 12.8925 9.39784 13.65 9.90034 14.085Z" stroke="#252525" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M19.5 11.25V15.75C19.5 18.75 18.75 19.5 15.75 19.5H8.25C5.25 19.5 4.5 18.75 4.5 15.75V8.25C4.5 5.25 5.25 4.5 8.25 4.5H9.375C10.5 4.5 10.7475 4.83 11.175 5.4L12.3 6.9C12.585 7.275 12.75 7.5 13.5 7.5H15.75C18.75 7.5 19.5 8.25 19.5 11.25Z" stroke="#252525" stroke-width="1.125" stroke-miterlimit="10"/>
                                </svg>

                                <p className='font-normal text-[16px] leading-[20px] text-[#000000]'>Мы добавим вас в базу нянь, просматривая которую, родители будут сами связываться с вами</p>
                            </div>
                            <div className='flex gap-[12px] '>
                                <svg className='shrink-0' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="24" height="24" rx="3" fill="#EFF0F5"/>
                                    <path d="M9.375 17.25H9C6 17.25 4.5 16.5 4.5 12.75V9C4.5 6 6 4.5 9 4.5H15C18 4.5 19.5 6 19.5 9V12.75C19.5 15.75 18 17.25 15 17.25H14.625C14.3925 17.25 14.1675 17.3625 14.025 17.55L12.9 19.05C12.405 19.71 11.595 19.71 11.1 19.05L9.975 17.55C9.855 17.385 9.5775 17.25 9.375 17.25Z" stroke="#252525" stroke-width="1.125" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M8.25 9H15.75" stroke="#252525" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M8.25 12.75H12.75" stroke="#252525" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>

                                <p className='font-normal text-[16px] leading-[20px] text-[#000000]'>Сможете откликаться на вакансии родителей</p>
                            </div>
                            <div className='flex gap-[12px] '>
                                <svg className='shrink-0' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" rx="3" fill="#EFF0F5"/>
                                <path d="M10.5381 4.89844L6.02312 7.84594C4.57563 8.79094 4.57563 10.9059 6.02312 11.8509L10.5381 14.7984C11.3481 15.3309 12.6831 15.3309 13.4931 14.7984L17.9856 11.8509C19.4256 10.9059 19.4256 8.79844 17.9856 7.85344L13.4931 4.90594C12.6831 4.36594 11.3481 4.36594 10.5381 4.89844Z" stroke="#292D32" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M7.22234 12.8105L7.21484 16.328C7.21484 17.2805 7.94984 18.3005 8.84984 18.6005L11.2423 19.3955C11.6548 19.5305 12.3373 19.5305 12.7573 19.3955L15.1498 18.6005C16.0498 18.3005 16.7848 17.2805 16.7848 16.328V12.848" stroke="#292D32" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M19.0508 14.25V9.75" stroke="#292D32" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>


                                <p className='font-normal text-[16px] leading-[20px] text-[#000000]'>Обучение по тому, как быстрее всего найти общий язык с ребенком и семьей</p>
                            </div>
                            <div className='flex gap-[12px] '>
                                <svg className='shrink-0' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="24" height="24" rx="3" fill="#EFF0F5"/>
                                    <path d="M9.375 17.25H9C6 17.25 4.5 16.5 4.5 12.75V9C4.5 6 6 4.5 9 4.5H15C18 4.5 19.5 6 19.5 9V12.75C19.5 15.75 18 17.25 15 17.25H14.625C14.3925 17.25 14.1675 17.3625 14.025 17.55L12.9 19.05C12.405 19.71 11.595 19.71 11.1 19.05L9.975 17.55C9.855 17.385 9.5775 17.25 9.375 17.25Z" stroke="#252525" stroke-width="1.125" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M8.25 9H15.75" stroke="#252525" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M8.25 12.75H12.75" stroke="#252525" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>

                                <p className='font-normal text-[16px] leading-[20px] text-[#000000]'>Договор, регламентирующий ваши отношения с семьей</p>
                            </div>
                        </div>
                    </div>

                    <div className='min-[1024px]:hidden w-full mt-[32px] '>
                        <Button type='button'
                        onClick={() => router.push('/about-you/response')}
                        style={{
                            width: '',
                            paddingInline: '58px',
                            marginTop: 'auto'
                        }}   text='Рассказать' heart variation='second' />
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default AboutYouPage
