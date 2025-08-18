import CardBabysitter from '../CardBabysitter/CardBabysitter'
import styles from './PresentationProfile.module.scss'

const PresentationProfile = () => {
  return (
    <section id='storage-babysitter' className={styles['presentation-profile']}>
        <div className={styles['presentation-profile__inner']}>
            <h2 className={styles['presentation-profile__title']}>Как будет <br /> выглядеть <br /> ваш профиль</h2>

            <div className={styles['presentation-profile__right']}>
                <CardBabysitter data={{
                  id:'0',
                  address:'Москва, Аэропорт',
                  age: '30',
                  charts: [false,false,false,true, false, true,false] as any,
                  about: 'Творческая, смелая, эмпатичная, умею мечтать и исполнять мечты, аналитическое и критическое мышление, эмоционально зрелая. Пробую, ошибаюсь, снова пробую, иду к своим целям и желаниям…',
                  education: '',
                  experience: '3',
                  audioFile: '/',
                  name:'Алиса К.',
                  user: {
                    fullName: 'Алиса К.',
                    age: '30',
                    residency:'Москва, Аэропорт',
                    userAvatar: '/images/card-babysit/image.jpg' 
                  },
                  occupancy: [false, false, false, false, false, false] as any,
                }}  />
            </div>
        </div>
    </section>
  )
}

export default PresentationProfile
