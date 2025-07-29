'use client'

import Image from 'next/image'
import styles from './response.module.scss'
import Button from '@/shared/compontents/Button'
import Link from 'next/link'
import AudioPlayer from '@/widgets/AudioPlayer/AudioPlayer'
import { useEffect, useState } from 'react'
import Calendar from '@/widgets/Calendar/Calendar'
import MobileModal from '@/widgets/MobileModal/MobileModal'
import { RadioGroup } from '@/components/ui/radio-group'
import RadioItem from '@/widgets/RadioItem/RadioItem'
import { useRouter } from 'next/navigation'
import CardBabysitter from '@/widgets/CardBabysitter/CardBabysitter'
import Popup from '@/widgets/Popup/Popup'
import { useHeader } from '@/entities/stores/useHeader'
import HeaderMenu from '@/widgets/HeaderMenu/HeaderMenu'

const ResponsePage = () => {
  const [selectedTab, setSelectedTab] = useState('about');

  const [stageModalThree, setStageThreeModal] = useState(false);
  
  const [stageModalSecond, setStageSecondModal] = useState(false);
  
  const [stageModal, setStageFirstModal] = useState(true);
  const [stageModalSelect, setStageFirstModalSelect] = useState('');

  const router = useRouter();

  const headerState = useHeader();
    
  useEffect(() => {
    headerState.setTransparent(false);
  }, [])

  return (
    <>
      <HeaderMenu />

      <section className={styles['response']}>
        <div className="min-[1200px]:hidden">
            <MobileModal  button_title='Отправить' title={'Договорились ли с няней  Алиса Смирнова на работу?'} isOpen={
              // stageModal
              false
            } next={() => 
            {
              setStageFirstModal(false)
              setStageSecondModal(true)
            }} setOpen={setStageFirstModal}>
                <RadioGroup>
                    <div className="mt-[16px] flex gap-[12px] flex-col" role="radiogroup" aria-label="Example radio group">
                        <RadioItem
                            id="yes"
                            name="Да"
                            value="Да"
                            checked={ stageModalSelect === 'yes'}
                            onChange={() => setStageFirstModalSelect('yes')}
                        />
                        <RadioItem
                            id="no"
                            name="Нет"
                            value="Нет"
                            checked={ stageModalSelect === 'no'}
                            onChange={() => setStageFirstModalSelect('no')}
                        />
                        <RadioItem
                            id="whileno"
                            name="Пока нет"
                            value="Пока нет"
                            checked={ stageModalSelect === 'whileno'}
                            onChange={() => setStageFirstModalSelect('whileno')}
                        />
                        </div>
                </RadioGroup>
            </MobileModal>

            <MobileModal button_title='Оставить отзыв' title={'Расскажите, как прошло взаимодействие с няней Алиса Смирнова'} isOpen={
              stageModalSecond
            } next={() => 
            {
              setStageThreeModal(true)
              setStageSecondModal(false)
            }} setOpen={setStageSecondModal}>
              <div className=''>
                <span className='font-[onest] text-[16px] leading-[20px] font-normal text-[#7C8092]'>Нам важно знать, как прошла работа с няней. Поделитесь своим опытом, это поможет другим родителям сделать правильный выбор</span>

                <textarea  className='border-[1px] border-[#D9D9D9] text-[#D9D9D9] text-[14px] leading-[150%] py-[8px] px-[12px] mt-[12px] rounded-[6px] min-h-[119px] w-[100%] ' placeholder='Напишите свой отзыв'  />
              </div>
            </MobileModal>

            <MobileModal button_title='Оставить отзыв' title={<span className='!text-[24px] !leading-[28px]'>Начните диалог с няней,  оформив <br /> подписку  стоимостью <span className='text-[#7733F4]'>1990₽/мес</span>
            </span>} isOpen={
                stageModalThree
              } next={() => 
              {
                setStageThreeModal(false)
                setStageSecondModal(true)
              }} setOpen={setStageThreeModal}>
                <div className=''>
                  <span className='font-[onest] text-[16px] leading-[22px] block font-semibold mb-[16px] text-[#000000]'>За эту стоимость вы получаете:</span>

                  <div className='flex flex-col gap-[10px]'>
                    <div className='flex'>
                      <span className='font-[onest] shrink-0 w-[20px] block font-semibold text-[16px] leading-[24px]'>1.</span>
                      <span className='font-[onest] block font-normal text-[16px] leading-[22px]'>Открыт доступ ко всем анкетам нянь. Выбирайте и связывайтесь с теми, кто вам подходит</span>
                    </div>

                    <div className='flex'>
                      <span className='font-[onest] shrink-0 w-[20px] block font-semibold text-[16px] leading-[24px]'>2.</span>
                      <span className='font-[onest] block font-normal text-[16px] leading-[22px]'>Возможность выложить вакансию, где сами няни будут откликаться на вашу анкету</span>
                    </div>

                    <div className='flex'>
                      <span className='font-[onest] shrink-0 w-[20px] block font-semibold text-[16px] leading-[24px]'>3.</span>
                      <span className='font-[onest] block font-normal text-[16px] leading-[22px]'>Договор, который поможет регламентировать отношения между вами и няней</span>
                    </div>
                  </div>

                  <Button onClick={() => router.push('/profile-parent/base-data/')} type='button' text='Вернуться к базе нянь' style={{
                    marginTop: '24px',
                  }} variation='four' />
                </div>
            </MobileModal>
        </div>

        <Popup style={{
          minWidth: '633px',
        }} className={styles['response__popup-btn']} cross btnTitle='Отправить' title={<span className='min-w-[569px] block'>Договорились ли с няней <br />  Алиса Смирнова на работу?</span>} isOpen={
              // stageModal
              false
            } next={() => 
            {
              setStageFirstModal(false)
              setStageSecondModal(true)
            }} setOpen={setStageFirstModal}>
                  <RadioGroup>
                    <div  className="mt-[16px] flex gap-[12px] w-full" role="radiogroup" aria-label="Example radio group">
                        <RadioItem
                            id="yes"
                            name="Да"
                            style={{
                              minWidth: '164px'
                            }}                          
                            value="Да"
                            checked={ stageModalSelect === 'yes'}
                            onChange={() => setStageFirstModalSelect('yes')}
                        />
                        <RadioItem
                            id="no"
                            name="Нет"
                            value="Нет"
                            style={{
                              minWidth: '164px'
                            }} 
                            checked={ stageModalSelect === 'no'}
                            onChange={() => setStageFirstModalSelect('no')}
                        />
                        <RadioItem
                            id="whileno"
                            name="Пока нет"
                            value="Пока нет"
                            style={{
                              minWidth: '164px'
                            }} 
                            checked={ stageModalSelect === 'whileno'}
                            onChange={() => setStageFirstModalSelect('whileno')}
                        />
                        </div>
                </RadioGroup>
        </Popup>

        <Popup style={{
          minWidth: '633px',
        }} className={styles['response__popup-btn']} cross btnTitle='Оставить отзыв' title={<span className='min-w-[569px] block'>Расскажите, как прошло <br /> взаимодействие с няней <br /> Алиса Смирнова</span>} isOpen={
              stageModalSecond
            } next={() => 
            {
              setStageThreeModal(true)
              setStageSecondModal(false)
            }} setOpen={setStageSecondModal}>
              <div className='w-full max-w-[569px]'>
                <span className='font-[onest] text-[16px] leading-[20px] font-normal text-[#7C8092]'>Нам важно знать, как прошла работа с няней. Поделитесь своим опытом, это поможет другим родителям сделать правильный выбор</span>

                <textarea  className='border-[1px] border-[#D9D9D9] text-[#D9D9D9] text-[14px] leading-[150%] py-[8px] px-[12px] mt-[12px] rounded-[6px] min-h-[119px] w-[100%] ' placeholder='Напишите свой отзыв'  />
              </div>
        </Popup>

        <Popup style={{
          minWidth: '633px',
        }} isNotBtn cross={false} className={styles['response__popup-btn']} btnTitle='Оставить отзыв' title={<span className='!text-[28px] !leading-[39px]'>Начните диалог с няней,  оформив подписку <br />  стоимостью <span className='text-[#7733F4]'>1990₽/мес</span>
            </span>} isOpen={
              stageModalThree
            } next={() => 
              {
                setStageThreeModal(false)
                setStageSecondModal(true)
              }} setOpen={setStageThreeModal}>
                <div className='w-full max-w-[615px]'>
                  <span className='font-[onest] text-[16px] leading-[22px] block font-semibold mb-[16px] text-[#000000]'>За эту стоимость вы получаете:</span>

                  <div className='flex flex-col gap-[10px]'>
                    <div className='flex'>
                      <span className='font-[onest] shrink-0 w-[20px] block font-semibold text-[16px] leading-[24px]'>1.</span>
                      <span className='font-[onest] block font-normal text-[16px] leading-[22px]'>Открыт доступ ко всем анкетам нянь. Выбирайте и связывайтесь с теми, кто вам подходит</span>
                    </div>

                    <div className='flex'>
                      <span className='font-[onest] shrink-0 w-[20px] block font-semibold text-[16px] leading-[24px]'>2.</span>
                      <span className='font-[onest] block font-normal text-[16px] leading-[22px]'>Возможность выложить вакансию, где сами няни будут откликаться на вашу анкету</span>
                    </div>

                    <div className='flex'>
                      <span className='font-[onest] shrink-0 w-[20px] block font-semibold text-[16px] leading-[24px]'>3.</span>
                      <span className='font-[onest] block font-normal text-[16px] leading-[22px]'>Договор, который поможет регламентировать отношения между вами и няней</span>
                    </div>
                  </div>

                  <div className='w-full flex gap-[16px]'>
                    <Button  onClick={() => router.push('/profile-parent/base-data/')} type='button' text='Вернуться к базе нянь' style={{
                      width: '283px',
                      height: 'fit-content',
                      marginTop: '24px',
                    }} variation='four' />

                    <Button 
                    style={{
                      width: '316px',
                      marginTop: '24px',
                    }}
                    onClick={() => router.push('/profile-parent/base-data/')} text={'Оформить подписку'} variation="second" type="button" />
                  </div>

                </div>
        </Popup>

        <div className={styles['response__container']}>
          <div className={styles['response__top']}>
            <div className={styles['response__person-item']}>
              <div className={styles['response__person']}>
                  <div className={styles['response__avatar']}>
                      <Image className={styles['response__avatar-image']} src={'/images/card-babysit/image.jpg'} 
                      alt="heart" width={100} height={100} />
                  </div>

                  <div className={styles['response__person-bottom']}>
                      <div className={styles['response__person-info']}>
                          <div className={styles['response__person-info-left']}>
                              <h2 className={styles['response__name']}>Алиса К.</h2>

                              <span className={styles['response__words']}>
                                  <span className={styles['response__word']}>
                                      Полная
                                  </span>
                                  <span className={styles['response__word']}>
                                      Без проживания
                                  </span>
                              </span>
                          </div>

                          <div className={styles['response__person-info-right']}>
                              <div className={styles['response__person-info-label']}>
                                  Активно ищу работу
                              </div>

                            
                          </div>
                      </div>

                      <div className={styles['response__person-labels_desk']}>
                          <div className={styles['response__person-label']}>
                              Возраст: <b>30 лет</b>
                          </div>

                          <div className={styles['response__person-label']}>
                              Опыт работы: <b>5 лет</b>
                          </div>
                      </div> 
                  </div>

              </div>
              <div className={styles['response__person-labels_mob']}>
                  <div className={styles['response__person-label']}>
                      Возраст: <b>30 лет</b>
                  </div>

                  <div className={styles['response__person-label']}>
                      Опыт работы: <b>5 лет</b>
                  </div>
              </div>
            </div>

            <div className={styles['response__price-item']}>
              <span className={styles['response__price-item-title']}>
                Стоимость услуг 
              </span>

              <span className={styles['response__price-item-content']}>
                <b>124 000</b> ₽/мес
              </span>
            </div>

            <div className={styles['response__buttons-item']}>
                 <Button style={{
                  marginTop: '0px'
                }} heart={true} variation='second' text='Связаться' hoverChild= {<>
                  <span className='flex gap-[10px]'>+7 900 000 00 00
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.1393 16.8024C20.1393 17.1324 20.066 17.4716 19.9102 17.8016C19.7543 18.1316 19.5527 18.4433 19.2868 18.7366C18.8377 19.2316 18.3427 19.5891 17.7835 19.8183C17.2335 20.0474 16.6377 20.1666 15.996 20.1666C15.061 20.1666 14.0618 19.9466 13.0077 19.4974C11.9535 19.0483 10.8993 18.4433 9.85433 17.6824C8.80016 16.9124 7.801 16.0599 6.84766 15.1158C5.9035 14.1624 5.051 13.1633 4.29016 12.1183C3.5385 11.0733 2.9335 10.0283 2.4935 8.99242C2.0535 7.94742 1.8335 6.94825 1.8335 5.99492C1.8335 5.37159 1.9435 4.77575 2.1635 4.22575C2.3835 3.66659 2.73183 3.15325 3.21766 2.69492C3.80433 2.11742 4.446 1.83325 5.12433 1.83325C5.381 1.83325 5.63766 1.88825 5.86683 1.99825C6.10516 2.10825 6.316 2.27325 6.481 2.51159L8.60766 5.50909C8.77266 5.73825 8.89183 5.94909 8.97433 6.15075C9.05683 6.34325 9.10266 6.53575 9.10266 6.70992C9.10266 6.92992 9.0385 7.14992 8.91016 7.36075C8.791 7.57159 8.61683 7.79159 8.39683 8.01159L7.70016 8.73575C7.59933 8.83659 7.5535 8.95575 7.5535 9.10242C7.5535 9.17575 7.56266 9.23992 7.581 9.31325C7.6085 9.38659 7.636 9.44159 7.65433 9.49659C7.81933 9.79909 8.1035 10.1933 8.50683 10.6699C8.91933 11.1466 9.35933 11.6324 9.836 12.1183C10.331 12.6041 10.8077 13.0533 11.2935 13.4658C11.7702 13.8691 12.1643 14.1441 12.476 14.3091C12.5218 14.3274 12.5768 14.3549 12.641 14.3824C12.7143 14.4099 12.7877 14.4191 12.8702 14.4191C13.026 14.4191 13.1452 14.3641 13.246 14.2633L13.9427 13.5758C14.1718 13.3466 14.3918 13.1724 14.6027 13.0624C14.8135 12.9341 15.0243 12.8699 15.2535 12.8699C15.4277 12.8699 15.611 12.9066 15.8127 12.9891C16.0143 13.0716 16.2252 13.1908 16.4543 13.3466L19.4885 15.5008C19.7268 15.6658 19.8918 15.8583 19.9927 16.0874C20.0843 16.3166 20.1393 16.5458 20.1393 16.8024Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10"/>
                    </svg>
                  </span>

                </>} type='button'/>
                <Button variation='four' text='Оставить отзыв' type='button'/>
            </div>

            <div className={styles['response__video-item']}>
                <video
                    src={'/images/video-block/video.mp4'}
                    loop
                    playsInline                 
                ></video>

                <div className={styles['response__video-item-right']}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.1666 5.83341L13.3333 10.0001L19.1666 14.1667V5.83341Z" stroke="#181D27" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M11.6666 4.16675H2.49992C1.57944 4.16675 0.833252 4.91294 0.833252 5.83341V14.1667C0.833252 15.0872 1.57944 15.8334 2.49992 15.8334H11.6666C12.5871 15.8334 13.3333 15.0872 13.3333 14.1667V5.83341C13.3333 4.91294 12.5871 4.16675 11.6666 4.16675Z" stroke="#181D27" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>


                    <Link href={'#'} className={styles['response__video-item-title']}>Посмотреть видеовизитку</Link>
                </div>
            </div>

            <div className={styles['response__audio-item']}>
              <AudioPlayer />
            </div>

            <div className={styles['response__rating-item']}>
                <div className={styles['response__rating-item-right']}>
                    <span className={styles['response__rating-title']}>
                      4.9
                    </span>
                    <span className={styles['response__rating-description']}>
                      Оценка родителей
                    </span>
                </div>

                <button>
                  <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.0001 1.66675L12.5751 6.88341L18.3334 7.72508L14.1667 11.7834L15.1501 17.5167L10.0001 14.8084L4.85008 17.5167L5.83341 11.7834L1.66675 7.72508L7.42508 6.88341L10.0001 1.66675Z" stroke="#181D27" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
            </div>
          </div>

          <div className={styles['response__content']}>
            <ul className={styles['response__content-top']}>
              <li onClick={() => setSelectedTab('about')} className={selectedTab === 'about' ? styles['response__content-top-item_active'] :  styles['response__content-top-item']}>
                Обо мне
              </li> 
              <li onClick={() => setSelectedTab('education')} className={selectedTab === 'education' ? styles['response__content-top-item_active'] :  styles['response__content-top-item']}>
                Образование
              </li>
              <li onClick={() => setSelectedTab('chart')} className={selectedTab === 'chart' ? styles['response__content-top-item_active'] :  styles['response__content-top-item']}>
                График работы
              </li>
              <li onClick={() => setSelectedTab('reviews')} className={selectedTab === 'reviews' ? styles['response__content-top-item_active'] :  styles['response__content-top-item']}>
                Отзывы
              </li>
              <li onClick={() => setSelectedTab('experience')} className={selectedTab === 'experience' ? styles['response__content-top-item_active'] :  styles['response__content-top-item']}>
                Опыт работы
              </li>
              <li onClick={() => setSelectedTab('advantages')} className={selectedTab === 'advantages' ? styles['response__content-top-item_active'] :  styles['response__content-top-item']}>
                Преимущества
              </li>
            </ul>



            {
              selectedTab === 'about' &&
              <div className={styles['response__content-inner']}>
                  <h3 className={styles['response__content-title']}>
                    Здравствуйте!
                  </h3>

                  <p className={styles['response__content-description']}>
                      Я проживаю рядом с м. Марьино и м. Братиславская.
                      Имею высшее педагогическое образование и рекомендации от предыдущих работодателей.
                      Опыт работы няней-гувернанткой — более 10 лет, с детьми от 4 до 11 лет.
                  </p>

                  <h3 className={styles['response__content-title']}>
                    Обо мне
                  </h3>

                  {/* <div  className={styles['response__content-labels']}>
                      <div className={styles['response__content-label']}>
                        📍Район: <b>Марьино / Братиславская</b>
                      </div>
                      <div className={styles['response__content-label']}>
                        🕐 Время: <b>с 12:00 до 19:00</b>
                      </div>
                      <div className={styles['response__content-label']}>
                        💰 Оплата: <b>фиксированная, по договорённости</b>
                      </div>
                  </div> */}

                  <p className={styles['response__content-description']}>
                    Я — учитель русского языка, работала также с младшими школьниками, воспитателем в детском саду и вожатой в детских лагерях. Организовывала турпоходы, вела литературный, театральный и музыкальный кружки. Применяю в работе методику Монтессори и элементы “грамматики фантазии” Дж. Родари.
                  </p>

                  <ul className={styles['response__content-bullet-list']}>
                    <li>Ответственная, внимательная, терпеливая</li>
                    <li>Артистичная, добрая, весёлая</li>
                    <li>Хорошо пою, играю на гитаре</li>
                  </ul>

                  <h3 className={styles['response__content-title']}>
                    Опыт с детьми
                  </h3>

                  <p className={styles['response__content-description']}>
                    Успешно работаю с:
                  </p>

                  <ul className={styles['response__content-bullet-list']}>
                    <li>застенчивыми</li>
                    <li>гиперактивными</li>
                    <li>детьми с особенностями развития.</li>
                  </ul>

                  <p className={styles['response__content-description']}>
                    Обучаю чтению и письму, развиваю нестандартное мышление, память, фантазию. Знаю множество стихов, сказок и песен.
                  </p>

                  <h3 className={styles['response__content-title']}>
                    Мои приоритеты:
                  </h3>

                  <ul className={styles['response__content-bullet-list']}>
                    <li>Развивающие и подвижные игры</li>
                    <li>Прогулки и логические задачи (русский/английский)</li>
                    <li>Чтение, пение, аккомпанемент на гитаре</li>
                    <li>Индивидуальный подход к каждому ребёнку</li>
                  </ul>

                  <h3 className={styles['response__content-title']}>
                    Дополнительно:
                  </h3>

                  <p className={styles['response__content-description']}>
                    Организую детские праздники, театральные постановки, монтирую фильмы из фото и видео. Веду дневники развития, создаю фотоальбомы, словарики и памятные коллажи. Готовлю диетические блюда, избегаю жарки. Люблю животных — могу ухаживать за питомцем, при необходимости забрать к себе.
                  </p>
              </div>
            }

            {
              selectedTab === 'education' &&
              <div className={styles['response__content-inner']}>
                <div className='flex flex-col gap-[32px] max-[768px]:gap-[16px]'>
                  <div className='flex gap-[16px] flex-col'>
                      <span className='font-[onest] font-semibold max-[768px]:text-[20px]'>
                        2012–2016
                      </span>

                      <span className='font-[onest] font-normal'>
                        Московский педагогический колледж, специальность «Воспитатель детей дошкольного возраста»
                      </span>
                  </div>
                  <div className='flex gap-[16px] flex-col'>
                      <span className='font-[onest] font-semibold max-[768px]:text-[20px]'>
                        2012–2016
                      </span>

                      <span className='font-[onest] font-normal'>
                        Московский педагогический колледж, специальность «Воспитатель детей дошкольного возраста»
                      </span>
                  </div>
                  <div className='flex gap-[16px] flex-col'>
                      <span className='font-[onest] font-semibold max-[768px]:text-[20px]'>
                        2012–2016
                      </span>

                      <span className='font-[onest] font-normal'>
                        Московский педагогический колледж, специальность «Воспитатель детей дошкольного возраста»
                      </span>
                  </div>
                  <div className='flex gap-[16px] flex-col'>
                      <span className='font-[onest] font-semibold max-[768px]:text-[20px]'>
                        2012–2016
                      </span>

                      <span className='font-[onest] font-normal'>
                        Московский педагогический колледж, специальность «Воспитатель детей дошкольного возраста»
                      </span>
                  </div>
                </div>
              </div>
            }

            {
              selectedTab === 'chart' &&             <div className={styles['response__content-inner']}>
                  <Calendar isEdit={false} items={[
                    false, false, true, false, true,false, false,
                    false, false, true, true, true,false, false,
                    true, false, false, false, false,true, false,
                    false, true, false, false, true,false, false,
                    false, true, true, false, true,true, false,
                  ]} />
              </div>
            }

            {
              selectedTab === 'reviews' && <div className={styles['response__content-inner']}>
                  <div className='flex flex-col gap-[16px]'>
                    <div className='rounded-[16px] py-[16px] pl-[24px] pr-[16px] border-[1px] border-[#D9D9D9]'>
                      <div className='flex justify-between w-full'>
                        <span className='font-[onest] text-[20px] leading-[28px] font-medium'>Татьяна, мама 3-летней Лизы</span>

                        <span className='max-[768px]:hidden font-[onest] text-[16px] leading-[22px] font-normal text-[#626776]'>25.10.2025</span>
                      </div>

                      <p className='font-[onest] text-[16px] leading-[22px] font-normal block mt-[12px]'>«Очень довольны работой Алисы! Она сразу нашла общий язык с дочкой, приносила интересные развивающие игры и всегда была внимательна к нашим просьбам. Лиза с радостью ждала каждую встречу. Спасибо за заботу и доброту!»</p>
                    </div>

                    <div className='rounded-[16px] py-[16px] pl-[24px] pr-[16px] border-[1px] border-[#D9D9D9]'>
                      <div className='flex justify-between w-full'>
                        <span className='font-[onest] text-[20px] leading-[28px] font-medium'>Татьяна, мама 3-летней Лизы</span>

                        <span className='max-[768px]:hidden font-[onest] text-[16px] leading-[22px] font-normal text-[#626776]'>25.10.2025</span>
                      </div>

                      <p className='font-[onest] text-[16px] leading-[22px] font-normal block mt-[12px]'>«Очень довольны работой Алисы! Она сразу нашла общий язык с дочкой, приносила интересные развивающие игры и всегда была внимательна к нашим просьбам. Лиза с радостью ждала каждую встречу. Спасибо за заботу и доброту!»</p>
                    </div>

                    <div className='rounded-[16px] py-[16px] pl-[24px] pr-[16px] border-[1px] border-[#D9D9D9]'>
                      <div className='flex justify-between w-full'>
                        <span className='font-[onest] text-[20px] leading-[28px] font-medium'>Татьяна, мама 3-летней Лизы</span>

                        <span className='max-[768px]:hidden font-[onest] text-[16px] leading-[22px] font-normal text-[#626776]'>25.10.2025</span>
                      </div>

                      <p className='font-[onest] text-[16px] leading-[22px] font-normal block mt-[12px]'>«Очень довольны работой Алисы! Она сразу нашла общий язык с дочкой, приносила интересные развивающие игры и всегда была внимательна к нашим просьбам. Лиза с радостью ждала каждую встречу. Спасибо за заботу и доброту!»</p>
                    </div>

                  </div>
              </div>
            }

            {
              selectedTab === 'experience' &&    <div className={styles['response__content-inner']}>
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
                </div>
            }

            {
              selectedTab === 'advantages' &&    <div className={styles['response__content-inner']}>
                  <ul className='flex flex-wrap gap-[12px]'>
                    <li className='border-[#7C8092] border-[1px] rounded-[24px] font-[onest] font-normal text-[14px] leading-[18px] px-[16px] py-[7px]'>🧠 Психологическое образование</li>
                    <li className='border-[#7C8092] border-[1px] rounded-[24px] font-[onest] font-normal text-[14px] leading-[18px] px-[16px] py-[7px]'>🎵 Музыкальное образование</li>
                    <li className='border-[#7C8092] border-[1px] rounded-[24px] font-[onest] font-normal text-[14px] leading-[18px] px-[16px] py-[7px]'>👩‍🏫 Педагог начальных классов</li>
                    <li className='border-[#7C8092] border-[1px] rounded-[24px] font-[onest] font-normal text-[14px] leading-[18px] px-[16px] py-[7px]'>🌧️ Прогулки в любую погоду</li>
                    <li className='border-[#7C8092] border-[1px] rounded-[24px] font-[onest] font-normal text-[14px] leading-[18px] px-[16px] py-[7px]'>🔎 Ищу постоянную семью</li>
                    <li className='border-[#7C8092] border-[1px] rounded-[24px] font-[onest] font-normal text-[14px] leading-[18px] px-[16px] py-[7px]'>🏫 Подготовка к школе</li>
                    <li className='border-[#7C8092] border-[1px] rounded-[24px] font-[onest] font-normal text-[14px] leading-[18px] px-[16px] py-[7px]'>📚 Помощь с уроками</li>
                    <li className='border-[#7C8092] border-[1px] rounded-[24px] font-[onest] font-normal text-[14px] leading-[18px] px-[16px] py-[7px]'>🏠 Помощь по дому</li>
                    <li className='border-[#7C8092] border-[1px] rounded-[24px] font-[onest] font-normal text-[14px] leading-[18px] px-[16px] py-[7px]'>🤒 Присмотр за заболевшими</li>
                    <li className='border-[#7C8092] border-[1px] rounded-[24px] font-[onest] font-normal text-[14px] leading-[18px] px-[16px] py-[7px]'>⛑️ Курсы первой помощи</li>
                    <li className='border-[#7C8092] border-[1px] rounded-[24px] font-[onest] font-normal text-[14px] leading-[18px] px-[16px] py-[7px]'>🎤 Пение</li>
                    <li className='border-[#7C8092] border-[1px] rounded-[24px] font-[onest] font-normal text-[14px] leading-[18px] px-[16px] py-[7px]'>🏺 Лепка</li>
                    <li className='border-[#7C8092] border-[1px] rounded-[24px] font-[onest] font-normal text-[14px] leading-[18px] px-[16px] py-[7px]'>🎨 Живопись</li>
                    <li className='border-[#7C8092] border-[1px] rounded-[24px] font-[onest] font-normal text-[14px] leading-[18px] px-[16px] py-[7px]'>🚗 Водительское удостоверение</li>
                  </ul>
                </div>
            }
          </div>

          <h2 className='font-[onest] mb-[16px] mt-[24px] font-semibold text-[20px] leading-[26px]'>Вам могут быть интересны:</h2>

          <div className='flex flex-col gap-[16px] min-[1024px]:grid min-[1024px]:grid-cols-2 w-full min-[1024px]:gap-[24px]'>
            <CardBabysitter />
            <CardBabysitter />
          </div>
        </div>
      </section>
    </>
  )
}

export default ResponsePage
