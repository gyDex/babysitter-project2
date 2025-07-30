'use client'

import Button from '@/shared/compontents/Button'
import styles from './baby_hero.module.scss'
import Image from 'next/image'
import { useHeader } from '@/entities/stores/useHeader';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';

const BabyHero = () => {
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
    <motion.section     ref={ref} 
    viewport={{ amount: 0.5 }} className={styles['baby-hero']}>
            <div className={styles['baby-hero__bg']}>
            <video
                src="/images/baby-hero/video.mp4"
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
        <div className={styles['baby-hero__inner']}>

            <h1 className={styles['baby-hero__title']}>
                Работа няней без <br /> посредников – выбирайте семью, ставку и график сами
            </h1>

            <span className={styles['baby-hero__description']}>Расскажите о себе - и начните получать заказы уже в первую неделю, это бесплатно.</span>

            <div className={styles['baby-hero__buttons-wrap']}>
                <Button style={{
                    paddingInline: '38px',
                }} text='Зарегистрироваться'  type='button' />
                <Button text='Посмотреть вакансии' variation='three' type='button' />
            </div>

            <div className={styles['baby-hero__bottom-inner']}>
                Более 3000 родителей
            </div>

            <Image quality={100} className={styles['baby-hero__image']} src={'/images/baby-hero/image1.png'} alt='' height={192} width={228} />
        </div>
    </motion.section>
  )
}

export default BabyHero
