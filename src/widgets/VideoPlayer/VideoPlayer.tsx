'use client'

import { useRef, useState } from 'react'
import styles from './VideoPlayer.module.scss'

type Props = {
    videoUrl: string,
    height: string,
}

const VideoPlayer:React.FC<Props> = ({videoUrl, height}) => {
    const [isPlay, setPlay] = useState(false);

    const refVideo = useRef<HTMLVideoElement | null>(null);

    const handleClick = () => {
        if (refVideo.current !== null) {
            if (!isPlay) {
                refVideo?.current?.play();
                refVideo.current.volume = 1;
            }
            else {
                refVideo?.current?.pause();
                refVideo.current.volume = 1;

            }
    
            setPlay((prev: boolean) => !prev)
        }
    }
  
    return (
        <div style={{
            height:height
        }} className={styles['video-player']}>
            <video
                src={videoUrl}
                loop
                playsInline                 
                ref={refVideo}
            >
            Ваш браузер не поддерживает видео.
            </video>

            <button onClick={handleClick} className={styles['video-player__btn']}>
                {
                    !isPlay ? <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 7.26795C16.3333 8.03775 16.3333 9.96225 15 10.732L3 17.6603C1.66667 18.4301 1.90735e-06 17.4678 1.90735e-06 15.9282V2.0718C1.90735e-06 0.532195 1.66667 -0.430055 3 0.339745L15 7.26795Z" fill="#7733F4"/>
                    </svg>
                    :
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="6" height="20" rx="2" fill="#7733F4"/>
                        <rect x="12" width="6" height="20" rx="2" fill="#7733F4"/>
                    </svg>

                }
            </button>
        </div>
    )
}

export default VideoPlayer
