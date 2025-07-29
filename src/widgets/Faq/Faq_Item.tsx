'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Faq.module.scss';

type Props = {
    title: string,
    description?: string | undefined,
}

const FAQ_Item:React.FC<Props> = ({description,title}) => {
    const [isShow, setShow] = useState(false);

    return (
        <li onClick={() => setShow(prev => !prev)} className={styles['faq__item']}>
            <div className={styles['faq__item-top']}>
                <span className={styles['faq__item-title']}>
                    {title}
                </span>

                <button className={styles['faq__item-btn']}>
                    {
                        !isShow ?    
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="9.00391" y="-0.000488281" width="2" height="20" fill="white"/>
                            <rect x="20.002" y="8.99951" width="2" height="20" transform="rotate(90 20.002 8.99951)" fill="white"/>
                        </svg>
                        :
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="14.3672" y="0.22168" width="2" height="20" transform="rotate(45 14.3672 0.22168)" fill="white"/>
                            <rect x="15.7812" y="14.3633" width="2" height="20" transform="rotate(135 15.7812 14.3633)" fill="white"/>
                        </svg>
                    }
                </button>
            </div>

            <AnimatePresence initial={false}>
                {isShow && description && (
                    <motion.div
                        className={styles['faq__item-content']}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "linear" }}
                    >
                        {description}
                    </motion.div>
                )}
            </AnimatePresence>
        </li>
    )
}

export default FAQ_Item;
