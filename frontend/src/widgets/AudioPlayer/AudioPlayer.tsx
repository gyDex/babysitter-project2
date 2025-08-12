import React, { useRef, useState, useEffect } from 'react'
import styles from './AudioPlayer.module.scss'

type Props = {
  src: string // ссылка на аудио-файл
  onClick?: () => void
  isEdit?: boolean
}

const AudioPlayer: React.FC<Props> = ({ src, onClick, isEdit }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Когда загружается аудио — получаем длительность
    const onLoadedMetadata = () => {
      setDuration(audio.duration)
    }
    // Обновляем текущее время при проигрывании
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }
    // Когда аудио закончится — сбрасываем состояние
    const onEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  // Запуск/пауза аудио
  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  // Формат времени в mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  // Изменение позиции проигрывания (если добавить слайдер)
  // Пока не реализовано в этом примере

  return (
    <div className={styles['audio-player']}>
      <audio ref={audioRef} src={src} preload="metadata" />

      <button
        className={styles['audio-player__play']}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
      >
        {isPlaying ? (
          // Иконка паузы
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="24" fill="white"/>
                    <rect x="15" y="14" width="6" height="20" rx="2" fill="#7733F4"/>
                    <rect x="27" y="14" width="6" height="20" rx="2" fill="#7733F4"/>
                </svg>



        ) : (
          // Иконка воспроизведения (треугольник)
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="24" fill="white"/>
                    <path d="M33 22.2679C34.3333 23.0377 34.3333 24.9622 33 25.732L21 32.6603C19.6667 33.4301 18 32.4678 18 30.9282V17.0718C18 15.5322 19.6667 14.5699 21 15.3397L33 22.2679Z" fill="#7733F4"/>
                </svg>


        )}
      </button>

      

      <div className={styles['audio-player__right']}>
        <div className={styles['audio-player__right']}>
            <svg width="245" height="28" viewBox="0 0 245 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.650391" width="1.22425" height="27.2396" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="4.01758" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="7.38281" y="5.05005" width="1.22425" height="17.1395" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="10.75" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="14.1172" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="17.4844" y="5.05005" width="1.22425" height="17.1395" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="20.8496" y="5.05005" width="1.22425" height="17.1395" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="24.2168" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="27.584" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="30.9512" width="1.22425" height="27.2396" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="34.3164" y="7.95764" width="1.22425" height="11.3243" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="37.6836" y="5.05005" width="1.22425" height="17.1395" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="41.0508" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="44.418" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="47.7832" y="5.05005" width="1.22425" height="17.1395" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="51.1504" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="54.5176" width="1.22425" height="27.2396" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="57.8848" y="5.05005" width="1.22425" height="17.1395" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="61.25" y="5.05005" width="1.22425" height="17.1395" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="64.6172" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="67.9844" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="69.209" width="1.22425" height="27.2396" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="72.5762" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="75.9414" y="5.05005" width="1.22425" height="17.1395" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="79.3086" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="82.6758" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="86.043" y="5.05005" width="1.22425" height="17.1395" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="89.4082" y="5.05005" width="1.22425" height="17.1395" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="92.7754" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="96.1426" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="99.5098" width="1.22425" height="27.2396" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="102.875" y="7.95764" width="1.22425" height="11.3243" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="106.242" y="5.05005" width="1.22425" height="17.1395" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="109.609" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="112.977" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="116.342" y="5.05005" width="1.22425" height="17.1395" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="119.709" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="123.076" width="1.22425" height="27.2396" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="126.443" y="5.05005" width="1.22425" height="17.1395" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="129.809" y="5.05005" width="1.22425" height="17.1395" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="133.176" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="136.543" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="137.766" width="1.22425" height="27.2396" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="141.133" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="144.498" y="5.05005" width="1.22425" height="17.1395" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="147.865" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="151.232" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="154.6" y="5.05005" width="1.22425" height="17.1395" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="157.965" y="5.05005" width="1.22425" height="17.1395" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="161.332" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="164.699" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="168.066" width="1.22425" height="27.2396" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="171.432" y="7.95764" width="1.22425" height="11.3243" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="174.799" y="5.05005" width="1.22425" height="17.1395" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="178.166" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="181.533" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="184.898" y="5.05005" width="1.22425" height="17.1395" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="188.266" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="189.492" width="1.22425" height="27.2396" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="192.859" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="196.225" y="5.05005" width="1.22425" height="17.1395" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="199.592" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="202.959" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="206.326" y="5.05005" width="1.22425" height="17.1395" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="209.691" y="5.05005" width="1.22425" height="17.1395" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="213.059" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="216.426" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="219.793" width="1.22425" height="27.2396" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="223.158" y="7.95764" width="1.22425" height="11.3243" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="226.525" y="5.05005" width="1.22425" height="17.1395" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
                <rect x="229.893" y="8.26367" width="1.22425" height="10.7122" rx="0.612126" fill="#431DED" fillOpacity="0.3"/>
            </svg>
        </div>
        <span className={styles['audio-player__duration']}>
          {formatTime(currentTime)}
        </span>
      </div>

      {isEdit && (
        <button onClick={onClick} className={styles['audio-player__btn-edit']}>
          Изменить аудиодорожку
        </button>
      )}
    </div>
  )
}

export default AudioPlayer
