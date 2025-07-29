'use client'

import Image from 'next/image';
import styles from './Header.module.scss'
import Link from 'next/link';
import { useHeader } from '@/entities/stores/useHeader';
import { useAuth } from '@/entities/stores/useAuth';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { cities } from '@/entities/cities';
import { CitySelect } from '@/shared/compontents/CitySelect/CitySelect';

const Header = () => {
    const headerState = useHeader();

    const authState = useAuth();

    const route = useRouter();

    const pathName = usePathname();

    const [city, setCity] = useState<string | undefined>()

    useEffect(() => {
        setCity(Cookies.get('city'))
    }, [])

    return (
        <div className={styles.header}>
            <div className={headerState.isTransparent ? styles['header__inner_transparent'] : styles.header__inner}>
                <Link href={'/'}>
                     <Image src={'/images/header/logo.svg'} alt="Logo" width={186} height={37} />
                </Link>

                {
                    city !== undefined && (pathName.includes('/profile-babysitter/') ||pathName.includes('/profile-parent/') || pathName === '/auth' || pathName === '/authWithoutSub') && <div className={styles['header__city']}>
                        <CitySelect title={city} items={cities} />
                    </div>
            }

                {
                    <div className={clsx({
                        ['hidden']: (pathName === '/auth' || pathName === '/authWithoutSub') || pathName.includes('/profile-parent/') || pathName.includes('/profile-babysitter/'),
                    })}>
                        <nav className={styles.header__nav}>
                            <ul className={styles['header__nav-list']}>
                                {
                                    pathName === '/babysitter' ? <>
                                        <li onClick={() => headerState.setOpenMenu(false)} className={styles['header__nav-item']}>
                                        <a href="#about">О нас</a>
                                        </li>
                                        <li onClick={() => headerState.setOpenMenu(false)} className={styles['header__nav-item']}>
                                        <a onClick={() => { 
                                            authState.setRole('parent');
                                            route.push('/auth')
                                        }}>Регистрация для мам</a>
                                        </li>
                                        <li onClick={() => headerState.setOpenMenu(false)} className={styles['header__nav-item']}><a href="#stages">Как мы работаем</a></li>
                                        <li onClick={() => headerState.setOpenMenu(false)} className={styles['header__nav-item']}><a href="#reviews">Вакансии мам</a></li>
                                        <li onClick={() => headerState.setOpenMenu(false)} className={styles['header__nav-item']}><a href="#solution">Чем предстоит заниматься</a></li> 
                                    </>
                                    :
                                    <>
                                        <li className={styles['header__nav-item']}>
                                            <Link href={'#about'}>
                                                О нас
                                            </Link>
                                        </li>
                                        <li className={styles['header__nav-item']}>
                                            <button className='cursor-pointer' onClick={() => { 
                                                authState.setRole('parent');
                                                route.push('/auth')
                                            }}>
                                                Регистрация для нянь
                                            </button>
                                        </li>
                                        <li className={styles['header__nav-item']}>
                                            <Link href={'#storage-babysitter'}>
                                                База нянь
                                            </Link>
                                        </li>
                                        <li className={styles['header__nav-item']}>
                                            <Link href={'#founder'}>
                                                Об основателе
                                            </Link>
                                        </li>
                                        <li className={styles['header__nav-item']}>
                                            <Link href={'#stages'}>
                                                Этапы работ
                                            </Link>
                                        </li>
                                    </>
                                }
                            </ul>
                        </nav>

                    </div>
                }
                {
                    <button  onClick={() => {
                        if (headerState.isOpenMenu) {
                            headerState.setOpenMenu(false);
                            if (headerState.NotFirstBlock && !pathName.includes('/profile-parent/')) {
                                headerState.setTransparent(false)
                            }
                            if (!headerState.NotFirstBlock && !pathName.includes('/profile-parent/')) {
                                headerState.setTransparent(true)
                            }
                        }
                        else {
                            headerState.setOpenMenu(true)
                            if (!headerState.NotFirstBlock && !pathName.includes('/profile-parent/')) {
                                headerState.setTransparent(false)
                            }
                        }
                        }} className={styles['header__btn']}>
                        {
                            !headerState.isOpenMenu ? 
                            <Image src={'/images/header/burger.svg'} alt="Logo" width={42} height={42} />
                            :
                            <Image src={'/images/header/close.svg'} alt="Logo" width={42} height={42} />
                        }
                    </button>
                }

                {
                    (pathName === '/auth' || pathName === '/authWithoutSub') && 
                    <Link href={'/parent'} className={styles['header__btn-home']}>
                        На главную
                    </Link>
                }

                {
                    pathName.includes('/profile-parent/') || pathName.includes('/profile-babysitter/')  && <div className={styles['header__right-auth']}>
                        {
                            pathName.includes('/profile-parent/') && <>
                                <Link href={'/profile-parent/vacancy'} className={styles['header__btn-home']}>
                                    Разместить вакансию
                                </Link>
                                
                                <Link href={'/profile-parent/base-data'}>
                                    Подборка нянь
                                </Link>                            
                            </>
                        }

                        {
                            pathName.includes('/profile-babysitter/') && <>
                                <Link href={'/profile-babysitter/vacancy'} className={styles['header__btn-home']}>
                                    Вакансии
                                </Link>                       
                            </>
                        }
                        

                        <Link className='font-semibold flex gap-[8px] items-center' href={'/profile-parent/response'}>
                            Мой профиль

                            <Image height={32} width={32} className='rounded-full border-[white] border-[1px] object-cover !w-[32px] !h-[32px]'  src={'/images/header/avatar.png'} alt='avatar'/>
                        </Link>
                    </div>
                }

            </div>
        </div>
    )
}

export default Header
