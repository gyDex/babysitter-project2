'use client'

import Button from '@/shared/compontents/Button';
import styles from './not-found.module.scss';
import { useEffect } from 'react';
import { useHeader } from '@/entities/stores/useHeader';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
  const headerState = useHeader();

  const router = useRouter();

  useEffect(() => {
    headerState.setTransparent(true);
  }, [])

  return (
    <div className={styles['not-found']}>
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
