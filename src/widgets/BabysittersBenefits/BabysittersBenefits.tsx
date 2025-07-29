import Image from 'next/image'
import styles from './BabysittersBenefits.module.scss'

const BabysittersBenefits = () => {
  return (
    <section id='about' className={styles['babysit-benefits']}>
        <div className={styles['babysit-benefits__container']}>
            <h1 className={styles['babysit-benefits__title']}>
                Станьте няней, которой доверяют с первого взгляда
            </h1>

            <ul className={styles['babysit-benefits__list']}>
                <li className={styles['babysit-benefits__item_large']}>
                    <h2 className={styles['babysit-benefits__item-title']}>
                        3 000+ 
                    </h2>

                    <span className={styles['babysit-benefits__item-description']}>родителей <br /> на платформе</span>

                    <Image quality={100} className={styles['babysit-benefits__item-image']} src={'/images/babysit-benefits/image2.png'} alt='' height={329} width={248} />
                </li>
                
                <li className={styles['babysit-benefits__item_small']}>
                    <span className={styles['babysit-benefits__item-description']}>Доход от </span>
                    
                    <h2 className={styles['babysit-benefits__item-title']}>
                        60 000 ₽
                    </h2>

                    <Image quality={100} className={styles['babysit-benefits__item-image']} src={'/images/babysit-benefits/image4.png'} alt='' height={206} width={206} />
                </li>

                <li className={styles['babysit-benefits__item_small-2']}>
                    <span className={styles['babysit-benefits__item-description']}>87% нянь получают первый отклик в течение</span>
                    
                    <h2 className={styles['babysit-benefits__item-title']}>
                        3-х дней
                    </h2>

                    <Image quality={100} className={styles['babysit-benefits__item-image']} src={'/images/babysit-benefits/image3.png'} alt='' height={213} width={211} />
                </li>
            </ul>
        </div>
    </section>
  )
}

export default BabysittersBenefits
