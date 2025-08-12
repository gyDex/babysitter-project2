'use client'

import Image from 'next/image'
import styles from './main__hero.module.scss'
import Button from '@/shared/compontents/Button'
import { motion, useInView } from 'framer-motion';
import { useHeader } from '@/entities/stores/useHeader';
import { useEffect, useRef } from 'react';

const Main__Hero = () => {
  const headerState = useHeader();
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: false, 
    margin: '25px 0px', 
  });

  useEffect(() => {
    if (isInView) {
      headerState.setTransparent(true);
      headerState.setNotFirstBlock(false);
    } else {
      headerState.setTransparent(false);
      headerState.setNotFirstBlock(true);
    }
  }, [isInView]);


  return (
    <motion.section 
    ref={ref} 
    viewport={{ amount: 0.5 }}
    className={styles['main-hero']}>
        <div className={styles['main-hero__bg']}>
          <video
            src="https://rccsowmhkwlvmka0.public.blob.vercel-storage.com/222.mp4"
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

        <div className={styles['main-hero__inner']}>
          <h1 className={styles['main-hero__title']}>Поможем найти няню, которой можно доверить самое дорогое</h1>

          <div className={styles['main-hero__block']}>
              <div className={styles['main-hero__top']}>
                  <Image className={styles['main-hero__top-image']} src={'/images/main-hero/image1.gif'} 
                  alt="heart" width={124} height={90} />

                  <p className={styles['main-hero__description']}>Подобрали более 3 000 нянь, которые любят детей не по инструкции, а по-настоящему</p>
              </div>

              <Button text='Найти няню' type='button'/>
          </div>
        </div>

    </motion.section>
  )
}

export default Main__Hero
