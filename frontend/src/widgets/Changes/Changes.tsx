import Image from 'next/image'
import styles from './Changes.module.scss'

const Changes = () => {
  return (
    <section className={styles['changes']}>
      <div className={styles['changes__container']}>
        <h2 className={styles['changes__title']}>«Сын к ней потянулся, <br />и я выдохнула!»</h2>

        <div className={styles['changes__list']}>
            <div className={styles['changes__item-left']}>
                <span className={styles['changes__item-label-top']}>
                  До
                </span>

                <div className={styles['changes__item-info']}>
                    <p className={styles['changes__text']}>
                      Я долго откладывала поиск няни. Просто не могла представить, как впустить чужого человека в дом. 
                    </p>

                    <p className={styles['changes__text-bold']}>
                      <b>Столько тревог:</b>
                    </p>

                    <div className={styles['changes__item-left-label']}>
                      «А если что-то случится?»
                    </div>

                    <div className={styles['changes__item-left-label_2']}>
                      «А если она кричит?»
                    </div>

                    <div className={styles['changes__item-left-label_3']}>
                      «А если я чувствую, что не моё — и неудобно отказаться?..»
                    </div>


                    <p className={styles['changes__text']}>
                      Но я дошла до точки, когда уже не справлялась.
                    </p>
                    
                    <p  className={styles['changes__text']}>
                        <b>
                          Была как зомби:
                        </b>

                        хронический недосып, голова как в тумане, чувство вины за каждую минуту, когда мечтала не быть мамой, а просто поспать.
                    </p>
                </div>

                <div className={styles['changes__image-wrap']}>
                  <Image className={styles['changes__image']} src={'/images/changes/image.png'} alt="" height={588} width={322} quality={100}  />
                </div>
            </div>

            <div className={styles['changes__item-right']}>
              <span className={styles['changes__item-label-top']}>
                После
              </span>

              <div className={styles['changes__item-info']}>
                  <h3 className={styles['changes__item-right-title']}>Через этот сервис я наконец нашла няню, которой получилось довериться.</h3>

                  <p className={styles['changes__text']}>
                    Я сама выбирала. Смотрела анкеты, видео, читала отзывы. Фильтровала по ритму жизни, возрасту ребёнка, опыту, даже по интонации в голосе.
                  </p>
                  <p className={styles['changes__text']}>
                    Я выбрала Татьяну. И с первой встречи почувствовала: вот она, спокойная, ровная, тёплая.
                  </p>

                  <div className={styles['changes__item-right-label']}>
                    Сын к ней потянулся, и я выдохнула!
                  </div>

                  <p className={styles['changes__text']}>
                    <b>Самое главное</b> я впервые за долгое время почувствовала, что могу быть хорошей мамой, не сгорая до тла.
                  </p>
                  
                  <p  className={styles['changes__text']}>
                      <b>
                        Благодарю создателей сервиса за помощь!
                      </b>
                  </p>
              </div>
            
                <div className={styles['changes__image-wrap']}>

                  <div className={styles['changes__image-right']}>
                    <Image
                      src="/images/changes/image2.png"
                      alt="После"
                      fill
                      quality={100}
                      style={{ objectFit: 'cover', objectPosition: 'top' }}
                    />

                  </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Changes
