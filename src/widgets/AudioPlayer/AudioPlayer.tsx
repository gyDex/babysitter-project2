import styles from './AudioPlayer.module.scss'

type Props = {
    onClick?: () => void;
    isEdit?: boolean
}

const AudioPlayer:React.FC<Props> = ({onClick, isEdit}) => {
  return (
    <div className={styles['audio-player']}>
        <button className={styles['audio-player__play']}>
            <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 29.3759L17 15.9359C17.0003 15.7678 17.0458 15.6028 17.1317 15.4583C17.2177 15.3137 17.341 15.195 17.4886 15.1145C17.6362 15.034 17.8028 14.9946 17.9708 15.0006C18.1389 15.0066 18.3022 15.0576 18.4438 15.1484L28.8987 21.8666C29.0311 21.9514 29.1401 22.0681 29.2155 22.2061C29.2909 22.344 29.3305 22.4987 29.3305 22.6559C29.3305 22.8132 29.2909 22.9679 29.2155 23.1058C29.1401 23.2437 29.0311 23.3605 28.8987 23.4453L18.4438 30.1653C18.3022 30.2561 18.1389 30.3072 17.9708 30.3132C17.8028 30.3191 17.6362 30.2798 17.4886 30.1993C17.341 30.1188 17.2177 30 17.1317 29.8555C17.0458 29.711 17.0003 29.546 17 29.3778V29.3759Z" fill="#431DED"/>
                <path d="M1.875 22.5C1.875 11.1094 11.1094 1.875 22.5 1.875C33.8906 1.875 43.125 11.1094 43.125 22.5C43.125 33.8906 33.8906 43.125 22.5 43.125C11.1094 43.125 1.875 33.8906 1.875 22.5ZM22.5 4.6875C17.7758 4.6875 13.2452 6.56417 9.90466 9.90466C6.56417 13.2452 4.6875 17.7758 4.6875 22.5C4.6875 27.2242 6.56417 31.7548 9.90466 35.0953C13.2452 38.4358 17.7758 40.3125 22.5 40.3125C27.2242 40.3125 31.7548 38.4358 35.0953 35.0953C38.4358 31.7548 40.3125 27.2242 40.3125 22.5C40.3125 17.7758 38.4358 13.2452 35.0953 9.90466C31.7548 6.56417 27.2242 4.6875 22.5 4.6875Z" fill="#431DED"/>
                <path d="M31 26.8333C31 25.6417 29.9071 24.6667 28.5714 24.6667L16.4286 24.6667C15.0929 24.6667 14 25.6417 14 26.8333C14 28.025 15.0929 29 16.4286 29L28.5714 29C29.9071 29 31 28.025 31 26.8333ZM16.4286 20.3333L28.5714 20.3333C29.9071 20.3333 31 19.3583 31 18.1667C31 16.975 29.9071 16 28.5714 16L16.4286 16C15.0929 16 14 16.975 14 18.1667C14 19.3583 15.0929 20.3333 16.4286 20.3333Z" fill="white" fillOpacity="0.01"/>
            </svg>
        </button>

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

            <span className={styles['audio-player__duration']}>
                4:08
            </span>
        </div>

        {
            isEdit && <button onClick={onClick} className={styles['audio-player__btn-edit']}>
                Изменить аудиодорожку
            </button>
        }

    </div>
  )
}

export default AudioPlayer
