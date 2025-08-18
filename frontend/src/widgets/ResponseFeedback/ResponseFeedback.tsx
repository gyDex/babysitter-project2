import Image from 'next/image'
import styles from './ResponseFeedback.module.scss'
import { useMobileState } from '@/entities/stores/useMobileModal'
import Button from '@/shared/compontents/Button'
import { occupation_data } from '@/entities/consts/occupation'
import { getDate } from './../../features/getDate'
import { useParams, useRouter } from 'next/navigation'
import { useAnketsParent } from '@/entities/stores/useAnketsParent'
import { updateAddInfo } from '@/shared/api/parentApi'
import { useAuth } from '@/entities/stores/useAuth'
import { useAnketsBabysitter } from '@/entities/stores/useAnketsBabysitter'
import { respond } from '@/shared/api/nannyApi'
import React from 'react'

type Props = {
    name?: string,
    person?: string,
    quote?: any,
    city?: string,
    tasks?: any,
    isRes?: boolean,
    isEdit?: boolean,
    isDetail?: boolean,
    IsRes?: boolean,
    verified?: boolean,
    childrens?: [],
    occupation: boolean[],
    charts?: boolean[],
    isViewName?: boolean;
    date?: string,

    link?: string | boolean,
    linkEdit?: string | boolean,
    callbackEdit?: () => void;

    callbackRequest?: () => void;

    isMessage?: boolean,    
    isDetailParent?: boolean,    
}

const ResponseFeedback:React.FC<Props> = ({isDetailParent,isViewName, callbackRequest ,city, link, callbackEdit, date, isMessage, childrens,occupation, charts, IsRes=false, verified = true, isEdit = false,isDetail = false, isRes = true ,person, quote, tasks, name}) => {
    const modalState = useMobileState();

    const router = useRouter();

    const { addInfo, setAddInfo } = useAnketsParent();

    const { message, setMessage } = useAnketsBabysitter();

    const { id } = useParams();

    const { user }  = useAuth();

    console.log(user)

  return (
    <div onClick={() => {
        if (link && user?.roles[0] === 'PARENT') {
            router.push(`/profile-parent/vacancy/${link}`)
        }
        // if (link && user.roles[0] === 'NANNY') {
        //     router.push(`/profile-babysitter/vacancy-detail/${link}`)
        // }
    }}
    style={{
        cursor: link ? 'pointer' : 'default'
    }}
    className={styles['response-feedback']}>
        <div className={styles['response-feedback__top-info-mobile']}>
            <div className={styles['response-feedback__top-label-left']}>
                <div className={styles['response-feedback__top-info-label_city']}>
                    📍 {city}
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
            {
                isViewName &&
                <div className={styles['response-feedback__avatar']}>
                    <Image className={styles['response-feedback__avatar-image']} src={'/images/babysit-benefits/avatar.png'} 
                    alt="heart" width={64} height={64} quality={100} />
                </div>
            }

            <div className={styles['response-feedback__top-bottom']}>
                <div className={styles['response-feedback__top-info']}>
                    <div className={styles['response-feedback__top-info-left']}>
                        {
                            !isViewName && <h2 className={styles['response-feedback__name']}>Вакансия от {date}</h2>
                        }
                        {
                            isViewName && <>
                                <h2 className={styles['response-feedback__name']}>{name}</h2>

                                <address className={styles['response-feedback__address']}>
                                    {person}
                                </address>
                            </>
                        }
                    </div>

                    <div className={styles['response-feedback__top-info-right']}>
                        <div className={styles['response-feedback__top-info-labels']}>
                            <div className={styles['response-feedback__top-info-label_city']}>
                                📍 {city}
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
        <div className={styles['response-feedback__top-labels']}>{
                (childrens !== undefined && childrens !== null) && 
                    childrens.map((item: any, index: number) => <React.Fragment key={index}>
                        <div key={index} className={styles['response-feedback__top-label']}>
                            <b>{item.gender === 'male' ? 'Мальчик' : 'Девочка'}, {item.age} года</b>
                        </div>
                    </React.Fragment>) 
            }

            <div className={styles['response-feedback__top-label']}>
                {getDate(charts as any)}
            </div>
        </div>

        <p className={styles['response-feedback__subtitle']}>
            <b>Чем заниматься:</b>
        </p>

        <div className={styles['response-feedback__labels']}>
            {
                (occupation !== undefined && occupation !== null) && 
                occupation.map((item: any, index) => <React.Fragment key={item.id}>
                    {
                        item === true &&
                        <div className={styles['response-feedback__label']}>
                            {occupation_data[index].name}
                        </div>
                    }
                </React.Fragment>) 
            }
        </div>
        
        <div className={styles['response-feedback__bottom']}>
            <div className='flex justify-between w-full'>
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
                    isRes && verified && <button onClick={async(e) => {
                        e.preventDefault();

                        if (callbackRequest === undefined || callbackRequest === null) {
                            if (link && user.roles[0] === 'NANNY') {
                                router.push(`/profile-babysitter/vacancy-detail/${link}`)
                            }
                        }

                        if (callbackRequest) {
                            callbackRequest();
                        }
                        // await respond(id as string, message);
                    }} className={styles['response-feedback__bottom-btn']}>
                        Откликнуться
                    </button>
                }
            </div>

            {
                (isDetailParent) && 
                <div>
                    <p className={styles['response-feedback__subtitle']}>
                        <b>Дополнительно от мамы:</b>
                    </p>

                    <p className={styles['response-feedback__text']}>
                        {
                            addInfo
                        }
                    </p>
                </div>
            }



            {
                (isDetail && verified) &&
                <div className={styles['response-feedback__detail']}>
                    <span  className={styles['response-feedback__bottom-title']}>Напишите дополнительную информацию</span>

                    <textarea value={addInfo} onChange={(e) => setAddInfo(e.currentTarget.value)} className={styles['response-feedback__textarea']} name="message" id="message" placeholder='Напишите дополнительную информацию' />
                </div>
            }

            
            {
                (isMessage && verified) &&
                <div className={styles['response-feedback__detail']}>
                    <span  className={styles['response-feedback__bottom-title']}>Напишите сопроводительное письмо</span>

                    <textarea value={message} onChange={(e) => setMessage(e.currentTarget.value)} className={styles['response-feedback__textarea']} name="message" id="message" placeholder='Напишите сопроводительное письмо, рассказ' />
                </div>
            }

            {
                IsRes && verified && <>
                    <div className='flex gap-[12px] mt-[16px] max-[768px]:flex-col min-[768px]:max-w-[100px]'>
                        <Button onClick={async() => {
                            await respond(user.nannyProfile.id, id as string, message);
                            router.push(`/profile-babysitter/vacancy`)
                        }}  text='Откликнуться' style={{
                            minHeight: '48px',
                            fontSize: '18px',
                            height: 'fit-content',
                            marginTop: '0px',
                            width: '100%',
                        }} type='button' variation='second' heart={false}/> 
                        <Button onClick={async() => {
                            await respond(user.nannyProfile.id, id as string, null);
                            router.push(`/profile-babysitter/vacancy`)
                        }}  text='Отклик без письма' style={{
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
                    (isEdit || isDetail) && !IsRes &&<button onClick={() => {
                        modalState.setRegister(true, '')
                        callbackEdit?.();
                    }}
                    style={{
                        marginTop: isDetail ? '0px' : '12px',
                    }}
                    className={styles['response-feedback__bottom-btn_edit']}>
                        Редактировать вакансию
                    </button>
                }

                {
                    (isDetail && !IsRes) &&
                    <button onClick={async() => {
                        await updateAddInfo(id as string, {
                            data: {
                                addInfo: addInfo
                            }
                        })

                        router.replace('/profile-parent/vacancy')
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
