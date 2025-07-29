import CardBabysitter from '../CardBabysitter/CardBabysitter'
import styles from './PresentationProfile.module.scss'

const PresentationProfile = () => {
  return (
    <section id='storage-babysitter' className={styles['presentation-profile']}>
        <div className={styles['presentation-profile__inner']}>
            <h2 className={styles['presentation-profile__title']}>Как будет <br /> выглядеть <br /> ваш профиль</h2>

            <div className={styles['presentation-profile__right']}>
                <CardBabysitter />
            </div>
        </div>
    </section>
  )
}

export default PresentationProfile
