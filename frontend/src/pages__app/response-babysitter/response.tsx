'use client'

import styles from './response.module.scss'
import Button from '@/shared/compontents/Button'
import AudioPlayer from '@/widgets/AudioPlayer/AudioPlayer'
import { useEffect, useState } from 'react'
import Calendar from '@/widgets/Calendar/Calendar'
import { useHeader } from '@/entities/stores/useHeader'
import HeaderMenu from '@/widgets/HeaderMenu/HeaderMenu'
import { useEditBabysitterStage } from '@/entities/stores/useEditBabysitterStage'
import ProfileEditSevenStage from '../profile-baby-edit/stages/profile-edit-7'
import ProfileEditThreeStage from '../profile-baby-edit/stages/profile-edit-3'
import ProfileEditTwoStage from '../profile-baby-edit/stages/profile-edit-2'
import ProfileEditOneStage from '../profile-baby-edit/stages/profile-edit-1'
import ProfileEditFourStage from '../profile-baby-edit/stages/profile-edit-4'
import FinalStage from '@/widgets/FinalStage/FinalStage'
import ProfileEditFiveStage from '../profile-baby-edit/stages/profile-edit-5'
import ProfileEditSixStage from '../profile-baby-edit/stages/profile-edit-6'
import ProfileEditNineStage from '../profile-baby-edit/stages/profile-edit-9'
import ProfileEditEightStage from '../profile-baby-edit/stages/profile-edit-8'
import ProfileEditTenStage from '../profile-baby-edit/stages/profile-edit-10'
import ProfileEditElevenStage from '../profile-baby-edit/stages/profile-edit-11'
import Popup from '@/widgets/Popup/Popup'
import { useMobileState } from '@/entities/stores/useMobileModal'
import FileUploadBox from '@/shared/compontents/FileUploadBox'
import VideoPlayer from '@/widgets/VideoPlayer/VideoPlayer'
import MobileModal from '@/widgets/MobileModal/MobileModal'
import { useAuth } from '@/entities/stores/useAuth'

import { debounce } from "lodash";
import DOMPurify from 'dompurify';
import { advantages } from '@/entities/consts/advantages'
import { useAnketsBabysitter } from '@/entities/stores/useAnketsBabysitter'
import { editData, getImage, getNannyProfile } from '@/shared/api/nannyApi'

const ResponsePage = () => {
  const [selectedTab, setSelectedTab] = useState('about');
  const [image, setImage] = useState('');

  const headerState = useHeader();

  const [isEdit, setEdit] = useState(false);

  const stage = useEditBabysitterStage();

  const { setData, isVisible, pathAvatar, pathAudio, pay, setVisible } = useAnketsBabysitter();

  const { user } = useAuth();

  const mobileState = useMobileState();

  useEffect(() => {
    headerState.setTransparent(false);
    mobileState.setOpen(true, '')

    const getData = async() => {
      await getNannyProfile().then((data) => {
        setData(data)
      });
    }

    getData();
  }, [])

  console.log(pay)

  useEffect(() => {
    if (pathAvatar !== undefined && pathAvatar !== null && pathAvatar !== '') {
      const getData = async() => {
        await getImage(pathAvatar.replace('audios/', '')).then((data) => {
          setImage(data)
        })
      }
  
      getData();
    }
  }, [pathAvatar])

  console.log(pathAvatar)
  console.log(image)

  const setVisibleProfile = debounce(async() => {
      setVisible(!isVisible)

      try {
        await editData(user.id, {
          nanny: {
              isVisible: !isVisible,
          }
        }) as any;
        
      } catch (error) {
          console.error('Ошибка при запросе кода:', error);
      }
      
  }, 300)

  useEffect(() => {
    headerState.setTransparent(false);
  }, [headerState.isOpenMenu])

  const sanitizedJobs = DOMPurify.sanitize(user?.nannyProfile?.jobs || '');
  const sanitizedEducation = DOMPurify.sanitize(user?.nannyProfile?.education || '');
  const sanitizedAbout = DOMPurify.sanitize(user?.nannyProfile?.about || '');

  console.log(pathAvatar)

  return (
    <>
      <HeaderMenu  />

            <div className='min-[1240px]:hidden'>
              <MobileModal
                btn={false}
                title={false}
                onClose={() => mobileState.setOpen(true,'success')}
                isOpen={mobileState.type === 'example' && mobileState.isOpen}
                setOpen={mobileState.setOpen}
              >
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
              </MobileModal>
            </div>

              <Popup  top={false} isOpen={false} isNotBtn cross={true} setOpen={mobileState.setOpen}  title={false}>
                <div className='flex gap-[31px] justify-between max-[768px]:flex-col max-[768px]:mt-[16px]'>
                    <div>
                    <h2 className='font-[onest]  flex-col flex text-[28px] leading-[34px] font-semibold  max-[768px]:text-[18px] mb-[16px] '>Подтвердите вашу личность</h2>
                        <span className='text-[#7C8092] block text-[16px] leading-[22px] font-normal'>
                            Паспорт (главная страница и регистрация)
                        </span>
                        <span className='text-[#7C8092] block text-[16px] leading-[22px] font-normal mt-[16px]'>
                            Мед.книжка
                        </span>
                        <span className='text-[#7C8092] block text-[16px] leading-[22px] font-normal mt-[16px]'>
                            Документ о несудимости
                        </span>

                        <button onClick={() => mobileState.setOpen(true, 'accepted')} className={'font-[onest] mt-[50px] w-fit text-[14px] leading-[18px] font-medium py-[6px] px-[12px] text-[#431DED] bg-[#E8E5F9] rounded-[8px]'}>
                            Подтвердить
                        </button>
                    </div>

                    <div className='w-full min-[768px]:max-w-[518px] mr-[30px]'>
                    <FileUploadBox className='min-h-[69px]' description='JPEG, PNG'  text={<>
                        Перетяните или <span className="text-[#431DED]">загрузите</span> файлы

                        </>}/>

                        <ul className='w-full flex flex-col min-[768px]:mt-[25px]'>
                        <li className='relative rounded-[4px] px-[8px] py-[8px] w-full h-[36px] flex items-center justify-between border-[#E3E3E3] border-[0.5px]'>
                            <span className='font-[onest] text-[12px] leading-[18px] font-normal rounded-[4px]  '>
                            your-file-here.PDF
                            </span>

                            <button className=''>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 16C5.87833 16 3.84331 15.1571 2.34315 13.6568C0.842901 12.1565 0 10.1217 0 8C0 5.87833 0.842901 3.84332 2.34315 2.34315C3.84353 0.842902 5.87833 0 8 0C10.1217 0 12.1567 0.842902 13.6568 2.34315C15.1571 3.84353 16 5.87833 16 8C15.9974 10.121 15.1538 12.1545 13.654 13.654C12.1543 15.1538 10.1207 15.9974 8 16ZM11.0851 5.94242V5.9423C11.2254 5.80678 11.3053 5.62063 11.3071 5.42558C11.3088 5.23053 11.2321 5.04292 11.0941 4.90496C10.9562 4.76701 10.7685 4.69031 10.5735 4.69202C10.3784 4.69372 10.1923 4.77371 10.0568 4.91397L8 6.97149L5.94323 4.91397C5.75853 4.7356 5.49346 4.66779 5.2457 4.73572C4.99805 4.80366 4.8046 4.99713 4.73665 5.24477C4.66871 5.49254 4.73653 5.7576 4.9149 5.9423L6.97167 7.99983L4.9149 10.0573C4.77464 10.1929 4.69465 10.379 4.69294 10.5741C4.69124 10.7691 4.76794 10.9567 4.90589 11.0947C5.04383 11.2326 5.23145 11.3093 5.4265 11.3076C5.62155 11.3059 5.8077 11.2259 5.94322 11.0857L7.99999 9.02815L10.0568 11.0857C10.1923 11.2259 10.3784 11.3059 10.5735 11.3076C10.7685 11.3093 10.9561 11.2326 11.0941 11.0947C11.2321 10.9567 11.3088 10.7691 11.307 10.5741C11.3053 10.379 11.2253 10.1929 11.0851 10.0573L9.02832 7.99983L11.0851 5.94242Z" fill="#D9D9D9"/>
                            </svg>
                            </button>

                            <div className='absolute bottom-0 w-[40%] h-[3px] rounded-[10px] bg-[#7733F4] left-0' />
                        </li>
                        </ul>

                        <h2 className='mt-[20px] font-[onest] leading-[100%] font-medium text-[14px] text-[#7C8092]'>
                        Загружено
                        </h2>

                        <ul className='w-full flex flex-col min-[768px]:mt-[12px]'>
                        <li className='relative rounded-[4px] px-[8px] py-[8px] w-full h-[36px] flex items-center justify-between border-[#0A8554] border-[0.5px]'>
                            <span className='font-[onest] text-[#7C8092] text-[12px] leading-[18px] font-normal rounded-[4px]  '>
                            document-name.PDF
                            </span>

                            <button className=''>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="8" cy="8" r="8" fill="#FEEDED"/>
                                <path d="M11.4769 5.14517H10.4774C10.464 5.14054 10.4501 5.13753 10.436 5.13614H9.37174V4.25348C9.3718 4.18714 9.3458 4.12346 9.29945 4.07608C9.25304 4.02871 9.18995 4.00138 9.12369 4H6.60672C6.53948 4 6.47501 4.02667 6.42752 4.07422C6.37997 4.12177 6.35324 4.18624 6.35324 4.25348V5.13614H5.29439C5.2803 5.13753 5.2664 5.14054 5.25303 5.14517H4.25347C4.16288 5.14517 4.07921 5.19345 4.03395 5.27188C3.98868 5.35031 3.98868 5.44691 4.03395 5.52535C4.07921 5.60378 4.16288 5.65211 4.25347 5.65211H5.06783L5.72585 11.7735C5.7329 11.8358 5.76263 11.8933 5.8094 11.9351C5.85611 11.9769 5.91661 11.9999 5.97932 12H9.75462C9.81668 11.9991 9.87627 11.9756 9.92233 11.9339C9.96831 11.8922 9.99751 11.8352 10.0045 11.7735L10.6625 5.66105H11.4769C11.5675 5.66105 11.6511 5.61277 11.6964 5.53434C11.7417 5.45591 11.7417 5.35924 11.6964 5.28087C11.6511 5.20244 11.5675 5.1541 11.4769 5.1541L11.4769 5.14517ZM6.86566 4.50695H8.86472V5.13614H6.86566V4.50695ZM9.52455 11.4894H6.20582L5.57663 5.66111H10.1537L9.52455 11.4894Z" fill="#E10007"/>
                                <path d="M7.86675 10.8957C7.93399 10.8957 7.99845 10.869 8.04601 10.8215C8.09356 10.7739 8.12023 10.7095 8.12023 10.6422V6.50742C8.12023 6.41683 8.07195 6.33316 7.99352 6.2879C7.91509 6.24257 7.81842 6.24257 7.73999 6.2879C7.66156 6.33317 7.61328 6.41683 7.61328 6.50742V10.6422C7.61328 10.7095 7.63995 10.7739 7.6875 10.8215C7.73505 10.869 7.79952 10.8957 7.86676 10.8957H7.86675Z" fill="#E10007"/>
                                <path d="M6.8713 10.8944H6.88208C6.94901 10.8917 7.0121 10.8625 7.05761 10.8133C7.10305 10.7641 7.12725 10.6989 7.12478 10.632L6.97195 6.49719L6.97201 6.49713C6.97063 6.42941 6.94167 6.36512 6.89178 6.31926C6.84182 6.27345 6.77536 6.25004 6.70771 6.25443C6.64077 6.25726 6.57769 6.28645 6.53224 6.33563C6.48674 6.38481 6.4626 6.45 6.46501 6.51694L6.61784 10.6517C6.62103 10.7169 6.64908 10.7784 6.69627 10.8236C6.7434 10.8687 6.80606 10.8941 6.8713 10.8944L6.8713 10.8944Z" fill="#E10007"/>
                                <path d="M8.85421 10.8931H8.86318C8.92999 10.8946 8.9947 10.8698 9.04345 10.8241C9.09215 10.7784 9.12104 10.7154 9.12387 10.6486L9.2767 6.51379H9.27664C9.27911 6.44686 9.25491 6.38167 9.20946 6.33249C9.16396 6.28331 9.10088 6.25412 9.03394 6.25129C8.9655 6.24424 8.89724 6.26633 8.84589 6.3122C8.79455 6.35801 8.76493 6.42338 8.76427 6.49224L8.60964 10.627H8.6097C8.60627 10.6949 8.63022 10.7613 8.67621 10.8113C8.72214 10.8613 8.7863 10.8908 8.85421 10.8931L8.85421 10.8931Z" fill="#E10007"/>
                            </svg>
                            </button>
                        </li>

                        <li className='relative mt-[12px] rounded-[4px] px-[8px] py-[8px] w-full h-[36px] flex items-center justify-between border-[#0A8554] border-[0.5px]'>
                            <span className='font-[onest] text-[#7C8092] text-[12px] leading-[18px] font-normal rounded-[4px]  '>
                            image-name-goes-here.png
                            </span>

                            <button className=''>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="8" cy="8" r="8" fill="#FEEDED"/>
                                <path d="M11.4769 5.14517H10.4774C10.464 5.14054 10.4501 5.13753 10.436 5.13614H9.37174V4.25348C9.3718 4.18714 9.3458 4.12346 9.29945 4.07608C9.25304 4.02871 9.18995 4.00138 9.12369 4H6.60672C6.53948 4 6.47501 4.02667 6.42752 4.07422C6.37997 4.12177 6.35324 4.18624 6.35324 4.25348V5.13614H5.29439C5.2803 5.13753 5.2664 5.14054 5.25303 5.14517H4.25347C4.16288 5.14517 4.07921 5.19345 4.03395 5.27188C3.98868 5.35031 3.98868 5.44691 4.03395 5.52535C4.07921 5.60378 4.16288 5.65211 4.25347 5.65211H5.06783L5.72585 11.7735C5.7329 11.8358 5.76263 11.8933 5.8094 11.9351C5.85611 11.9769 5.91661 11.9999 5.97932 12H9.75462C9.81668 11.9991 9.87627 11.9756 9.92233 11.9339C9.96831 11.8922 9.99751 11.8352 10.0045 11.7735L10.6625 5.66105H11.4769C11.5675 5.66105 11.6511 5.61277 11.6964 5.53434C11.7417 5.45591 11.7417 5.35924 11.6964 5.28087C11.6511 5.20244 11.5675 5.1541 11.4769 5.1541L11.4769 5.14517ZM6.86566 4.50695H8.86472V5.13614H6.86566V4.50695ZM9.52455 11.4894H6.20582L5.57663 5.66111H10.1537L9.52455 11.4894Z" fill="#E10007"/>
                                <path d="M7.86675 10.8957C7.93399 10.8957 7.99845 10.869 8.04601 10.8215C8.09356 10.7739 8.12023 10.7095 8.12023 10.6422V6.50742C8.12023 6.41683 8.07195 6.33316 7.99352 6.2879C7.91509 6.24257 7.81842 6.24257 7.73999 6.2879C7.66156 6.33317 7.61328 6.41683 7.61328 6.50742V10.6422C7.61328 10.7095 7.63995 10.7739 7.6875 10.8215C7.73505 10.869 7.79952 10.8957 7.86676 10.8957H7.86675Z" fill="#E10007"/>
                                <path d="M6.8713 10.8944H6.88208C6.94901 10.8917 7.0121 10.8625 7.05761 10.8133C7.10305 10.7641 7.12725 10.6989 7.12478 10.632L6.97195 6.49719L6.97201 6.49713C6.97063 6.42941 6.94167 6.36512 6.89178 6.31926C6.84182 6.27345 6.77536 6.25004 6.70771 6.25443C6.64077 6.25726 6.57769 6.28645 6.53224 6.33563C6.48674 6.38481 6.4626 6.45 6.46501 6.51694L6.61784 10.6517C6.62103 10.7169 6.64908 10.7784 6.69627 10.8236C6.7434 10.8687 6.80606 10.8941 6.8713 10.8944L6.8713 10.8944Z" fill="#E10007"/>
                                <path d="M8.85421 10.8931H8.86318C8.92999 10.8946 8.9947 10.8698 9.04345 10.8241C9.09215 10.7784 9.12104 10.7154 9.12387 10.6486L9.2767 6.51379H9.27664C9.27911 6.44686 9.25491 6.38167 9.20946 6.33249C9.16396 6.28331 9.10088 6.25412 9.03394 6.25129C8.9655 6.24424 8.89724 6.26633 8.84589 6.3122C8.79455 6.35801 8.76493 6.42338 8.76427 6.49224L8.60964 10.627H8.6097C8.60627 10.6949 8.63022 10.7613 8.67621 10.8113C8.72214 10.8613 8.7863 10.8908 8.85421 10.8931L8.85421 10.8931Z" fill="#E10007"/>
                            </svg>
                            </button>
                        </li>
                        </ul>
                    </div>
                </div>
            </Popup>

            <Popup  onClose={() => mobileState.setOpen(true, 'confirmation')}  isOpen={mobileState.type === 'accepted' && mobileState.isOpen} isNotBtn cross={true} setOpen={mobileState.setOpen}   title="Ваши данные приняты">
                <div className='flex gap-[32px]'>
                    <div className='flex flex-col'>
                        <p className='w-[437px] text-[16px] font-[onest] leading-[22px] font-normal'>Нам понадобится около 2-х часов для проверки вашего аккаунта. В это время рекомендуем пройти обучение</p>

                        <span className='mt-[23px] text-[#7C8092] text-[14px] leading-[18px]  block font-normal max-w-[437px]'>Обучающий видеоурок поможет вам быстрее находить общий язык с детьми и их родителями. Это обязательный этап перед началом работы.</span>

                        <button onClick={() => mobileState.setOpen(false,'')} className={'font-[onest] w-fit mt-auto text-[14px] leading-[18px] font-medium py-[6px] px-[12px] text-[#431DED] bg-[#E8E5F9] rounded-[8px]'}>
                            Урок просмотрен
                        </button>
                    </div>

                    <div className='h-[239px] w-[177px] relative'>
                        <div className='absolute bottom-0 right-[20px] w-full h-[284px]'>
                            <VideoPlayer height=''  videoUrl="/images/video-block/video.mp4" />
                        </div>
                    </div>

                </div>
            </Popup>

            <Popup styleMain={{
              padding: '24px',
              width: '669px',
            }} top={false} title={false} onClose={() => mobileState.setOpen(false, '')}  isOpen={mobileState.isOpen && mobileState.type === 'education'} isNotBtn cross={true} setOpen={mobileState.setOpen}>
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

              <Popup styleMain={{
              padding: '24px',
              width: '669px',
            }} top={false} title={false} onClose={() => mobileState.setOpen(false, '')}  isOpen={mobileState.isOpen && mobileState.type === 'education'} isNotBtn cross={true} setOpen={mobileState.setOpen}>
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
        </Popup>

        <div className='min-[1240px]:hidden'>
          <MobileModal
            btn={false}
            title={false}
            onClose={() => mobileState.setOpen(false,'')}
            isOpen={mobileState.type === 'form_babysitter' && mobileState.isOpen}
            setOpen={mobileState.setOpen}
          >
                  <div className='max-h-[300px] pt-[10px] scroll-none overflow-auto'>
                <div>
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

                  </div>
          </MobileModal>

          <MobileModal
            btn={false}
            title={false}
            onClose={() => mobileState.setOpen(false,'')}
            isOpen={mobileState.type === 'education' && mobileState.isOpen}
            setOpen={mobileState.setOpen}
          >
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
          </MobileModal>

          <MobileModal
            btn={false}
            title={false}
            onClose={() => mobileState.setOpen(false,'')}
            isOpen={mobileState.type === 'jobs' && mobileState.isOpen}
            setOpen={mobileState.setOpen}
          >
          <div className='flex flex-col gap-[32px] h-[300px] max-[768px]:gap-[16px] '>
            <div className='max-h-[100px] h-fit oveflow-scroll'>
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
          </MobileModal>
        </div>


          <Popup styleMain={{
            padding: '24px',
            width: '669px',
          }} top={false} title={false} onClose={() => mobileState.setOpen(false, '')}  isOpen={mobileState.isOpen && mobileState.type === 'form_babysitter'} isNotBtn cross={true} setOpen={mobileState.setOpen}>
              <div className='max-h-[300px] pt-[10px] scroll-none overflow-auto'>
            <div>
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

              </div>
          </Popup>

      <section className={styles['response']}>
        <div className={styles['response__container']}>
          {
              (user?.nannyProfile === null || user?.nannyProfile === undefined)  &&
                  <div className={'min-h-[512px] bg-[white] w-full rounded-[16px] flex flex-col justify-center items-center'}>
                      <span className={'font-[onest] font-semibold text-[18px] max-[768px]:px-[16px] min-[768px]:text-[28px] text-center'}>
                          Загрузка...
                      </span>
                  </div>
          } 

          {
              (user?.nannyProfile !== null && user?.nannyProfile !== undefined)  &&
              <>
                <div className={styles['response__top']}>
                  <div className={styles['response__person-item']}>
                    <div className={styles['response__person']}>
                        <div className={styles['response__avatar']}>
                            <img className={styles['response__avatar-image']} src={pathAvatar !== undefined && pathAvatar !== '' ? pathAvatar : '/images/card-babysit/image.jpg'} 
                            alt="heart" width={100} height={100} />

                            <span onClick={() => {
                              setEdit(true)
                              stage.setStage('eleven')
                            }} className='font-[onest] cursor-pointer text-[12px] font-normal leading-[16px] text-center w-full block text-[#7C8092] mt-[8px]'>Изменить фото</span>
                        </div>

                        <div className={styles['response__person-bottom']}>
                            <div className={styles['response__person-info']}>
                                <div className={styles['response__person-info-left']}>
                                    <h2 className={styles['response__name']}>{user?.fullName}</h2>

                                    <span onClick={() => {
                                      setEdit(true)
                                      stage.setStage('eleven')
                                    }} className='cursor-pointer font-[onest] text-[12px] font-normal leading-[20px] text-center w-full block text-[#7C8092] mt-[4px]'>
                                        Изменить видеовизитку
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
                                    Возраст: <b>{user?.age} лет</b>
                                </div>

                                <div className={styles['response__person-label']}>
                                    Опыт работы: <b>{user?.nannyProfile?.experience} года</b>
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
                      <b>{pay[0]}</b> ₽/мес
                    </span>

                    <Button onClick={() => {
                      stage.setStage('six')
                      setEdit(true)
                    }} type='button' text='Изменить' heart={false} variation='five' />
                  </div>

                  <div className={styles['response__video-item']}>
                      <video
                          src={'https://rccsowmhkwlvmka0.public.blob.vercel-storage.com/video.mp4'}
                          loop
                          playsInline                 
                      ></video>

                      {/* <Image alt='' src={'/images/card-babysit/image.jpg'} height={100} width={100} className='object-cover rounded-[16px] w-[214px] ' /> */}

                      <div className={styles['response__video-item-right']}>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.1666 5.83341L13.3333 10.0001L19.1666 14.1667V5.83341Z" stroke="#181D27" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M11.6666 4.16675H2.49992C1.57944 4.16675 0.833252 4.91294 0.833252 5.83341V14.1667C0.833252 15.0872 1.57944 15.8334 2.49992 15.8334H11.6666C12.5871 15.8334 13.3333 15.0872 13.3333 14.1667V5.83341C13.3333 4.91294 12.5871 4.16675 11.6666 4.16675Z" stroke="#181D27" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>


                          <a
                          className={styles['response__video-item-title']}
                            href="https://rccsowmhkwlvmka0.public.blob.vercel-storage.com/video.mp4"
                            
                          >
                            Посмотреть обучающее видео
                          </a>
                      </div>
                  </div>

                  <div className={styles['response__audio-item']}>
                    <AudioPlayer onClick={() => {
                      setEdit(true)
                      stage.setStage('eleven')
                    }} src={pathAudio} isEdit />
                  </div>

                  <div className={styles['response__contract-item']}>
                      <h2 className={styles['response__contract-title']}>Договор</h2>

                      <div className={styles['response__contract-bottom']}>
                          <a href="/Договор.pdf" target='_blank' className={styles['response__contract-link']}>Скачать договор на услуги</a>

                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.4405 8.90002C20.0405 9.21002 21.5105 11.06 21.5105 15.11V15.24C21.5105 19.71 19.7205 21.5 15.2505 21.5H8.74047C4.27047 21.5 2.48047 19.71 2.48047 15.24V15.11C2.48047 11.09 3.93047 9.24002 7.47047 8.91002" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 2V14.88" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M15.3504 12.65L12.0004 16L8.65039 12.65" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                      </div>
                  </div>

                  {
                      user.nannyProfile.rating &&
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
                  }


                  <div className={styles['response__panel-item']}>
                    <button onClick={() => setEdit(prev => !prev)} className={styles['response__panel-item-btn']}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_918_36194)">
                          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#181D27" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="#181D27" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </g>
                          <defs>
                          <clipPath id="clip0_918_36194">
                          <rect width="24" height="24" fill="white"/>
                          </clipPath>
                          </defs>
                        </svg>

                        Редактирование профиля
                    </button>

                    <hr className='border-[#D4D4DD] block mr-[16px] ml-[52px]' />
                    
                    <button onClick={async() => setVisibleProfile()} className={styles['response__panel-item-btn']}>
                      {
                        !isVisible ? <>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M18 8L23 13M23 8L18 13M12.5 7C12.5 9.20914 10.7091 11 8.5 11C6.29086 11 4.5 9.20914 4.5 7C4.5 4.79086 6.29086 3 8.5 3C10.7091 3 12.5 4.79086 12.5 7Z" stroke="#181D27" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
          
                          Приостановить показ в базе моего профиля              
                        </> 
                        :
                        <>
                          <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 19V17C16 15.9391 15.5786 14.9217 14.8284 14.1716C14.0783 13.4214 13.0609 13 12 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19M17 9L19 11L23 7M12.5 5C12.5 7.20914 10.7091 9 8.5 9C6.29086 9 4.5 7.20914 4.5 5C4.5 2.79086 6.29086 1 8.5 1C10.7091 1 12.5 2.79086 12.5 5Z" stroke="#181D27" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>

                          Возобновить показ моего профиля в базе нянь
                        </>
                      }
                      
                    </button>
                  </div>
                </div>

                <div className={styles['response__content']}>
                  {
                    !isEdit && <ul className={styles['response__content-top']}>
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
                  }
      
                  {
                    !isEdit && <>
                      {
                        selectedTab === 'about' &&
                        <div className={styles['response__content-inner']}>
                            <div dangerouslySetInnerHTML={{ __html: sanitizedAbout }} />
                        </div>
                      }

                      {
                        selectedTab === 'education' &&
                        <div className={styles['response__content-inner']}>
                          <div dangerouslySetInnerHTML={{ __html: sanitizedEducation }} />
                        </div>
                      }

                      {
                        selectedTab === 'chart' &&             <div className={styles['response__content-inner']}>
                            <Calendar  isEdit={false} items={user?.nannyProfile?.charts} />
                        </div>
                      }

                      {
                        selectedTab === 'reviews' && <div className={styles['response__content-inner']}>
                          <div className='flex flex-col gap-[16px]'>
                            {
                                user.nannyProfile.request && user.userProfile.request !== null && user.nannyProfile.request.map((item: any) => {
                                  return <>
                                    <div className='rounded-[16px] py-[16px] pl-[24px] pr-[16px] border-[1px] border-[#D9D9D9]'>
                                      <div className='flex justify-between w-full'>
                                        <span className='font-[onest] text-[20px] leading-[28px] font-medium'>{item.parent}</span>

                                        <span className='font-[onest] text-[16px] leading-[22px] font-normal text-[#626776]'>{new Date(item.createdAt).toLocaleDateString()}</span>
                                      </div>

                                      <p className='font-[onest] text-[16px] leading-[22px] font-normal block mt-[12px]'>«{item.message}»</p>
                                    </div>
                                  </>
                                }) 
                            }
                            {
                              (user?.nannyProfile?.request === null || user?.userProfile?.request === undefined || user?.nannyProfile?.request.lenght === 0 )&& 
                              <p className='font-[onest] text-[16px] leading-[22px] font-normal block mt-[12px]'>Нет отзывов</p>
                            }
                          </div>
                        </div>
                      }

                      {
                        selectedTab === 'experience' &&    <div className={styles['response__content-inner']}>
                            <div className='flex flex-col gap-[32px] max-[768px]:gap-[16px]'>
                              <div dangerouslySetInnerHTML={{ __html: sanitizedJobs }} />
                            </div>
                          </div>
                      }

                      {
                        selectedTab === 'advantages' &&    <div className={styles['response__content-inner']}>
                            <ul className='flex flex-wrap gap-[12px]'>
                              {
                                selectedTab === 'advantages' &&    <div className={styles['response__content-inner']}>
                                    <ul className='flex flex-wrap gap-[12px]'>
                                      {advantages.map(({ id, label }) => {
                                          console.log()
                                          const isActive = user?.nannyProfile?.advantages[id];

                                          if (!isActive) return null;
                      
                                          return (
                                              <li
                                                  key={id}
                                                  className={`w-fit border-[1px] rounded-[24px] font-[onest] text-[14px] leading-[18px] px-[16px] py-[7px] transition-colors
                                                  `}
                                              >
                                                  {label}
                                              </li>
                                          );
                                      })}
                                    </ul>
                                  </div>
                              }
                            </ul>
                          </div>
                      }
                  
                    </>
                  }

                  {
                    isEdit && <>
                    
                      <h1 className={styles['profile-edit__title']}>
                          Редактирование профиля
                      </h1>

                      <div className={styles['profile-edit__inner']}>
                          {
                              stage.stage === 'first' && <ProfileEditOneStage />
                          }
                          {
                              stage.stage === 'second' && <ProfileEditTwoStage />
                          } 
                          {
                              stage.stage === 'three' && <ProfileEditThreeStage />
                          }
                          {
                              stage.stage === 'four' && <ProfileEditFourStage />
                          }
                          {
                              stage.stage === 'five' && <ProfileEditFiveStage />
                          }
                          {
                              stage.stage === 'six' && <ProfileEditSixStage />
                          }
                          {
                              stage.stage === 'seven' && <ProfileEditSevenStage />
                          }  
                          {
                              stage.stage === 'eight' && <ProfileEditEightStage />
                          }  
                          {
                              stage.stage === 'nine' && <ProfileEditNineStage />
                          }  
                          {
                              stage.stage === 'ten' && <ProfileEditTenStage />
                          }  
                          {
                              stage.stage === 'eleven' && <ProfileEditElevenStage />
                          }
                          {
                              stage.stage === 'final' && <FinalStage />
                          }
                      </div>
                    </>
                  }
                  
                </div>
              </>
          }
        </div>
      </section>
    </>
  )
}

export default ResponsePage
