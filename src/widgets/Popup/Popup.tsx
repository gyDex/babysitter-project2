import styles from './Popup.module.scss'

import { AnimatePresence, motion } from 'framer-motion'
import Button from '@/shared/compontents/Button'
import { CSSProperties } from 'react'

const Popup = ({
  isOpen,
  setOpen,
  onClose,
  children,
  title,next,
  btnTitle = 'Сохранить',
  style,
  styleMain,
  cross = false,
  className,
  isNotBtn = false,
  top = true,
}: {
  isOpen: boolean
  setOpen: (open: boolean, type:string) => void,
  next?: () => void,
  onClose?: () => void,
  children?: React.ReactNode,
  title: string | boolean | React.ReactNode,
  btnTitle?: string,
  style?: CSSProperties | undefined ,
  styleMain?: CSSProperties | undefined ,
  cross?: boolean,
  className?: string,
  isNotBtn?: boolean,
  top?: boolean,
}) => {
    const handleOverlayClick = () => {
        setOpen(false, '')
          onClose?.();
    }

    const stopClickPropagation = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    return (
            <AnimatePresence>
            {
                isOpen && (
                    <div className={`${styles.overlay} ${className || ''}`} style={style} onClick={handleOverlayClick}>
                        <motion.div
                            onClick={stopClickPropagation}
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1, ease: 'easeInOut' }}
                        >
                            <div style={styleMain} className={cross ? styles['popup__inner'] : styles['popup__inner-cross']}>
                                {
                                    cross &&
                                    <button onClick={handleOverlayClick} className={styles['popup__cross']}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 4L4 12" stroke="#252525" 
                                                strokeWidth="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M4 4L12 12" stroke="#252525"
                                                strokeWidth="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                }

                                <div className={styles['popup__content']}> {
                                        
                                        <div  className={styles['popup__top-content']}>
                                            {
                                                (title !== false || top !== false )&&
                                                <div className={styles['popup__content-top']}>
                                                    <h2 className={styles['popup__title']}>{title}</h2>
                                                </div>
                                            }
                
                                            {children}
                                        </div>
                                    }

                                    {
                                        !isNotBtn &&
                                        <div className={styles['popup__bottom']}>
                                            <Button  onClick={next} text={btnTitle} variation="second" type="button" />
                                        </div>
                                    }
            
                                </div>
                            </div>
                        </motion.div>
                    </div>

                )
            }
        </AnimatePresence>
    )
}

export default Popup
