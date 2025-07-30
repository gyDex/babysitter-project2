'use client'

import { useHeader } from '@/entities/stores/useHeader';
import styles from './HeaderMenu.module.scss';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/entities/stores/useAuth';
import Cookies from 'js-cookie';

const HeaderMenu = () => {
  const header = useHeader()

  const xValue = useMotionValue(1600) // меню изначально скрыто справа
  const x = useTransform(xValue, (val) => val)

  useEffect(() => {
    const controls = animate(xValue, header.isOpenMenu ? 0 :  window.innerWidth, {
      duration: 0.25,
      ease: 'linear',
    })
    return controls.stop
  }, [header.isOpenMenu])

  useEffect(() => {
  if (header.isOpenMenu) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }

  return () => {
    document.body.style.overflow = 'auto'
  }
}, [header.isOpenMenu])

  const pathname = usePathname();

  const authState = useAuth();

  const route = useRouter();

  const [city, setCity] = useState<string | undefined>()

  useEffect(() => {
      setCity(Cookies.get('city'))
  }, [])

  return (
    <motion.div
      style={{ x }}
      className={styles['header-menu']}
    >
      <div className={styles['header-menu__container']}>
        <ul className={styles['header-menu__list']}>
          {
            (pathname === '/parent' || pathname.includes('/profile-babysitter/') || pathname.includes('/about-you/')) &&
            <>
                <li onClick={() => header.setOpenMenu(false)} className={styles['header-menu__item']}>
                  <a href="#about">О нас</a>
                </li>
                <li onClick={() => header.setOpenMenu(false)} className={styles['header-menu__item']}><a  onClick={() => { 
                    authState.setRole('babysitter');
                    route.push('/auth')
                  }}>Регистрация для нянь</a></li>
                <li onClick={() => header.setOpenMenu(false)} className={styles['header-menu__item']}><a href="#storage-babysitter">База нянь</a></li>
                <li onClick={() => header.setOpenMenu(false)} className={styles['header-menu__item']}><a href="#founder">Об основателе</a></li>
                <li onClick={() => header.setOpenMenu(false)} className={styles['header-menu__item']}><a href="#stages">Этапы работ</a></li>
            </>
          }
          {
            pathname === '/babysitter' &&
            <>
                <li onClick={() => header.setOpenMenu(false)} className={styles['header-menu__item']}>
                  <a href="#about">О нас</a>
                </li>
                <li onClick={() => header.setOpenMenu(false)} className={styles['header-menu__item']}>
                  <a onClick={() => { 
                    authState.setRole('parent');
                    route.push('/auth')
                  }}>Регистрация для мам</a>
                </li>
                <li onClick={() => header.setOpenMenu(false)} className={styles['header-menu__item']}><a href="#stages">Как мы работаем</a></li>
                <li onClick={() => header.setOpenMenu(false)} className={styles['header-menu__item']}><a href="#reviews">Вакансии мам</a></li>
                <li onClick={() => header.setOpenMenu(false)} className={styles['header-menu__item']}><a href="#solution">Чем предстоит заниматься</a></li>
            </>
          }

          {
            pathname.includes('/profile-parent/') &&
            <>
                {
                  city && <div className={styles['header-menu__city']}>
                  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_591_10549)">
                      <path d="M8 5.5C8.29667 5.5 8.58668 5.58797 8.83336 5.7528C9.08003 5.91762 9.27229 6.15189 9.38582 6.42598C9.49935 6.70006 9.52906 7.00166 9.47118 7.29264C9.4133 7.58361 9.27044 7.85088 9.06066 8.06066C8.85088 8.27044 8.58361 8.4133 8.29264 8.47118C8.00167 8.52906 7.70007 8.49935 7.42598 8.38582C7.15189 8.27229 6.91762 8.08003 6.7528 7.83336C6.58797 7.58668 6.5 7.29667 6.5 7C6.5 6.60218 6.65804 6.22064 6.93934 5.93934C7.22065 5.65804 7.60218 5.5 8 5.5ZM8 4.5C7.50555 4.5 7.0222 4.64662 6.61108 4.92133C6.19995 5.19603 5.87952 5.58648 5.6903 6.04329C5.50108 6.50011 5.45157 7.00277 5.54804 7.48773C5.6445 7.97268 5.8826 8.41814 6.23223 8.76777C6.58187 9.1174 7.02732 9.3555 7.51228 9.45196C7.99723 9.54843 8.4999 9.49892 8.95671 9.3097C9.41353 9.12048 9.80397 8.80005 10.0787 8.38893C10.3534 7.9778 10.5 7.49445 10.5 7C10.5 6.33696 10.2366 5.70107 9.76777 5.23223C9.29893 4.76339 8.66304 4.5 8 4.5Z" fill="#252525"/>
                      <path d="M8 2.49997C9.17333 2.4839 10.3053 2.93297 11.1485 3.74902C11.9918 4.56507 12.4776 5.68174 12.5 6.85497C12.5003 7.79877 12.1853 8.71562 11.605 9.45997L8 14.73L4.425 9.49997C3.82547 8.7488 3.49927 7.81605 3.5 6.85497C3.52235 5.68174 4.00824 4.56507 4.85146 3.74902C5.69469 2.93297 6.82667 2.4839 8 2.49997ZM8 1.49997C6.56069 1.48128 5.17286 2.03484 4.14153 3.03898C3.11019 4.04312 2.51976 5.41568 2.5 6.85497C2.50126 8.01876 2.88809 9.14933 3.6 10.07L8 16.5L12.4 10.07C13.1119 9.14933 13.4987 8.01876 13.5 6.85497C13.4802 5.41568 12.8898 4.04312 11.8585 3.03898C10.8271 2.03484 9.43931 1.48128 8 1.49997Z" fill="#252525"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_591_10549">
                      <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
                      </clipPath>
                      </defs>
                  </svg>

                  {
                      city
                  }

      
                  
                </div>
                
              } 

                <li onClick={() => header.setOpenMenu(false)} className={styles['header-menu__item']}>
                  <a href="#about">Подборка нянь</a>
                </li>
                <li onClick={() => header.setOpenMenu(false)} className={styles['header-menu__item']}>
                  <a onClick={() => { 
                    authState.setRole('parent');
                    route.push('/auth')
                  }}>Мой профиль</a>
                </li>

                <button className={styles['header-menu__item-btn']}>
                  Разместить вакансию
                </button>
            </>
          }
          {
            pathname === '/auth' &&
            <li onClick={() => header.setOpenMenu(false)} className={styles['header-menu__item']}>
              <a href="/parent">На главную</a>
            </li>

          }
        </ul>

        <div className={styles['header-menu__bottom']}>
          <a className={styles['header-menu__bottom-link']} href="mailto:servicenanny@yandex.ru">
            servicenanny@yandex.ru
          </a>

          <div className={styles['header-menu__socials']}>
            <a href="#" className={styles['header-menu__social']}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="64" height="64" rx="32" fill="white"/>
                    <path d="M32 18.8916C36.241 18.8916 36.8193 18.8916 38.5542 18.8916C40.0964 18.8916 40.8675 19.2771 41.4458 19.4699C42.2169 19.8554 42.7952 20.0482 43.3735 20.6265C43.9518 21.2048 44.3373 21.7831 44.5301 22.5542C44.7229 23.1325 44.9157 23.9036 45.1084 25.4458C45.1084 27.1807 45.1084 27.5663 45.1084 32C45.1084 36.4337 45.1084 36.8193 45.1084 38.5542C45.1084 40.0964 44.7229 40.8675 44.5301 41.4458C44.1446 42.2169 43.9518 42.7952 43.3735 43.3735C42.7952 43.9518 42.2169 44.3373 41.4458 44.5301C40.8675 44.7229 40.0964 44.9157 38.5542 45.1084C36.8193 45.1084 36.4337 45.1084 32 45.1084C27.5663 45.1084 27.1807 45.1084 25.4458 45.1084C23.9036 45.1084 23.1325 44.7229 22.5542 44.5301C21.7831 44.1446 21.2048 43.9518 20.6265 43.3735C20.0482 42.7952 19.6627 42.2169 19.4699 41.4458C19.2771 40.8675 19.0843 40.0964 18.8916 38.5542C18.8916 36.8193 18.8916 36.4337 18.8916 32C18.8916 27.5663 18.8916 27.1807 18.8916 25.4458C18.8916 23.9036 19.2771 23.1325 19.4699 22.5542C19.8554 21.7831 20.0482 21.2048 20.6265 20.6265C21.2048 20.0482 21.7831 19.6627 22.5542 19.4699C23.1325 19.2771 23.9036 19.0843 25.4458 18.8916C27.1807 18.8916 27.759 18.8916 32 18.8916ZM32 16C27.5663 16 27.1807 16 25.4458 16C23.7108 16 22.5542 16.3855 21.5904 16.7711C20.6265 17.1566 19.6627 17.7349 18.6988 18.6988C17.7349 19.6627 17.3494 20.4337 16.7711 21.5904C16.3855 22.5542 16.1928 23.7108 16 25.4458C16 27.1807 16 27.759 16 32C16 36.4337 16 36.8193 16 38.5542C16 40.2892 16.3855 41.4458 16.7711 42.4096C17.1566 43.3735 17.7349 44.3373 18.6988 45.3012C19.6627 46.2651 20.4337 46.6506 21.5904 47.2289C22.5542 47.6145 23.7108 47.8072 25.4458 48C27.1807 48 27.759 48 32 48C36.241 48 36.8193 48 38.5542 48C40.2892 48 41.4458 47.6145 42.4096 47.2289C43.3735 46.8434 44.3373 46.2651 45.3012 45.3012C46.2651 44.3373 46.6506 43.5663 47.2289 42.4096C47.6145 41.4458 47.8072 40.2892 48 38.5542C48 36.8193 48 36.241 48 32C48 27.759 48 27.1807 48 25.4458C48 23.7108 47.6145 22.5542 47.2289 21.5904C46.8434 20.6265 46.2651 19.6627 45.3012 18.6988C44.3373 17.7349 43.5663 17.3494 42.4096 16.7711C41.4458 16.3855 40.2892 16.1928 38.5542 16C36.8193 16 36.4337 16 32 16Z" fill="#8848FF"/>
                    <path d="M32 23.7108C27.3735 23.7108 23.7108 27.3735 23.7108 32C23.7108 36.6265 27.3735 40.2892 32 40.2892C36.6265 40.2892 40.2892 36.6265 40.2892 32C40.2892 27.3735 36.6265 23.7108 32 23.7108ZM32 37.3976C29.1084 37.3976 26.6024 35.0843 26.6024 32C26.6024 29.1084 28.9157 26.6024 32 26.6024C34.8916 26.6024 37.3976 28.9157 37.3976 32C37.3976 34.8916 34.8916 37.3976 32 37.3976Z" fill="#8848FF"/>
                    <path d="M40.4819 25.4458C41.5466 25.4458 42.4096 24.5827 42.4096 23.5181C42.4096 22.4534 41.5466 21.5904 40.4819 21.5904C39.4173 21.5904 38.5542 22.4534 38.5542 23.5181C38.5542 24.5827 39.4173 25.4458 40.4819 25.4458Z" fill="#8848FF"/>
                </svg>
            </a>
            <a href="#" className={styles['header-menu__social']}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="64" height="64" rx="32" fill="white"/>
                <path d="M44.8004 20.1636L39.9917 45.2676C39.9917 45.2676 39.3189 47.0082 37.4706 46.1734L26.3757 37.3641L26.3243 37.3382C27.8229 35.9446 39.4442 25.1243 39.9521 24.6338C40.7384 23.8742 40.2503 23.422 39.3374 23.9958L22.1713 35.2847L15.5486 32.9772C15.5486 32.9772 14.5064 32.5933 14.4061 31.7586C14.3046 30.9224 15.5829 30.4702 15.5829 30.4702L42.5814 19.5023C42.5814 19.5023 44.8004 18.4927 44.8004 20.1636V20.1636Z" fill="#7733F4"/>
                </svg>
            </a>
            <a href="#" className={styles['header-menu__social']}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="64" height="64" rx="32" fill="white"/>
                    <path d="M33.5724 43.2C21.5459 43.2 14.6862 34.7916 14.4004 20.8H20.4246C20.6225 31.0695 25.0637 35.4194 28.5815 36.3163V20.8H34.254V29.6569C37.7278 29.2757 41.3775 25.2396 42.6088 20.8H48.2812C47.8173 23.1025 46.8924 25.2826 45.5646 27.204C44.2367 29.1254 42.5344 30.7466 40.564 31.9664C42.7634 33.0809 44.706 34.6584 46.2636 36.5948C47.8212 38.5312 48.9585 40.7824 49.6004 43.2H43.3563C42.7801 41.1002 41.609 39.2205 39.9898 37.7965C38.3706 36.3726 36.3753 35.4676 34.254 35.1952V43.2H33.5724V43.2Z" fill="#7733F4"/>
                </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default HeaderMenu
