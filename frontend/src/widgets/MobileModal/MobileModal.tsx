'use client'

import Button from '@/shared/compontents/Button'
import styles from './MobileModal.module.scss'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import React, { useEffect } from 'react'

const MobileModal = ({
  isOpen,
  setOpen,
  children,
  onClose,
  title,
  next,
  button_title = 'Сохранить',
  variation,
  btn
}: {
  isOpen: boolean
  setOpen: (open: boolean, type:string) => void,
  next?: () => void,
  onClose?: () => void,
  children?: React.ReactNode,
  title: string | React.ReactNode,
  button_title?: string,
  variation?: 'filter',
  btn?: boolean,
}) => {
  const y = useMotionValue(0)

  const handleOverlayClick = () => {
      setOpen(false, 'role')
      onClose?.();
  }

  const stopClickPropagation = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  useEffect(() => {
    const unsubscribe = y.onChange((latest) => {
      if (latest < 0) {
        y.set(0) 
      }
    })

    return () => unsubscribe()
  }, [y])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <motion.div
            className={variation === 'filter' ? styles['modal-filter'] : styles.modal}
            onClick={stopClickPropagation}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 1000 }}
            style={{ y }}
            dragElastic={0.3}
            onDrag={(event, info) => {
              if (info.offset.y < 0) {
                y.set(0);
              }
}}
            onDragEnd={(event, info) => {
              console.log(info.offset.y)
              if (info.offset.y > 0) {
                setOpen(false, '');
              }
            }}
            dragMomentum={false}
          >
            <div className={styles['modal-mobile__top']}>
              <div className={styles['modal-mobile__top-line']}></div>
            </div>

            <div className={styles['modal-mobile__content']}>
              <div className={styles['modal-mobile__content-top']}>
                <h2 className={styles['modal-mobile__title']}>{title}</h2>
                <button
                  onClick={handleOverlayClick}
                  className={styles['mobile-modal__content-btn']}
                >
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect width="32" height="32" rx="8" fill="#EFF0F5" />
                    <path d="M20 12L12 20" stroke="#191816" strokeWidth="2" />
                    <path d="M12 12L20 20" stroke="#191816" strokeWidth="2" />
                  </svg>
                </button>
              </div>
              <div className='overflow-scroll'>
                {children}
              </div>
              {
                btn &&
                <Button onClick={next} text={button_title} variation="second" type="button" />
              }
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default MobileModal
