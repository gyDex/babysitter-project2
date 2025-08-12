'use client'

import { RadioGroup } from "@/components/ui/radio-group"
import { useMobileState } from "@/entities/stores/useMobileModal"
import { setRoleCookies } from "@/features/setRoleCookie"
import BeforePay from "@/widgets/BeforePay/BeforePay"
import FAQ from "@/widgets/Faq/Faq"
import HeaderMenu from "@/widgets/HeaderMenu/HeaderMenu"
import MobileModal from "@/widgets/MobileModal/MobileModal"
import Popup from "@/widgets/Popup/Popup"
import RadioItem from "@/widgets/RadioItem/RadioItem"
import Reviews from "@/widgets/Reviews/Reviews"
import {SelectModal} from "@/widgets/SelectModal/SelectModal"
import Solutions from "@/widgets/Solutions/Solutions"
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation"
import BabyHero from "@/widgets/baby_hero/baby_hero"
import BabysittersBenefits from "@/widgets/BabysittersBenefits/BabysittersBenefits"
import Reviews__Baby from "@/widgets/Reviews__Baby/Reviews__Baby"
import PresentationProfile from "@/widgets/PresentationProfile/PresentationProfile"
import GuaranteesBaby from "@/widgets/GuaranteesBaby/GuaranteesBaby"
import { setCityCookies } from "@/features/setCityCookies"
import { babyFAQData } from "@/entities/FAQ/babysitter__page"
import CookieModal from "@/widgets/CookieModal/CookieModal"
import { cities } from "@/entities/cities"


export const BabysitterPage = () => {
    const mobileState = useMobileState();
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [selectCity, setSelectCity] = useState<string>('');

    const [role, setRole] = useState<string | undefined>()
    const [city, setCity] = useState<string | undefined>()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
      setRole(Cookies.get('role'))
      setCity(Cookies.get('city'))
      setLoaded(true)
    }, [])

    const router = useRouter();

    if (!loaded) return null;

    return (
        <>
            <HeaderMenu />

            <CookieModal />

            <div className="min-[1200px]:hidden">
                <MobileModal title={'Выбор роли'} isOpen={
                  (role === undefined && mobileState.isOpen && mobileState.type === 'role') || 
                  (role === undefined && city !== undefined && mobileState.isOpen)
                } next={() => 
                {
                  if (selectedValue !== '') {
                    mobileState.setOpen(false, '')
                    setRoleCookies('role', selectedValue)
                    if (selectedValue === 'baby') {
                        router.push('babysitter')
                    }
                    else {
                        router.push('/')
                    }
                  }

                  
                }} setOpen={mobileState.setOpen}>
                    <RadioGroup>
                        <div className="mt-[16px] flex gap-[12px] flex-col" role="radiogroup" aria-label="Example radio group">
                            <RadioItem
                                id="baby"
                                name="Я няня, ищу работу"
                                value="Я няня, ищу работу"
                                checked={selectedValue === 'baby'}
                                onChange={() => setSelectedValue('baby')}
                            />
                            <RadioItem
                                id="PARENT"
                                name="Я родитель, ищу няню"
                                value="Я родитель, ищу няню"
                                checked={selectedValue === 'PARENT'}
                                onChange={() => setSelectedValue('PARENT')}
                            />
                            </div>
                    </RadioGroup>
                </MobileModal>

                <MobileModal title={'Ваш город'} isOpen={
                  (city === undefined && mobileState.isOpen && mobileState.type === '') ||
                  (city === undefined && role !== undefined && mobileState.isOpen)
                } next={() => 
                {
                  if(selectCity !== '') {
                    mobileState.setOpen(true, 'role')
                    setCityCookies('city', selectCity)
                  }
                }} setOpen={mobileState.setOpen}>
                  <SelectModal callbackChange={setSelectCity} title='Москва и МО' items={[
                      {
                        name: 'Екатеринбург',
                        id: 'city1',
                      },
                      {
                        name: 'Москва',
                        id: 'city2',
                      },
                      {
                        name: 'Санкт-Петербург',
                        id: 'city3',
                      },
                      {
                        name: 'Казань',
                        id: 'city4',
                      },
                      {
                        name: 'Самара',
                        id: 'city5',
                      }
                    ]}          
                    />
                </MobileModal>

                <MobileModal title={'Ваш город'} isOpen={
                  (city === undefined && mobileState.isOpen && mobileState.type === '') ||
                  (city === undefined && role !== undefined && mobileState.isOpen)
                } next={() => 
                {
                  if(selectCity !== '') {
                    mobileState.setOpen(true, 'role')
                    setCityCookies('city', selectCity)
                  }
                }} setOpen={mobileState.setOpen}>
                  <SelectModal callbackChange={setSelectCity} title='Москва и МО' items={cities}    
                    />
                </MobileModal>

                <MobileModal button_title={'Продолжить бесплатно'} title={'Для отклика необходимо пройти небольшую регистрацию '} isOpen={mobileState.isRegister} next={() => {
                  
                  router.push('/auth')}} setOpen={mobileState.setRegister}>
                </MobileModal>
            </div>

            <Popup isOpen={
                  (city === undefined && mobileState.isOpen && mobileState.type === '') ||
                  (city === undefined && role !== undefined && mobileState.isOpen)
                }next={() => 
                {
                  if(selectCity !== '') {
                    mobileState.setOpen(true, 'role')
                    setRoleCookies('city', selectCity)
                  }
                }} setOpen={mobileState.setOpen}  title="Ваш город">
                <SelectModal callbackChange={setSelectCity} className="!mt-[0px]" title='Москва и МО' items={[
                  {
                    name: 'Екатеринбург',
                    id: 'city1',
                  },
                  {
                    name: 'Москва',
                    id: 'city2',
                  },
                  {
                    name: 'Санкт-Петербург',
                    id: 'city3',
                  },
                  {
                    name: 'Казань',
                    id: 'city4',
                  },
                  {
                    name: 'Самара',
                    id: 'city5',
                  }
                ]}          
                />
            </Popup>

            <Popup isOpen={
                  (role === undefined && mobileState.isOpen && mobileState.type === 'role') || 
                  (role === undefined && city !== undefined && mobileState.isOpen)
                }  next={() => {
                  if (selectedValue !== '') {
                    mobileState.setOpen(false, '')
                    setRoleCookies('role', selectedValue);
                    if (selectedValue === 'baby') {
                      router.push('babysitter')
                    }
                    else {
                      router.push('/')
                    }
                  }
                }} setOpen={mobileState.setOpen}  title="Ваша роль">
                <RadioGroup>
                    <div className="flex gap-[12px] flex-col" role="radiogroup" aria-label="Example radio group">
                        <RadioItem
                            id="baby"
                            name="Я няня, ищу работу"
                            value="Я няня, ищу работу"
                            checked={selectedValue === 'baby'}
                            onChange={() => setSelectedValue('baby')}
                        />
                        <RadioItem
                            id="PARENT"
                            name="Я родитель, ищу няню"
                            value="Я родитель, ищу няню"
                            checked={selectedValue === 'PARENT'}
                            onChange={() => setSelectedValue('PARENT')}
                        />
                        </div>
                </RadioGroup>
            </Popup>

            <Popup className="not-register-modal" cross style={{
              
            }} isOpen={mobileState.isRegister}  next={() => {router.push('/auth')}} setOpen={mobileState.setRegister} btnTitle={'Продолжить бесплатно'}  title={false}>
                <span className="text-center block w-full font-semibold text-[28px] leading-[32px] font-[onest] mb-[16px]">
                  <div className={'mt-[16px] mb-[32px] min-w-[550px]'}>
                    Для отклика необходимо пройти <br /> небольшую регистрацию                  
                  </div>
               </span>
            </Popup>

            <BabyHero />
            <BabysittersBenefits />
            <BeforePay items={
            [
              {
                title: <>Зарегистрируйтесь, <br /> заполнить информацию <br /> о себе </>,
                icon: <svg width="55" height="60" viewBox="0 0 55 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32.0016 58C50.3764 39.9612 63.2711 9.51019 44.0523 2.80768C24.8335 -3.89483 17.1953 33.3873 26.7225 31.1072C36.2498 28.827 18.0999 4.55808 7.16813 12.4913C-3.76369 20.4245 1.80668 44.2777 32.0016 58Z" stroke="#F3E19C" strokeWidth="2.5"/>
                </svg>
              },
              {
                title: <>Пройти проверку</>,
                icon: <svg width="113" style={{
                  right: '-10px',
                  top: '-5px'
                }} height="113" viewBox="0 0 85 113" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60.1796 -0.927155L54.0044 -33M71.2437 -9.42839L75.2319 -25.5292M71.2437 71.0757L79.7347 112.68M60.1796 83.8276L57.478 101.216M96.7166 20.4179L121.289 7.57408M28.7887 20.4179L1 2.93704M16.6955 26.8951H33M34.964 58.9679L11.1635 78.9329M99.4183 52.5828L118.33 62.1973M63.8167 20.4179L83.7123 2.93704L77.7785 30.2072L101.863 37.0248L77.7785 43.8423L83.7123 62.1973L65.7364 52.5828L48.2841 76.3568L50.3784 48.0378L16.6955 42.0943L45.2561 30.2072L39.7325 4.33552L63.8167 20.4179Z" stroke="#F3E19C" strokeWidth="2.5"/>
                </svg>
              },
              {
                title: <>Откликайтесь на анкеты родителей</>,
                icon: <svg style={{
                  top: '15px',
                  right: '20px',
                  position: 'absolute',
                }} width="66" height="46" viewBox="0 0 66 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M64.1215 2L5 19.8195L21.6108 24.8944M64.1215 2L21.6108 24.8944M64.1215 2L56.8971 38.1249L36.4729 30.5455M64.1215 2L32.742 29.161M21.6108 24.8944L25.3954 43M32.742 29.161L25.3954 43M32.742 29.161L36.4729 30.5455M25.3954 43L36.4729 30.5455" stroke="#F3E19C" strokeWidth="2.5"/>
                </svg>
              },
              {
                title: <>Получите договор, который будет регламентировать ваши отношения с няней</>,
                icon: <svg style={{
                  right: '20px',
                  top: '15px'
                }} width="58" height="54" viewBox="0 0 58 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.8139 24.1443L27.1518 40.1039C31.8727 31.8591 44.476 12.4956 57.1224 1M2 11.0115L4.2331 52L45.8981 49.2321L43.0186 9.00924L2 11.0115Z" stroke="#F3E19C" strokeWidth="2.5"/>
                </svg>

              },
            ]} title="Как это работает" />
            <Reviews__Baby />
            <Reviews  title={<>
              Истории наших нянь
            </>} />

            <GuaranteesBaby />

            <PresentationProfile />
            <div className="block_beige">
                <Solutions title="Чем вам предстоит заниматься" />   
                <FAQ items={babyFAQData} />
            </div>
        </>
    )
}
