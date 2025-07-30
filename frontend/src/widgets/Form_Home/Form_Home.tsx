import Image from 'next/image'
import styles from './Form_Home.module.scss'
import Button from '@/shared/compontents/Button'
import Link from 'next/link'

const Form_Home = () => {
  return (
    <section className={styles['form-home']}>
        <div className={styles['form-home__content']}>
            <div className={styles['form-home__modal']}>
                <span className={styles['form-home__modal-answer']}>Не хотите подбирать няню сами? </span>
                <h2 className={styles['form-home__modal-title']}>
                    Подберем няню, которая полюбит вашего ребенка как своего
                </h2>

                <Link href='https://nannybabystory.ru/' className={styles['form-home__link']}>
                    <Image className={styles['form-home__link-icon']} height={100} width={100} src={'/images/form_home/heart.png'}   alt="" />

                    https://nannybabystory.ru/
                </Link>

                <p className={styles['form-home__description']}>
                    Оставьте заявку, и мы подберем няню индивидуально под ваши потребности
                </p>
                
                <form className={styles['form-home__form']} action="">
                    <div className={styles['form-home__form-row']}>
                        <input placeholder="8-___-___-____"   pattern="8-[0-9]{3}-[0-9]{3}-[0-9]{4}" type="text" className={styles['form-home__input']} />

                        <Button text="Отправить" variation='second'  type="submit" />
                    </div>

                    <span className={styles['form-home__form-description']}>
                        Нажимая на кнопку «Отправить» вы даете согласие на обработку персональных данных
                    </span>
                </form>

            </div>

            <div className={styles['form-home__image-wrap']}>
                <Image   quality={100} className={styles['form-home__image']} height={586} width={586} src={'/images/form_home/persons.png'}   alt="" />
            </div>
        </div>
    </section>
  )
}

export default Form_Home
