'use client'

import { RadioGroup } from "@/components/ui/radio-group"
import { useMobileState } from "@/entities/stores/useMobileModal"
import { setRoleCookies } from "@/features/setRoleCookie"
import CardBabysitterList from "@/widgets/CardBabysitterList/CardBabysitterList"
import Changes from "@/widgets/Changes/Changes"
import FAQ from "@/widgets/Faq/Faq"
import Form_Home from "@/widgets/Form_Home/Form_Home"
import Guarantees from "@/widgets/Guarantees/Guarantees"
import HeaderMenu from "@/widgets/HeaderMenu/HeaderMenu"
import Main__Hero from "@/widgets/main__hero/main__hero"
import Popup from "@/widgets/Popup/Popup"
import RadioItem from "@/widgets/RadioItem/RadioItem"
import Reviews from "@/widgets/Reviews/Reviews"
import {SelectModal} from "@/widgets/SelectModal/SelectModal"
import Solutions from "@/widgets/Solutions/Solutions"
import VideoBlock from "@/widgets/VideoBlock/VideoBlock"
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation"
import { cities } from "@/entities/cities"
import { setCityCookies } from "@/features/setCityCookies"
import Cookies from 'js-cookie'
import { homeFaqData } from "@/entities/FAQ/home__page"
import BeforePay from "@/widgets/BeforePay/BeforePay"
import MobileModal from "@/widgets/MobileModal/MobileModal"

export const HomePage = () => {
    const mobileState = useMobileState();
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [selectCity, setSelectCity] = useState<string>('');

    const [role, setRole] = useState<string | undefined>()
    const [city, setCity] = useState<string | undefined>()
    const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const roleCookie = Cookies.get('role')
    const cityCookie = Cookies.get('city')

    setRole(roleCookie)
    setCity(cityCookie)
    setLoaded(true)
  }, [])
  
    const router = useRouter();

    if (!loaded) return null  

    return (
        <>
            <HeaderMenu />

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
                                id="parent"
                                name="Я родитель, ищу няню"
                                value="Я родитель, ищу няню"
                                checked={selectedValue === 'parent'}
                                onChange={() => setSelectedValue('parent')}
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
                  <SelectModal callbackChange={setSelectCity} title='Москва и МО' items={cities}    
                    />
                </MobileModal>
            </div>

            <Popup isOpen={
                  (city === undefined && mobileState.isOpen && mobileState.type === '') ||
                  (city === undefined && role !== undefined && mobileState.isOpen)
                }next={() => 
                {
                  if(selectCity !== '') {
                    mobileState.setOpen(true, 'role')
                    setCityCookies('city', selectCity)
                  }
                }} setOpen={mobileState.setOpen}  title="Ваш город">
                <SelectModal callbackChange={setSelectCity} className="!mt-[0px] !max-h-[50px]" title='Москва и МО' items={cities}          
                />
            </Popup>

            <Popup isOpen={
                  (role === undefined && mobileState.isOpen && mobileState.type === 'role') || 
                  (role === undefined && city !== undefined && mobileState.isOpen)
                }  next={() => {
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
                            id="parent"
                            name="Я родитель, ищу няню"
                            value="Я родитель, ищу няню"
                            checked={selectedValue === 'parent'}
                            onChange={() => setSelectedValue('parent')}
                        />
                        </div>
                </RadioGroup>
            </Popup>

            <Main__Hero />
            <Guarantees />
            <CardBabysitterList />
            <Changes />

            <div className="block_beige">
                <Solutions title="Не просто освобождаем вам время, а строим успешное будущее вашего ребенка" />   
                <BeforePay items={[
              {
                title: <>Получите доступ к базе нянь</>,
                icon: <svg width="113" style={{
                  right: '-10px',
                  top: '-5px'
                }} height="113" viewBox="0 0 85 113" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60.1796 -0.927155L54.0044 -33M71.2437 -9.42839L75.2319 -25.5292M71.2437 71.0757L79.7347 112.68M60.1796 83.8276L57.478 101.216M96.7166 20.4179L121.289 7.57408M28.7887 20.4179L1 2.93704M16.6955 26.8951H33M34.964 58.9679L11.1635 78.9329M99.4183 52.5828L118.33 62.1973M63.8167 20.4179L83.7123 2.93704L77.7785 30.2072L101.863 37.0248L77.7785 43.8423L83.7123 62.1973L65.7364 52.5828L48.2841 76.3568L50.3784 48.0378L16.6955 42.0943L45.2561 30.2072L39.7325 4.33552L63.8167 20.4179Z" stroke="#F3E19C" strokeWidth="2.5"/>
                </svg>
              },
              {
                title: <>Выложите вакансию, расскажете о ребенке и ваших задачах</>,
                icon: <svg width="55" height="60" viewBox="0 0 55 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32.0016 58C50.3764 39.9612 63.2711 9.51019 44.0523 2.80768C24.8335 -3.89483 17.1953 33.3873 26.7225 31.1072C36.2498 28.827 18.0999 4.55808 7.16813 12.4913C-3.76369 20.4245 1.80668 44.2777 32.0016 58Z" stroke="#F3E19C" strokeWidth="2.5"/>
                </svg>
              },
              {
                title: <>Свяжетесь с понравившейся няней (количество контактов не ограничено)</>,
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
            ]}  title="Что вас ждет после оплаты"/>
                <VideoBlock />
                <Reviews title={<>
                    Никто <br /> не расскажет  <br /> о нас лучше наших клиентов
                </>} />
                <Form_Home />
                <FAQ items={homeFaqData} />
            </div>
        </>
    )
}
