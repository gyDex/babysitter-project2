import VideoPlayer from '../VideoPlayer/VideoPlayer'
import styles from './VideoBlock.module.scss'

const VideoBlock = () => {
  return (
    <section id='founder' className={styles['video-block']}>
        <div className={styles['video-block__container']}>
            <h1 className={styles['video-block__title']}>
                Платформа, которую создала мама, чтобы другие мамы смогли выдохнуть
            </h1>

            <h2 className={styles['video-block__text']}>Меня зовут Снежана, я мама троих детей.</h2>

            <p className={styles['video-block__description']}>
                Как и многие родители, я сталкивалась с одной и той же проблемой: найти хорошую няню — непросто. Даже когда человек казался подходящим, приходилось объяснять самые элементарные вещи:
            </p>

            <div className={styles['video-block__labels']}>
                <span className={styles['video-block__label']}>
                    Игрушки нужно убирать
                </span>

                <span className={styles['video-block__label-2']}>
                    Есть — только за столом
                </span>
            </div>
            
            <span className={styles['video-block__label-bottom']}>
                С детьми нужно быть не просто рядом, а по-настоящему с ними
            </span>

            <div className={styles['video-block__modal']}>
                <div className={styles['video-block__video-wrap']}>
                    <div className={styles['video-block__video']}>
                        <VideoPlayer height={'100%'} videoUrl="/images/video-block/video.mp4" />
                    </div>
                </div>

                <div className={styles['video-block__modal-info']}>
                    <h1 className={styles['video-block__modal-title']}>Именно из этого опыта и родилась идея создать платформу, где каждая няня проходит обучение.</h1>

                    <b>Где чётко понятно:</b>
                    
                    <ul className={styles['video-block__modal-list']}>
                        <li className={styles['video-block__modal-item']}>
                            Что она должна делать
                        </li>
                        <li className={styles['video-block__modal-item']}>
                            Как общаться с детьми
                        </li>
                        <li className={styles['video-block__modal-item']}>
                            И как стать действительно ценным помощником для семьи
                        </li>
                    </ul>

                    <p className={styles['video-block__modal-description']}>Я хочу, чтобы родители могли доверять, а няни — расти в профессии.</p>

                    <b>Это не просто платформа. <br />Это шаг к новому стандарту заботы о детях.</b>
                </div>

            </div>
        </div>
    </section>
  )
}

export default VideoBlock
