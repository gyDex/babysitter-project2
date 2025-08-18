'use client'

import Button from '@/shared/compontents/Button';
import styles from './not-found.module.scss';
import { useEffect } from 'react';
import { useHeader } from '@/entities/stores/useHeader';
import { useRouter } from 'next/navigation';
import HeaderMenu from '@/widgets/HeaderMenu/HeaderMenu';
import { useNotFound } from '@/entities/stores/useNotFound';

const NotFoundPage = () => {
  const headerState = useHeader();

  const router = useRouter();

  const { setNotFound }  = useNotFound();

  useEffect(() => {
    headerState.setTransparent(true);
    setNotFound(true);

    function beforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
      setNotFound(false);
    }

    window.addEventListener('beforeunload', beforeUnload);

    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
    };
  }, [])

  return (
    <div id='__isNotFound' className={styles['not-found']}>
      <HeaderMenu />
      <div className={styles['not-found__bg']}>
        <video
          src="https://rccsowmhkwlvmka0.public.blob.vercel-storage.com/5124584-uhd_3840_2160_25fps.mp4"
          width={100}
          height={100}
          autoPlay
          loop
          muted
          playsInline
        >
          Ваш браузер не поддерживает видео.
        </video>
      </div>

      <div className={styles['not-found__inner']}>
        <h1 className={styles['not-found__title']}>404</h1>
        <span className={styles['not-found__description']}>Похоже, такой страницы нет</span>
    
        <Button style={{
          width: '235px',
          marginTop: '32px'
        }} onClick={() => router.push('/parent')} text='На главную' type='button' />
      </div>
    </div>
  )
}

export default NotFoundPage
