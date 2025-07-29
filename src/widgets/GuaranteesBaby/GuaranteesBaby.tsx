'use client'

import Image from 'next/image';
import styles from './GuaranteesBaby.module.scss';
import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react';

const GuaranteesBaby = () => {
      const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { margin: '-1px' }); 
  const controls = useAnimation();

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (inView && isDesktop) {
      controls.start('fixed');
    } else {
      controls.start('relative');
    }
  }, [inView, isDesktop, controls]);

  const variants = {
    fixed: {
      position: 'sticky',
      top: 100, 
      left: 0,
      right: 0,
      zIndex: 100,
      transition: { type: 'spring', stiffness: 100 },
    },
    relative: {
      position: 'relative',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <motion.section id='about'
        className={styles['guarantees']}>
                <motion.ul className={styles['guarantees__list']}>
    <motion.li           ref={sectionRef}
          initial="relative"
          animate={controls}
          variants={variants as any}

              className={styles['guarantees__item-banner']}>
                <Image className={styles['guarantees__item-image-bg']} src={'/images/guarantess/image.png'} height={580} quality={100} width={580} alt='' />

                <span className={styles['guarantees__item-banner-text']}>
                    Заботьтесь о детях, мы позаботимся о вашем доходе и безопасности
                </span>
            </motion.li>

                        <motion.li   initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.6, delay: 0.1 }} className={styles['guarantees__item-1']}>
                <div className={styles['guarantees__item-info']}>
                    <span className={styles['guarantees__item-title']}>
                        Работайте по своей ставке
                    </span>
                    <span  className={styles['guarantees__item-description']}>
                       Предлагайте свою цену за заказ. Никаких комиссий или платы за отклики.
                    </span>
                </div>
                <div className={styles['guarantees__image-wrap']}>
                    <Image className={styles['guarantees__item-image-4']} src={'/images/guarantess/money2.png'} height={100} width={100} alt='' />
                </div>
            </motion.li>

            <motion.li   initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.6, delay: 0.1 }} className={styles['guarantees__item-2']}>
                <div className={styles['guarantees__item-info']}>
                    <span className={styles['guarantees__item-title']}>
                        Вы – хозяйка своего времени
                    </span>
                    <span  className={styles['guarantees__item-description']}>
                        Работайте в удобное время, выбирайте только те семьи, с кем комфортно
                    </span>
                </div>
                <div className={styles['guarantees__image-wrap']}>
                    <Image className={styles['guarantees__item-image-2']} src={'/images/guarantess/image5.png'} height={100} width={100} alt='' />
                </div>
            </motion.li>

            <motion.li   initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.6, delay: 0.1 }} className={styles['guarantees__item-3']}>
                <div className={styles['guarantees__item-info']}>
                    <span className={styles['guarantees__item-title']}>
                        Внутреннее обучение 
                    </span>
                    <span  className={styles['guarantees__item-description']}>
                        Небольшое обучение, которое поможет вам быстрее сближаться с детьми и находить общий язык с родителями
                    </span>
                </div>
                <div className={styles['guarantees__image-wrap']}>
                    <Image quality={100} className={styles['guarantees__item-image-3']} src={'/images/guarantess/image4.png'} height={161} width={242} alt='' />
                </div>
            </motion.li>



            <motion.li   initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.6, delay: 0.1 }} className={styles['guarantees__item-4']}>
                <div className={styles['guarantees__item-info']}>
                    <span className={styles['guarantees__item-title']}>
                        Юридическая поддержка
                    </span>
                    <span  className={styles['guarantees__item-description']}>
                        Предоставляем договор, который поможет регламентировать отношения между вами и няней
                    </span>
                </div>
                <div className={styles['guarantees__image-wrap']}>
                    <Image className={styles['guarantees__item-image-6']} src={'/images/guarantess/folder.png'} height={100} width={100} alt='' />
                </div>
            </motion.li>
        </motion.ul>
    </motion.section>
  )
}

export default GuaranteesBaby
