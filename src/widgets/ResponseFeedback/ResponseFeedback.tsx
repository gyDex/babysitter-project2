import Image from 'next/image'
import styles from './ResponseFeedback.module.scss'
import { useMobileState } from '@/entities/stores/useMobileModal'
import Button from '@/shared/compontents/Button'

type Props = {
    name: string,
    person: string,
    quote: any,
    tasks?: any,
    isRes?: boolean,
    isEdit?: boolean,
    isDetail?: boolean,
    IsRes?: boolean,
    verified?: boolean,
}

const ResponseFeedback:React.FC<Props> = ({IsRes=false, verified = true, isEdit = false,isDetail = false, isRes = true ,person, quote, tasks, name}) => {
    const modalState = useMobileState();

  return (
    <div className={styles['response-feedback']}>
        <div className={styles['response-feedback__top-info-mobile']}>
            <div className={styles['response-feedback__top-label-left']}>
                <div className={styles['response-feedback__top-info-label_city']}>
                    📍Москва
                </div>

                <div className={styles['response-feedback__top-info-label']}>
                    Нужна няня
                </div>
            </div>

            <span className={styles['response-feedback__words']}>
                <span className={styles['response-feedback__word']}>
                    Частичная
                </span>
                <span className={styles['response-feedback__word']}>
                    Без проживания
                </span>
            </span>
        </div>

        <div className={styles['response-feedback__top']}>
            <div className={styles['response-feedback__avatar']}>
                <Image className={styles['response-feedback__avatar-image']} src={'/images/babysit-benefits/avatar.png'} 
                alt="heart" width={64} height={64} quality={100} />
            </div>

            <div className={styles['response-feedback__top-bottom']}>
                <div className={styles['response-feedback__top-info']}>
                    <div className={styles['response-feedback__top-info-left']}>
                        <h2 className={styles['response-feedback__name']}>{name}</h2>

                        <address className={styles['response-feedback__address']}>
                            {person}
                        </address>
                    </div>

                    <div className={styles['response-feedback__top-info-right']}>
                        <div className={styles['response-feedback__top-info-labels']}>
                            <div className={styles['response-feedback__top-info-label_city']}>
                                📍Москва
                            </div>

                            <div className={styles['response-feedback__top-info-label']}>
                                Нужна няня
                            </div>
                        </div>

                        <span className={styles['response-feedback__words']}>
                            <span className={styles['response-feedback__word']}>
                                Полная
                            </span>
                            <span className={styles['response-feedback__word']}>
                                Без проживания
                            </span>
                        </span>
                    </div>
                </div>
            </div>

        </div>
        <div className={styles['response-feedback__top-labels']}>
            <div className={styles['response-feedback__top-label']}>
                <b>Мальчик, 4 года</b>
            </div>

            <div className={styles['response-feedback__top-label']}>
                Будни, 9:00 – 13:00
            </div>
        </div>

        <p className={styles['response-feedback__subtitle']}>
            <b>Чем заниматься:</b>
        </p>

        <div className={styles['response-feedback__labels']}>
            <div className={styles['response-feedback__label']}>
                🌳 Прогулки на свежем воздухе
            </div>

            <div className={styles['response-feedback__label']}>
                📖 Чтение книг
            </div>

            <div className={styles['response-feedback__label']}>
                🎨 Рисование и лепка
            </div>

            <div className={styles['response-feedback__label']}>
                😴 Укладывание на дневной сон
            </div>
        </div>
        
        <div className={styles['response-feedback__bottom']}>
            <div>
                <p className={styles['response-feedback__subtitle']}>
                    <b>Задачи няни:</b>
                </p>

                <p className={styles['response-feedback__text']}>{tasks}</p>

                <span className={styles['response-feedback__quote']}>
                    {quote}
                </span>
            </div>

            {
                (isDetail) && 
                <div>
                    <p className={styles['response-feedback__subtitle']}>
                        <b>Дополнительно от мамы:</b>
                    </p>

                    <p className={styles['response-feedback__text']}>
                        «Мы ищем няню, которая сможет стать для Марка другом и наставником. Очень ценим доброту, терпение и искреннюю любовь к детям. Хотелось бы, чтобы няня помогала развивать любознательность, играла в развивающие игры, читала книги и проводила время на свежем воздухе.
                    </p>

                    <p className={styles['response-feedback__text']}>
                        Мы готовы создать комфортные условия для работы, всегда открыты к диалогу и учитываем пожелания няни. У нас спокойная семья без конфликтов, верим, что уважение и понимание — основа хороших отношений.
                    </p>

                    <p className={styles['response-feedback__text']}>
                        Будем рады сотрудничеству с профессионалом, который полюбит нашего сына и сможет поддержать его в процессе взросления.»
                    </p>
                </div>
            }

            {
                isRes && verified &&<button onClick={() => {
                    modalState.setRegister(true, '')
                }} className={styles['response-feedback__bottom-btn']}>
                    Откликнуться
                </button>
            }

            {
                (isDetail && verified) &&
                <div className={styles['response-feedback__detail']}>
                    <span className={styles['response-feedback__bottom-title']}>Напишите дополнительную информацию</span>

                    <textarea className={styles['response-feedback__textarea']} name="message" id="message" placeholder='Напишите сопроводительное письмо, рассказ' />
                </div>
            }

            {
                IsRes && verified && <>
                    <div className='flex gap-[12px] mt-[16px] max-[768px]:flex-col min-[768px]:max-w-[100px]'>
                        <Button text='Откликнуться' style={{
                            minHeight: '48px',
                            fontSize: '18px',
                            height: 'fit-content',
                            marginTop: '0px',
                            width: '100%',
                        }} type='button' variation='second' heart={false}/> 
                        <Button text='Отклик без письма' style={{
                            minHeight: '48px',
                            fontSize: '18px',
                            height: 'fit-content',
                            width: '100%',
                            marginTop: '0px'
                        }} type='button' variation='four'/>                    
                    </div>
                </>
            }


            <div className={styles['response-feedback__detail-buttons']}>
                {
                    (isEdit || isDetail && verified) && !IsRes &&<button onClick={() => {
                        modalState.setRegister(true, '')
                    }}
                    style={{
                        marginTop: isDetail ? '0px' : '12px',
                    }}
                    className={styles['response-feedback__bottom-btn_edit']}>
                        Редактировать вакансию
                    </button>
                }

                {
                    (isDetail && !IsRes && verified) &&
                    <button onClick={() => {
                        // modalState.setRegister(true, '')
                    }} className={styles['response-feedback__bottom-btn_save']}>
                        Сохранить
                    </button>
                }
            </div>

            {   
                !verified &&  <span className='text-[red] font-[onest] text-[14px] leading-[26px]'>Ваш аккаунт пока не подтвержден, отклик пока не возможен. Для подтверждения необходимо до 3-х рабочих часов</span>
            }
        </div>

    </div>
  )
}

export default ResponseFeedback
