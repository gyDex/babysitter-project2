'use client'

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import styles from './CookieModal.module.scss';
import { setPermissionCookie } from '@/features/setPermissionCookie';

const CookieModal = () => {
    const [permissionCookie2, setPermissionCookie2] = useState<string | undefined>();

    useEffect(() => {
      setPermissionCookie2(Cookies.get('per-cookie'))
    }, [])

    return (
        
        <>
            {
                permissionCookie2 !== 'true' &&
                <div className={styles['cookie-modal']}>
                    <div className={styles['cookie-modal__top']}>
                        <span className={styles['cookie-modal__title']}>
                            Мы используем cookies 
                        </span>
    
                        <button onClick={() => setPermissionCookie2('true')} className={styles['cookie-modal__cross']}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="0.5" width="23" height="23" rx="1.5" stroke="#7C8092"/>
                                <path d="M16.7364 7.2636C17.0879 7.61508 17.0879 8.18492 16.7364 8.5364L13.273 12L16.7364 15.4636C17.0586 15.7858 17.0854 16.2915 16.817 16.6442L16.7364 16.7364C16.3849 17.0879 15.8151 17.0879 15.4636 16.7364L12 13.273L8.5364 16.7364C8.18492 17.0879 7.61508 17.0879 7.2636 16.7364C6.91213 16.3849 6.91213 15.8151 7.2636 15.4636L10.727 12L7.2636 8.5364C6.94142 8.21421 6.91457 7.70853 7.18306 7.35577L7.2636 7.2636C7.61508 6.91213 8.18492 6.91213 8.5364 7.2636L12 10.727L15.4636 7.2636C15.8151 6.91213 16.3849 6.91213 16.7364 7.2636Z" fill="#7C8092"/>
                            </svg>
                        </button>
                    </div>
    
                    <p className={styles['cookie-modal__description']}>
                        Этот сайт использует файлы cookies для улучшения работы, персонализации контента и анализа трафика. Продолжая пользоваться сайтом, вы соглашаетесь с нашей <span className='underline'>Политикой конфиденциальности</span> и использованием cookies
                    </p> 
    
                    <div className={styles['cookie-modal__bottom']}>
                        <button onClick={() => {
                            setPermissionCookie('permissionCookie','true')
                            setPermissionCookie2('true');
                        }} className={styles['cookie-modal__bottom-btn']}>
                            Принять
                        </button>    
                    </div>   
                </div>
            }
        </>
    )
}

export default CookieModal
