'use client'

import styles from './BeforePay.module.scss'
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.2,
      ease: 'easeOut',
    },
  }),
} as any;

type Props = {
  title: string,
  items: any[],
}

const BeforePay:React.FC<Props> = ({title, items}) => {
  return (
    <section  id='stages' className={styles['before-pay']}>
      <motion.h2
        className={styles['before-pay__title']}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>

      <ul className={styles['before-pay__list']}>
        {
          items.map((item: any, index) => <>
            <motion.li
            key={index}
              className={styles['before-pay__item']}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={variants}
            >
              {
                item.icon
              }
              <span className={styles['before-pay__number']}>0{index + 1}</span>
              <span className={styles['before-pay__item-title']}>
                {item.title}
              </span>
            </motion.li>
          </>)
        }
      </ul>
    </section>
  )
}

export default BeforePay
